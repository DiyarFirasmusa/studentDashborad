<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = vuetifyTheme.current.value.colors

const series = [
  {
    name: 'Subscribers',
    data: [200, 55, 400, 250],
  },
]

const props = defineProps<{
  course: number
}>()

const chartOptions = {
  chart: {
    type: 'area',
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  markers: {
    colors: 'transparent',
    strokeColors: 'transparent',
  },
  grid: {
    show: false,
  },
  colors: [currentTheme.success],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.5,
      opacityTo: 0.07,
      stops: [0, 80, 100],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  xaxis: {
    show: true,
    lines: {
      show: false,
    },
    labels: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    stroke: {
      width: 0,
    },
    show: false,
  },
  tooltip: {
    enabled: false,
  },
}
</script>

<template>
  <VCard>
    <VCardText class="pb-2">
      <h5 class="text-h5">
         جميع الدورات 
      </h5>
    </VCardText>

    <VueApexCharts
      :options="chartOptions"
      :series="series"
      :height="70"
    />

    <VCardText class="pt-0">
      <div class="d-flex align-center justify-space-between mt-3">
        <h4 class="text-h4 text-center text-success">
          {{ props.course }}
        </h4>
      </div>
    </VCardText>
  </VCard>
</template>
