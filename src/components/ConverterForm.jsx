/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";

const countries = [
  { code: "USD", name: "USA" },
  { code: "LKR", name: "Sri Lanka" },
  { code: "AUD", name: "Australia" },
  { code: "INR", name: "India" },
];

const ConverterForm = ({ onTransfer }) => {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:5000/api/transfers`, {
      fromCountry,
      toCountry,
      transferAmount: amount,
    });
    onTransfer(response.data);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6" gutterBottom>
        Currency Converter
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="From Country"
              value={fromCountry}
              onChange={(e) => setFromCountry(e.target.value)}
              fullWidth
              margin="normal"
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="To Country"
              value={toCountry}
              onChange={(e) => setToCountry(e.target.value)}
              fullWidth
              margin="normal"
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Transfer
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ConverterForm;
