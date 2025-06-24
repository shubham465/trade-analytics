import { TradeSignal } from '../types';

export const indianMarketData: TradeSignal[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    type: 'BUY',
    entry: 2850.00,
    stopLoss: 2780.00,
    takeProfit: 2950.00,
    currentPrice: 2895.50,
    pnl: 4550.00,
    pnlPercentage: 1.60,
    timestamp: '2025-01-27T09:15:00Z',
    status: 'ACTIVE',
    volume: 100
  },
  {
    id: '2',
    symbol: 'TATAMOTORS',
    type: 'SELL',
    entry: 485.20,
    stopLoss: 495.00,
    takeProfit: 465.00,
    currentPrice: 478.30,
    pnl: 690.00,
    pnlPercentage: 1.42,
    timestamp: '2025-01-27T10:30:00Z',
    status: 'ACTIVE',
    volume: 100
  },
  {
    id: '3',
    symbol: 'INFY',
    type: 'BUY',
    entry: 1845.00,
    stopLoss: 1800.00,
    takeProfit: 1920.00,
    currentPrice: 1832.50,
    pnl: -1250.00,
    pnlPercentage: -0.68,
    timestamp: '2025-01-27T11:45:00Z',
    status: 'ACTIVE',
    volume: 100
  },
  {
    id: '4',
    symbol: 'HDFCBANK',
    type: 'BUY',
    entry: 1620.00,
    stopLoss: 1580.00,
    takeProfit: 1680.00,
    currentPrice: 1655.80,
    pnl: 3580.00,
    pnlPercentage: 2.21,
    timestamp: '2025-01-27T12:00:00Z',
    status: 'ACTIVE',
    volume: 100
  },
  {
    id: '5',
    symbol: 'ICICIBANK',
    type: 'SELL',
    entry: 1285.50,
    stopLoss: 1310.00,
    takeProfit: 1240.00,
    currentPrice: 1255.20,
    pnl: 3030.00,
    pnlPercentage: 2.36,
    timestamp: '2025-01-27T13:15:00Z',
    status: 'ACTIVE',
    volume: 100
  }
];

export const forexData: TradeSignal[] = [
  {
    id: '6',
    symbol: 'EUR/USD',
    type: 'BUY',
    entry: 1.0825,
    stopLoss: 1.0780,
    takeProfit: 1.0890,
    currentPrice: 1.0845,
    pnl: 200.00,
    pnlPercentage: 0.18,
    timestamp: '2025-01-27T14:00:00Z',
    status: 'ACTIVE',
    volume: 100000
  },
  {
    id: '7',
    symbol: 'GBP/USD',
    type: 'SELL',
    entry: 1.2445,
    stopLoss: 1.2485,
    takeProfit: 1.2380,
    currentPrice: 1.2420,
    pnl: 250.00,
    pnlPercentage: 0.20,
    timestamp: '2025-01-27T15:30:00Z',
    status: 'ACTIVE',
    volume: 100000
  },
  {
    id: '8',
    symbol: 'USD/JPY',
    type: 'BUY',
    entry: 153.25,
    stopLoss: 152.50,
    takeProfit: 154.80,
    currentPrice: 152.95,
    pnl: -300.00,
    pnlPercentage: -0.20,
    timestamp: '2025-01-27T16:15:00Z',
    status: 'ACTIVE',
    volume: 100000
  },
  {
    id: '9',
    symbol: 'AUD/USD',
    type: 'BUY',
    entry: 0.6285,
    stopLoss: 0.6245,
    takeProfit: 0.6350,
    currentPrice: 0.6315,
    pnl: 300.00,
    pnlPercentage: 0.48,
    timestamp: '2025-01-27T17:00:00Z',
    status: 'ACTIVE',
    volume: 100000
  },
  {
    id: '10',
    symbol: 'USD/CAD',
    type: 'SELL',
    entry: 1.4125,
    stopLoss: 1.4165,
    takeProfit: 1.4065,
    currentPrice: 1.4095,
    pnl: 300.00,
    pnlPercentage: 0.21,
    timestamp: '2025-01-27T18:30:00Z',
    status: 'ACTIVE',
    volume: 100000
  }
];

export const generateChartData = (signals: TradeSignal[]) => {
  const labels = signals.map(signal => {
    const date = new Date(signal.timestamp);
    const timeLabel = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    // If showing single symbol, just show time, otherwise show symbol + time
    return signals.length === 1 ? timeLabel : `${signal.symbol} (${timeLabel})`;
  });

  return {
    labels,
    datasets: [
      {
        label: 'Entry Price',
        data: signals.map(signal => signal.entry),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Current Price',
        data: signals.map(signal => signal.currentPrice),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: false,
        tension: 0.1
      },
      {
        label: 'Stop Loss',
        data: signals.map(signal => signal.stopLoss),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: false,
        tension: 0.1,
        borderDash: [5, 5]
      },
      {
        label: 'Take Profit',
        data: signals.map(signal => signal.takeProfit),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: false,
        tension: 0.1,
        borderDash: [5, 5]
      }
    ]
  };
};