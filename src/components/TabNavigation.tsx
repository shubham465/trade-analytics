import React from 'react';
import { TrendingUp, Globe } from 'lucide-react';
import { MarketType } from '../types';

interface TabNavigationProps {
  activeTab: MarketType;
  onTabChange: (tab: MarketType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'indian' as MarketType, label: 'Indian Market', icon: TrendingUp },
    { id: 'forex' as MarketType, label: 'Forex', icon: Globe }
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 rounded-md font-medium transition-all duration-200
              ${isActive 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <Icon size={18} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;