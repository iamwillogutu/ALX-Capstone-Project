import axios from "axios";

const BASE_URL = "https://open.er-api.com/v6/latest"; 

export const fetchExchangeRates = async (baseCurrency) => {
  try {
    const response = await axios.get(`${BASE_URL}/${baseCurrency}`);
    return response.data.rates;
  } catch (error) {
    throw new Error("Failed to fetch exchange rates.");
  }
};