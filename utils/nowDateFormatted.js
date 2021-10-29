module.exports = () => {
  const data = new Date();

  const day = data.getDate();
  const month = data.getMonth() + 1;
  const year = data.getFullYear();

  const hours = data.getHours() % 12 || 12;

  const minutes = data.getMinutes();
  const seconds = data.getSeconds();

  const AMPM = data.getHours() >= 0 && data.getHours() < 12 ? 'AM' : 'PM';

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${AMPM}`;
};
