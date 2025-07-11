export const formatCurrency = (
  amount,
  currencyCode = "INR",
  minimumFractionDigits = 2
) => {
  // Map currency codes to their appropriate locales
  const getLocale = (currencyCode) => {
    switch (currencyCode) {
      case "USD":
        return "en-US";
      case "BGN":
        return "bg-BG"; // Bulgarian locale
      case "INR":
      default:
        return "en-IN";
    }
  };

  const locale = getLocale(currencyCode);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits,
  }).format(amount);
};

export const getCurrencySymbol = (currencyCode) => {
  return formatCurrency(0, currencyCode).replace(/[\d.,\s]/g, "");
};
