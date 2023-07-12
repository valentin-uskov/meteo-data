import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3'
import { ChartDataItem } from '@/models'

const getTickValues = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step)

export const generateBarChart = (SVGElement: SVGElement, data: ChartDataItem[]) => {
  select(SVGElement).selectAll('*').remove()

  const svg = select(SVGElement).attr('overflow', 'visible')
  const bounds = svg.node()?.getBoundingClientRect() || { width: 400, height: 300 }
  const margin = { top: 20, right: 0, bottom: 20, left: 24 }
  const width = bounds.width - margin.left - margin.right
  const height = bounds.height - margin.top - margin.bottom

  const xScale = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.5)

  const minTemperature = Math.min(...data.map(({ value }) => value))
  const maxTemperature = Math.max(...data.map(({ value }) => value))
  const yAxisStart = minTemperature > 0 ? 0 : Math.floor(minTemperature / 5) * 5 - 5
  const yAxisStop = Math.ceil(maxTemperature / 5) * 5 + 5
  const yAxisStep = 5

  const yScale = scaleLinear().domain([yAxisStart, yAxisStop]).range([height, 0])
  const yTickValues = getTickValues(yAxisStart, yAxisStop, yAxisStep)
  const xAxis = axisBottom(xScale).ticks(data.length).tickSize(0).tickPadding(10)
  const yAxis = axisLeft(yScale).tickValues(yTickValues).tickSize(0).tickSizeInner(-width).tickPadding(10)

  svg
    .append('g')
    .call(xAxis)
    .attr('transform', `translate(${margin.left}, ${height + margin.bottom})`)
  svg.append('g').call(yAxis).attr('transform', `translate(${margin.left}, ${margin.bottom})`)

  const defs = svg.append('defs')

  const linearGradient = defs
    .append('linearGradient')
    .attr('id', 'linearGradient')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', 1)

  linearGradient.append('stop').attr('offset', '0%').attr('stop-color', '#B3FC4F')
  linearGradient.append('stop').attr('offset', '100%').attr('stop-color', '#173102')

  const bars = svg.selectAll('.bar')
  const rx = 8
  const ry = 8

  bars
    .data(data)
    .join('path')
    .attr('x', ({ label }) => xScale(label) || 0)
    .attr('y', ({ value }) => yScale(value))
    .attr('width', xScale.bandwidth())
    .attr('height', ({ value }) => height - yScale(value))
    .attr('transform', `translate(${margin.left}, ${margin.bottom})`)
    .attr('fill', 'url(#linearGradient)')
    .attr(
      'd',
      (item) => `
        M${xScale(item.label)},${yScale(item.value) + ry}
        a${rx},${ry} 0 0 1 ${rx},${-ry}
        h${xScale.bandwidth() - 2 * rx}
        a${rx},${ry} 0 0 1 ${rx},${ry}
        v${height - yScale(item.value) - ry}
        h${-xScale.bandwidth()}Z
      `,
    )
}
