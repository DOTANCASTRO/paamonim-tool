'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface YearData {
  year: number;
  contributions: number;
  interest: number;
  total: number;
}

export default function CompoundChart({ data }: { data: YearData[] }) {
  const labels = data.map((d) => `שנה ${d.year}`);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'הפקדות',
        data: data.map((d) => Math.round(d.contributions)),
        backgroundColor: '#0d9488',
        borderRadius: 4,
      },
      {
        label: 'ריבית',
        data: data.map((d) => Math.round(d.interest)),
        backgroundColor: '#f59e0b',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        rtl: true,
        labels: {
          font: { family: 'Assistant', size: 12 },
          color: '#1e293b',
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number | null } }) =>
            `${ctx.dataset.label}: ${new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(ctx.parsed.y ?? 0)}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: { family: 'Assistant', size: 11 },
          color: '#64748b',
          maxRotation: 45,
        },
        grid: { display: false },
      },
      y: {
        stacked: true,
        ticks: {
          font: { family: 'Assistant', size: 11 },
          color: '#64748b',
          callback: (val: number | string) =>
            new Intl.NumberFormat('he-IL', { notation: 'compact', compactDisplay: 'short' }).format(Number(val)) + ' ₪',
        },
        grid: { color: '#f1f5f9' },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
