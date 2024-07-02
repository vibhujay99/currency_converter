/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const TransferHistory = () => {
  const [transfers, setTransfers] = useState([]);

  const fetchTransfers = async () => {
    const response = await axios.get(`http://localhost:5000/api/transfers`);
    setTransfers(response.data);
    // console.log(process.env.REACT_APP_SERVER_URL);
  };

  const handleRevoke = async (id) => {
    await axios.delete(`http://localhost:5000/api/transfers/${id}`);
    fetchTransfers();
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <Grid container spacing={2}>
      {transfers.map((transfer) => (
        <Grid item xs={12} sm={6} md={4} key={transfer._id}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {transfer.fromCountry} to {transfer.toCountry}
              </Typography>
              <Typography>
                Amount: {transfer.transferAmount} <br />
                Converted: {transfer.convertedAmount}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRevoke(transfer._id)}
                sx={{ marginTop: 1 }}
              >
                Revoke
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TransferHistory;
