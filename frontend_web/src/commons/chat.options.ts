import { ChartOptions } from 'chart.js';

export const ChartBarOptions: ChartOptions<'bar'> = {
  scales: {
    x: {
      grid: {
        color: 'transparent',
      },
    },
    y: {
      grid: {
        color: 'transparent',
      },
      ticks: {
        padding: 0,
        font: { weight: '600' },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  animation: {
    onProgress: function (chart) {
      const ctx = this.ctx;
      ctx.fillStyle = '#666';
      ctx.textBaseline = 'middle';

      const chartinst = this;
      this.data.datasets.forEach(function (dataset, i) {
        if (chartinst.isDatasetVisible(i)) {
          var meta = chartinst.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            var data = dataset.data[index];
            ctx.fillText('' + data, bar.x + 10, bar.y);
          });
        }
      });
    },
  },
};

export const ChartBackgroundColor = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)',
];

export const ChartBorderColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)',
];
