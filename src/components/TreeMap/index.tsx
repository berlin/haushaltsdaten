import { FC, useEffect } from 'react'
import * as d3 from 'd3'
import { TreemapHierarchyType } from './dummyData'

export interface TreeMapType {
  width?: number
  height?: number
  hierarchy: TreemapHierarchyType
  initialLevelId?: string
  onLastLevelReached?: (funktionsbezeichnung: string) => void
}

export interface TreemapItem {
  x0: number
  x1: number
  y0: number
  y1: number
  value: number
  depth: number
  height: number
  data: TreemapHierarchyType
  parent: TreemapItem
  children: TreemapItem[]
}

type TreeMapNode = d3.HierarchyRectangularNode<TreemapHierarchyType>

const format = d3.format(',d')

export const TreeMap: FC<TreeMapType> = ({
  width = 800,
  height = 800,
  hierarchy,
  initialLevelId,
  onLastLevelReached = () => undefined,
}) => {
  const x = d3.scaleLinear().rangeRound([0, width])
  const y = d3.scaleLinear().rangeRound([0, height])

  useEffect(() => {
    const name = (d: TreeMapNode): string =>
      d
        .ancestors()
        .reverse()
        .map((d) => d.data.name)
        .join('/')

    function tile(
      node: TreeMapNode,
      x0: number,
      y0: number,
      x1: number,
      y1: number
    ): void {
      d3.treemapBinary(node, 0, 0, width, height)
      for (const child of node.children || []) {
        child.x0 = x0 + (child.x0 / width) * (x1 - x0)
        child.x1 = x0 + (child.x1 / width) * (x1 - x0)
        child.y0 = y0 + (child.y0 / height) * (y1 - y0)
        child.y1 = y0 + (child.y1 / height) * (y1 - y0)
      }
    }

    const treemap = (
      data: TreemapHierarchyType
    ): d3.HierarchyRectangularNode<TreemapHierarchyType> =>
      d3.treemap<TreemapHierarchyType>().tile(tile)(
        d3
          .hierarchy<TreemapHierarchyType>(data)
          .sum((d) => d.value || 0)
          .sort((a, b) => (b.value || 0) - (a.value || 0))
      )

    const svg = d3.select('svg')

    let group = svg.append('g').call(render, treemap(hierarchy))

    function render(
      group: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
      root: TreeMapNode
    ): void {
      const node = group
        .selectAll('g')
        .data((root.children || []).concat(root))
        .join('g')

      node
        .attr('id', (d) => d.data.id || '')
        .filter((d) => (d === root ? d.parent : d.children))
        .attr('cursor', 'pointer')
        .on('click', (_event, d) => (d === root ? zoomout(root) : zoomin(d)))

      node.append('title').text((d) => `${name(d)}\n${format(d.value)}`)

      // Reactangles (Fill & Stroke)
      node
        .append('rect')
        .attr('fill', (d) =>
          d === root ? '#fff' : d.children ? '#ccc' : '#ddd'
        )
        .attr('stroke', '#fff')

      // node
      //   .append('clipPath')
      //   .attr('id', (d) => {
      //     console.log(d)

      //     return d.data.name
      //   })
      //   .append('use')
      //   .attr('xlink:href', '#')
      // .attr("xlink:href", (d) => d.leafUid.href);

      node
        .append('text')
        .attr('clip-path', (d) => d.clipUid)
        .attr('font-weight', (d) => (d === root ? 'bold' : null))
        .selectAll('tspan')
        .data((d) =>
          (d === root ? name(d) : d.data.name)
            .split(/(?=[A-Z] [^A-Z])/g)
            .concat(format(d.value))
        )
        .join('tspan')
        .attr('x', 3)
        .attr(
          'y',
          (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
        )
        .attr('fill-opacity', (d, i, nodes) =>
          i === nodes.length - 1 ? 0.7 : null
        )
        .attr('font-weight', (d, i, nodes) =>
          i === nodes.length - 1 ? 'normal' : null
        )
        .text((d) => d)

      group.call(position, root)
    }

    function position(group, root) {
      group
        .selectAll('g')
        .attr('transform', (d) =>
          d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`
        )
        .select('rect')
        .attr('width', (d) => (d === root ? width : x(d.x1) - x(d.x0)))
        .attr('height', (d) => (d === root ? 30 : y(d.y1) - y(d.y0)))
    }

    // When zooming in, draw the new nodes on top, and fade them in.
    function zoomin(d) {
      const groupToRemove = group.attr('pointer-events', 'none')
      const groupToAdd = (group = svg.append('g').call(render, d))

      // depth starts at 0, so 3 is the level at which we have the Funktion which holds its Einzeltitel:
      if (d.depth === 3) {
        onLastLevelReached(d.data.name as string)
      }

      x.domain([d.x0, d.x1])
      y.domain([d.y0, d.y1])

      svg
        .transition()
        .duration(750)
        .call((t) =>
          groupToRemove.transition(t).remove().call(position, d.parent)
        )
        .call((t) =>
          groupToAdd
            .transition(t)
            .attrTween('opacity', () => d3.interpolate(0, 1))
            .call(position, d)
        )
    }

    // When zooming out, draw the old nodes on top, and fade them out.
    function zoomout(d) {
      const groupToRemove = group.attr('pointer-events', 'none')
      const groupToAdd = (group = svg.insert('g', '*').call(render, d.parent))

      x.domain([d.parent.x0, d.parent.x1])
      y.domain([d.parent.y0, d.parent.y1])

      svg
        .transition()
        .duration(750)
        .call((t) =>
          groupToRemove
            .transition(t)
            .remove()
            .attrTween('opacity', () => d3.interpolate(1, 0))
            .call(position, d)
        )
        .call((t) => groupToAdd.transition(t).call(position, d.parent))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!initialLevelId) return
    const nodeToClick = document.getElementById(initialLevelId)
    if (nodeToClick) {
      console.log(nodeToClick)
      // TODO: the below doesn't work:
      //nodeToClick.click()
    }
  }, [initialLevelId])
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox={`0.5, -30.5, ${width}, ${height + 30}`}
        style={{ font: '12px sans-serif' }}
      ></svg>
    </div>
  )
}
