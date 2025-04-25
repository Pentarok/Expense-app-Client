import React, { useState, useEffect } from 'react';
import currencySymbolMap from 'currency-symbol-map';
import currencyCodes from 'currency-codes';

const CurrencySelector = ({ currency, setCurrency }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currency); // local state

  // Sync prop to local state
  useEffect(() => {
    setSelectedCurrency(currency);
  }, [currency]);

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);
    setCurrency(newCurrency); // update parent
    localStorage.setItem('currency', newCurrency); // optional: persist
  };

  const currencies = currencyCodes.codes().map((code) => ({
    code,
    name: currencyCodes.code(code)?.currency,
    symbol: currencySymbolMap(code) || code,
  }));

  return (
    <div className='w-full mb-2'>
      <label htmlFor="currency" className="block font-medium mb-2">
        Select Currency:
      </label>
      <select
        id="currency"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        className="border w-full border-blue-400 block outline-blue-400 outline:border-2 rounded-lg p-2"
      >
        {currencies.map(({ code, name, symbol }) => (
          <option key={code} value={code}>
            {name} ({symbol})
          </option>
        ))}
      </select>

      {/* <p className="mt-2">
        Current Currency: <strong>{selectedCurrency}</strong>
      </p> */}
    </div>
  );
};

export default CurrencySelector;
