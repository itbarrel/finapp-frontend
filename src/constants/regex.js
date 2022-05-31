/* eslint-disable require-unicode-regexp */
/* eslint-disable prefer-named-capture-group */
export const USERNAME_REGEX = /^[a-zA-Z][^#&<>"~;$^%{}?]{2,32}$/u; // minimum 3 and max 32 characters allowed
export const NICKNAME_REGEX = /^[a-zA-Z][^#&<>"~;$^%{}?]{2,25}$/u; // minimum 3 and max 25 characters allowed
export const USER_BIO_REGEX = /^[a-zA-Z][^#&<>"~;$^%{}?]{0,500}$/u; // minimum 1 and max 300 characters allowed
export const EMAIL_ONLY = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/iu;
export const PASSWORD_ONLY = /^(?=.+\d)(?=.*[a-z])(\S){8,}$/u; // COMBINATION OF LETTER AND NUMBER MINIMUM 8
export const PHONE_ONLY =
  /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/; // space not allowed

export const CHARACTER_500 = /^[a-zA-Z][^#&<>"~;$^%{}?]{0,500}$/u; // minimum 1 and max 300 characters allowed
// export const PHONE_ONLY = /^(\+|\d\d)(\d{1,3}|\d{1,4})(\d{10,11})$/u;
// export const PASSWORD_ONLY = /^(?=.+\d)(?=.*[a-z])(?=.*[A-Z])(\S){8,}$/u; // COMBINATION OF LETTER AND NUMBER MINIMUM 8 AND AT LEAST ONE CAPITAL LETTER

export const CHARACTER_LIMIT_50 = /^[a-zA-Z][^#&<>"~;$^%{}?]{0,50}$/u; // should start with alphabet
export const SPACE_NOT_ALLOWED = /^\S+$/u; // minimum 3 and max 25 characters allowed
