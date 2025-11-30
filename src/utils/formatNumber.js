export const formatNumber = (number, decimals = 2) => {
  if (number === null || number === undefined) return "0";
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

export const formatCurrency = (amount, currency = "DZD") => {
  if (amount === null || amount === undefined) return "0 " + currency;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
  }).format(amount);
};


