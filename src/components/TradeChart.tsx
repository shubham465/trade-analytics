import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TradeSignal } from '../types';
import { generateChartData } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TradeChartProps {
  signals: TradeSignal[];
  title: string;
  selectedSymbol?: string | null;
}

const TradeChart: React.FC<TradeChartProps> = ({ signals, title, selectedSymbol }) => {
  const chartData = generateChartData(signals);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: `${title} - Price Levels${selectedSymbol ? ' (Individual Symbol View)' : ' (All Symbols)'}`,
        font: {
          size: 16,
          weight: 'bold' as const
        },
        padding: 20
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const dataIndex = context.dataIndex;
            const symbol = signals[dataIndex]?.symbol || '';
            return `${label}: ${value.toFixed(4)} ${symbol ? `(${symbol})` : ''}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: selectedSymbol ? 'Time' : 'Symbols / Time',
          font: {
            size: 12,
            weight: 'bold' as const
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price',
          font: {
            size: 12,
            weight: 'bold' as const
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    },
    elements: {
      point: {
        radius: selectedSymbol ? 6 : 4,
        hoverRadius: selectedSymbol ? 8 : 6
      },
      line: {
        borderWidth: selectedSymbol ? 3 : 2
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {selectedSymbol && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-900">Individual Symbol Analysis</h3>
              <p className="text-xs text-blue-700 mt-1">
                Detailed price movement and trading levels for {selectedSymbol}
              </p>
            </div>
            <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {signals.length} data point{signals.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}
      <div className="h-96">
        <Line data={chartData} options={options} />
      </div>
      {!selectedSymbol && signals.length > 1 && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-600">
            <span className="font-medium">Tip:</span> Click on any symbol in the table below to view individual symbol analysis in the chart.
          </p>
        </div>
      )}
    </div>
  );
};

export default TradeChart;