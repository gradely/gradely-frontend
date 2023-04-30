// LOADING STATE FOR THE SIDEBAR ON QUESTION_SELECT
// getter constant
export const GET_CLASS_TOPICS_LOADER = "GET_CLASS_TOPICS_LOADER";

// mutation constant
export const SET_CLASS_TOPICS_LOADER = "SET_CLASS_TOPICS_LOADER";

// getter constant
export const GET_CLASS_QUESTIONS_LOADER = "GET_CLASS_QUESTIONS_LOADER";

// mutation constant
export const SET_CLASS_QUESTIONS_LOADER = "SET_CLASS_QUESTIONS_LOADER";

// LOADING STATE FOR BUTTON LOADER
export const GET_BUTTON_LOADER = "GET_BUTTON_LOADER";

export const SET_BUTTON_LOADER = "SET_BUTTON_LOADER";

/* GET TOPICS BY TERMS */
// getter constant
export const GET_CLASS_TOPICS = "GET_CLASS_TOPICS";

// mutation constant
export const SET_CLASS_TOPICS = "SET_QUESTION_LIST";

// action const
export const FETCH_CLASS_TOPICS = "FETCH_CLASS_TOPICS";

// const for api path url
// GET CLASS-TOPICS
export const CLASS_TOPICS_URL = (urlParams) => {
  // const lsPayload = JSON.parse(localStorage.getItem("authUser"));
  // let term;
  // if (!lsPayload) {
  //   term = 1;
  // } else {
  //   switch (lsPayload?.termWeek?.term) {
  //     case "first":
  //       term = 1;
  //       break;
  //     case "second":
  //       term = 2;
  //       break;
  //     case "third":
  //       term = 3;
  //       break;

  //     default:
  //       term = 1;
  //       break;
  //   }
  // }
  return `/teacher/class-topics?global_class_id=${
    urlParams?.global_class_id
  }&subject_id=${urlParams?.subject_id}&term=${1}&tour=${urlParams.tour}`;
};
/* GET CLASS TOPICS QUESTIONS */

// getter constant
export const GET_CLASS_QUESTIONS = "GET_CLASS_QUESTIONS";

// mutation constant
export const SET_CLASS_QUESTIONS = "SET_CLASS_QUESTIONS";

// action const
export const FETCH_CLASS_QUESTIONS = "FETCH_CLASS_QUESTIONS";

// const for api path url
export const CLASS_QUESTIONS_URL = (urlParams, page = 1, tour = false) =>
  `/teacher/class-questions?page=${page}&global_class_id=${urlParams.global_class_id}&subject_id=${urlParams?.subject_id}&topic_id=${urlParams?.id}&tour=${tour}`;

/* GET QUESTION DETAILS BY QUESTION ID */
// getter constant
export const GET_CLASS_QUESTION_DETAILS = "GET_CLASS_QUESTION_DETAILS";

// mutation constant
export const SET_CLASS_QUESTION_DETAILS = "SET_CLASS_QUESTION_DETAILS";

// action const
export const FETCH_CLASS_QUESTION_DETAILS = "FETCH_CLASS_QUESTIONS_DETAILS";

// const for api path url
export const CLASS_QUESTIONS_DETAILS_URL = (urlParams) =>
  `/teacher/question?question_id=${urlParams?.question_id}`;

//  ADD QUESITION TO HOME WORK
// getter constant
export const GET_ADD_QUESTIONS_TO_HOMEWORK = "GET_ADD_QUESTIONS_TO_HOMEWORK";

// mutation constant
export const SET_ADD_QUESTIONS_TO_HOMEWORK = "SET_ADD_QUESTIONS_TO_HOMEWORK";

export const ADD_QUESTIONS_TO_HOMEWORK = "ADD_QUESTIONS_TO_HOMEWORK";

export const ADD_QUESTIONS_FROM_HOMEWORK_URL = (urlParams) =>
  `/teacher/homework/homework-questions/${urlParams?.homework_id}`;

//  FETCH LIST OF CLASSES FOR SELECT DROPDOWN i.e junior secoundary school, senior sec etc
// getter constant
export const GET_GENERAL_GLOBAL_CLASSES = "GET_GENERAL_GLOBAL_CLASSES";

// mutation constant
export const SET_GENERAL_GLOBAL_CLASSES = "SET_GENERAL_GLOBAL_CLASSES";

export const FETCH_GENERAL_GLOBAL_CLASSES = "FETCH_GENERAL_GLOBAL_CLASSES";

export const FETCH_GENERAL_GLOBAL_CLASSES_URL = `/teacher/class`;

/* REMOVE QUESTION FROM HOMEWORK */
// getter constant
export const GET_REMOVED_QUESTIONS_FROM_HOMEWORK =
  "GET_REMOVED_QUESTIONS_FROM_HOMEWORK";

// mutation constant
export const SET_REMOVED_QUESTIONS_FROM_HOMEWORK =
  "SET_REMOVED_QUESTIONS_FROM_HOMEWORK";

// action const
export const REMOVE_QUESTIONS_FROM_HOMEWORK = "REMOVE_QUESTIONS_FROM_HOMEWORK";

// const for api path url
export const REMOVE_QUESTIONS_FROM_HOMEWORK_URL = (urlParams) =>
  `/teacher/question?question_id=${urlParams?.question_id}&homework_id=${urlParams?.homework_id}`;

/* REPORT QUESTION ERROR */
// getter constant
export const GET_REPORT_QUESTION_ERROR = "GET_REPORT_QUESTION_ERROR";

// mutation constant
export const SET_REPORT_QUESTION_ERROR = "SET_REPORT_QUESTION_ERROR";

// action const
export const REPORT_QUESTION_ERROR = "REPORT_QUESTION_ERROR";

// const for api path url
export const REPORT_QUESTION_ERROR_URL = `/report/error-report/question`;

// delete question page

export const DELETE_OWN_QUESTION = "DELETE_OWN_QUESTION";

export const GET_DELETE_OWN_QUESTION_DATA = "GET_DELETE_OWN_QUESTION_DATA";

export const SET_DELETE_OWN_QUESTION_DATA = "SET_DELETE_OWN_QUESTION_DATA";

export const GET_IS_OWN_QUESTION_DELETING = "GET_IS_OWN_QUESTION_DELETING";

export const SET_IS_OWN_QUESTION_DELETING = "SET_IS_OWN_QUESTION_DELETING";

export const DELETE_OWN_URL = (id) =>
  `teacher/delete-question?question_id=${id}`;
