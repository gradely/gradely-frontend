import { $serviceApi as api } from "@/services/service-api";
import { deleteData, postData } from "../../scripts/api/axios.method";

const routes = {
  student_assessment_url: "/student/practice/homework-instruction/",
};

const state = {
  is_assesment_fetching: false,
  assesment_details: {},
  is_assesment_processing: false,
  assesment_processing_data: {},
  proctor_report: {},
  is_reporting: false,
  upload_data: {},
  is_uploading: false,
  delete_data: {},
  is_deleting: false,
};

const getters = {
  getIsAssesmentFetching: (state) => state.is_assesment_fetching,
  getAssesmentDetails: (state) => state.assesment_details,
  getIsAssesmentProcessing: (state) => state.is_assesment_processing,
  getProcessingDetails: (state) => state.assesment_processing_data,
  getProctorReportDetails: (state) => state.proctor_report,
  getIsReporting: (state) => state.is_reporting,
  getUploadData: (state) => state.upload_data,
  getIsUploading: (state) => state.is_uploading,
};

const mutations = {
  setIsAssesmentFetching(state, payload) {
    state.is_assesment_fetching = payload;
  },
  setAssesmentDetails(state, payload) {
    let assessment_details = JSON.parse(
      localStorage.getItem("assessment_details")
    );
    if (
      !!assessment_details &&
      assessment_details?.data?.id === payload?.data?.id
    ) {
      state.assesment_details = assessment_details;
      localStorage.removeItem("assessment_details");
    } else {
      state.assesment_details = payload;
    }
  },
  setIsAssesmentProcessing(state, payload) {
    state.is_assesment_processing = payload;
  },
  setProcessingDetails(state, payload) {
    state.assesment_processing_data = payload;
  },
  setIsReporting(state, payload) {
    state.is_reporting = payload;
  },
  setReportData(state, payload) {
    state.proctor_report = payload;
  },
  setIsUploading(state, payload) {
    state.is_uploading = payload;
  },
  setUploadData(state, payload) {
    state.upload_data = payload;
  },
  setIsDeleting(state, payload) {
    state.is_deleting = payload;
  },
  setQuestionOptions(state, { index, options }) {
    let updated_question = {
      ...state.assesment_details.data.questions[index],
      shuffled_options: options,
    };
    state.assesment_details.data.questions.splice(index, 1, updated_question);
  },
};

const actions = {
  startHomeworkAction({ commit }, payload) {
    commit("setIsAssesmentFetching", true);

    postData(
      `/student/practice/start-homework?student_id=${payload.student_id}`,
      { homework_id: payload.homework_id }
    )
      .then((response) => {
        commit("setAssesmentDetails", response?.data);
        commit("setIsAssesmentFetching", false);
      })
      .catch((err) => {
        commit("setIsAssesmentFetching", false);
        commit("setNetworkError", err);
        window.location = `${window.location.origin}/`;
        throw new Error(err);
      });
  },
  assesmentProcessAction({ commit }, payload) {
    commit("setIsAssesmentProcessing", true);
    postData("/student/practice/process-homework", payload)
      .then((response) => {
        commit("setProcessingDetails", response?.data);
        commit("setIsAssesmentProcessing", false);
      })
      .catch((err) => {
        commit("setIsAssesmentProcessing", false);
        commit("setNetworkError", err);
        throw new Error(err);
      });
  },
  uploadFile({ commit }, payload) {
    commit("setIsUploading", true);
    const optionalHeader = {
      "Content-Type": "multipart/form-data",
    };
    let url = `/aws/upload-file/${payload.folder}?base64=${payload.base || 1}${
      payload.overide ? `&newname=${payload.newName}` : ``
    }`;
    postData(url, payload.data, optionalHeader)
      .then((response) => {
        commit("setUploadData", response?.data);
        commit("setIsUploading", false);
      })
      .catch((err) => {
        commit("setIsUploading", false);
        commit("setNetworkError", err);
        throw new Error(err);
      });
  },
  deleteFile({ commit }, payload) {
    commit("setIsDeleting", true);
    const optionalHeader = {
      "Content-Type": "multipart/form-data",
    };
    let url = `/aws/delete-file?url=${payload}`;
    deleteData(url, payload.data, optionalHeader)
      .then((response) => {
        commit("setIsDeleting", response?.data);
        commit("setIsDeleting", false);
      })
      .catch((err) => {
        commit("setIsDeleting", false);
        commit("setNetworkError", err);
        throw new Error(err);
      });
  },
  postProctorResult({ commit }, payload) {
    commit("setIsReporting", true);
    postData("/student/proctor-report?bulk=1", payload)
      .then((response) => {
        commit("setReportData", response?.data);
        commit("setIsReporting", false);
      })
      .catch((err) => {
        commit("setIsReporting", false);
        commit("setNetworkError", err);
        throw new Error(err);
      });
  },

  updateQuestionShuffledOptions({ commit }, payload) {
    commit("setQuestionOptions", payload);
  },

  // GET EXAM ASSESSMENT DETAILS
  async getExamDetails(_, exam_id) {
    return await api
      .service("old")
      .fetch(`${routes.student_assessment_url}${exam_id}`);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
