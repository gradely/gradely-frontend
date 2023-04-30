class serviceString {
  // GENERATE RANDOM CHARACTERS
  generateRandomString(length: number) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let randomstring = '';
    for (let i = 0; i < length; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
  }

  // GET CAPITALIZE TEXT
  getCapitalizeText(text: string) {
    let first_letter = text.charAt(0);
    return `${first_letter.toUpperCase()}${text.substring(1)}`;
  }

  // GET STRING INITIALS
  getStringInitials(string: string) {
    let string_list = string.replace(/\s+/g, ' ').split(' ');

    return string_list.length === 1
      ? string_list[0].slice(0, 1).toUpperCase()
      : `${string_list[0].slice(0, 1).toUpperCase()}${string_list[1]
          .slice(0, 1)
          .toUpperCase()}`;
  }

  // GET FIRST CHARACTER
  getFirstCharacter(string: string) {
    let string_list = string.replace(/\s+/g, ' ').split(' ');
    return string_list[0].slice(0, 1).toUpperCase();
  }

  // GET SHORTENED LENGTH OF STRING
  getTruncatedText(string: string, length: number) {
    return string.length > length ? `${string.slice(0, length)}...` : string;
  }

  formatCurrency(number: any) {
    return new Intl.NumberFormat('en-US', {}).format(parseInt(number || 0));
  }

  getRangeInArray(min: number, max: number) {
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
  }
}

export const $serviceString = new serviceString();
