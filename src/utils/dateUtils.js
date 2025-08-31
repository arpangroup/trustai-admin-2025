// src/utils/dateUtils.js
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formatted = date.toLocaleString('en-US', options);
  const [monthDay, year, time] = formatted.split(', ');
  return `${monthDay} ${year} ${time}`;
};
