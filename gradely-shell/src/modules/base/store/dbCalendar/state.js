let new_date = new Date();

export default () => ({
  selected_date: `${new_date.getFullYear()}-${new_date.getMonth() +
    1}-${new_date.getDate()}`,

  calendar_event: [],
  monthly_event: [],
});
