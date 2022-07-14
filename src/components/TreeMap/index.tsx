import { FC, useCallback, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { TreemapHierarchyType } from './dummyData'
import classNames from 'classnames'
import { formatCurrency } from '@lib/utils/numberUtil'

export interface TreeMapType {
  width?: number
  height?: number
  hierarchy: TreemapHierarchyType
  breadcrumbsToDesiredLevel?: string[]
  onLastLevelReached?: (funktionsbezeichnung: string) => void
  onChange?: (newPath: string[]) => void
  onZoomout?: (newPath: string[]) => void
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

function position(
  group: d3.Selection<SVGGElement, unknown, HTMLElement, TreemapItem>,
  root: TreeMapNode,
  width: number,
  x: d3.ScaleLinear<number, number, never>,
  y: d3.ScaleLinear<number, number, never>
): void {
  group
    .selectAll<d3.BaseType, TreeMapNode>('g')
    .attr('transform', (d) =>
      d === root ? `translate(0,0)` : `translate(${x(d.x0)},${y(d.y0)})`
    )
    .select('rect')
    .attr('width', (d) => (d === root ? width : x(d.x1) - x(d.x0)))
    .attr('height', (d) => (d === root ? 30 : y(d.y1) - y(d.y0)))
}

function getFullBreadcrumb(rootEl: TreeMapNode): TreeMapNode[] {
  let fullBreadcrumb: TreeMapNode[] = []
  function getParent(el: TreeMapNode): TreeMapNode | undefined {
    if (el.parent) {
      fullBreadcrumb = [el, ...fullBreadcrumb]
      return getParent(el.parent)
    }
    fullBreadcrumb = [el, ...fullBreadcrumb]
    return undefined
  }
  getParent(rootEl)
  return fullBreadcrumb.filter(({ data }) => data.id)
}

export const TreeMap: FC<TreeMapType> = ({
  width = 800,
  height = 800,
  hierarchy,
  breadcrumbsToDesiredLevel = [],
  onLastLevelReached = () => undefined,
  onChange = () => undefined,
  onZoomout = () => undefined,
}) => {
  const [breadcrumb, setBreadcrumb] = useState<TreeMapNode[]>([])
  const [path, setPath] = useState<string[]>(breadcrumbsToDesiredLevel)
  const x = d3.scaleLinear().rangeRound([0, width])
  const y = d3.scaleLinear().rangeRound([0, height])

  useEffect(() => {
    if (breadcrumbsToDesiredLevel.join('-') === path.join('-')) return
    setPath(breadcrumbsToDesiredLevel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breadcrumbsToDesiredLevel])

  useEffect(() => {
    if (!path) return
    path.forEach((crumb) => {
      d3.select(`#${crumb}`).dispatch('click')
    })
  }, [path])

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

    const svg = d3.select('svg#expenditures-treemap')

    let group = svg.append('g').call(render, treemap(hierarchy))

    function render(
      group: d3.Selection<SVGGElement, unknown, HTMLElement, TreemapItem>,
      root: TreeMapNode
    ): void {
      const node = group
        .selectAll<d3.BaseType, TreemapHierarchyType>('g')
        .data(root.children || [])
        .join('g')

      node
        .attr('id', (d) => d.data.id || '')
        .filter((d) => Boolean(d === root ? d.parent : d.children))
        .attr('cursor', 'pointer')
        .on('click', (_, d) => {
          d === root ? zoomout(root) : zoomin(d)
          const newPath = d
            .ancestors()
            .sort((a, b) => a.depth - b.depth)
            .map((parent) => parent.data.id || '')
          if (!newPath.every(Boolean)) {
            console.error('An invalid path was attempted to be clicked')
            return
          }
          newPath.shift()
          onChange(newPath)
          setBreadcrumb(getFullBreadcrumb(d))
        })

      node.append('title').text((d) => `${name(d)}\n${format(d.value || 0)}`)

      // Reactangles (Fill & Stroke)
      node
        .append('rect')
        .attr('fill', (d) =>
          d === root ? '#fff' : d.children ? '#ccc' : '#ddd'
        )
        .attr('stroke', '#fff')

      node
        .append('clipPath')
        .attr('id', (d) => `treemap-clippath-${d.data.id || ''}`)
        .append('use')
        .attr('xlink:href', (d) => `treemap-clippath-${d.data.id || ''}`)

      setBreadcrumb(getFullBreadcrumb(root))

      node
        .append('text')
        .attr('clip-path', (d) => `treemap-clippath-${d.data.id || ''}`)
        .attr('font-weight', (d) => (d === root ? 'bold' : null))
        .selectAll('tspan')
        .data((d) =>
          [d === root ? name(d) : d.data.name].concat(
            `€ ${formatCurrency(d.value || 0)}`
          )
        )
        .join('tspan')
        .attr('x', 5)
        .attr(
          'y',
          (_, i, nodes) => `${(i * nodes.length - 1) * 0.3 + 1.5 + i * 0.9}em`
        )
        .attr('fill-opacity', (_, i, nodes) =>
          i === nodes.length - 1 ? 0.7 : null
        )
        .attr('font-weight', (_, i, nodes) =>
          i === nodes.length - 1 ? 'normal' : null
        )
        .text((d) => d)

      group.call(position, root, width, x, y)
    }

    // When zooming in, draw the new nodes on top, and fade them in.
    function zoomin(d: TreeMapNode): void {
      const groupToRemove = group.attr('pointer-events', 'none')
      const groupToAdd = (group = svg.append('g').call(render, d))

      // depth starts at 0, so 3 is the level at which we have the Funktion which holds its Einzeltitel:
      if (d.depth === 3) {
        onLastLevelReached(d.data.name || '')
      }

      x.domain([d.x0, d.x1])
      y.domain([d.y0, d.y1])

      svg
        .transition()
        .duration(750)
        .call((t) =>
          groupToRemove
            .transition(t)
            .remove()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .call(position, d.parent, width, x, y)
        )
        .call((t) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          groupToAdd
            .transition(t)
            .attrTween('opacity', () => d3.interpolate(0, 1))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .call(position, d, width, x, y)
        )
    }

    // When zooming out, draw the old nodes on top, and fade them out.
    function zoomout(d: TreeMapNode): void {
      const groupToRemove = group.attr('pointer-events', 'none')
      const groupToAdd = (group = svg.insert('g', '*').call(render, d.parent))

      x.domain([d.parent?.x0 || 0, d.parent?.x1 || 0])
      y.domain([d.parent?.y0 || 0, d.parent?.y1 || 0])

      svg
        .transition()
        .duration(750)
        .call((t) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          groupToRemove
            .transition(t)
            .remove()
            .attrTween('opacity', () => d3.interpolate(1, 0))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .call(position, d, width, x, y)
        )
        .call((t) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          groupToAdd.transition(t).call(position, d.parent, width, x, y)
        )
    }

    path.forEach((crumb) => {
      d3.select(`#${crumb}`).dispatch('click')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onBreadcrumbClick = useCallback((el: TreeMapNode) => {
    const bc = getFullBreadcrumb(el)
    setBreadcrumb(bc)
    const newPath = bc.map((el) => el.data.id).filter(Boolean) as string[]
    setPath(newPath)
    onZoomout(newPath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1
        id="expenditures-treemap-breadcrumb"
        className="font-bold text-2xl mb-6 grid grid-cols-[1fr,auto] gap-8"
      >
        <span className="flex gap-4">
          {breadcrumb.map((el, idx) => {
            return (
              <span
                key={el.data.id}
                className={`grid gap-4 ${
                  idx !== 0 ? 'grid-cols-[auto,1fr]' : ''
                }`}
              >
                {idx !== 0 && (
                  <span className="font-normal text-gray-300">→</span>
                )}
                <span
                  title={el.data.name}
                  className={classNames(
                    'text-ellipsis overflow-hidden whitespace-nowrap',
                    idx !== 0 ? 'font-normal' : 'font-bold',
                    idx !== breadcrumb.length - 1
                      ? 'hover:text-brand transition-colors cursor-pointer'
                      : 'cursor-default'
                  )}
                  {...(idx !== breadcrumb.length - 1
                    ? {
                        role: 'button',
                        tabIndex: 0,
                        onClick: () => {
                          onBreadcrumbClick(el)
                        },
                        onKeyUp: () => undefined,
                      }
                    : {})}
                >
                  {el.data.name}
                </span>
              </span>
            )
          })}
        </span>
        {breadcrumb[breadcrumb.length - 1] && (
          <span className="font-mono font-normal inline-flex gap-3">
            <span className="text-gray-300">€</span>
            {formatCurrency(breadcrumb[breadcrumb.length - 1].value || 0)}
          </span>
        )}
      </h1>
      <svg
        id="expenditures-treemap"
        width={width}
        height={height}
        viewBox={`0, 0, ${width}, ${height}`}
      ></svg>
    </div>
  )
}
