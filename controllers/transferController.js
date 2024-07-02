import axios from "axios";
import Transfer from "../models/Transfer.js";

const getExchangeRates = async (base) => {
  const response = await axios.get(`https://v6.exchangerate-api.com/v6/3a5971ca6655c048533a027b/latest/${base}`);
  return response.data.rates;
};

export const createTransfer = async (req, res) => {
  try {
    const { fromCountry, toCountry, transferAmount } = req.body;
    const rates = await getExchangeRates(fromCountry);
    const convertedAmount = transferAmount * rates[toCountry];

    const newTransfer = new Transfer({
      fromCountry,
      toCountry,
      transferAmount,
      convertedAmount,
    });
    await newTransfer.save();

    res.status(201).json(newTransfer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find();
    res.status(200).json(transfers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTransfer = async (req, res) => {
  try {
    const { id } = req.params;
    await Transfer.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
