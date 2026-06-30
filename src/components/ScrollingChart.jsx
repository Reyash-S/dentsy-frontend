import { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'

const N = 60, W = 22, SPEED = 1, PERIOD = 20, FRAME_MS = 1000 / 30

const DATA1 = Array.from({ length: N }, (_, i) =>
  50 + 28 * Math.sin(i * 2 * Math.PI / PERIOD) +
       12 * Math.sin(i * 2 * Math.PI / PERIOD * 2.3 + 1))

const DATA2 = Array.from({ length: N }, (_, i) =>
  30 + 16 * Math.sin(i * 2 * Math.PI / PERIOD + 1.4) +
        7 * Math.sin(i * 2 * Math.PI / PERIOD * 2.1 + 0.6))

function lerp(a, b, t) { return a + (b - a) * t }

function makeSlice(off) {
  return [
    {
      name: 'Inbound calls',
      data: Array.from({ length: W }, (_, i) => {
        const fi = (off + i) % N, lo = Math.floor(fi) % N, hi = (lo + 1) % N
        return { x: i, y: lerp(DATA1[lo], DATA1[hi], fi % 1) }
      }),
    },
    {
      name: 'Bookings',
      data: Array.from({ length: W }, (_, i) => {
        const fi = (off + i) % N, lo = Math.floor(fi) % N, hi = (lo + 1) % N
        return { x: i, y: lerp(DATA2[lo], DATA2[hi], fi % 1) }
      }),
    },
  ]
}

export default function ScrollingChart({
  height = 160,
  sparkline = false,
  showLegend = false,
  fillContainer = false,
  stepInterval = null,
}) {
  const containerRef = useRef(null)
  const chartRef     = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const h = fillContainer
      ? (el.parentElement?.offsetHeight || window.innerHeight)
      : height

    const chart = new ApexCharts(el, {
      chart: {
        type: 'area',
        height: h,
        background: 'transparent',
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: stepInterval ? { enabled: true, speed: stepInterval * 0.8, animateGradually: { enabled: false } } : { enabled: false },
        sparkline: { enabled: sparkline },
      },
      ...(showLegend ? { subtitle: {
        text: 'Live Updates: ON',
        align: 'right',
        style: { fontSize: '11px', fontFamily: 'Figtree, sans-serif', color: 'rgba(0,0,0,0.4)' },
      }} : {}),
      colors: ['#8533f9', '#00adab'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: sparkline ? 0.35 : 0.25,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
      stroke: { curve: 'smooth', width: sparkline ? [2, 1.5] : [1.5, 1] },
      dataLabels: { enabled: false },
      series: makeSlice(0),
      xaxis: {
        type: 'numeric', min: 0, max: W - 1, tickAmount: 10,
        labels: {
          show: showLegend,
          style: { colors: '#888888', fontSize: '10px', fontFamily: 'Figtree, sans-serif' },
          formatter: v => ['MON','TUE','WED','THU','FRI','SAT','SUN'][Math.round(v) % 7],
        },
        axisBorder: { show: true, color: 'rgba(0,0,0,0.1)' },
        axisTicks: { show: true, color: '#696969', height: 4 }, tooltip: { enabled: false },
      },
      yaxis: {
        min: 0, max: 100,
        floating: showLegend,
        labels: showLegend
          ? {
              show: true,
              offsetX: 20,
              style: { colors: 'rgba(0,0,0,0.25)', fontSize: '10px', fontFamily: 'Figtree, sans-serif' },
              formatter: v => Math.round(v),
            }
          : { show: false },
      },
      grid: showLegend
        ? {
            borderColor: 'rgba(0,0,0,0.06)', strokeDashArray: 4,
            xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } },
            padding: { top: 0, right: 0, bottom: 0, left: 40 },
          }
        : { show: false },
      tooltip: {
        enabled: showLegend,
        theme: 'light',
        style: { fontSize: '11px', fontFamily: 'Figtree, sans-serif' },
      },
      legend: showLegend
        ? {
            show: true, position: 'top', horizontalAlign: 'left',
            fontSize: '11px', fontFamily: 'Figtree, sans-serif',
            labels: { colors: 'rgba(0,0,0,0.4)' },
            markers: { shape: 'circle', size: 5 },
            itemMargin: { horizontal: 10 },
          }
        : { show: false },
    })

    chartRef.current = chart
    chart.render()

    let offset = 0
    let paused = false

    let cleanup
    if (stepInterval) {
      const id = setInterval(() => {
        if (paused) return
        offset = (offset + 1) % N
        chart.updateSeries(makeSlice(offset), false)
      }, stepInterval)
      cleanup = () => clearInterval(id)
    } else {
      let lastT = null, accum = 0, rafId
      function tick(t) {
        rafId = requestAnimationFrame(tick)
        if (paused) { lastT = null; return }
        if (lastT === null) { lastT = t; return }
        accum += t - lastT
        lastT = t
        if (accum < FRAME_MS) return
        accum -= FRAME_MS
        offset = (offset + SPEED / 30) % N
        chart.updateSeries(makeSlice(offset), false)
      }
      rafId = requestAnimationFrame(tick)
      cleanup = () => cancelAnimationFrame(rafId)
    }

    const onEnter = () => { paused = true }
    const onLeave = () => { paused = false }
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      cleanup()
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      chart.destroy()
      chartRef.current = null
    }
  }, [height, sparkline, showLegend, fillContainer, stepInterval])

  // Keep background chart sized to its parent
  useEffect(() => {
    if (!fillContainer || !containerRef.current) return
    const parent = containerRef.current.parentElement
    if (!parent) return

    const ro = new ResizeObserver(() => {
      chartRef.current?.updateOptions({ chart: { height: parent.offsetHeight } })
    })
    ro.observe(parent)
    return () => ro.disconnect()
  }, [fillContainer])

  return <div ref={containerRef} />
}
