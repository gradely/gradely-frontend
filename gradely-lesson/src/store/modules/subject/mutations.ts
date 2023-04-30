import { MutationTree } from 'vuex';
import { SubjectModel } from '@/store/models';

// ENUM
export enum mutations {}

const subjectMutations: MutationTree<SubjectModel> = {
    SET_CLASS_SUBJECTS: (state, payload) => {
        // state.data = {...payload} as any;
        state.data = [...payload] as any;   
    },

    SET_TEACHER_ROLES:(state,roles)=>{
        state.roles = roles as any;
    }
};

export { subjectMutations as default };
