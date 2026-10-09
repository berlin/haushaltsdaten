import { FC, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { TreemapHierarchyType } from '@lib/utils/createTreemapStructure'
import { getColorByMainTopic } from '@components/TreeMap/colors'
import { translateData } from '@lib/utils/translateData'
import { formatCurrency } from '@lib/utils/numberUtil'
import i18n from 'src/i18n'
import { topicDescriptions as deDescriptions } from '@data/descriptionData'
import { topicDescriptions as enDescriptions } from '@data/descriptionData.en'
import { topicDescriptions as trDescriptions } from '@data/descriptionData.tr'

export interface TopicType {
  topicDepth?: 1 | 2 | 3
  topicLabel?: string
}

export interface SunburstType {
  width?: number
  height?: number
  hierarchy: TreemapHierarchyType
  onChangeLevel?: (level: TopicType) => void
}

type SunburstNode = d3.HierarchyRectangularNode<TreemapHierarchyType>

const getDescriptionForLang = (lang: string): Record<string, string> => {
  if (lang === 'en') return enDescriptions as Record<string, string>
  if (lang === 'tr') return trDescriptions as Record<string, string>
  return deDescriptions as Record<string, string>
}

export const Sunburst: FC<SunburstType> = ({
  width = 800,
  height = 800,
  hierarchy,
  onChangeLevel = () => undefined,
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const descriptionsRef = useRef<Record<string, string>>({})

  useEffect(() => {
    const lang = i18n.language || 'de'
    descriptionsRef.current = getDescriptionForLang(lang)

    // Collapse wrapper nodes: a node with exactly 1 child that has the same name
    // is redundant (created by createTreeStructure for leaf nodes)
    const collapseWrappers = (
      node: TreemapHierarchyType
    ): TreemapHierarchyType => {
      if (
        node.children &&
        node.children.length === 1 &&
        node.children[0].name === node.name
      ) {
        return collapseWrappers(node.children[0])
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(collapseWrappers),
        }
      }
      return node
    }

    const collapsedHierarchy = collapseWrappers(hierarchy)
    const radius = width / 6

    const root = d3
      .hierarchy<TreemapHierarchyType>(collapsedHierarchy)
      .sum((d) => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0))

    // Partition y-axis = depth levels (0 to root.height + 1), NOT pixels
    d3.partition<TreemapHierarchyType>().size([2 * Math.PI, root.height + 1])(
      root
    )

    // Store current and target visual state on each node
    root.each((d) => {
      const node = d as SunburstNode
      ;(
        node as unknown as {
          current: { x0: number; x1: number; y0: number; y1: number }
        }
      ).current = {
        x0: node.x0,
        x1: node.x1,
        y0: node.y0,
        y1: node.y1,
      }
    })

    // Arc generator: y-values are depth levels, multiply by radius to get pixels
    const arc = d3
      .arc<{ x0: number; x1: number; y0: number; y1: number }>()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius((d) => d.y0 * radius)
      .outerRadius((d) => Math.max(d.y0 * radius, d.y1 * radius - 1))

    function getCurrent(node: SunburstNode) {
      return (
        node as unknown as {
          current: { x0: number; x1: number; y0: number; y1: number }
        }
      ).current
    }

    function getTarget(node: SunburstNode) {
      return (
        node as unknown as {
          target: { x0: number; x1: number; y0: number; y1: number }
        }
      ).target
    }

    function setTarget(
      node: SunburstNode,
      target: { x0: number; x1: number; y0: number; y1: number }
    ) {
      ;(
        node as unknown as {
          target: { x0: number; x1: number; y0: number; y1: number }
        }
      ).target = target
    }

    // Visibility: show rings at y between 1 and 3,
    // or a childless node at y=0 (zoomed to sole ring)
    function arcVisible(
      d: {
        y1: number
        y0: number
        x1: number
        x0: number
      },
      hasChildren?: boolean
    ): boolean {
      return (
        d.y1 <= 3 &&
        (hasChildren !== false ? d.y0 >= 1 : d.y0 >= 0) &&
        d.x1 > d.x0
      )
    }

    function labelVisible(
      d: {
        y1: number
        y0: number
        x1: number
        x0: number
      },
      hasChildren?: boolean
    ): boolean {
      return (
        d.y1 <= 3 &&
        (hasChildren !== false ? d.y0 >= 1 : d.y0 >= 0) &&
        (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03
      )
    }

    function labelTransform(d: {
      x0: number
      x1: number
      y0: number
      y1: number
    }): string {
      const x = ((d.x0 + d.x1) / 2) * (180 / Math.PI)
      const y = ((d.y0 + d.y1) / 2) * radius
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
    }

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    // viewBox uses width for both dimensions (square)
    svg.attr('viewBox', `0 0 ${width} ${width}`)

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${width / 2})`)

    const path = g
      .append('g')
      .selectAll('path')
      // Skip root node (like Observable: .slice(1))
      .data(root.descendants().slice(1))
      .join('path')
      .attr('fill', (d) => {
        let ancestor = d as SunburstNode
        while (ancestor.depth > 1) ancestor = ancestor.parent!
        return getColorByMainTopic(ancestor.data.originalName)
      })
      .attr('fill-opacity', (d) =>
        arcVisible(
          getCurrent(d as SunburstNode),
          !!(d as SunburstNode).children
        )
          ? (d as SunburstNode).children
            ? 0.85
            : 0.65
          : 0
      )
      .attr('d', (d) => arc(getCurrent(d as SunburstNode)) || '')
      .style('cursor', 'pointer')
      .on('click', (_, d) => clicked(d as SunburstNode))

    path
      .append('title')
      .text(
        (d) =>
          `${translateData(d.data.name)}\n${formatCurrency(d.value || 0)}\n\n${
            descriptionsRef.current[d.data.originalName] || ''
          }`
      )

    const label = g
      .append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .style('user-select', 'none')
      .selectAll('text')
      .data(root.descendants().slice(1))
      .join('text')
      .attr('dy', '0.35em')
      .attr('pointer-events', 'auto')
      .style('cursor', 'default')
      .attr(
        'fill-opacity',
        (d) =>
          +labelVisible(
            getCurrent(d as SunburstNode),
            !!(d as SunburstNode).children
          )
      )
      .attr('transform', (d) => labelTransform(getCurrent(d as SunburstNode)))
      .text((d) => {
        const name = translateData(d.data.name)
        return name.length > 10 ? name.substring(0, 8) + '…' : name
      })

    label.append('title').text((d) => translateData(d.data.name))

    const parent = g
      .append('circle')
      .datum(root)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('click', (_, d) => clicked(d as SunburstNode))

    const centerGroup = g.append('g').attr('pointer-events', 'none')

    const centerName = centerGroup
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('font-weight', 'bold')
      .attr('font-size', '14px')
      .text(translateData(root.data.name))

    const centerValue = centerGroup
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .attr('font-size', '12px')
      .attr('fill-opacity', 0.7)
      .text(`€ ${formatCurrency(root.value || 0)}`)

    function clicked(p: SunburstNode): void {
      parent.datum(p.parent || root)

      const depth = p === root ? p.depth - 1 : p.depth
      const topicLabel = p === root ? p.parent?.data.name : p.data.name

      onChangeLevel({
        topicDepth: depth as TopicType['topicDepth'],
        topicLabel,
      })

      // Compute target for every node (including invisible ones)
      root.each((d) => {
        const node = d as SunburstNode
        setTarget(node, {
          x0:
            Math.max(0, Math.min(1, (node.x0 - p.x0) / (p.x1 - p.x0))) *
            2 *
            Math.PI,
          x1:
            Math.max(0, Math.min(1, (node.x1 - p.x0) / (p.x1 - p.x0))) *
            2 *
            Math.PI,
          y0: Math.max(0, node.y0 - p.depth),
          y1: Math.max(0, node.y1 - p.depth),
        })
      })

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const t = g.transition().duration(750)

      path
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .transition(t)
        .tween('data', (d) => {
          const node = d as SunburstNode
          const i = d3.interpolate(getCurrent(node), getTarget(node))
          return (t) => {
            ;(node as unknown as { current: ReturnType<typeof i> }).current =
              i(t)
          }
        })
        .filter(function (d) {
          const node = d as SunburstNode
          return (
            !!(this as Element).getAttribute('fill-opacity') ||
            arcVisible(getTarget(node), !!node.children)
          )
        })
        .attr('fill-opacity', (d) => {
          const node = d as SunburstNode
          return arcVisible(getTarget(node), !!node.children)
            ? node.children
              ? 0.85
              : 0.65
            : 0
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .attrTween('d', (d) => () => arc(getCurrent(d as SunburstNode)) || '')

      label
        .filter(function (d) {
          const node = d as SunburstNode
          return (
            !!(this as Element).getAttribute('fill-opacity') ||
            labelVisible(getTarget(node), !!node.children)
          )
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .transition(t)
        .attr(
          'fill-opacity',
          (d) =>
            +labelVisible(
              getTarget(d as SunburstNode),
              !!(d as SunburstNode).children
            )
        )
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .attrTween(
          'transform',
          (d) => () => labelTransform(getCurrent(d as SunburstNode))
        )

      centerName.text(translateData(p.data.name))
      centerValue.text(`€ ${formatCurrency(p.value || 0)}`)
    }

    return () => {
      svg.selectAll('*').remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hierarchy, width, height, i18n.language])

  return <svg ref={svgRef} width={width} height={width} />
}
