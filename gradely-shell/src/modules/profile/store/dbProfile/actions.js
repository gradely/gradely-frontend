import { $serviceApi as api } from "@/services/service-api";

const routes = {
    schoolProfile: "/school/profile/school",
    teacherProfile: "/school/teacher/profile/",

    studentProfileSchool: "/school/student/profile/",
    studentProfileTeacher: "/teacher/student/",
    studentParent: "/teacher/class/student-parents/",

    postRemarkURL: "/student/report/remark/student",
    updateRemark: "/student/report/remark/student/",
    deleteRemark: "/student/report/remark/student/",
};

const getStudentProfileURL = (type) => {
    if (type === "school") return routes.studentProfileSchool;
    else return routes.studentProfileTeacher;
};

export default {
    // GET SCHOOL PROFILE DATA
    async getSchoolProfileData({ commit, getters }) {
        let school_profile = getters.getSchoolProfile;

        // CHECK IF SCHOOL PROFILE GETTER HAS DATA ALREADY
        if (Object.keys(school_profile).length)
            return api.deliverFromStore(school_profile);
        else {
            let response = await api.service("old").fetch(routes.schoolProfile);

            // COMMIT ONLY ON 200 RESPONSE
            response.code === 200 ?
                commit("UPDATE_SCHOOL_PROFILE", response.data) :
                null;

            return response;
        }
    },

    // GET PROFILE DETAILS
    async getTeacherProfileData(_, id) {
        return await api.service("old").fetch(`${routes.teacherProfile}${id}`);
    },

    async getStudentParent(_, child_id) {
        return await api
            .newService("old")
            .fetch(`${routes.studentParent}${child_id}`);
    },

    async getStudentProfile({ commit, getters }, { id, type, subject = null, term = null, search = false }) {
        let profile = getters.getStudentProfile;

        // CHECK IF TEACHER PROFILE ID IS STORED
        if (profile.id === id && !search) return api.deliverFromStore(profile.data);
        else {
            let url_suffix = "";
            subject ? (url_suffix += `?subject=${subject}`) : `?subject=`;
            term
                ?
                subject ?
                (url_suffix += `&term=${term}`) :
                (url_suffix += `?term=${term}`) :
                `&term=`;

            let response = await api
                .service("old")
                .fetch(`${getStudentProfileURL(type)}${id}${url_suffix}`);

            // COMMIT ONLY ON 200 RESPONSE
            response.code === 200 ?
                commit("UPDATE_STUDENT_PROFILE", {
                    id,
                    data: response.data,
                }) :
                null;

            return response;
        }
    },

    // ***********************
    //POST REQUEST
    //************************
    async sendStudentRemark(_, remark) {
        return await api.newService("old").push(routes.postRemarkURL, remark);
    },

    async updateStudentRemark(_, { remark, subject_id, remark_id }) {
        return await api
            .newService("old")
            .update(routes.updateRemark + remark_id, { remark, subject_id });
    },

    async deleteRemark(_, remark_id) {
        return await api.newService("old").remove(routes.deleteRemark + remark_id);
    },
};