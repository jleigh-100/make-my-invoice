import * as docx from "docx";
import saveAs from "file-saver";
import { timeConverter } from "./utils";

const generateFile = (data, totals, invoiceDetails) => {
  const tableBorders = {
    top: {
      style: docx.BorderStyle.SINGLE,
      size: 1,
      color: "000000",
    },
    bottom: {
      style: docx.BorderStyle.SINGLE,
      size: 1,
      color: "000000",
    },
    left: {
      style: docx.BorderStyle.SINGLE,
      size: 1,
      color: "000000",
    },
    right: {
      style: docx.BorderStyle.SINGLE,
      size: 1,
      color: "000000",
    },
  };

  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            alignment: docx.AlignmentType.END,
            children: [
              new docx.TextRun({
                text: "Mr Jamie Leigh",
                size: 24,
              }),
              new docx.TextRun({
                text: "39 Church Road",
                break: 1,
                size: 24,
              }),
              new docx.TextRun({
                text: "Elmstead Market",
                break: 1,
                size: 24,
              }),
              new docx.TextRun({
                text: "Colchester",
                break: 1,
                size: 24,
              }),
              new docx.TextRun({
                text: "Essex",
                break: 1,
                size: 24,
              }),
              new docx.TextRun({
                text: "CO7 7AW",
                break: 1,
                size: 24,
              }),
            ]
          }),

          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `${invoiceDetails.invoice.date}`,
                break: 1,
                size: 24,
              }),
              new docx.TextRun({
                text: `Invoice No: ${invoiceDetails.invoice.invoiceNo}`,
                break: 1,
                size: 24,
              })
            ]
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Invoice to: ${invoiceDetails.invoice.to}`,
                break: 1,
                bold: true,
                size: 24,
              })
            ]
          }),

          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `For ${invoiceDetails.invoice.reason}: ${invoiceDetails.invoice.timeRange}`,
                size: 24,
              })
            ]
          }),
          new docx.Table({
            break: 1,
            width: {
              size: 100,
              type: docx.WidthType.PERCENTAGE,
            },
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
                    borders: tableBorders,
                    children: [
                      new docx.Paragraph({
                        alignment: docx.AlignmentType.LEFT,
                        children: [
                          new docx.TextRun({
                            text: "Breakdown by Client",
                            size: 24,
                            bold: true,
                            tableHeader: true,
                          })
                        ]
                      }),

                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        alignment: docx.AlignmentType.LEFT,
                        children: [
                          new docx.TextRun({
                            text: "Time",
                            size: 24,
                            bold: true,
                            tableHeader: true,
                          })
                        ]
                      }),
                    ]
                  }),
                  new docx.TableCell({
                    children: [
                      new docx.Paragraph({
                        alignment: docx.AlignmentType.LEFT,
                        children: [
                          new docx.TextRun({
                            text: "Amount",
                            size: 24,
                            bold: true,
                            tableHeader: true,
                          })
                        ]
                      }),
                    ]
                  }),
                ]
              }),
              // for each client, we need a TableRow with 3 TableCells: Client name, time, price
              ...data.map((client) => {
                return (
                  new docx.TableRow({
                    children: [
                      new docx.TableCell({
                        width: {
                          size: 3000,
                        },
                        borders: tableBorders,
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.LEFT,
                            children: [
                              new docx.TextRun({
                                text: client[0],
                                size: 24,
                                bold: true,
                              })
                            ]
                          }),
                        ]
                      }),
                      new docx.TableCell({
                        borders: tableBorders,
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.LEFT,
                            children: [
                              new docx.TextRun({
                                text: client[1],
                                size: 24,
                              })
                            ]
                          }),
                        ]
                      }),
                      new docx.TableCell({
                        borders: tableBorders,
                        children: [
                          new docx.Paragraph({
                            alignment: docx.AlignmentType.LEFT,
                            children: [
                              new docx.TextRun({
                                text: client[2].toLocaleString("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 }),
                                size: 24,
                              })
                            ]
                          }),
                        ]
                      }),
                    ]
                  })
                );
              }),

            ]
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: `Total hours: ${timeConverter(totals.minutes)} @ £${invoiceDetails.invoice.rate.toFixed(2)}/hr`,
                size: 24,
                break: 1,
                bold: true,
              }),
            ]
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.END,
            children: [
              new docx.TextRun({
                text: `${totals.price.toLocaleString("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 })}`,
                size: 24,
                break: 1,
                bold: true,
              }),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: "Payment details:",
                size: 24,
                break: 4,
              }),
            ],
          }),
          new docx.Paragraph({
            alignment: docx.AlignmentType.END,
            children: [
              new docx.TextRun({
                text: `${invoiceDetails.bank.name}`,
                size: 24,
              }),
              new docx.TextRun({
                text: `Sort code: ${invoiceDetails.bank.sortCode}`,
                break: 1,
                size: 24,
              }),
              new docx.TextRun({
                text: `A/C number: ${invoiceDetails.bank.accountNumber}`,
                break: 1,
                size: 24,
              }),
              new docx.TextRun({
                text: `Bank: ${invoiceDetails.bank.bank}`,
                break: 1,
                size: 24,
              }),
            ]
          }),
        ]
      }
    ]
  });

  docx.Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "invoice.docx");
  });
}

export default generateFile;