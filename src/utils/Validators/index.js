/* eslint-disable no-mixed-operators */
/* eslint-disable require-unicode-regexp */
export const validateNumberBetween = (min, max, number) => {
  if (isNaN(number) || number < min || number > max) {
    return `Please enter a number between ${min} and ${max}`;
  } else {
    return null;
  }
};

export const validatePresence = (input) => {
  if (input === 0) {
    return null;
  } else if (!input || String(input).replace(/\s/g, "") === "") {
    return "Required";
  } else {
    return null;
  }
};

export const validateStep = (input, step) => {
  const number = Number(input);

  if (isNaN(number) || !checkDecimals(number, step)) {
    return `Please enter a number with ${step} decimals maximum`;
  } else {
    return null;
  }
};

const checkDecimals = (number, decimalCount) => {
  const paddedNumber = number * 10 ** decimalCount;
  return Math.floor(paddedNumber) === paddedNumber;
};

export const cantBeBlank = (value) => !!value && value.replace(/\s/g, "") !== "";

export const validateNumberOnly = (number) => {
  if (isNaN(number)) {
    return "Please enter a number only";
  } else {
    return null;
  }
};
