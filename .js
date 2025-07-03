function SMA(data, period) {
  if (data.length < period) return null;
  let sum = 0;
  for (let i = data.length - period; i < data.length; i++) {
    sum += data[i];
  }
  return sum / period;
}

function RSI(data, period = 14) {
  let gains = 0, losses = 0;
  for (let i = data.length - period - 1; i < data.length - 1; i++) {
    const change = data[i + 1] - data[i];
    if (change > 0) gains += change;
    else losses -= change;
  }
  if (losses === 0) return 100;
  const rs = gains / losses;
  return 100 - (100 / (1 + rs));
}

function generateSignal() {
  // Simulated price data (replace with real prices for live signals)
  const closePrices = [];
  for (let i = 0; i < 30; i++) {
    closePrices.push(1.1000 + (Math.random() - 0.5) * 0.01);
  }

  const sma5 = SMA(closePrices, 5);
  const sma10 = SMA(closePrices, 10);
  const rsi14 = RSI(closePrices, 14);

  let signal = "NO SIGNAL ⚠️";
  if (sma5 > sma10 && rsi14 < 70) signal = "CALL 📈";
  else if (sma5 < sma10 && rsi14 > 30) signal = "PUT 📉";

  console.log(`Signal: ${signal}`);
  console.log(`SMA5: ${sma5.toFixed(5)} | SMA10: ${sma10.toFixed(5)} | RSI: ${rsi14.toFixed(2)}`);
  return signal;
}

generateSignal();
