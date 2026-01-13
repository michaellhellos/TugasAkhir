import React, { useState } from 'react';
import type { CryptoCoin, Portfolio } from '../types';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { UpTrendIcon, DownTrendIcon, StarIcon } from './Icons';

interface DashboardProps {
  marketData: CryptoCoin[];
  portfolio: Portfolio;
  onTradeClick: (coin: CryptoCoin) => void;
  watchlist: string[];
  onToggleWatchlist: (coinId: string) => void;
}

const formatCurrency = (value: number) => {
  if (value < 0.01 && value > 0) {
    return `$${value.toFixed(8)}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg ${className ?? ''}`}>
    {children}
  </div>
);

const SparklineChart: React.FC<{ data: number[]; color: string }> = ({
  data,
  color,
}) => {
  const chartData = data.map((price, index) => ({
    name: index,
    value: price,
  }));

  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Dashboard: React.FC<DashboardProps> = ({
  marketData,
  portfolio,
  onTradeClick,
  watchlist,
  onToggleWatchlist,
}) => {
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  const totalHoldingsValue = portfolio.holdings.reduce((sum, holding) => {
    const coin = marketData.find((c) => c.id === holding.id);
    return sum + (coin ? coin.price * holding.amount : 0);
  }, 0);

  const totalPortfolioValue = portfolio.cash + totalHoldingsValue;
  const initialValue = portfolio.initialValue || 10000;
  const profitLoss = totalPortfolioValue - initialValue;
  const profitLossPercent = (profitLoss / initialValue) * 100;

  const displayedCoins = showWatchlistOnly
    ? marketData.filter((c) => watchlist.includes(c.id))
    : marketData;

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card>
        <h2 className="text-lg font-medium text-gray-400">
          Total Aset Virtual
        </h2>

        <div className="flex items-end gap-3">
          <p className="text-4xl font-bold text-white mt-2">
            {formatCurrency(totalPortfolioValue)}
          </p>

          <div
            className={`mb-1.5 px-2 py-0.5 rounded text-sm font-bold flex items-center ${
              profitLoss >= 0
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {profitLoss >= 0 ? '+' : ''}
            {formatCurrency(profitLoss)} ({profitLossPercent.toFixed(2)}%)
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm border-t border-gray-700 pt-3">
          <span className="text-gray-400">Uang Virtual (Cash)</span>
          <span className="font-semibold">
            {formatCurrency(portfolio.cash)}
          </span>
        </div>

        <div className="mt-1 flex justify-between text-sm">
          <span className="text-gray-400">Nilai Aset Kripto</span>
          <span className="font-semibold">
            {formatCurrency(totalHoldingsValue)}
          </span>
        </div>
      </Card>

      {/* Portfolio Assets */}
      {portfolio.holdings.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-white">
            Portofolio Kamu
          </h2>

          <div className="space-y-3">
            {portfolio.holdings.map((holding) => {
              const coin = marketData.find((c) => c.id === holding.id);
              if (!coin) return null;

              const value = holding.amount * coin.price;

              return (
                <div
                  key={coin.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center">
                    <img
                      src={coin.logo}
                      alt={coin.name}
                      className="w-10 h-10 mr-4"
                    />
                    <div>
                      <p className="font-semibold text-lg">{coin.name}</p>
                      <p className="text-gray-400 text-sm">
                        {holding.amount.toFixed(4)} {coin.symbol}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {formatCurrency(value)}
                    </p>
                    <p
                      className={`text-sm ${
                        coin.change24h >= 0
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {formatCurrency(coin.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Market List */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Pasar Kripto 📈
          </h2>

          <button
            onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
            className={`text-sm px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-2 ${
              showWatchlistOnly
                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                : 'bg-gray-700 text-gray-300 border-gray-600'
            }`}
          >
            <StarIcon filled={showWatchlistOnly} />
            {showWatchlistOnly ? 'Watchlist' : 'Semua Aset'}
          </button>
        </div>

        <div className="space-y-2">
          {displayedCoins.length === 0 && showWatchlistOnly && (
            <div className="text-center py-8 text-gray-500">
              Belum ada aset di Watchlist kamu ⭐
            </div>
          )}

          {displayedCoins.map((coin) => {
            const isWatchlisted = watchlist.includes(coin.id);

            return (
              <div
                key={coin.id}
                className="grid grid-cols-12 items-center p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(coin.id);
                    }}
                  >
                    <StarIcon filled={isWatchlisted} />
                  </button>
                </div>

                <div
                  className="col-span-5 md:col-span-4 flex items-center cursor-pointer"
                  onClick={() => onTradeClick(coin)}
                >
                  <img
                    src={coin.logo}
                    alt={coin.name}
                    className="w-8 h-8 mr-3"
                  />
                  <div>
                    <p className="font-semibold">{coin.symbol}</p>
                    <p className="text-gray-400 text-xs hidden md:block">
                      {coin.name}
                    </p>
                  </div>
                </div>

                <div
                  className="col-span-3 hidden md:block"
                  onClick={() => onTradeClick(coin)}
                >
                  <SparklineChart
                    data={coin.sparkline}
                    color={
                      coin.change24h >= 0 ? '#4ade80' : '#f87171'
                    }
                  />
                </div>

                <div
                  className="col-span-3 md:col-span-2 text-right"
                  onClick={() => onTradeClick(coin)}
                >
                  <p className="font-semibold">
                    {formatCurrency(coin.price)}
                  </p>
                </div>

                <div
                  className="col-span-3 md:col-span-2 text-right flex justify-end items-center"
                  onClick={() => onTradeClick(coin)}
                >
                  <div
                    className={`flex items-center justify-center w-20 py-1 rounded-md text-sm font-semibold ${
                      coin.change24h >= 0
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {coin.change24h >= 0 ? (
                      <UpTrendIcon />
                    ) : (
                      <DownTrendIcon />
                    )}
                    {coin.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
