export default () => ({
  token: localStorage.getItem("gradelyAuthToken") || "",
  authUser: JSON.parse(localStorage.getItem("authUser")) || "",
});
