export function thousandSeparator(value) {
  return value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const currency = (value) => value && `Rp ${thousandSeparator(value)}`;

export const roundNumber = (value) => Math.round(value * 100) / 100;

export function sortByAlphabet(data, field) {
  return data.sort((a, b) => {
    if (a[field].toLowerCase() < b[field].toLowerCase()) {
      return -1;
    }
    if (a[field].toLowerCase() > b[field].toLowerCase()) {
      return 1;
    }
    return 0;
  });
}

export function sortByDescending(data, field) {
  return data.sort((a, b) => b[field] - a[field]);
}
