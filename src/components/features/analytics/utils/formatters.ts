export const formatNumber = (num: number) => {
  // Convert to string and split on decimal point
  const parts = num.toString().split(".");

  // Add thousand separators to the whole number part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Join back with decimal if it exists
  return parts.join(",");
};

// Format stake amount based on size
export const formatStake = (num: number) => {
  const billion = 1_000_000_000;
  const million = 1_000_000;

  if (num >= billion) {
    return `${(num / billion)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      .replace(/\.(?=\d{2}$)/, ",")}b`;
  }
  return `${(num / million)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    .replace(/\.(?=\d{2}$)/, ",")}m`;
};
