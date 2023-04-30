import { $serviceApi as api } from "@/services/service-api";

const routes = {
  feeds_url: "/feed/",
  get_video_link: "/student/catchup/watch-video/",
  upcoming_event_url: "/upcoming",
  library_summary_url: "/library/summary/",
  log_video_url: "/student/catchup/video",

  initialize_diagnostic: "/student/catchup/initialize-diagnostic",
  initialize_recommendation: "/student/catchup/initialize-practice",
  get_diagnostic_url: "/student/catchup/diagnostic-subjects",
  get_recomendation_url: "/student/catchup/daily-recommendation",

  library_document_url: "/student/class/notes",
  library_video_url: "/library/video",
  class_video_url: "/student/class/videos",
  delete_library_file_url: "/library/delete-file",

  // RESOURCES
  create_discussion_url: "/announcement",
  create_live_class_url: "/feed/live-class",
  create_lesson_url: "/teacher/homework/lesson",
  create_assessment_url: "/teacher/homework/homework",

  generate_live_class_link: "/feed/get-live-class-token",
  get_live_class_random_link: "/class/",

  get_teacher_topic_url: "/teacher/class-topics",

  comment_url: "/comment/",

  like_post_url: "/feed/like/",
  like_comment_url: "/feed/like-comment/",

  report_feed_url: "/report/error-report/feed",
  delete_feed_url: "/feed/delete-feed/",

  report_comment_url: "/report/error-report/comment",
  delete_comment_url: "/feed/delete-comment/",

  // LIVE CLASS
  start_class_url: "/learning/live-class/start-class",
  join_class_url: "/learning/live-class/join-class",
  end_class_url: "/learning/live-class/end-class",
  guest_join_class: "/learning/live-class/join-as-visitor/",
  attend_class: "/learning/live-class/class-details",

  reschedule_class_url: "/live-class/reschedule/",
  update_class_url: "/live-class/update/",
  cancel_class_url: "/live-class/",

  // SUMMER COURSES
  summer_courses: "/summer-school/subjects",
  registered_courses: "/summer-school/registered-subjects",
};

export default {
  // GET ALL USER ACCOUNT FEED DATA
  async getFeedsData(
    { commit, getters },
    {
      account_id = null,
      student_id = null,
      page = null,
      type = null,
      search = false,
      filter = null,
    }
  ) {
    let { id, current_data, current_page } = getters.getFeeds;

    if (id === account_id && data.length && !search)
      return api.deliverFromStore(current_data, current_page);
    else {
      // let url_suffix = `?class_id=${account_id}`;
      let url_suffix = "";
      account_id ? (url_suffix += `?class_id=${account_id}`) : null;

      if (student_id)
        url_suffix += account_id
          ? `&student_id=${student_id}`
          : `?student_id=${student_id}`;

      page ? (url_suffix += `&page=${page}`) : null;
      type ? (url_suffix += `&type=${type}`) : null;
      filter ? (url_suffix += `&creator_types=${filter}`) : null;

      let response = await api
        .newService("old")
        .fetch(`${routes.feeds_url}${url_suffix}`);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? search
          ? null
          : commit("UPDATE_FEEDS_DATA", {
              account_id,
              ...response,
            })
        : null;

      return response;
    }
  },

  // GET FEED THREAD
  async getFeedThread(_, token) {
    return await api.newService("old").fetch(`${routes.feeds_url}${token}`);
  },

  // GET SCHOOL STUDENTS LIST
  async getUpcomingEventData(
    { commit, getters },
    { account_id, account_type }
  ) {
    let { id, data } = getters.getUpcomingEvents;

    // CHECK IF STUDENT HAS STATE
    if (id === account_id && data.length) return api.deliverFromStore(data);
    else {
      let response = await api
        .service("old")
        .fetch(`${routes.upcoming_event_url}?${account_type}=${account_id}`);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? commit("UPDATE_UPCOMING_EVENTS", { account_id, ...response })
        : null;

      return response;
    }
  },

  // GENERATE VIDEO LINK
  async getVideoLink(_, token) {
    return await api.service("old").fetch(`${routes.get_video_link}${token}`);
  },

  // GET DIAGNOSTIC CONTENT
  async getDiagnosticContent({ commit }, child_id) {
    let response = await api
      .service("old")
      .fetch(`${routes.get_diagnostic_url}?child=${child_id}`);
    if (response.code === 200)
      commit("UPDATE_DIAGNOSTIC_CONTENT", response.data);
    return response;
  },

  // INITIALIZE DIAGNOSTICS
  async initializeDiagnostics(_, { payload, use_child_token }) {
    return await api
      .service("old")
      .push(
        routes.initialize_diagnostic,
        payload,
        true,
        false,
        use_child_token
      );
  },

  // INITIALIZE PRACTICE
  async initializePractice(_, { payload, use_child_token }) {
    return await api
      .service("old")
      .push(
        routes.initialize_recommendation,
        payload,
        true,
        false,
        use_child_token
      );
  },

  // GET RECOMENDATION CONTENT
  async getRecomendationContent({ commit }, child_id) {
    let response = await api
      .service("old")
      .fetch(`${routes.get_recomendation_url}?child=${child_id}`);
    if (response.code === 200)
      commit("UPDATE_RECOMMENDATION_CONTENT", response.data);
    return response;
  },

  // GET LIBRARY DATA
  async getLibrarySummary(_, class_id) {
    return await api
      .newService("old")
      .fetch(`${routes.library_summary_url}${class_id}`);
  },

  // GET FEED DOCUMENTS
  async getLibraryDocuments(
    _,
    { limit = 10, page = 1, class_id = null, child_id = null, filter = null }
  ) {
    let url_suffix = "&sort=most_recent&order=desc";

    class_id ? (url_suffix += `&class_id=${class_id}`) : null;
    child_id ? (url_suffix += `&child_id=${child_id}`) : null;
    filter ? (url_suffix += `${filter}`) : null;

    return await api
      .newService("old")
      .fetch(
        `${routes.library_document_url}?limit=${limit}&page=${page}${url_suffix}`
      );
  },

  // GET FEED DISCUSSION
  async getLibraryVideos(_, { class_id, page }) {
    return await api
      .service("old")
      .fetch(`${routes.library_video_url}?class_id=${class_id}&page=${page}`);
  },

  async getClassVideos(_, { class_id, page, child_id = null, filter = null }) {
    let url_suffix = "&sort=most_recent&order=desc";

    class_id ? (url_suffix += `&class_id=${class_id}`) : null;
    child_id ? (url_suffix += `&child_id=${child_id}`) : null;
    filter ? (url_suffix += `${filter}`) : null;

    return await api
      .newService("old")
      .fetch(
        `${routes.class_video_url}?class_id=${class_id}&page=${page}${url_suffix}`
      );
  },

  // DELETE A FILE FROM LIBRARY
  async deleteLibraryFile(_, token) {
    return await api
      .service("old")
      .remove(`${routes.delete_library_file_url}`, { token });
  },

  // COMMENT ON A FEED POST
  async postFeedComment(_, { feed_id, payload }) {
    return await api
      .service("old")
      .push(`${routes.comment_url}${feed_id}`, payload);
  },

  // LIKE USER POST
  async likeFeedPost(_, feed_id) {
    return await api
      .newService("old")
      .push(`${routes.like_post_url}${feed_id}`);
  },

  // LIKE USER POST COMMENT
  async likeFeedComment(_, feed_id) {
    return await api
      .newService("old")
      .push(`${routes.like_comment_url}${feed_id}`);
  },

  // REPORT POST
  async reportFeedPost(_, payload) {
    return await api.service("old").push(routes.report_feed_url, payload);
  },

  // DELETE FEED POST
  async deleteFeedPost(_, feed_id) {
    return await api
      .service("old")
      .remove(`${routes.delete_feed_url}${feed_id}`);
  },

  // REPORT COMMENT
  async reportFeedComment(_, payload) {
    return await api.service("old").push(routes.report_comment_url, payload);
  },

  // DELETE COMMENT
  async deleteFeedComment(_, { feed_id, comment_id }) {
    return await api
      .service("old")
      .remove(`${routes.delete_comment_url}${feed_id}/${comment_id}`);
  },

  // LOG WATCHED VIDEO DURATION
  async logWatchedVideo(_, { id, data, source }) {
    return await api
      .service("old")
      .update(`${routes.log_video_url}/${id}?source=${source}`, data);
  },

  // CREATE DISCUSSIOM
  async createDiscussion({ commit }, { payload, child_id = null }) {
    let url_suffix = "";
    child_id ? (url_suffix += `?child=${child_id}`) : "";

    let response = await api
      .service("old")
      .push(`${routes.create_discussion_url}${url_suffix}`, payload);

    response.code === 200 ? commit("RESET_FEEDS_DATA") : null;
    return response;
  },

  // CREATE LIVE CLASS
  async createLiveClass({ commit }, { tutor, payload }) {
    let url_suffix = "";
    tutor ? (url_suffix += `?is_tutor=1`) : "";

    let response = await api
      .newService("old")
      .push(`${routes.create_live_class_url}${url_suffix}`, payload);

    response.code === 200 ? commit("RESET_FEEDS_DATA") : null;
    return response;
  },

  async generateLiveClassLink({ commit }) {
    let response = await api
      .newService("old")
      .fetch(routes.generate_live_class_link);
    if (response.code === 200)
      commit("UPDATE_TEACHER_LIVE_CLASS", response.data);
    return response;
  },

  async getLiveClassRandomLink(_, room) {
    return await api
      .verionlessService()
      .fetch(routes.get_live_class_random_link + room);
  },

  // CREATE ASSESSMENT
  async createAssessment({ commit }, { payload, tour = 0 }) {
    let url_suffix = "";
    tour ? (url_suffix += `?tour=${tour}`) : "";

    let response = await api
      .service("old")
      .push(`${routes.create_assessment_url}${url_suffix}`, payload);

    response.code === 200 ? commit("RESET_FEEDS_DATA") : null;
    return response;
  },

  // CREATE LESSON
  async createLesson({ commit }, payload) {
    let response = await api
      .service("old")
      .push(routes.create_lesson_url, payload);

    response.code === 200 ? commit("RESET_FEEDS_DATA") : null;
    return response;
  },

  // FETCH ALL TEACHER TOPICS
  async fetchTeacherTopics(_, { global_class_id, subject_id }) {
    let url_suffix = "";
    global_class_id
      ? (url_suffix += `&global_class_id=${global_class_id}`)
      : null;
    subject_id ? (url_suffix += `&subject_id=${subject_id}`) : null;

    return await api
      .service("old")
      .fetch(`${routes.get_teacher_topic_url}?${url_suffix}`);
  },

  //******************
  //  LIVE CLASSES
  // *****************/
  // START CLASS
  async startClass({ commit }, session_id) {
    let response = await api
      .service("old")
      .update(routes.start_class_url, { session_id });

    response.code === 200 ? commit("RESET_FEEDS_DATA") : null;

    return response;
  },

  // JOIN CLASS
  async joinClass({ commit }, payload) {
    let response = await api
      .service("old")
      .update(routes.join_class_url, payload);

    response.code === 200 ? commit("RESET_FEEDS_DATA") : null;

    return response;
  },

  // JOIN CLASS AS GUEST
  async joinClassAsGuest(_, room_link) {
    let response = await api
      .service("old")
      .fetch(routes.guest_join_class + room_link);
    return response;
  },

  async attendLiveClass(_, { class_name, name, image, user_id, is_tutor }) {
    let response = await api
      .service("old")
      .fetch(
        `${routes.attend_class}?class=${class_name}&name=${name}&image=${image}&user_id=${user_id}&is_tutor=${is_tutor}`
      );
    return response;
  },

  // END CLASS
  async endClass({ commit }, session_id) {
    let response = await api
      .service("old")
      .update(routes.end_class_url, { session_id });

    response.code === 200 ? commit("RESET_FEEDS_DATA") : null;

    return response;
  },

  // RESCHEDULE LIVE CLASS
  async rescheduleLiveClass({ commit }, { session_id, availability }) {
    let response = await api
      .service("old")
      .update(`${routes.reschedule_class_url}${session_id}`, { availability });

    response.code === 200 ? commit("RESET_FEEDS_DATA") : null;

    return response;
  },

  // UPDATE LIVE CLASS DETAILS
  async updateLiveClass({ commit }, { session_id, payload }) {
    let response = await api
      .service("old")
      .update(`${routes.update_class_url}${session_id}`, payload);

    response.code === 200 ? commit("RESET_FEEDS_DATA") : null;

    return response;
  },

  // CANCEL LIVE CLASS
  async cancelLiveClass({ commit }, session_id) {
    let response = await api
      .service("old")
      .remove(`${routes.cancel_class_url}${session_id}`);

    response.code === 200 ? commit("RESET_FEEDS_DATA") : null;

    return response;
  },

  // GET SUMMER COURSES
  async getSummerCourses({ commit, getters }) {
    let courses = getters.getSummerCourses;

    // CHECK IF COURSES EXIST IN STATE
    if (courses.length) return api.deliverFromStore(courses);
    else {
      let response = await api.newService("old").fetch(routes.summer_courses);

      // COMMIT ONLY ON 200 RESPONSE
      response.code === 200
        ? commit("UPDATE_SUMMER_COURSES", response.data)
        : null;

      return response;
    }
  },

  // GET ACTIVE SUMMER COURSES
  async getActiveSummerCourses(_, student_id) {
    return await api
      .newService("old")
      .fetch(`${routes.registered_courses}?student_id=${student_id}`);
  },
};
