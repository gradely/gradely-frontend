import { $serviceApi as api } from "@/services/service-api";

const routes = {
  weeklyData: "/school/week/",
  approvedExamData: "/school/general/week/exam",
  pendingExamData: "/school/general/week/exam-review",
  weeklyDiscussionURL: "/school/week/discussion",
};

// GENERATE WEEKLY GETTER
const generateWeeklyGetter = (weekly, getters) => {
  if (weekly === "homework") return getters.getWeeklyHomework;
  else if (weekly === "exam") return getters.getWeeklyExam;
  else if (weekly === "live-class") return getters.getWeeklyLiveClass;
  else if (weekly === "event") return getters.getWeeklyEvent;
  else if (weekly === "note") return getters.getWeeklyNote;
  else if (weekly === "discussion") return getters.getWeeklyDiscussion;
};

// GENERATE WEEKLY MUTATION
const generateWeeklyMutation = (weekly) => {
  if (weekly === "homework") return "UPDATE_WEEKLY_HOMEWORK";
  else if (weekly === "exam") return "UPDATE_WEEKLY_EXAM";
  else if (weekly === "live-class") return "UPDATE_WEEKLY_LIVECLASS";
  else if (weekly === "event") return "UPDATE_WEEKLY_EVENT";
  else if (weekly === "note") return "UPDATE_WEEKLY_NOTE";
  else if (weekly === "discussion") return "UPDATE_WEEKLY_DISCUSSION";
};

export default {
  // GET WEEKLY HOMEWORK IN SCHOOL
  async getWeeklyData(
    { commit, getters },
    {
      page = 1,
      weekly_type,
      counter = null,
      search = false,
      teacher = null,
      subject = null,
      class_name = null,
    }
  ) {
    let { current_state, current_page, current_count } = generateWeeklyGetter(
      weekly_type,
      getters
    );

    // CHECK IF HOMEWORK HAS CONTENT
    if (current_state.length && current_count === counter && !search)
      return api.deliverFromStore(current_state, current_page);
    /**
     * CHECK IF COUNTER IS 0
     */ else if (counter === 0) return api.deliverFromStore();
    /**
     * FETCH FROM DATABASE
     */ else {
      let url_suffix = `page=${page}`;
      teacher ? (url_suffix += `&teacher=${teacher}`) : null;
      subject ? (url_suffix += `&subject=${subject}`) : null;
      class_name ? (url_suffix += `&class=${class_name}`) : null;

      let response = await api
        .service("old")
        .fetch(`${routes.weeklyData}${weekly_type}?${url_suffix}`);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? search
          ? null
          : commit(generateWeeklyMutation(weekly_type), {
              ...response,
              counter,
            })
        : null;

      return response;
    }
  },

  // GET APPROVED WEEKLY EXAMS
  async getApprovedWeeklyExams(
    _,
    { page = 1, teacher = null, subject = null, class_name = null }
  ) {
    let url_suffix = `page=${page}`;
    teacher ? (url_suffix += `&teacher=${teacher}`) : null;
    subject ? (url_suffix += `&subject=${subject}`) : null;
    class_name ? (url_suffix += `&class=${class_name}`) : null;

    return await api
      .newService("old")
      .fetch(`${routes.approvedExamData}?${url_suffix}`);
  },

  // GET PENDING WEEKLY EXAMS
  async getPendingWeeklyExams(
    _,
    { page = 1, teacher = null, subject = null, class_name = null }
  ) {
    let url_suffix = `page=${page}`;
    teacher ? (url_suffix += `&teacher=${teacher}`) : null;
    subject ? (url_suffix += `&subject=${subject}`) : null;
    class_name ? (url_suffix += `&class=${class_name}`) : null;

    return await api
      .newService("old")
      .fetch(`${routes.pendingExamData}?${url_suffix}`);
  },

  // GET WEEKLY DISCUSSION
  async getWeeklyDiscussion(_, { page }) {
    return await api
      .service("old")
      .fetch(`${routes.weeklyDiscussionURL}?page=${page}`);
  },

  updatePendingExamSelection(
    { commit, getters },
    { id = null, ids = [], bulk = false }
  ) {
    if (bulk) commit("UPDATE_SELECTED_PENDING_EXAM", ids);
    else {
      // CHECK IF ID ALREADY EXIST
      let is_exist = getters.getPendingExamSelected.findIndex(
        (item) => item === id
      );

      if (is_exist === -1)
        commit("UPDATE_SELECTED_PENDING_EXAM", [
          ...getters.getPendingExamSelected,
          id,
        ]);
      else {
        getters.getPendingExamSelected.splice(is_exist, 1);
        commit("UPDATE_SELECTED_PENDING_EXAM", getters.getPendingExamSelected);
      }
    }
  },
};
