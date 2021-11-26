<template>
  <canvas ref="myChart" />
</template>

<script>
import Chart from 'chart.js/auto';
export default {
  name: 'CovidChart',
  props: {
    labels: { type: Array, required: true },
    data: { type: Array, required: true },
    dataLabel: { type: String, required: true },
    from: { type: String, default: null },
    to: { type: String, default: null },
  },
  watch: {
  // Filtering data in order to reduce API request
    from: {
      immediate: true,
      handler(val) {
        const index = this.getLabelDateIndex(val);
        this.startIndex = index === -1 ? 0 : index;
        this.updateCharts();
      },
    },
    to: {
      immediate: true,
      handler(val) {
        const index = this.getLabelDateIndex(val);
        this.endIndex = index === -1 ? undefined : index + 1;//a
        this.updateCharts();
      },
    },
    dataLabel(newLabel) {
      this.chart.data.datasets[0].label = newLabel;
      this.chart.update();
    },
    data() {
      this.updateCharts();
    },
    labels() {
      this.updateCharts();
    },
  },
  mounted() {
    const data = {
      labels: this.labels,
      datasets: [
        {
          label: this.dataLabel,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.data,
        },
      ],
    };
    const config = {
      type: 'line',
      data: data,
      options: {},
    };
    this.chart = new Chart(this.$refs.myChart, config);
  },
  methods: {
    updateCharts: function () {
      if (!this.chart) return false;
      this.chart.data.labels = this.labels.slice(
        this.startIndex,
        this.endIndex
      );
      this.chart.data.datasets[0].data = this.data.slice(
        this.startIndex,
        this.endIndex
      );
      this.chart.update();
      return true;
    },
    /** @param {String | Date} date */
    getLabelDateIndex: function (date) {
      if (typeof date === 'string') date = new Date(date);
      else if (!(date instanceof Date)) throw new TypeError('Wrong argument');
      return this.labels.indexOf(date.toLocaleDateString());
    },
  },
};
</script>

<style></style>