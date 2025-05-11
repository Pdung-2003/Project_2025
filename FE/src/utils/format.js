export const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
};

export const cleanBody = (body) => {
  return Object.entries(body).reduce((acc, [key, value]) => {
    if (value !== null && value !== '' && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
};
