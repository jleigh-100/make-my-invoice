import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import generateFile from "./FileCreator.jsx";
import { timeConverter } from "./utils/index.jsx";

const ClientDisplayer = ({ clients, invoiceDetails }) => {
  const [clicked, setClicked] = useState(false);

  const clientArray = [];
  const totals = { minutes: 0, price: 0 };

  for (let client in clients) {
    totals.minutes += parseInt(clients[client]);
    const clientTime = timeConverter(clients[client]);
    const clientCost = (clients[client] / 60 * invoiceDetails.invoice.rate);
    clientArray.push([client, clientTime, clientCost]);
  }

  clientArray.forEach((client) => {
    totals.price += client[2];
  })

  const onClick = () => {
    if (clientArray.length !== 0) {
      generateFile(clientArray, totals, invoiceDetails);
      setClicked(true);
    }
  };

  return (
    <div style={{ width: 500 }}>
      <table className="results-table">
        <thead>
          <tr>
            <th>Breakdown by Client</th>
            <th>Time</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            clientArray.map((client) => {
              return (
                <tr key={client}>
                  <td>{client[0]}</td>
                  <td>{client[1]}</td>
                  <td>{client[2].toLocaleString("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 })}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className="totals">
        <h3 className="total-hours">{`Total hours: ${timeConverter(totals.minutes)} @ £${invoiceDetails.invoice.rate.toFixed(2)}/hr`}</h3>
        <h3 className="total-price">{totals.price.toLocaleString("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 })}</h3>
      </div>
      <div>
        <Button
          variant="outlined"
          onClick={onClick}
        >
          {!clicked ? 'Table looks right? Click here to generate an invoice!' : 'Made some changes? Click here to generate a new invoice!'}
        </Button>
      </div>
    </div>
  );
}

export default ClientDisplayer;