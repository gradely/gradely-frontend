import { $serviceApi as api } from '../../../services/service-api';
import { ActionTree } from 'vuex';
import { LessonModel } from '@/store/models';

const routes = {
  lessonsRoute: '/library/lesson/',
  upload_lesson: '/library/lesson/create',
  share_lesson: '/library/lesson/share',
  teacher_recommendation: '/library/last-recommendations?limit=6',
  share_recommendation: '/recommendations/share',
  report_lesson: '/report/error-report/video',
  like_dislike_content: '/library/lesson/like',
  update_view: '/library/lesson/add_views',
};

const lessonActions: ActionTree<LessonModel, any> = {
  async fetchFeaturedData(
    { commit, getters },
    { limit, page = 1, search = '' }
  ) {
    let response = await api
      .newService('old')
      .fetch(
        `${routes.lessonsRoute}${getters.getClassID}?limit=${limit}&page=${page}${search}`
      );
    if (
      response &&
      response?.code === 200 &&
      response?.data !== null &&
      page == 1
    ) {
      commit('SET_FEATURED_VIDEOS', response?.data?.featured_video || []);
      commit('SET_FEATURED_DOCUMENTS', response?.data?.featured_document || []);
      commit('SET_FEATURED_GAMES', response?.data?.feature_game || []);
      commit('SET_SEEN_VIDEOS', response?.data?.seen_videos || []);
      commit('PREPARE_CONTENT');
    }
    return response;
  },

  async uploadLesson(_, payload) {
    return await api.newService('old').push(routes.upload_lesson, payload);
  },

  async shareLesson(_, payload) {
    return await api.newService('old').push(routes.share_lesson, payload);
  },

  async fetchTeacherRecommendations({ commit }) {
    let response = await api
      .newService('old')
      .fetch(routes.teacher_recommendation);
    if (response && response.code === 200)
      commit('SET_LESSON_RECOMMENDATIONS', response.data);
  },

  async shareTeacherRecommendation(_, payload) {
    return await api
      .newService('old')
      .push(routes.share_recommendation, payload);
  },

  async reportLesson(_, payload) {
    return await api.service('old').push(routes.report_lesson, payload);
  },

  async likeOrDislikeLesson(_, payload) {
    return await api
      .newService('old')
      .push(routes.like_dislike_content, payload);
  },

  async updateViewCount(_, payload) {
    return await api.newService('old').push(routes.update_view, payload);
  },
};

export { lessonActions as default };
