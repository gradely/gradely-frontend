export interface UserDataModel {
  id: number;
  code: string;
  school_id: string | number | null;
  school_name: string | null;
  school_slug: string | null;
  school_owner: string | null;
  country: string | null;
  state: string | null;
  class_code: number | string;
  class_name: string | null;
  mode: string;
  full_name: string;
  email: string;
  image: string;
  is_boarded: boolean;
  is_tutor: boolean;
  relationship: string;
  entry_timestamp: number;
  cap_token: string;
  term: string;
  week: number;
  session: string;
}

export interface AuthUserModel extends UserDataModel {}

export interface AuthModel {
  token: string;
  authUser: AuthUserModel;
}
