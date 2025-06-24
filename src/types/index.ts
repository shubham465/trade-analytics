export interface TradeSignal {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  entry: number;
  stopLoss: number;
  takeProfit: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
  timestamp: string;
  status: 'ACTIVE' | 'CLOSED' | 'PENDING';
  volume: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}

export type MarketType = 'indian' | 'forex';