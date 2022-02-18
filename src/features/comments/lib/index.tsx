export const stylesUtils = {
  mainColor: "#2196F3",
  hoverButtonColor: "#21CBF3",
  borderColor: "#edeff1",
  textMainColor: "#7c7c7c"
};

export const getDateDisplayValue = (
  date: Date,
  format = localStorage.getItem("i18nextLng")
): string | null => {
  return date
    ? date.toLocaleString((format = "en-Us"), {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
    : null;
};
