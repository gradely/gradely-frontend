import { GetterTree } from 'vuex';
import { LessonModel } from '@/store/models';

const lessonGetters: GetterTree<LessonModel, any> = {
  getFeaturedGames: (state) => state.featured_game,
  getFeaturedDocuments: (state) => state.featured_document,
  getFeaturedVideos: (state) => state.featured_video,
  getSeenVideos: (state) => state.seen_videos,
  isContentReady:(state)=>state.content_ready,
  getRecommendations:(state)=>state.lesson_recommendation,
  getClassID:(state)=>state.teacher_class_id
};

export { lessonGetters as default };
