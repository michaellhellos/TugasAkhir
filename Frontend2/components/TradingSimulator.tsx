import React, { useState } from 'react';
import type { CryptoCoin} from '../types';
import {
  LineChart,
  Line,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  
} from 'recharts';
/* ===================== PROPS ===================== */

interface TradingSimulatorProps {
  marketData: CryptoCoin[];
  initialCoin: CryptoCoin | null;
}

/* ===================== HELPER ===================== */

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 1 ? 8 : 2,
  }).format(value);

/* ===================== TOOLTIP ===================== */
/* Pakai any → aman dari error typing recharts */

const CustomTooltip: React.FC = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 p-2 rounded-md border border-gray-600">
        <p className="text-white font-semibold">
          {formatCurrency(payload[0].value ?? 0)}
        </p>
      </div>
    );
  }
  return null;
};

/* ===================== COMPONENT ===================== */

const TradingSimulator: React.FC<TradingSimulatorProps> = ({
  marketData,
  initialCoin,
}) => {
  const [selectedCoin] = useState<CryptoCoin | null>(
    initialCoin ?? marketData[0] ?? null
  );

  if (!selectedCoin) {
    return (
      <p className="text-gray-400">
        Data koin tidak tersedia.
      </p>
    );
  }

  const chartData = selectedCoin.sparkline.map((price, index) => ({
    index,
    price,
  }));

  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={
                selectedCoin.change24h >= 0
                  ? '#4ade80'
                  : '#f87171'
              }
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TradingSimulator;
