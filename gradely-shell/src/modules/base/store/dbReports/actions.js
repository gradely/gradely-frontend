import { $serviceApi as api } from "@/services/service-api";

const routes = {
    classPerformance: "/report/class-performance",
    topicPerformance: "/report/class-student-performance",
    classReportSummary: "/report/class/summary/",
    classReport: "/report/class/mastery/",

    studentReport: "/student/report",
    newStudentReport: "/report/student-report",
    studentReportSubjects: "/report/student-report-subjects",
};

export default {
    // GET CLASS REPORT SUMMARY
    async getClassReportSummary(_, { class_id, term, subject_id }) {
        return await api
            .newService("old")
            .fetch(
                `${routes.classReportSummary}${class_id}?subject_id=${subject_id}&term=${term}`
            );
    },

    // GET CLASS REPORT
    async getClassReport(_, { class_id, term, subject_id }) {
        return await api
            .newService("old")
            .fetch(
                `${routes.classReport}${class_id}?subject_id=${subject_id}&term=${term}`
            );
    },

    // GET CLASS SUBJECT PERFORMANCE
    async getClassSubjectPerformance(_, { class_id, term, subject_id }) {
        return await api
            .service("old")
            .fetch(
                `${routes.classPerformance}?class_id=${class_id}&term=${term}&subject_id=${subject_id}`
            );
    },

    // GET CLASS TOPIC PERFORMANCE
    async getClassTopicPerformance(_, query_Payload) {
        return await api
            .service("old")
            .fetch(`${routes.topicPerformance}${query_Payload}`);
    },

    // GET STUDENT REPORT
    async getStudentReport({ commit }, { child_id, term = "", subject = "", exam_id = "", mode }) {
        let url_child_id = `?child_id=${child_id}&`;
        let url_mode = `mode=${mode}&`;
        let url_term = term ? `term=${term}&` : "";
        let url_subject = subject ? `subject=${subject}&` : "";
        let url_exam_id = exam_id ? `exam_id=${exam_id}` : "";
        let url_suffix = `${url_child_id}${url_mode}${url_term}${url_subject}${url_exam_id}`;

        let response = await api
            .service("old")
            .fetch(`${routes.studentReport}${url_suffix}`);

        response.code === 200 ?
            commit("UPDATE_STUDENT_REPORT", response.data) :
            null;

        return response;
    },

    async getStudentReportSubjects({ commit }, child_id = "") {
        let url_suffix = child_id ? `?student_id=${child_id}` : "";
        let response = await api
            .newService("old")
            .fetch(`${routes.studentReportSubjects}${url_suffix}`);
        if (response.code === 200)
            commit("UPDATE_STUDENT_REPORT_SUBJECTS", response.data);
        return response;
    },

    async getNewStudentReport({ commit }, { student_id = "", term, subject, mode }) {
        let student_id_suffix = student_id ? `&student_id=${student_id}` : "";

        let url_suffix = `?term=${term}&subject_id=${subject}&mode=${mode}${student_id_suffix}`;

        let response = await api
            .newService("old")
            .fetch(`${routes.newStudentReport}${url_suffix}`);

        response.code === 200 ?
            commit("UPDATE_NEW_STUDENT_REPORT", response.data) :
            null;

        return response;
    },

    /**
     *  SYNCHRONOUS ACTIONS
     */
};