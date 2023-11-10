export const timeConverter = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  if (hours === 0) return `${minutes} minutes`;
  return `${hours} hours, ${minutes} minutes`;
}

export const defaultDetails = {
  invoice: {
    to: "A Company Ltd",
    date: "1st November 2023",
    invoiceNo: "AA01",
    reason: "Software Development Work",
    timeRange: "November 2023",
    rate: 20,
  },
  bank: {
    name: "Mr J Leigh",
    sortCode: "00-00-00",
    accountNumber: "12345678",
    bank: "My Bank",
  }
};