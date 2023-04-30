import { MutationTree } from 'vuex';
import { LessonModel } from '@/store/models';

// ENUM
export enum mutations {}

const lessonMutations: MutationTree<LessonModel> = {
  SET_FEATURED_VIDEOS: (state, payload) => {
    state.featured_video = { ...payload } as any;
  },

  SET_FEATURED_DOCUMENTS: (state, payload) => {
    state.featured_document = { ...payload } as any;
  },

  SET_FEATURED_GAMES: (state, payload) => {
    state.featured_game = { ...payload } as any;
  },

  SET_SEEN_VIDEOS: (state, payload) => {
    state.seen_videos = { ...payload } as any;
  },

  PREPARE_CONTENT:(state)=>state.content_ready=true,

  SET_LESSON_RECOMMENDATIONS : (state,data) => state.lesson_recommendation=data,

  SET_TEACHER_CLASS:(state,id)=>{
    localStorage.setItem('teacher_class_id',id);
    state.teacher_class_id = id;
  }
};

export { lessonMutations as default };
