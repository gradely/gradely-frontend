import { GetterTree } from 'vuex';
import { SubjectModel } from '@/store/models';

const subjectGetters: GetterTree<SubjectModel, any> = {
    getClassSubjects: (state) => state.data,
    getTeacherRoles:(state) => state.roles
};

export { subjectGetters as default };
