export const getDateDisplayValue = (
  date: Date,
  format = localStorage.getItem("i18nextLng")
): string | null => {
  return date
    ? date.toLocaleString((format = "en-US"), {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : null;
};

export const formatCurrency = (value: number, currency = "USD"): string => {
  const localFormat = localStorage.getItem("i18nextLng");
  if (localFormat === "ja-JP") {
    return (value * 108).toLocaleString(localFormat, {
      useGrouping: true,
      style: "currency",
      currency: "JPY",
    });
  }
  return value.toLocaleString("en-US", {
    useGrouping: true,
    style: "currency",
    currency: currency,
  });
};