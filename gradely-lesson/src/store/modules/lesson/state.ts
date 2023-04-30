import { LessonModel } from '@/store/models';

const lessonState: LessonModel = {
  featured_game: null as any,
  featured_document: null as any,
  featured_video: null as any,
  seen_videos: null as any,
  content_ready: false as Boolean,
  lesson_recommendation: null as any,
  teacher_class_id: Number(localStorage.getItem('teacher_class_id')) || 8 as number|null,
}

export { lessonState as default };
