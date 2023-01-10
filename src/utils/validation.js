import * as yup from 'yup';

const NUMBER_REGEXP = /\+?\d{1,4}?[-\d\s]?\(?\d{1,3}?\)?[-\d\s]?\d{1,4}[-\d\s]?\d{1,4}[-\d\s]?\d{1,9}/;
const NUMBERS_ONLY_REGEXP = /^\+?[\d\s-()]*$/;

const errorMsg = 'Phone number must be at least 5 digits, can contain spaces, dashes, parentheses and can start with +';
const numbersOnlyMsg = 'Phone number can contain digits, spaces, dashes, parentheses and +';

export const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  number: yup.string().matches(NUMBER_REGEXP, errorMsg).matches(NUMBERS_ONLY_REGEXP, numbersOnlyMsg).required(),
});