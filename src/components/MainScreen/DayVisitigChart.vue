<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const currentTheme = vuetifyTheme.current.value.colors
const props = defineProps<{
  todayVisiting: Array
}>()
const series = [
  {
    data: [400, 200, 650, 500],
  },
]

const chartOptions = {
  chart: {
    type: 'area',
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
      shadeIntensity: 0.8,
      opacityFrom: 0.6,
      opacityTo: 0.1,
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
  responsive: [
    {
      breakpoint: 1387,
      options: {
        chart: {
          height: 80,
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 120,
        },
      },
    },
  ],
}

const totalVisiting = computed(() => {
  return props.todayVisiting.length;
})
</script>

<template>
  <VCard>
    <VCardText>
      <h5 class="text-h5 mb-2">
        عدد الزيارات اليومية
      </h5>
      <h4 class="text-h4 text-success ">
        {{ totalVisiting }}
      </h4>
    </VCardText>

    <VueApexCharts :options="chartOptions" :series="series" :height="132" />
  </VCard>
</template>
