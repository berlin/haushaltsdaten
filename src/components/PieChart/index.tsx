// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect } from 'react'
import * as d3 from 'd3'

// NOTE: This code was copied as-is from pages/PieChart.tsx that is deleted in this commit.
// The file looks a bit unfinished and shows some lint and type errors.
// I'm leaving it in here as-is, so that it doesn't get lost and can be worked on further.

const createPieChart = async () => {
  const svg = d3.select('svg'),
    width = svg.attr('width'),
    height = svg.attr('height'),
    radius = Math.min(width, height) / 2

  const g = svg
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  const color = d3.scaleOrdinal(['gray', 'green', 'brown'])

  const pie = d3.pie().value(function (d) {
    return d.percent
  })

  const path = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(0)

  const label = d3
    .arc()
    .outerRadius(radius)
    .innerRadius(radius - 80)

  const data = await d3.csv('../../data/piedata.csv')

  const arc = g
    .selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')

  arc
    .append('path')
    .attr('d', path)
    .attr('fill', function (d) {
      return color(d.data.states)
    })

  arc
    .append('text')
    .attr('transform', function (d) {
      return `translate(${label.centroid(d)})`
    })
    .text(function (d) {
      return d.data.states
    })

  svg
    .append('g')
    .attr('transform', `translate(${width / 2 - 120},20)`)
    .append('text')
    .text('Top population states in the US')
    .attr('class', 'title')
}

export default function App() {
  useEffect(() => {
    createPieChart()
  }, [])

  return (
    <div className="App">
      <style>{`
        .arc text {
          font: 12px arial;
          text-anchor: middle;
        }

        .arc path {
          stroke: #fff;
        }

        .title {
          fill: green;
          font-weight: italic;
        }
      `}</style>
      <svg width="600" height="400"></svg>
    </div>
  )
}
