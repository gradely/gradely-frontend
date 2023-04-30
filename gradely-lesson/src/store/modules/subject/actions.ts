import { $serviceApi as api } from '../../../services/service-api';
import { ActionTree } from 'vuex';
import { SubjectModel } from '@/store/models';

const routes = {
    classSubjectsRoute: "/general/class-subject/",
	teacherSubjectClasses:"/teacher/classes-subjects?with_student=1"
};

const subjectActions: ActionTree<SubjectModel, any> = {
  async fetchClassSubjects({ commit, rootGetters }) {
    let response = await api
      .newService('old')
      .fetch(`${routes.classSubjectsRoute}${rootGetters['lesson/getClassID']}`);

    if (response && response?.code === 200 && response?.data !== null) {
      commit('SET_CLASS_SUBJECTS', response.data);
    }
  },

	async fetchTeacherRoles({ commit }) {
		let response = await api
				.service('old')
				.fetch(routes.teacherSubjectClasses)

		if (response && response?.code === 200 && response?.data !== null) {
				commit("SET_TEACHER_ROLES", response.data);
		}

		return response.data;
},

};

export { subjectActions as default };
