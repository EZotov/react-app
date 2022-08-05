import { Language } from "../types/enums.type";

const locale = {
  to_reservation_part : {
    ru : 'В часть бронирования',
    en : 'To reservation'
  },
  lang_title : {
    ru : 'Язык',
    en : 'Language'
  },
  lang_en : {
    ru : 'Английский',
    en : 'English'
  },
  lang_ru : {
    ru : 'Русский',
    en : 'Russian'
  },
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
  table_counts : {
    ru : 'Количество столов',
    en : 'Tables count'
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
  tableViewerHeadline : {
    ru : 'Бронирование мест стола',
    en : 'Reservation places of table'
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
  places_title : {
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
  to_reservation_part = 'to_reservation_part',
  lang_title = 'lang_title',
  lang_en = 'lang_en',
  lang_ru = 'lang_ru',
  main_headline = 'main_headline',
  main_headline_adm = 'main_headline_adm',
  user = 'user',
  link_to_administration = 'link_to_administration',
  back = 'back',
  count_free_place = 'count_free_place',
  of = 'of',
  table = 'table',
  constructor = 'constructor',
  table_counts = 'table_counts',
  hall = 'hall',
  free = 'free',
  tableViewerHeadline = 'tableViewerHeadline',
  reserved = 'reserved',
  notSetting = 'notSetting',
  reserve_btn = 'reserve_btn',
  reserve_form_headline = 'reserve_form_headline',
  form_name = 'form_name',
  form_phone = 'form_phone',
  places_title = 'places_title',
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

class Localization {
  initState = false;
  language = Language.russian;

  init() : void {
    this.initState = true;
  }

  changeLanguage(lang : Language) : void {
    if (this.initState) {
      this.language = lang;
    }
  }

  t(key : LocaleKeys) : string {
    if (this.initState) {
      switch(this.language) {
        case Language.english:
          return locale[key].en || '';
        case Language.russian:
          return locale[key].ru || '';
        default:
          return '';
      }
    }
    return '';
  }
}

const localization = new Localization();
const t = (key : LocaleKeys) => localization.t(key);
const init = () => localization.init();
const changeLanguage = (lang : Language) => localization.changeLanguage(lang);


export { init, t, changeLanguage };
