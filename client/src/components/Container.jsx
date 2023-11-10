import React, { useEffect, useState } from "react";
import FileImporter from "./FileImporter";
import ClientDisplayer from "./ClientDisplayer";
import Inputs from "./Inputs";
import Header from "./Header";
import { defaultDetails } from "./utils";

const savedDetails = window.localStorage.getItem("invoiceDetails");
const defaultinvoiceDetails = savedDetails ? JSON.parse(savedDetails) : defaultDetails;

export const Container = () => {
  const [clients, setClients] = useState({});
  const [invoiceDetails, setInvoiceDetails] = useState(defaultinvoiceDetails);

  useEffect(() => {
    const savedInvoiceDetails = window.localStorage.getItem("invoiceDetails");
    if (savedInvoiceDetails) setInvoiceDetails(JSON.parse(savedInvoiceDetails));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("invoiceDetails", JSON.stringify(invoiceDetails));
  }, [invoiceDetails]);

  useEffect(() => {
    if (!invoiceDetails.invoice.rate || invoiceDetails.invoice.rate <= 0) {
      setInvoiceDetails({ ...invoiceDetails, invoice: { ...invoiceDetails.invoice, rate: 1 } });
    }
  }, [invoiceDetails.invoice.rate, invoiceDetails]);

  return (
    <>
      <Header />
      <Inputs
        invoiceDetails={invoiceDetails}
        setInvoiceDetails={setInvoiceDetails}
      />
      <FileImporter
        setClients={setClients}
      />
      {Object.keys(clients).length !== 0 && (
        <ClientDisplayer
          clients={clients}
          invoiceDetails={invoiceDetails}
        />
      )}
    </>
  );
}