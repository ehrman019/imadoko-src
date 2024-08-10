export type memberState = {
  id: number;
  name: string;
  tel: string;
  email: string;
  create_at: string;
  updated_at: string;
};

export type scheduleState = {
  id: number;
  member_id: number;
  date: string;
  situation: number;
  depature_time: string;
  return_time: string;
  comment: string;
  created_at: string;
  updated_at: string;
};

export type formDataState = {
  id: number | null;
  member_id: number;
  date: string;
  situation: number;
  depature_time: string;
  return_time: string;
  comment: string;
};
