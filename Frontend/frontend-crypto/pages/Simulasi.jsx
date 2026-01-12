import React, { useState } from "react";
import BottomNav from "../components/BottomNav"
const coins = [
  { id: "BTC", name: "Bitcoin", price: 68000 },
  { id: "ETH", name: "Ethereum", price: 3500 },
  { id: "BNB", name: "Binance Coin", price: 420 },
  { id: "SOL", name: "Solana", price: 150 },
];

export default function Simulasi() {
  const [selectedCoin, setSelectedCoin] = useState(coins[0]);
  const [usd, setUsd] = useState(100);

  const estimatedCoin = selectedCoin
    ? (usd / selectedCoin.price).toFixed(6)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-semibold mb-6 text-teal-400">
        Simulasi Trading
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 max-w-xl">
        <div>
          <label className="block mb-2 text-sm">Pilih Coin</label>
          <select
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            value={selectedCoin?.id}
            onChange={(e) => {
              const coin = coins.find(c => c.id === e.target.value);
              if (coin) setSelectedCoin(coin);
            }}
          >
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.id})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Harga Saat Ini</span>
          <span className="text-teal-400 font-semibold">
            ${selectedCoin?.price.toLocaleString()}
          </span>
        </div>

        <div>
          <label className="block mb-2 text-sm">Jumlah (USD)</label>
          <input
            type="number"
            value={usd}
            onChange={(e) => setUsd(Number(e.target.value))}
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
          />
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Estimasi</span>
          <span className="font-semibold">
            ≈ {estimatedCoin} {selectedCoin?.id}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <button className="bg-teal-500 hover:bg-teal-600 py-2 rounded font-semibold">
            Beli
          </button>
          <button className="border border-slate-600 py-2 rounded text-slate-300 hover:bg-slate-800">
            Jual
          </button>
        </div>
      </div>
    </div>
  );
}
