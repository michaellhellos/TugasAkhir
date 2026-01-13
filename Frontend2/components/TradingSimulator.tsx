import React, { useState, useEffect, useRef } from 'react';
import type { CryptoCoin, Portfolio, Transaction } from '../types';
import {
  LineChart,
  Line,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts';
import {
  PencilIcon,
  SquareIcon,
  TrashIcon,
  CursorArrowIcon,
} from './Icons';

/* ===================== TYPES ===================== */

interface TradingSimulatorProps {
  marketData: CryptoCoin[];
  portfolio: Portfolio;
  onTrade: (
    coinId: string,
    amountUSD: number,
    tradeType: 'buy' | 'sell'
  ) => void;
  initialCoin: CryptoCoin | null;
  transactions: Transaction[];
}

type Tool = 'cursor' | 'line' | 'rect';

type DrawingShape =
  | {
      id: string;
      type: 'line';
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
    }
  | {
      id: string;
      type: 'rect';
      x: number;
      y: number;
      w: number;
      h: number;
      color: string;
    };

/* ===================== HELPERS ===================== */

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 1 ? 8 : 2,
  }).format(value);

/* ===================== TOOLTIP ===================== */

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
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
  portfolio,
  onTrade,
  initialCoin,
  transactions,
}) => {
  const [selectedCoin, setSelectedCoin] = useState<CryptoCoin | null>(
    initialCoin ?? marketData[0]
  );
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amountUSD, setAmountUSD] = useState('100');
  const [amountCrypto, setAmountCrypto] = useState('');
  const [activeTab, setActiveTab] = useState<'trade' | 'history'>('trade');

  /* Drawing */
  const [tool, setTool] = useState<Tool>('cursor');
  const [drawings, setDrawings] = useState<DrawingShape[]>([]);
  const [currentDrawing, setCurrentDrawing] =
    useState<DrawingShape | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ===================== EFFECTS ===================== */

  useEffect(() => {
    if (!initialCoin) return;
    setSelectedCoin(initialCoin);
    setDrawings([]);
  }, [initialCoin?.id]);

  useEffect(() => {
    if (!selectedCoin) return;
    const usd = parseFloat(amountUSD);
    setAmountCrypto(
      !isNaN(usd) && usd > 0
        ? (usd / selectedCoin.price).toFixed(8)
        : ''
    );
  }, [amountUSD, selectedCoin?.price]);

  /* ===================== DRAWING ===================== */

  const getCoords = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (tool === 'cursor') return;
    const { x, y } = getCoords(e);
    setIsDrawing(true);

    setCurrentDrawing(
      tool === 'line'
        ? {
            id: Date.now().toString(),
            type: 'line',
            x1: x,
            y1: y,
            x2: x,
            y2: y,
            color: '#FCD34D',
          }
        : {
            id: Date.now().toString(),
            type: 'rect',
            x,
            y,
            w: 0,
            h: 0,
            color: '#60A5FA',
          }
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !currentDrawing) return;
    const { x, y } = getCoords(e);

    setCurrentDrawing((prev) =>
      !prev
        ? null
        : prev.type === 'line'
        ? { ...prev, x2: x, y2: y }
        : { ...prev, w: x - prev.x, h: y - prev.y }
    );
  };

  const handleMouseUp = () => {
    if (isDrawing && currentDrawing) {
      setDrawings((prev) => [...prev, currentDrawing]);
    }
    setCurrentDrawing(null);
    setIsDrawing(false);
  };

  /* ===================== UI ===================== */

  if (!selectedCoin)
    return <p className="text-gray-400">Pilih koin terlebih dahulu.</p>;

  const chartData = selectedCoin.sparkline.map((price, i) => ({
    name: i,
    price,
  }));

  return (
    <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg space-y-6">
      {/* Chart */}
      <div
        ref={containerRef}
        className="h-72 relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={
                selectedCoin.change24h >= 0 ? '#4ade80' : '#f87171'
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
