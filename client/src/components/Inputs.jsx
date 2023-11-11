import React from "react";
import Input from '@mui/material/Input';

const Inputs = ({ invoiceDetails, setInvoiceDetails }) => {

  const invoiceDetailsMap = [
    {
      className: "invoice-to",
      label: "Invoice to",
      key: "to"
    },
    {
      className: "invoice-date",
      label: "Invoice date",
      key: "date"
    },
    {
      className: "invoice-no",
      label: "Invoice number",
      key: "invoiceNo"
    },
    {
      className: "invoice-reason",
      label: "Invoice reason",
      key: "reason"
    },
    {
      className: "invoice-period",
      label: "Invoice period",
      key: "timeRange"
    },
  ];

  const bankDetailsMap = [
    {
      className: "bank-name",
      label: "Payee name",
      type: "bank",
      key: "name"
    },
    {
      className: "sort-code",
      label: "Sort code",
      type: "bank",
      key: "sortCode"
    },
    {
      className: "account-number",
      label: "Account number",
      type: "bank",
      key: "accountNumber"
    },
    {
      className: "bank",
      label: "Bank",
      type: "bank",
      key: "bank"
    },
    {
      className: "hourly-rate",
      label: "Hourly rate",
      type: "invoice",
      key: "rate"
    }
  ];

  return (
    <div className="details">
      <div className="input invoice-details">
        {/* show all invoice details */}
        {invoiceDetailsMap.map(({ className, label, key }) => (
          <div className={className}>
            <h3>{label}</h3>
            <Input
              defaultValue={invoiceDetails.invoice[key]}
              onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoice: { ...invoiceDetails.invoice, [key]: e.target.value } })}
              error={!invoiceDetails.invoice[key]}
            />
          </div>
        ))}
      </div>

      <div className="input payment-details">
        {/* show all bank details */}
        {bankDetailsMap.map(({ className, label, key, type }) => {
          const handleChange = (e) => {
            // if the key is rate, parse the value to a float
            const newValue = key === "rate" ? parseFloat(e.target.value) : e.target.value;
            setInvoiceDetails({ ...invoiceDetails, [type]: { ...invoiceDetails[type], [key]: newValue } });
          }
          return (
            <div className={className}>
              <h3>{label}</h3>
              <Input
                defaultValue={invoiceDetails[type][key]}
                onChange={handleChange}
                error={!invoiceDetails[type][key]}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default Inputs;