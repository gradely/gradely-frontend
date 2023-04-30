import { $serviceApi as api } from "@/services/service-api";

const routes = {
  school_assessment: "/school/homeworks/",
  teacher_assessment: "/teacher/homework/class/",
  draft_assessment: "/teacher/homework/draft/",
  review_assessment: "/teacher/homework/class-review",
  share_resource_url: "/recommendations/share",

  pending_assessment_details: "/assessment/questions/",
  remove_assessment_question: "/teacher/question",
  approve_or_decline_exam: "/school/assessment/review-exam/",

  teacher_assessment_review: "/report/homework",
  student_assessment_review: "/student/homework/report/",
  teacher_assessment_details: "/report/homework/summary/",
  teacher_assessment_tour: "/report/homework/summary-tour/",

  update_assessment_question: "/teacher/homework/update-score/",
  report_student_question: "/report/error-report/question",
  clear_student_assessment: "/teacher/homework/student/",

  new_assessment: "/student/new-homework",
  completed_assessment: "/student/completed-homework",
  school_notes: "/student/class-notes",
  school_videos: "/student/class-videos",

  student_class_teachers: "/student/class/class-teachers/",
  student_class_subjects: "/student/class/class-subjects/",

  assessment_report_url: "/teacher/catchup/homework-summary-proctor/",
  assessment_review_url: "",

  extend_assessment_deadline: "/teacher/homework/extend/",
  manage_assessment_url: "/teacher/homework/",
};

// GET ASSESSMENT URL
const getAssessmentURL = (type, account) => {
  if (type === "published") {
    if (account === "school") return routes.school_assessment;
    else return routes.teacher_assessment;
  } else if (type === "draft") return routes.draft_assessment;
  else if (type === "review") return routes.review_assessment;
};

// GENERATE GETTERS
const generateAssessmentGetter = (type, getters) => {
  if (type === "published") return getters.getPublishedAssessment;
  else if (type === "draft") return getters.getDraftedAssessment;
  else if (type === "review") return getters.getReviewAssessment;
};

// GENERATE MUTATIONS
const generateAssessmentMutation = (type) => {
  if (type === "published") return "UPDATE_PUBLISHED_ASSESSMENT";
  else if (type === "draft") return "UPDATE_DRAFTED_ASSESSMENT";
  else if (type === "review") return "UPDATE_REVIEW_ASSESSMENT";
};

// GENERATE SCHOOLWORK URL
const getSchoolWorkURL = (type) => {
  if (type === "new") return routes.new_assessment;
  else if (type === "completed") return routes.completed_assessment;
  else if (type === "notes") return routes.school_notes;
  else if (type === "videos") return routes.school_videos;
};

// GENERATE SCHOOLWORK GETTER
const getSchoolWorkGetters = (type, getters) => {
  if (type === "new") return getters.getNewAssessment;
  else if (type === "completed") return getters.getCompletedAssessment;
  else if (type === "notes") return getters.getSchoolNotes;
  else if (type === "videos") return getters.getSchoolVideos;
};

// GENERATE SCHOOLWORK MUTATION
const getSchoolWorkMutations = (type) => {
  if (type === "new") return "UPDATE_NEW_ASSESSMENT";
  else if (type === "completed") return "UPDATE_COMPLETED_ASSESSMENT";
  else if (type === "notes") return "UPDATE_SCHOOL_NOTES";
  else if (type === "videos") return "UPDATE_SCHOOL_VIDEOS";
};

export default {
  // GET ASSESSMENT
  async getSchoolTeacherAssessment(
    { commit, getters },
    { page, class_id = null, account, type, search = false }
  ) {
    let { current_id, current_state, current_page } = generateAssessmentGetter(
      type,
      getters
    );

    // CHECK IF STUDENT HAS STATE
    if (current_state.length && current_id === class_id && !search)
      return api.deliverFromStore(current_state, current_page);
    else {
      let url_suffix =
        type === "review"
          ? `class_id=${class_id}&page=${page}`
          : `page=${page}`;

      let response = await api
        .service("old")
        .fetch(
          `${getAssessmentURL(type, account)}${
            type === "review" ? "" : class_id
          }?${url_suffix}`
        );

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? search
          ? null
          : commit(generateAssessmentMutation(type), {
              ...response,
              id: class_id,
            })
        : null;

      return response;
    }
  },

  // GET ALL PARENT STUDENT SCHOOL WORK
  async getSchoolWork(
    { commit, getters },
    {
      page = 1,
      type,
      child_id,
      search = false,
      subject_id = null,
      creator_id = null,
      assessment_type = null,
      search_value = null,
    }
  ) {
    let { current_id, current_state, current_page } = getSchoolWorkGetters(
      type,
      getters
    );

    // CHECK IF STUDENT HAS STATE
    if (current_state.length && current_id === child_id && !search)
      return api.deliverFromStore(current_state, current_page);
    else {
      let url_suffix = `page=${page}`;
      subject_id ? (url_suffix += `&subject_id=${subject_id}`) : null;
      creator_id ? (url_suffix += `&creator_id=${creator_id}`) : null;
      assessment_type ? (url_suffix += `&type=${assessment_type}`) : null;
      search_value ? (url_suffix += `&search=${search_value}`) : null;

      let response = await api
        .service("old")
        .fetch(`${getSchoolWorkURL(type)}?child_id=${child_id}&${url_suffix}`);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? search
          ? null
          : commit(getSchoolWorkMutations(type), {
              ...response,
              id: child_id,
            })
        : null;

      return response;
    }
  },

  async getAssessmentInfo({ commit }, { id, tour: tour = false }) {
    let url_suffix = "";
    tour ? (url_suffix += `?tour=${tour}`) : "";

    let route = tour
      ? routes.teacher_assessment_tour
      : routes.teacher_assessment_details;

    let response = await api
      .newService("old")
      .fetch(`${route}${id}${url_suffix}`);

    if (response.code === 200 && response?.data)
      commit("UPDATE_ASSESSMENT_REPORT", response?.data);
    return response;
  },

  async getPendingAssessmentInfo(_, homework_id) {
    return await api
      .newService("old")
      .fetch(`${routes.pending_assessment_details}${homework_id}`);
  },

  async updateAssessmentQuestion(_, { attempt_id, update_info }) {
    return await api
      .newService("old")
      .update(routes.update_assessment_question + attempt_id, update_info);
  },

  // REMOVE A QUESTION FROM A PENDING ASSESSMENT LIST
  async removePendingExamQuestion(_, { homework_id, question_id }) {
    return await api
      .service("old")
      .remove(
        `${routes.remove_assessment_question}?question_id=${question_id}&homework_id=${homework_id}`
      );
  },

  // APPROVE OR DECLINE PENDING ASSESSMENT
  async approveOrDeclineExam(_, { homework_id, assessment_info }) {
    return await api
      .newService("old")
      .update(
        `${routes.approve_or_decline_exam}${homework_id}`,
        assessment_info
      );
  },

  // GET CHILD'S CLASS SUBJECTS
  async getChildClassSubjects(_, class_id) {
    return await api
      .newService("old")
      .fetch(`${routes.student_class_subjects}${class_id}`);
  },

  // GET CHILD'S CLASS TEACHERS
  async getChildClassTeachers(_, class_id) {
    return await api
      .newService("old")
      .fetch(`${routes.student_class_teachers}${class_id}`);
  },

  // FETCH ASSESSMENT DETAILS
  async getAssessmentDetails({ commit, getters }, { homework_id, type }) {
    let { assessment_id, students } = getters.getAssessmentStudents;

    if (homework_id === assessment_id && type === "student")
      return {
        code: 200,
        data: students,
      };
    else {
      let response = await api
        .service("old")
        .fetch(
          `${routes.teacher_assessment_review}?id=${homework_id}&data=${type}`
        );

      response.code === 200
        ? type === "student"
          ? commit("UPDATE_STUDENT_ASSESSMENT", {
              ...response,
              id: homework_id,
            })
          : null
        : null;

      return response;
    }
  },

  // GET STUDENT ASSESSMENT REPORT DATA ON TEACER END
  async getAssessmentReport(_, { student_id, assessment_id }) {
    return await api
      .service("old")
      .fetch(`${routes.assessment_report_url}${student_id}/${assessment_id}`);
  },

  // GET STUDENT ASSESSMENT DETAILS
  async getStudentAssessmentDetails(_, { homework_id, child_id = null }) {
    return await api
      .service("old")
      .fetch(
        `${routes.student_assessment_review}${homework_id}?child_id=${child_id}`
      );
  },

  // EXTEND ASSESSMENT DATE
  async updateAssessmentDeadline(
    { commit, getters },
    { deadlineDate, assessment_id }
  ) {
    let response = await api
      .service("old")
      .update(
        `${routes.extend_assessment_deadline}${assessment_id}`,
        deadlineDate
      );

    if (response.code === 200) {
      let currentAssessment = getters.getPublishedAssessment;

      let updatedData = currentAssessment.current_state.map((assessment) => {
        if (assessment.id === assessment_id) {
          assessment.close_date = deadlineDate.close_date;
          assessment.open_date = deadlineDate.open_date;
          assessment.is_closed = 0;
        }
        return assessment;
      });

      let updatedAssessment = {
        pagination: currentAssessment.current_page,
        id: currentAssessment.current_id,
        data: updatedData,
      };

      commit("UPDATE_PUBLISHED_ASSESSMENT", updatedAssessment);
    }

    return response;
  },

  // RESTART ASSESSMENT
  async restartAssessment({ commit, getters }, { password, assessment_id }) {
    let response = await api
      .service("old")
      .update(
        `${routes.manage_assessment_url}${assessment_id}/restart`,
        password
      );

    if (response.code === 200) {
      let currentAssessment = getters.getPublishedAssessment;

      let updatedData = currentAssessment.current_state.map((assessment) => {
        if (assessment.id === assessment_id) {
          assessment.close_date = response.data.close_date;
          assessment.open_date = response.data.open_date;
          assessment.submitted_students = 0;
          assessment.is_taken = response.data.is_taken;
        }
        return assessment;
      });

      let updatedAssessment = {
        pagination: currentAssessment.current_page,
        id: currentAssessment.current_id,
        data: updatedData,
      };
      commit("UPDATE_PUBLISHED_ASSESSMENT", updatedAssessment);
    }
    return response;
  },

  // EDIT ASSESSMENT
  async editAssessment(
    { commit, getters },
    { assessment_id, assessment_type, assessment_update }
  ) {
    let response = await api
      .service("old")
      .update(
        `${routes.manage_assessment_url}${assessment_id}`,
        assessment_update
      );

    if (response.code === 200) {
      let currentAssessment =
        assessment_type === "published"
          ? getters.getPublishedAssessment
          : getters.getDraftedAssessment;

      let new_commit =
        assessment_type === "published"
          ? "UPDATE_PUBLISHED_ASSESSMENT"
          : "UPDATE_DRAFTED_ASSESSMENT";

      let updatedData = currentAssessment.current_state.map((assessment) => {
        if (assessment.id === assessment_id) {
          assessment.title = assessment_update.title;
          assessment.tag = assessment_update.tag;
        }
        return assessment;
      });

      let updatedAssessment = {
        pagination: currentAssessment.current_page,
        id: currentAssessment.current_id,
        data: updatedData,
      };

      commit(new_commit, updatedAssessment);
    }
    return response;
  },

  // SHARE RECOMMENDATION RESOURCE
  async shareResources(_, payload) {
    return await api.newService("old").push(routes.share_resource_url, payload);
  },

  async reportStudentAssessment(_, report) {
    return await api
      .service("old")
      .push(routes.report_student_question, report);
  },

  async clearStudentAssessment(_, { student_id, class_id, assessment_id }) {
    let url_suffix = `${student_id}?class_id=${class_id}&homework_id=${assessment_id}`;
    return await api
      .newService("old")
      .remove(routes.clear_student_assessment + url_suffix);
  },

  /**************  DELETE REQUEST  ************/
  // DELETE ASSESSMENT
  async deleteAssessment(
    { commit, getters },
    { assessment_id, assessment_type }
  ) {
    let response = await api
      .service("old")
      .remove(`${routes.manage_assessment_url}${assessment_id}`);

    if (response.code === 200) {
      let currentAssessment =
        assessment_type === "published"
          ? getters.getPublishedAssessment
          : getters.getDraftedAssessment;

      let new_commit =
        assessment_type === "published"
          ? "UPDATE_PUBLISHED_ASSESSMENT"
          : "UPDATE_DRAFTED_ASSESSMENT";

      let updatedData = currentAssessment.current_state.filter((assessment) => {
        return assessment.id !== assessment_id;
      });

      let updatedAssessment = {
        pagination: currentAssessment.current_page,
        id: currentAssessment.current_id,
        data: updatedData,
      };
      commit(new_commit, updatedAssessment);
    }
    return response;
  },
};
