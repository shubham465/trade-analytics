import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import TabNavigation from './TabNavigation';
import TradeSignalsTable from './TradeSignalsTable';
import TradeChart from './TradeChart';
import { MarketType, TradeSignal } from '../types';
import { indianMarketData, forexData } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MarketType>('indian');
  const [signals, setSignals] = useState<TradeSignal[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  useEffect(() => {
    const currentData = activeTab === 'indian' ? indianMarketData : forexData;
    setSignals(currentData);
    // Reset selected symbol when switching tabs
    setSelectedSymbol(null);
  }, [activeTab]);

  const calculateStats = (signals: TradeSignal[]) => {
    const totalPnL = signals.reduce((sum, signal) => sum + signal.pnl, 0);
    const profitable = signals.filter(signal => signal.pnl > 0).length;
    const totalTrades = signals.length;
    const winRate = totalTrades > 0 ? (profitable / totalTrades) * 100 : 0;
    
    return {
      totalPnL,
      profitable,
      totalTrades,
      winRate
    };
  };

  const stats = calculateStats(signals);
  const isForex = activeTab === 'forex';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: isForex ? 'USD' : 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSymbolClick = (symbol: string) => {
    setSelectedSymbol(symbol === selectedSymbol ? null : symbol);
  };

  // Get chart data based on selected symbol
  const getChartSignals = () => {
    if (selectedSymbol) {
      return signals.filter(signal => signal.symbol === selectedSymbol);
    }
    return signals;
  };

  const getChartTitle = () => {
    const baseTitle = activeTab === 'indian' ? 'Indian Market' : 'Forex Market';
    if (selectedSymbol) {
      return `${baseTitle} - ${selectedSymbol}`;
    }
    return baseTitle;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Trading Dashboard</h1>
                <p className="text-sm text-gray-500">Real-time market signals and analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total P&L</p>
                <p className={`text-2xl font-bold ${stats.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(stats.totalPnL)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stats.totalPnL >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <DollarSign size={24} className={stats.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Win Rate</p>
                <p className="text-2xl font-bold text-blue-600">{stats.winRate.toFixed(1)}%</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <TrendingUp size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Profitable Trades</p>
                <p className="text-2xl font-bold text-green-600">{stats.profitable}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Trades</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTrades}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <BarChart3 size={24} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <TradeChart 
            signals={getChartSignals()} 
            title={getChartTitle()}
            selectedSymbol={selectedSymbol}
          />
        </div>

        {/* Signals Table */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === 'indian' ? 'Indian Market' : 'Forex'} Trade Signals
            </h2>
            <p className="text-sm text-gray-600">
              Active trading signals with entry, stop loss, and take profit levels
              {selectedSymbol && (
                <span className="ml-2 text-blue-600 font-medium">
                  • Showing chart for: {selectedSymbol}
                </span>
              )}
            </p>
          </div>
          <TradeSignalsTable 
            signals={signals} 
            isForex={isForex} 
            onSymbolClick={handleSymbolClick}
            selectedSymbol={selectedSymbol}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;