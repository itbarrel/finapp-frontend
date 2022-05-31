/* eslint-disable require-unicode-regexp */
export const formatNumber = (number, options) => {
  const { locale, decimal } = options;

  const intlOptions = {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  };
  if (isNaN(Number(number)) || number === "") {
    return "";
  }
  return new Intl.NumberFormat(locale, intlOptions).format(number);
};

export const parseNumber = (number, { locale }) => {
  let result = NaN;
  if (locale === "en") {
    result = parseFloat(number.replace(/,/g, ""));
  } else {
    result = parseFloat(number.replace(",", ".").replace(/\s/g, ""));
  }
  return isNaN(result) ? 0 : result;
};

export const roundNumber = (value, decimalPoint) => {
  return value ? value.toFixed(decimalPoint) : value;
};

// eslint-disable-next-line no-confusing-arrow
const formatIfNegative = (amount, locale) => locale === "en" && amount.indexOf("-") > -1
  ? amount.trim().replace("-", "").replace(/\s+/g, " -")
  : amount;

export const formatCurrency = (amount, currency, { locale }) => {
  const baseOptions = {
    style: "currency",
    currencyDisplay: "code",
    minimumFractionDigits: 0,
  };
  const formatter = new Intl.NumberFormat(locale, { ...baseOptions, currency });
  return formatIfNegative(formatter.format(amount), locale);
};

export const formatPercent = (value, { locale }) => {
  const baseOptions = { style: "percent" };
  const formatter = new Intl.NumberFormat(locale, baseOptions);

  return formatter.format(value);
};

export const compare = (first, second) => {
  if (first < second) {
    return -1;
  }
  if (first > second) {
    return 1;
  }
  return 0;
};

export const formatPerformance = (value, { locale }) => {
  const formatter = new Intl.NumberFormat(locale);
  const formattedValue = formatter.format(value);
  return value > 0 ? `+${formattedValue}%` : `${formattedValue}%`;
};
