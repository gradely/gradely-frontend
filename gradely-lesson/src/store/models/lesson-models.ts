export interface GameItemModel {
  category_name: string;
  game_description: string;
  game_id: number;
  game_image: string;
  game_title: string;
  group: string;
  id: number;
  level: string;
  subject: string;
  topic: string;
}

export interface DocumentItemModel {
  id: number;
  title: string;
  thumbnail: string | null;
  extension: string;
  file_type: string;
  file_size: string;
  file_duration: string;
  owner: string;
  downloadable: number;
  token: string;
  type: string;
  type_label: string;
  subject: string;
}

export interface VideoItemModel {
  id: 79;
  title: string;
  thumbnail: string;
  extension: string;
  file_type: string;
  file_size: string | null;
  file_duration: string;
  owner: string;
  downloadable: number;
  token: string;
  type: string;
  type_label: string;
  subject: string;
}

export interface SeenItemModel {
  downloadable: number;
  extension: string;
  file_duration: number;
  file_type: string;
  id: number;
  owner: string;
  seen_duration: string;
  size: string;
  subject: string;
  subject_id: string;
  thumbnail: string;
  title: string;
  token: string;
  type: string;
  type_label: string;
}

export interface PaginationModel {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  totalCount: number;
}

export interface LessonModel {
  featured_game: {
    items: Array<GameItemModel>;
    pagination: PaginationModel;
  };
  
  featured_document: {
    items: Array<DocumentItemModel>;
    pagination: PaginationModel;
  };

  featured_video: {
    items: Array<VideoItemModel>;
    pagination: PaginationModel;
  };

  seen_videos: {
    items: Array<SeenItemModel>;
    pagination: PaginationModel;
  };

  lesson_recommendation:Array<any>;

  content_ready:Boolean,

  teacher_class_id: Number| null
}
