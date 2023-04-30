const getCapitalizeText = (text) => {
  let fisrt_letter = text.charAt(0);
  return `${fisrt_letter.toUpperCase()}${text.substring(1)}`;
};

const getStringInitials = (string) => {
  let string_list = string.replace(/\s+/g, " ").split(" ");

  if (string_list.length === 1) return string_list[0].slice(0, 1).toUpperCase();
  else {
    let first = string_list[0].slice(0, 1).toUpperCase();
    let last = string_list[1].slice(0, 1).toUpperCase();
    let initial = first + last;
    return initial;
  }
};

// GET SHORTENED LENGTH OF STRING
const getTruncatedText = (string, length) => {
  if (string.length > length) return `${string.slice(0, length)}...`;
  else return string;
};

// GENERATE RANDOM CHARACTERS
const generateRandomString = (length) => {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let randomstring = "";
  for (let i = 0; i < length; i++) {
    let rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
};

const isEmpty = (...args) => {
  let push = false;
  args.forEach((e) => {
    if (!e?.toString() || e?.toString() === "") push = true;
  });
  return push;
};

// ENCODE STRING FROM BINARY TO ASCII
const encodeString = (string) => {
  return btoa(
    `${generateRandomString(5)}+${string}+${generateRandomString(5)}`
  );
};

// DECODE ENCODED STRING FROM ASCII TO BINARY
const decodeString = (encoded_string) => {
  return +atob(encoded_string).split("+")[1];
};

export {
  isEmpty,
  getCapitalizeText,
  getStringInitials,
  getTruncatedText,
  generateRandomString,
  encodeString,
  decodeString,
};
