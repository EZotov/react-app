import { Language } from "../types/enums.type";

const locale = {
  main_headline : {
    ru : 'Бронирование столов',
    en : 'Reservation Tables'
  },
  main_headline_adm : {
    ru : 'Бронирование столов. Администрирование',
    en : 'Reservation Tables. Administration'
  },
  user : {
    ru : 'Пользователь',
    en : 'User'
  },
  link_to_administration : {
    ru : 'Перейти в администрирование',
    en : 'To administration'
  },
  back : {
    ru : 'Назад',
    en : 'Back'
  },
  count_free_place : {
    ru : 'Свободно мест',
    en : 'Free places'
  },
  of : {
    ru : 'из',
    en : 'of'
  },
  table : {
    ru : 'Стол',
    en : 'Table'
  },
  constructor : {
    ru : 'Конструктор',
    en : 'Constructor'
  },
  hall : {
    ru : 'Зал',
    en : 'Hall'
  },
  free : {
    ru : 'Свободно',
    en : 'Free'
  },
  reserved : {
    ru : 'Занято',
    en : 'Reserved'
  },
  notSetting : {
    ru : 'Добавить место',
    en : 'Add place'
  },
  reserve_btn : {
    ru : 'Забронировать',
    en : 'Reserve'
  },
  reserve_form_headline : {
    ru : 'Информация о бронировании',
    en : 'Reservation Infomation'
  },
  form_name : {
    ru : 'На чьё имя забронировать',
    en : 'Name'
  },
  form_phone : {
    ru : 'Мобильный телефон',
    en : 'Phone'
  },
  places_count : {
    ru : 'Мест',
    en : 'Places'
  },
  add_hall : {
    ru : 'Добавить зал',
    en : 'Add hall'
  },
  delete : {
    ru : 'Удалить',
    en : 'Delete'
  },
  add_table : {
    ru : 'Добавить стол',
    en : 'Add table'
  },
  save_btn : {
    ru : 'Сохранить',
    en : 'Save'
  },
  square_type : {
    ru : 'Квадратный',
    en : 'Square'
  },
  circle_type : {
    ru : 'Круглый',
    en : 'Circle'
  },
  increment : {
    ru : 'Увеличить',
    en : 'Increment'
  },
  decrement : {
    ru : 'Уменьшить',
    en : 'Decrement'
  },
  sizeX : {
    ru : 'Размер по X',
    en : 'SizeX'
  },
  sizeY : {
    ru : 'Размер по Y',
    en : 'SizeY'
  },
  circle_size : {
    ru : 'Размер',
    en : 'Size'
  },
  count_places : {
    ru : 'Кол-во мест',
    en : 'Count places'
  }
};

export enum LocaleKeys {
  main_headline = 'main_headline',
  main_headline_adm = 'main_headline_adm',
  user = 'user',
  link_to_administration = 'link_to_administration',
  back = 'back',
  count_free_place = 'count_free_place',
  of = 'of',
  table = 'table',
  constructor = 'constructor',
  hall = 'hall',
  free = 'free',
  reserved = 'reserved',
  notSetting = 'notSetting',
  reserve_btn = 'reserve_btn',
  reserve_form_headline = 'reserve_form_headline',
  form_name = 'form_name',
  form_phone = 'form_phone',
  places_count = 'places_count',
  add_hall = 'add_hall',
  delete = 'delete',
  add_table = 'add_table',
  save_btn = 'save_btn',
  square_type = 'square_type',
  circle_type = 'circle_type',
  increment = 'increment',
  decrement = 'decrement',
  sizeX = 'sizeX',
  sizeY = 'sizeY',
  circle_size = 'circle_size',
  count_places = 'count_places'
}

export const t = (key : LocaleKeys, lang  = Language.russian) : string => {
  switch(lang) {
    case Language.english:
      return locale[key].en || '';
    case Language.russian:
      return locale[key].ru || '';
    default:
      return '';
  }
}
