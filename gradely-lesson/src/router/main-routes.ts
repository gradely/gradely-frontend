import { RouteConfig } from 'vue-router';

const mainRoutes: Array<RouteConfig> = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "mainLayout" */ '@/layouts/main-layout.vue'),
    meta: {
      requiresAuth: true,
      access: ['teacher'],
    },
    children: [
      {
        path: '',
        name: 'DiscoverLessons',
        component: () =>
          import(
            /* webpackChunkName: "mainRoute" */ '@/pages/main-pages/discover-lessons.vue'
          ),
      },
    ] as Array<RouteConfig>,
  },
  {
    path: '/',
    name: 'SlideLayout',
    component: () =>
      import(
        /* webpackChunkName: "slideLayout" */ '@/layouts/lesson-layout.vue'
      ),
    meta: {
      // requiresAuth: true,
      // access: ["teacher"],
    },
    children: [
      {
        path: '/slide',
        name: 'SlideLesson',
        component: () =>
          import(
            /* webpackChunkName: "slideRoute" */ '@/pages/main-pages/slide-lesson.vue'
          ),
      },
    ] as Array<RouteConfig>,
  },

  {
    path: '/',
    name: 'VideoLayout',
    component: () =>
      import(
        /* webpackChunkName: "videoLayout" */ '@/layouts/video-layout.vue'
      ),
    meta: {
      // requiresAuth: true,
      // access: ["teacher"],
    },
    children: [
      {
        path: '/video',
        name: 'VideoLesson',
        component: () =>
          import(
            /* webpackChunkName: "videoRoute" */ '@/pages/main-pages/video-lesson.vue'
          ),
      },
    ] as Array<RouteConfig>,
  },

  {
    path: '/',
    name: 'TeachingAidLayout',
    component: () =>
      import(
        /* webpackChunkName: "teachingaidLayout" */ '@/layouts/teaching-aid-layout.vue'
      ),
    meta: {
      // requiresAuth: true,
      // access: ["teacher"],
    },
    children: [
      {
        path: '/teaching-aid',
        name: 'TeachingAidLesson',
        component: () =>
          import(
            /* webpackChunkName: "teachingaidRoute" */ '@/pages/main-pages/teaching-aid-lesson.vue'
          ),
      },
    ] as Array<RouteConfig>,
  },

  {
    path: '/',
    name: 'EducationalGamesLayout',
    component: () =>
      import(
        /* webpackChunkName: "educationalGamesLayout" */ '@/layouts/educational-games-layout.vue'
      ),
    meta: {
      // requiresAuth: true,
      // access: ["teacher"],
    },
    children: [
      {
        path: '/educational-games',
        name: 'EducationalGamesLesson',
        component: () =>
          import(
            /* webpackChunkName: "educationalGamesRoute" */ '@/pages/main-pages/educational-games-lesson.vue'
          ),
      },
    ] as Array<RouteConfig>,
  },
];

export default mainRoutes;
