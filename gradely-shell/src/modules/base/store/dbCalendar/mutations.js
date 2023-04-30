export default {
  // UPDATE CALENDAR STATE
  UPDATE_CALENDAR_STATE: (state, data) => (state.selected_date = data),

  // UPDATE CALENDAR EVENT
  UPDATE_CALENDAR_EVENT: (state, data) => (state.calendar_event = data),

  // UPDATE MONTHLY EVENT
  UPDATE_MONTHLY_EVENT: (state, data) => (state.monthly_event = data),
};
