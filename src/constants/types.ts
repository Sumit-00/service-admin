export interface Tag {
  id?: number;
  name: string;
  description?: string;
  created_at?: string;
}

export interface ChecklistCategory {
  id?: number;
  name: string;
  description: string;
  type?: string;
  created_at?: Date;
  value?: number;
  label?: string;
}

export type Checklist = {
  id: number;
  name: string;
  category: string;
  module: string;
  is_draft: boolean;
  is_active: boolean;
  created_at: string;
  created_by: string;
};

export interface ChecklistMetaData {
  id?: number;
  name: string;
  module: string;
  sub_module?: string;
  created_by?: string;
  updated_by?: string;
  is_draft?: boolean;
  is_active?: boolean;
}

export interface QuestionOption {
  id?: number;
  question_id?: number;
  name: string;
  is_active?: boolean;
  created_at?: Date;
}

export interface QuestionMetaData {
  id?: number;
  question_id?: number;
  text?: string;
  category_id?: number;
  tags?: Array<Tag | number>;
  tag_ids?: Array<Tag | number>;
  options?: Array<QuestionOption | string>;
  response_type?: string;
  created_by?: string;
  is_draft?: boolean;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface QuestionConfigData {
  id?: number;
  question_id: number;
  category_id: number;
  is_mandatory: boolean;
  checklist_id?: number;
  score?: number;
  is_critical: boolean;
  is_photo_required: boolean;
  has_remarks: boolean;
  is_active?: boolean;
}

export interface UserType {
  id: number;
  uuid: string;
  name: string;
  email: string;
  territory: string;
  photo_url: null;
  employee_code: string;
}
export interface CreatedByEntity {
  id: number;
  name: string;
  email: string;
  uuid: string;
}

export interface AssigneeEntity {
  id: number;
  name: string;
  email: string;
  uuid: string;
}

export interface BuildingEntity {
  id: number;
  name: string;
  city: string;
}

export interface ScheduleData {
  id?: number;
  assignee: AssigneeEntity;
  active_duration?: number;
  checklist: Checklist;
  building: BuildingEntity;
  created_at?: string;
  created_by?: CreatedByEntity;
  is_active?: boolean;
  start_date: string;
  end_date: string;
  start_time?: string;
  is_repetitive?: boolean;
  repeat_rule_id?: number;
  updated_at?: string;
}

export interface GetAPIResponse<T> {
  success?: boolean;
  path?: string;
  statusCode?: number;
  message?: string;
  data?: T;
}

export interface GetPaginatedAPIResponse<T> {
  success?: boolean;
  path?: string;
  statusCode?: number;
  message?: string;
  data?: ResponseData<T>;
}

export interface ResponseData<T> {
  paginatedData?: Array<T>;
  data?: Array<T>;
  meta: Meta;
  links?: Links;
}

export type Links = {
  current?: string;
};

export type Meta = {
  itemsPerPage?: number;
  totalItems?: number;
  currentPage?: number;
  totalPages?: number;
  sortBy?: Array<string[]>;
};

export interface BrandDataType {
  id?: number | string;
  brandName: string;
  location: Array<string>;
  category: string;
  validity: Date;
  url: string;
  coupon: string;
  brandLogo: string;
  productImage: string;
  brandColor: string;
  offerDesc: string;
  terms: string;
  redemption_count: string | number;
  offerName: string;
}
