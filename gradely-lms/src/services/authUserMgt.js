const getStudentClassName = (class_id) => {
  switch (class_id) {
    case 1:
      return "Year 1/Primary 1";
    case 2:
      return "Year 2/Primary 2";
    case 3:
      return "Year 3/Primary 3";
    case 4:
      return "Year 4/Primary 4";
    case 5:
      return "Year 5/Primary 5";
    case 6:
      return "Year 6/Primary 6";
    case 7:
      return "Year 7/JSS 1";
    case 8:
      return "Year 8/JSS 2";
    case 9:
      return "Year 9/JSS 3";
    case 10:
      return "Year 10/SSS 1";
    case 11:
      return "Year 11/SSS 2";
    case 12:
      return "Year 12/SSS 3";
    case 13:
      return "Toddler";
    case 14:
      return "KG 1";
    case 15:
      return "KG 2";
    case 16:
      return "Nursery 1";
    case 17:
      return "Nursery 2";
    case 18:
      return "Pre-Nursery";
    case 19:
      return "Reception";
    default:
      return "No class found";
  }
};

export { getStudentClassName };
