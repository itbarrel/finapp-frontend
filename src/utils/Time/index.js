import moment from "moment";

export const formatDate = (date, format, locale) => {
  moment.locale(locale);
  return moment(date.toString()).format(format);
};

export const weekDays = (shortFormat, locale) => {
  moment.locale(locale);
  moment.updateLocale(locale, { week: { dow: 1 } });
  return moment.weekdaysShort(shortFormat);
};

export const formatDateToLocale = (dateString, options) => {
  const forceOptions = {
    timeZone: "UTC",
    hour: undefined,
    minute: undefined,
  };

  return formatDateTimeToLocale(dateString, { ...options, ...forceOptions });
};

export const formatDateTimeToLocale = (dateString, { locale, ...options }) => {
  if (!dateString) {
    return dateString;
  }

  const baseOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat(locale, {
    ...baseOptions,
    ...options,
  });

  return formatter.format(date);
};

export const daysToScale = (days) => {
  const breakpoints = [
    { base: 1, max: 30, unit: "days" },
    { base: 30, max: 365, unit: "months" },
    { base: 365, max: Infinity, unit: "years" },
  ];

  const { base, unit } = breakpoints.find(({ max }) => days < max);

  return { value: Math.trunc(days / base), unit };
};

export const ascending = (first, second) => {
  if (first > second) {
    return 1;
  }
  if (first < second) {
    return -1;
  }
  return 0;
};

export const descending = (first, second) => ascending(second, first);

export const isInRange = (date, { from, to }) => date >= from && date <= to;
