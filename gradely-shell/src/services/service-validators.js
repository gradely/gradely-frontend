class serviceValidators {
  #email_regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  #phone_regex = /(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/;

  // EMAIL VALIDATOR
  checkEmail(input) {
    let trimmed_input = input.trim();
    return this.#email_regex.test(String(trimmed_input).toLowerCase())
      ? null
      : "Enter a valid email";
  }

  // EMAIL AND STUDENT CODE VALIDATOR
  checkEmailAndStudentCode(input) {
    let trimmed_input = input.trim();
    let student_code_message = "Enter a valid student code";
    let email_message = "Enter a valid email";

    // VALIDATE STUDENT CODE
    if (trimmed_input.includes("/")) {
      let data_set = trimmed_input.split("/");

      if (data_set[0].length === 3)
        return data_set[1].length === 4 ? null : student_code_message;
      else return student_code_message;
    }

    // VALIDATE EMAIL
    else {
      return this.#email_regex.test(String(trimmed_input).toLowerCase())
        ? null
        : email_message;
    }
  }

  // PASSWORD VALIDATOR
  checkPassword(input) {
    let trimmed_input = input.trim();
    return trimmed_input.length < 6 ? "Enter at least 6 characters" : null;
  }

  // SINGLE NAME VALIDATOR
  checkSingleName(input) {
    let trimmed_input = input.trim();
    return trimmed_input.length >= 2 ? null : "Enter a minimum of 2 characters";
  }

  // FULL NAME VAILDATOR
  checkFullName(input) {
    let trimmed_input = input.trim();

    const numbers = "0123456789";
    let word_limit = trimmed_input.split(" ");
    let check_digits = (string) =>
      [...string].some((c) => [...numbers].includes(c));

    // CHECK FOR FIRST NUMBER ENTRY
    if (trimmed_input.length <= 2) return "Enter a minimum of 2 characters";
    else if (word_limit.length === 1)
      return "Both first and last names are required";
    else if (word_limit.length > 2) return "Enter only first and last names";
    else if (check_digits(trimmed_input))
      return "Fullname should not contain any number";
    else return null;
  }

  // PHONE NUMBER VALIDATOR
  checkPhoneNumber(input) {
    let trimmed_input = input.trim();

    return this.#phone_regex.test(trimmed_input)
      ? null
      : "Enter a minimum of 11 characters";
  }
}

export const $serviceValidators = new serviceValidators();
