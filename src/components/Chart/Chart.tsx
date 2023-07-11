import { FC, useEffect, useMemo, useRef } from 'react'

import { cities } from '@/cities'
import { generateBarChart } from './generateBarChart'
import { ChartDataItem } from '@/models'
import useResizeObserver from '@/hooks/useResizeObserver'

import styles from './Chart.module.scss'

type Props = {
  data: ChartDataItem[]
  chartCityId: string | null
  clearChartCityId: () => void
}

const Chart: FC<Props> = ({ data, chartCityId, clearChartCityId }) => {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const cityName = useMemo(() => cities.find(({ id }) => id === chartCityId)?.name || null, [chartCityId])
  const { width, height } = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (svgRef.current) {
      generateBarChart(svgRef.current, data)
    }
  }, [data, svgRef, width, height])

  return (
    <div ref={wrapperRef}>
      <header className={styles.legend}>
        <h3>Analytics</h3>
        {cityName && (
          <div className={styles.city}>
            <span>{cityName}</span>
            <button onClick={clearChartCityId}>&#10006;</button>
          </div>
        )}
        <span>Temperature (°C)</span>
      </header>
      {!!data.length ? (
        <svg className={styles.chart} ref={svgRef} />
      ) : (
        <span className={styles.message}>Data not found</span>
      )}
    </div>
  )
}

export default Chart
