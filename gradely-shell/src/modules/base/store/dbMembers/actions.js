import { $serviceApi as api } from "@/services/service-api";

const routes = {
  school_class_students: "/school/classes/students/",
  school_class_teachers: "/school/teacher/",
  teacher_class_students: "/teacher/students/",
  teacher_school_classes: "/teacher/classes/group-classes",

  message_parent: "/general/send-message",

  remove_class_student: "/teacher/student/remove/",
  school_remove_class_student: "/school/student/",

  change_student_class: "/student/update-class",
  remove_teacher_class: "/school/teacher/class-remove",
};

// GET MEMBERS URL
const getMembersURL = (type, account) => {
  if (type === "students") {
    if (account === "school") return routes.school_class_students;
    else return routes.teacher_class_students;
  } else if (type === "teachers") return routes.school_class_teachers;
};

// GENERATE GETTERS
const generateMembersGetter = (type, getters) => {
  if (type === "students") return getters.getClassStudents;
  else if (type === "teachers") return getters.getClassTeachers;
};

// GENERATE MUTATIONS
const generateMembersMutation = (type) => {
  if (type === "students") return "UPDATE_CLASS_STUDENTS";
  else if (type === "teachers") return "UPDATE_CLASS_TEACHERS";
};

export default {
  // GET MEMBERS
  async getMembers(
    { commit, getters },
    { page = 1, class_id = null, account, type, search = false }
  ) {
    let { current_class_id, current_state, current_page } =
      generateMembersGetter(type, getters);

    // CHECK IF STUDENT HAS STATE
    // if (current_state.length && current_class_id === +class_id && !search) {
    //   console.log("HIT 1");

    //   return {
    //     code: 200,
    //     data: current_state,
    //     pagination: current_page,
    //   };
    // } else {
    let url_suffix = `page=${page}`;

    let response = await api
      .service("old")
      .fetch(`${getMembersURL(type, account)}${class_id}?${url_suffix}`);

    // COMMIT ONLY ON 200 RESPONSE
    response.code === 200
      ? search
        ? null
        : commit(generateMembersMutation(type), { ...response, class_id })
      : null;

    return response;
    // }
  },

  // GET ALL TEACHER SCHOOL CLASSESS
  async getTeacherSchoolClasses(_, class_id) {
    return await api
      .service("old")
      .fetch(`${routes.teacher_school_classes}?class_id=${class_id}`);
  },

  /**************** PUT REQUEST ******************/
  async changeStudentClass({ commit }, { account, student_id, class_id }) {
    let response = await api
      .service("old")
      .update(`/${account}${routes.change_student_class}`, {
        student_id,
        class_id,
      });

    if (response.code === 200) commit("EMPTY_CLASS_STUDENTS");

    return response;
  },

  /****************** DELETE REQUEST **********************/
  async removeStudentFromClass({ commit }, { account, student_id, class_id }) {
    let remove_route =
      account === "school"
        ? routes.school_remove_class_student
        : routes.remove_class_student;

    let response = await api
      .service("old")
      .remove(`${remove_route}${student_id}/${class_id}`);

    response.code === 200 ? commit("EMPTY_CLASS_STUDENTS") : null;

    return response;
  },

  //   REMOVE TEACHER FROM CLASS
  async removeTeacherFromClass({ commit }, { teacher_id, class_id }) {
    let response = await api
      .service("old")
      .remove(routes.remove_teacher_class, { class_id, teacher_id });

    response.code === 200 ? commit("EMPTY_CLASS_TEACHERS") : null;

    return response;
  },

  // SEND PARENT A MESSAGE FROM TEACHER OR SCHOOL END
  async messageParent(_, payload) {
    return await api.newService("old").push(routes.message_parent, payload);
  },
};
