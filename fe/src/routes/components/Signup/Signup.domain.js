import axios from "axios";
import { USER_ROUTE } from "../constants";

export const MIN_PASS_LEN = 10;

export const validateUsername = async (username) => {
  try {
    const res = await axios.get(`${USER_ROUTE}/verifyUsername/${username}`);
    return [!res.data.exists, "Username already exists"];
  } catch (e) {
    return false;
  }
};

export const validatePassword = (password) => {
  // Special thanks to stack overflow

  //String should have 1 uppercase, 1 special, 1 lowercase, 1 number, and length of 10
  const uppercaseRegex = /(?=.*[A-Z])/;
  const lowercaseRegex = /(?=.*[a-z])/;
  const specialCharRegex = /(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])/; // Follows OWASP special char. spec.

  const numRegex = /(?=.*[0-9])/;
  const lengthRegex = RegExp(`.{${MIN_PASS_LEN},}`);

  const tests = [
    uppercaseRegex,
    lowercaseRegex,
    specialCharRegex,
    numRegex,
    lengthRegex,
  ];

  return tests.every((regex) => password.match(regex));
};

export const signup = (user) => axios.post(`${USER_ROUTE}/signup`, user);
