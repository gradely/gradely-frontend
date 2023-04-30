class serviceString {
  // GENERATE RANDOM CHARACTERS
  generateRandomString(length) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let randomstring = "";
    for (let i = 0; i < length; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
  }

  // ENCODE STRING FROM BINARY TO ASCII
  encodeString(string) {
    return btoa(
      `${this.generateRandomString(5)}+${string}+${this.generateRandomString(
        5
      )}`
    );
  }

  // DECODE ENCODED STRING FROM ASCII TO BINARY
  decodeString(encoded_string) {
    return +atob(encoded_string).split("+")[1];
  }

  // GET CAPITALIZE TEXT
  getCapitalizeText(text) {
    let text_list = text.split(" ");
    let first_letters = [];
    let modified_list = [];

    text_list.map((text) => first_letters.push(text?.charAt(0)));
    text_list.map((text, index) =>
      modified_list.push(
        `${first_letters[index]?.toUpperCase()}${text?.substring(1)}`
      )
    );

    return modified_list.join(" ");
  }

  // GET STRING INITIALS
  getStringInitials(string) {
    let string_list = string.replace(/\s+/g, " ").split(" ");

    return string_list.length === 1
      ? string_list[0].slice(0, 1).toUpperCase()
      : `${string_list[0].slice(0, 1).toUpperCase()}${string_list[1]
          .slice(0, 1)
          .toUpperCase()}`;
  }

  // GET FIRST CHARACTER
  getFirstCharacter(string) {
    let string_list = string.replace(/\s+/g, " ").split(" ");
    return string_list[0].slice(0, 1).toUpperCase();
  }

  // GET SHORTENED LENGTH OF STRING
  getTruncatedText(string, length) {
    return string.length > length ? `${string.slice(0, length)}...` : string;
  }
}

export const $serviceString = new serviceString();
