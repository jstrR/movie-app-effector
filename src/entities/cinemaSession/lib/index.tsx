export const getTimeDisplayValue = (
  time: Date,
  format = localStorage.getItem("i18nextLng")
): string | null => {
  return time
    ? time.toLocaleString((format = "en-US"), {
        hour: "numeric",
        minute: "numeric",
      })
    : null;
};
