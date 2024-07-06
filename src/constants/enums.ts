export enum ROUTES {
  Home = '/',
  Analytics = '/analytics',
  PartnersList = '/partners-list',
  offersList = '/offers-list',
  createOffers = ROUTES.offersList + '/create-offer',
}

export enum FORM_FIELD_TYPES {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  RADIO = 'radio',
  SELECT = 'select',
  MULTI_SELECT = 'multiselect',
  TEXT_AREA = 'textarea',
  FIELD_ARRAY = 'field_array',
  CHECKBOX = 'checkbox',
  SWITCH = 'switch',
  DATE_PICKER = 'datepicker',
  UPLOAD = 'upload',
  TIME_PICKER = 'timepicker',
  CUSTOM_COMPONENT = 'custom_component',
}

export enum QuestionResponseType {
  'DROPDOWN' = 'DROPDOWN',
  'RADIO' = 'RADIO',
  'MULTI_SELECT' = 'MULTISELECT',
  'FREE_TEXT' = 'FREE_TEXT',
}

export enum MODULES {
  AUDIT = 'Audit Management',
  WALKTHROUGH = 'Building walkthrough',
}
export enum LOCATIONS {
  BANGALORE = 'Bangalore',
  MUMBAI = 'Mumbai',
  DELHI = 'Delhi',
  HYDERABAD = 'Hyderabad',
  CHENNAI = 'Chennai',
  GURGAON = 'Gurgaon',
  NOIDA = 'Noida',
  PUNE = 'Pune',
}
export enum CATEGORY {
  FOOD = 'Food',
  LIFESTYLE = 'Lifestyle',
  TRAVEL = 'Travel',
  HEALTH = 'Health',
  TECHNOLOGY = 'Technology',
  ELECTRONICS = 'Electronics',
  OTHERS = 'Others',
}
