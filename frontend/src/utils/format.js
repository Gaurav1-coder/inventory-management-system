// FRONTEND AUTO: reviewed on 2026-04-14\r\nexport const formatCurrency = (amount) => {
  return new Number(amount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

export const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDateTime = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

