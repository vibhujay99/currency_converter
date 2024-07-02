import { useState } from "react";
import { Container, Typography, Stack, Paper } from "@mui/material";
import ConverterForm from "./components/ConverterForm";
import TransferHistory from "./components/TransferHistory";
import "./App.css";

const App = () => {
  const [transfers, setTransfers] = useState([]);

  const handleNewTransfer = (transfer) => {
    setTransfers([...transfers, transfer]);
  };

  return (
    <Container>
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Typography variant="h4" gutterBottom>
          Currency Converter
        </Typography>
        <ConverterForm onTransfer={handleNewTransfer} />
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Transfer History
          </Typography>
          <TransferHistory />
        </Paper>
      </Stack>
    </Container>
  );
};

export default App;
