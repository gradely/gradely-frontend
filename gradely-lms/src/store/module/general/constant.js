// NETWORK ERROR
// getter constant
export const GET_NETWORK_ERROR_MESSAGE = "GET_NETWORK_ERROR_MESSAGE";

// mutation constant
export const SET_NETWORK_ERROR_MESSAGE = "SET_NETWORK_ERROR_MESSAGE";

//constants for file upload
export const POST_UPLOAD_FILE = "POST_UPLOAD_FILE";

export const GET_UPLOAD_DETAILS = "GET_UPLOAD_DETAILS";

export const SET_UPLOAD_DETAILS = "SET_UPLOAD_DETAILS";

export const GET_IS_FILE_UPLOADING = "GET_IS_FILE_UPLOADING";

export const SET_IS_UPLOADING = "SET_IS_UPLOADING";

export const UPLOAD_URL = `/aws/upload-file/files/questions?base64=0`;

// constants for file delete
export const DELETE_FILE_ACTION = "DELETE_FILE_ACTION";

export const GET_DELETE_DETAILS = "GET_DELETE_DETAILS";

export const SET_DELETE_DETAILS = "SET_DELETE_DETAILS";

export const GET_IS_DELETING = "GET_IS_DELETING";

export const SET_IS_DELETING = "SET_IS_DELETING";

export const GET_IS_REPORTING = "GET_IS_REPORTING";

export const SET_IS_REPORTING = "SET_IS_REPORTING";

export const SET_REPORT_DETAILS = "SET_REPORT_DETAILS";

export const GET_REPORT_DETAILS = "GET_REPORT_DETAILS";

export const REPORT_ACTION = "REPORT_ACTION";

export const REPORT_URL = () => `/report/error-report/question`;

export const DELETE_URL = (file) => {
  return `/aws/delete-file?url=${file}`;
};

// constant for checking available

export const CHECK_TOKEN_VALIDITY_ACTION = "CHECK_TOKEN_VALIDITY_ACTION";

export const SET_VALIDATE_DATA = "SET_VALIDATE_DATA";

export const VALIDATE = "/validate";

export const GET_IS_LOGGED_IN = "GET_IS_LOGGED_IN";

export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";

export const GET_TEACHER_CLASSES = "GET_TEACHER_CLASSES";

export const GET_TEACHER_CLASSES_ACTION = "GET_TEACHER_CLASSES_ACTION";

export const SET_TEACHER_CLASSES = "SET_TEACHER_CLASSES";

export const TEACHER_CLASSES = "/teacher/class";
