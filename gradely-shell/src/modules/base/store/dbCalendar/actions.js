import { $serviceApi as api } from "@/services/service-api";

const routes = {
  classCalendar: "/calender/teacher/",
};

// EXTRACT MONTH YEAR FROM SELECTED DATE
const extractMonthYear = (date) => {
  let date_state = date.split("-");
  return `${date_state[1]}-${date_state[0]}`;
};

export default {
  // GET CLASS CALENDAR
  async getClassCalendar({ commit, getters }, { class_id = null }) {
    let date = getters.getSelectedDate;

    let url_suffix = `date=${date}`;
    class_id ? (url_suffix += `&class_id=${class_id}`) : null;

    let response = await api
      .service("old")
      .fetch(`${routes.classCalendar}?${url_suffix}`);

    response.code === 200
      ? commit("UPDATE_CALENDAR_EVENT", response.data)
      : commit("UPDATE_CALENDAR_EVENT", []);

    return response;
  },

  // GET ALL MONTHLY EVENTS
  async getMonthlyActivities({ commit, getters }, teacher_id = null) {
    let month_year = extractMonthYear(getters.getSelectedDate);

    let url_suffix = `month=${month_year}`;
    let teacher = teacher_id ? teacher_id : "";

    let response = await api
      .service("old")
      .fetch(`${routes.classCalendar}${teacher}?${url_suffix}`);

    response.code === 200
      ? commit("UPDATE_MONTHLY_EVENT", response.data)
      : commit("UPDATE_MONTHLY_EVENT", []);

    return response;
  },

  // UPDATE SELECTED DATA STATE
  async updateSelectedDate({ commit }, date) {
    commit("UPDATE_CALENDAR_STATE", date);
  },
};
