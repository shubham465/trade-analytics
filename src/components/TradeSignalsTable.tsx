import React from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { TradeSignal } from '../types';

interface TradeSignalsTableProps {
  signals: TradeSignal[];
  isForex?: boolean;
  onSymbolClick?: (symbol: string) => void;
  selectedSymbol?: string | null;
}

const TradeSignalsTable: React.FC<TradeSignalsTableProps> = ({ 
  signals, 
  isForex = false, 
  onSymbolClick,
  selectedSymbol 
}) => {
  const formatPrice = (price: number) => {
    if (isForex) {
      return price.toFixed(4);
    }
    return price.toFixed(2);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: isForex ? 'USD' : 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Clock size={16} className="text-blue-500" />;
      case 'CLOSED':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'PENDING':
        return <AlertCircle size={16} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-blue-100 text-blue-800';
      case 'CLOSED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSymbolClick = (symbol: string) => {
    if (onSymbolClick) {
      onSymbolClick(symbol);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Entry
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Current
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                SL
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                TP
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                P&L
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {signals.map((signal) => {
              const isSelected = selectedSymbol === signal.symbol;
              return (
                <tr 
                  key={signal.id} 
                  className={`transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSymbolClick(signal.symbol)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`font-medium transition-colors duration-200 ${
                        isSelected ? 'text-blue-700' : 'text-gray-900'
                      }`}>
                        {signal.symbol}
                      </div>
                      {isSelected && (
                        <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {signal.type === 'BUY' ? (
                        <TrendingUp size={16} className="text-green-500" />
                      ) : (
                        <TrendingDown size={16} className="text-red-500" />
                      )}
                      <span className={`font-medium ${signal.type === 'BUY' ? 'text-green-600' : 'text-red-600'}`}>
                        {signal.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-mono">
                    {formatPrice(signal.entry)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-mono">
                    {formatPrice(signal.currentPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600 font-mono">
                    {formatPrice(signal.stopLoss)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600 font-mono">
                    {formatPrice(signal.takeProfit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className={`font-medium ${signal.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(signal.pnl)}
                      </span>
                      <span className={`text-sm ${signal.pnlPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {signal.pnlPercentage >= 0 ? '+' : ''}{signal.pnlPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(signal.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(signal.status)}`}>
                        {signal.status}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedSymbol && (
        <div className="bg-blue-50 border-t border-blue-200 px-6 py-3">
          <p className="text-sm text-blue-700">
            <span className="font-medium">Chart View:</span> Showing detailed analysis for {selectedSymbol}. 
            Click on another symbol to switch or click the same symbol to show all symbols.
          </p>
        </div>
      )}
    </div>
  );
};

export default TradeSignalsTable;