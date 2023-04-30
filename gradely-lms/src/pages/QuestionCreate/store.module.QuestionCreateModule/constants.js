import { API_BASE_URL } from "@/env";

// CREATE BULK QUESTIONS
// getter constant
export const GET_BULK_QUESTIONS = "GET_BULK_QUESTIONS";

// mutation constant
export const SET_BULK_QUESTIONS = "SET_BULK_QUESTIONS";

export const POST_BULK_QUESTIONS = "POST_BULK_QUESTIONS";

export const SET_IS_UPLOADING = "SET_IS_UPLOADING";

export const GET_IS_UPLOADING = "GET_IS_UPLOADING";
// action const

export const BULK_QUESTIONS_URL = "/teacher/upload-questions";

// edit question

//mutation
export const SET_IS_EDITING = "SET_IS_EDITING";
export const SET_EDIT_QUESTION = "SET_EDIT_QUESTION";

// getters
export const GET_IS_EDITING = "GET_IS_EDITING";
export const GET_EDIT_QUESTION = "GET_EDIT_QUESTION";

//action
export const PUT_EDIT_QUESTION = "PUT_EDIT_QUESTION";

// CREATE  QUESTIONS
// getter constant
export const GET_CREATE_QUESTIONS = "GET_CREATE_QUESTIONS";

// mutation constant
export const SET_CREATE_QUESTIONS = "SET_CREATE_QUESTIONS";

// action const
export const POST_CREATE_QUESTIONS = "POST_CREATE_QUESTIONS";

//question loader

//mutation
export const GET_QUESTION_LOADING = "GET_QUESTION_LOADING";

//action
export const SET_QUESTION_LOADING = "SET_QUESTION_LOADING";

export const QUESTIONS_URL = (payload) =>
  `/teacher/question/${
    payload?.question_type ? payload?.question_type : payload?.id
  }`;

//  EXTRACT EXCEL QUESTION FORMAT
// getter constant
export const GET_EXTRACTED_QUESTIONS = "GET_EXTRACTED_QUESTIONS";

// mutation constant
export const SET_EXTRACTED_QUESTIONS = "SET_EXTRACTED_QUESTIONS";

// action const
export const POST_EXTRACT_EXCEL_FORMAT_QUESTIONS =
  "POST_EXTRACT_EXCEL_FORMAT_QUESTIONS";

export const EXCEL_FORMAT_QUESTIONS_URL = "https://api.gradely.co/excel/v2";

//  EXTRACT AIKEN QUESTION FORMAT
// getter constant
export const GET_IS_EXTRACTING = "GET_IS_EXTRACTING";

export const SET_IS_EXTRACTING = "SET_IS_EXTRACTING";

// mutation constant
export const SET_TEXT_AIKEN_FORMAT_QUESTIONS =
  "SET_TEXT_AIKEN_FORMAT_QUESTIONS";

// action const
export const POST_EXTRACT_TEXT_AIKEN_FORMAT_QUESTIONS =
  "POST_EXTRACT_TEXT_AIKEN_FORMAT_QUESTIONS";

export const TEXT_AIKEN_FORMAT_QUESTIONS_URL =
  "https://api.gradely.co/aiken/v2";

//topic loading;

//getter
export const GET_TOPICS_LOADING = "GET_TOPICS_LOADING";

//mutation
export const SET_TOPICS_LOADING = "SET_TOPICS_LOADING";

//topics list getter constant
export const GET_TOPICS_LIST = "GET_TOPICS_LIST";

export const GET_TOPIC_STATUS = "GET_TOPIC_STATUS";

//topics list action;
export const FETCH_TOPIC_LIST = "FETCH_TOPIC_LIST";

export const CREATE_TOPIC = "CREATE_TOPIC";

//topics list mutation
export const SET_TOPIC_LIST = "SET_TOPIC_LIST";

export const SET_TOPIC_STATUS = "SET_TOPIC_STATUS";

export const ADD_TOPIC = "ADD_TOPIC";

export const NEW_TOPIC_URL = "/school/curriculum/topic";

export const TOPICS_URL = (query) => {
  return `/teacher/class-topics?global_class_id=${query?.global_class_id}&subject_id=${query?.subject_id}&class_id=${query.class_id}`;
};

export const SEARCH_TOPICS_URL = (query) => {
  return `/teacher/search-topic?global_class_id=${query?.global_class_id}&subject_id=${query?.subject_id}&topic=${query.topic}`;
};

export const SEARCH_TOPICS = "SEARCH_TOPICS";

// getter constant
export const GET_CLASS_QUESTION_DETAILS = "GET_CLASS_QUESTION_DETAILS";

// mutation constant
export const SET_CLASS_QUESTION_DETAILS = "SET_CLASS_QUESTION_DETAILS";

// action const
export const FETCH_CLASS_QUESTION_DETAILS = "FETCH_CLASS_QUESTIONS_DETAILS";

// const for api path url
export const CLASS_QUESTIONS_DETAILS_URL = (urlParams) =>
  `/teacher/question?question_id=${urlParams?.question_id}`;

export const GET_IS_SINGLE_LOADING = "GET_IS_SINGLE_LOADING";

export const SET_IS_SINGLE_LOADING = "SET_IS_SINGLE_LOADING";
