const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
});

/**
 * Formats a millisecond timestamp as e.g. "January 05, 2026".
 */
const formatDate = (timestamp?: string | number | null) => {
  const date = new Date(Number(timestamp || ''));

  return Number.isNaN(date.getTime()) ? 'Invalid date' : formatter.format(date);
};

export default formatDate;
