class serviceValidators {
  #email_regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  #phone_regex = /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/;

  // EMAIL VALIDATOR
  checkEmail(input: string) {
    return this.#email_regex.test(String(input).toLowerCase())
      ? null
      : 'Enter a valid email';
  }

  // EMAIL AND STUDENT CODE VALIDATOR
  checkEmailAndStudentCode(input: string) {
    let student_code_message = 'Enter a valid student code';
    let email_message = 'Enter a valid email';

    // VALIDATE STUDENT CODE
    if (input.includes('/')) {
      let data_set = input.split('/');

      if (data_set[0].length === 3)
        return data_set[1].length === 4 ? null : student_code_message;
      else return student_code_message;
    }

    // VALIDATE EMAIL
    else {
      return this.#email_regex.test(String(input).toLowerCase())
        ? null
        : email_message;
    }
  }

  // PASSWORD VALIDATOR
  checkPassword(input: string) {
    return input.length < 6 ? 'Enter at least 6 characters' : null;
  }

  // SINGLE NAME VALIDATOR
  checkSingleName(input: string) {
    return input.length >= 2 ? null : 'Enter a minimum of 2 characters';
  }

  // PHONE NUMBER VALIDATOR
  checkPhoneNumber(input: string) {
    return this.#phone_regex.test(input)
      ? null
      : 'Enter a minimum of 11 characters';
  }
}

export const $serviceValidators = new serviceValidators();
