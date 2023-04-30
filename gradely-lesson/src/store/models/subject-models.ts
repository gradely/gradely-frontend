export interface SubjectItemModel {
  id: string;
  name: string;
  description: string | null;
}

export interface SubjectModel {
    data: Array<SubjectItemModel>
    roles: any
};
