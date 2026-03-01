import { useState, useEffect } from "react";
import { fetchExchangeRates } from "../services/currencyService";

const currencies = ["USD", "EUR", "GBP", "NGN", "CAD", "AUD", "JPY"];

const Converter = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rates, setRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getRates = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchExchangeRates(fromCurrency);
        setRates(data);
      } catch (err) {
        setError("Unable to fetch exchange rates.");
      }
      setLoading(false);
    };

    getRates();
  }, [fromCurrency]);

  const handleConvert = () => {
    if (!rates[toCurrency]) return;
    const result = amount * rates[toCurrency];
    setConvertedAmount(result.toFixed(2));
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="bg-gray-100 p-8 rounded-2xl shadow-lg w-full max-w-md">
      
      <label className="block mb-2 font-medium">Enter Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded-lg border mb-6"
      />

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col w-2/5">
          <label className="mb-2 font-medium">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="p-3 rounded-lg border"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="mt-8 text-xl font-bold px-4"
        >
          ⇄
        </button>

        <div className="flex flex-col w-2/5">
          <label className="mb-2 font-medium">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="p-3 rounded-lg border"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {convertedAmount && (
        <div className="p-4 bg-white rounded-lg text-center mb-6 shadow">
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </div>
      )}

      <button
        onClick={handleConvert}
        className="w-full text-white py-3 rounded-xl transition-transform transform hover:scale-105"
          style={{
            backgroundColor: '#0089d1',
            transition: 'background-color 0.3s ease',
          }}
      >
        {loading ? "Loading..." : "Get Exchange Rate"}
      </button>
    </div>
  );
};

export default Converter;