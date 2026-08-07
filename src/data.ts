import { CardData, PrimaryFilter, LevelFilter } from './types';

export const PRIMARY_FILTERS: PrimaryFilter[] = [
  { id: 'college', text: 'الكلية' },
  { id: 'campuses', text: 'المقرات' },
  { id: 'levels', text: 'المستويات' }
];

export const LEVEL_FILTERS: LevelFilter[] = [
  { id: 'level-1', text: 'الأول' },
  { id: 'level-2', text: 'الثاني' },
  { id: 'level-3', text: 'الثالث' },
  { id: 'level-4', text: 'الرابع' },
  { id: 'level-5', text: 'الخامس' },
  { id: 'level-6', text: 'السادس' },
  { id: 'level-7', text: 'السابع' },
  { id: 'level-8', text: 'الثامن' },
  { id: 'level-9', text: 'التاسع' },
  { id: 'level-10', text: 'العاشر' }
];

export interface CampusFilter {
  id: string;
  text: string;
}

export const CAMPUS_FILTERS: CampusFilter[] = [
  { id: 'campus-main', text: 'الرئيسي' },
  { id: 'campus-rass', text: 'الرس' },
  { id: 'campus-unaizah', text: 'عنيزة' }
];

export const PRESET_THEMES = {
  blue: '#2563eb', // Beautiful rich blue corresponding to Elegant Dark specification
  sky: '#0284c7',  // Clean corporate sky blue
  indigo: '#4f46e5' // Sleek tech indigo
};

export const SITE_DATA: CardData[] = [
  {
    category: 'college',
    level: 'college',
    title: 'المجموعات العامة',
    icon: 'fa-globe',
    sections: [
      {
        title: "كلية الحاسب",
        icon: "fa-university",
        links: [
          { href: "https://t.me/qassimuniversityc", type: "channel", icon: "fa-bullhorn", text: "القناة", status: "active" },
          { href: "https://t.me/qassimuniversityIT", type: "group", icon: "fa-users", text: "مجموعة المناقشة", status: "open" }
        ]
      },
      {
        title: "حوسب",
        icon: "fa-laptop-code",
        links: [
          { href: "https://t.me/COC_QU_channel", type: "channel", icon: "fa-bullhorn", text: "القناة", status: "active" },
          { href: "https://t.me/COC_QU", type: "group", icon: "fa-users", text: "مجموعة المناقشة", status: "open" }
        ]
      },
      {
        title: "خريجين الحاسب",
        icon: "fa-graduation-cap",
        links: [
          { href: "https://t.me/qucomputerstudents", type: "group", icon: "fa-users", text: "مجموعة المناقشة", status: "open" }
        ]
      }
    ]
  },
  {
    category: 'campuses',
    level: 'campus-main',
    title: 'المقر الرئيسي',
    icon: 'fa-building-columns',
    sections: [
      {
        title: 'طالبات',
        icon: 'fa-female',
        links: [
          { href: "https://maps.app.goo.gl/wMTh72giA8rG7ixp8?g_st=ic", type: "group", icon: "fa-location-dot", text: "موقع الكلية", status: "active" },
          { href: "#floor-plan-female", specialAction: "female-floor-plan", type: "group", icon: "fa-map-location-dot", text: "مخطط المبنى", status: "active" }
        ]
      },
      {
        title: 'طلاب',
        icon: 'fa-male',
        links: [
          { href: "https://maps.app.goo.gl/RfuEejZKpSbUaxua7?g_st=ic", type: "group", icon: "fa-location-dot", text: "موقع الكلية", status: "active" },
          { href: "#floor-plan-male", specialAction: "male-floor-plan", type: "group", icon: "fa-map-location-dot", text: "مخطط المبنى", status: "active" }
        ]
      }
    ]
  },
  {
    category: 'campuses',
    level: 'campus-rass',
    title: 'مقر الرس',
    icon: 'fa-city',
    sections: [
      {
        title: 'طالبات',
        icon: 'fa-female',
        links: [
          { href: "https://maps.app.goo.gl/ziGGqiiRmVWgAsK77", type: "group", icon: "fa-location-dot", text: "موقع الكلية", status: "active" }
        ]
      },
      {
        title: 'طلاب',
        icon: 'fa-male',
        links: [
          { href: "https://maps.app.goo.gl/FpWckdfczc1Zw9SGA", type: "group", icon: "fa-location-dot", text: "موقع الكلية", status: "active" }
        ]
      }
    ]
  },
  {
    category: 'campuses',
    level: 'campus-unaizah',
    title: 'مقر عنيزة',
    icon: 'fa-school',
    sections: [
      {
        title: 'طالبات',
        icon: 'fa-female',
        links: [
          { href: "https://goo.gl/maps/5cXcGmWgRgxCFugY8", type: "group", icon: "fa-location-dot", text: "موقع الكلية", status: "active" }
        ]
      }
    ]
  },
  {
    category: 'levels',
    level: 'level-1',
    title: 'المستوى الأول',
    icon: 'fa-layer-group',
    sections: [
      {
        title: "مستديم",
        icon: "fa-owl",
        links: [
          { href: "https://t.me/addlist/LH-wE8fs_4ExNjE0", type: "initiative", icon: "fa-folder", text: "مجلد مواد المستوى", status: "active" }
        ]
      },
      {
        title: "حوسب",
        icon: "fa-laptop-code",
        links: [
          { href: "https://t.me/hawsib1", type: "channel", icon: "fa-bullhorn", text: "قناة المستوى", status: "active" },
          { href: "https://t.me/hawsib_1", type: "group", icon: "fa-users", text: "مناقشة المستوى", status: "open" }
        ]
      }
    ]
  },
  {
    category: 'levels',
    level: 'level-2',
    title: 'المستوى الثاني',
    icon: 'fa-layer-group',
    sections: [
      {
        title: "مستديم",
        icon: "fa-owl",
        links: [
          { href: "https://t.me/addlist/UZHn4fPZTvI4ODBk", type: "initiative", icon: "fa-folder", text: "مجلد مواد المستوى" }
        ]
      },
      {
        title: "حوسب",
        icon: "fa-laptop-code",
        links: [
          { href: "https://t.me/hawsib2", type: "channel", icon: "fa-bullhorn", text: "قناة المستوى" },
          { href: "https://t.me/hawsib2", type: "group", icon: "fa-users", text: "مناقشة المستوى" }
        ]
      }
    ]
  },
  {
    category: 'levels',
    level: 'level-3',
    title: 'المستوى الثالث',
    icon: 'fa-layer-group',
    sections: [
      {
        title: "مستديم",
        icon: "fa-owl",
        links: [
          { href: "https://t.me/addlist/WY-nb6Wz4EtkYjZk", type: "initiative", icon: "fa-folder", text: "مجلد مواد المستوى" }
        ]
      },
      {
        title: "حوسب",
        icon: "fa-laptop-code",
        links: [
          { href: "https://t.me/hawsib3", type: "channel", icon: "fa-bullhorn", text: "قناة المستوى" },
          { href: "https://t.me/hawsib_3", type: "group", icon: "fa-users", text: "مناقشة المستوى" }
        ]
      },
      {
        title: "مبادرات الدفعة",
        icon: "fa-hands-helping",
        links: [
          { href: "https://t.me/Computerlanaxir", type: "channel", icon: "fa-bullhorn", text: "Computer", status: "active" },
          { href: "https://t.me/rrenhk", type: "channel", icon: "fa-bullhorn", text: "HKR", status: "closed" }
        ]
      }
    ]
  },
  {
    category: 'levels',
    level: 'level-4',
    title: 'المستوى الرابع',
    icon: 'fa-layer-group',
    sections: [
      {
        title: "مستديم",
        icon: "fa-owl",
        links: [
          { href: "https://t.me/addlist/ED-1PugxTU42NjE8", type: "initiative", icon: "fa-folder", text: "مجلد مواد المستوى" }
        ]
      },
      {
        title: "حوسب",
        icon: "fa-laptop-code",
        links: [
          { href: "https://t.me/hawsib3", type: "channel", icon: "fa-bullhorn", text: "قناة المستوى" },
          { href: "https://t.me/hawsib4", type: "group", icon: "fa-users", text: "مناقشة المستوى" }
        ]
      },
      {
        title: "مبادرات الدفعة",
        icon: "fa-hands-helping",
        links: [
          { href: "https://t.me/COMPUTERRLEVEL4", type: "channel", icon: "fa-bullhorn", text: "Computer", status: "active" },
          { href: "https://t.me/yshwjksve", type: "channel", icon: "fa-bullhorn", text: "HKR", status: "open" }
        ]
      }
    ]
  },
  {
    category: 'levels',
    level: 'level-5',
    title: 'المستوى الخامس',
    icon: 'fa-layer-group',
    sections: [
      {
        title: "مستديم",
        icon: "fa-owl",
        links: [
          { href: "https://t.me/addlist/ZtRnIlkmJTljZWU8", type: "initiative", icon: "fa-code", text: "CS", status: "active" },
          { href: "https://t.me/addlist/g8wWumeEK18zYWE8", type: "initiative", icon: "fa-microchip", text: "CE", status: "active" },
          { href: "https://t.me/addlist/BTe1AeQZS5pjNWE8", type: "initiative", icon: "fa-laptop", text: "IT", status: "active" }
        ]
      },
      {
        title: "Moves",
        icon: "fa-route",
        links: [
          { href: "https://t.me/CSl472Level5", type: "initiative", icon: "fa-code", text: "CS", status: "open" },
          { href: "https://t.me/Level5COE", type: "initiative", icon: "fa-microchip", text: "CE", status: "open" },
          { href: "https://t.me/+x1qfgmHNDJBkMGFk", type: "initiative", icon: "fa-laptop", text: "IT", status: "active" }
        ]
      },
      {
        title: "Computer",
        icon: "fa-laptop",
        links: [
          { href: "https://t.me/COMPUTERLEVEL5", type: "initiative", icon: "fa-globe", text: "جميع التخصصات" }
        ]
      },
      {
        title: "HKR",
        icon: "fa-user-secret",
        links: [
          { href: "https://t.me/levelvivcs", type: "initiative", icon: "fa-code", text: "CS" }
        ]
      }
    ]
  },
  {
    category: 'levels',
    level: 'level-6',
    title: 'المستوى السادس',
    icon: 'fa-layer-group',
    sections: [
      {
        title: "Computer",
        icon: "fa-laptop",
        links: [
          { href: "https://t.me/computerlevel6", type: "initiative", icon: "fa-globe", text: "جميع التخصصات" },
          { href: "https://t.me/CSlevel6", type: "initiative", icon: "fa-code", text: "CS" },
          { href: "https://t.me/COELevel6Recordings", type: "initiative", icon: "fa-microchip", text: "CE" },
          { href: "https://t.me/+relODoa9IOdhNjI8", type: "initiative", icon: "fa-laptop", text: "IT" }
        ]
      },
      {
        title: "Moves",
        icon: "fa-route",
        links: [
          { href: "https://t.me/COC_6_moves", type: "initiative", icon: "fa-globe", text: "جميع التخصصات" },
          { href: "https://t.me/CSlevel6", type: "initiative", icon: "fa-code", text: "CS" },
          { href: "https://t.me/COELevel6", type: "initiative", icon: "fa-microchip", text: "CE" },
          { href: "https://t.me/ITmoves472lvl6", type: "initiative", icon: "fa-laptop", text: "IT" }
        ]
      },
      {
        title: "HKR",
        icon: "fa-user-secret",
        links: [
          { href: "https://t.me/level6css", type: "initiative", icon: "fa-code", text: "CS" }
        ]
      }
    ]
  },
  {
    category: 'levels',
    level: 'level-7',
    title: 'المستوى السابع',
    icon: 'fa-layer-group',
    sections: [
      {
        title: "Computer",
        icon: "fa-laptop",
        links: [
          { href: "https://t.me/COMPUTERLEVEL_7", type: "initiative", icon: "fa-globe", text: "جميع التخصصات" }
        ]
      },
      {
        title: "Moves",
        icon: "fa-route",
        links: [
          { href: "https://t.me/COC_7_moves", type: "initiative", icon: "fa-globe", text: "جميع التخصصات" }
        ]
      },
      {
        title: "HKR",
        icon: "fa-user-secret",
        links: [
          { href: "https://t.me/hkriie", type: "initiative", icon: "fa-code", text: "CS" }
        ]
      }
    ]
  },
  {
    category: 'levels',
    level: 'level-8',
    title: 'المستوى الثامن',
    icon: 'fa-layer-group',
    sections: [
      {
        title: "Computer",
        icon: "fa-laptop",
        links: [
          { href: "https://t.me/+e5BVsgTxwzE2YTQ0", type: "initiative", icon: "fa-globe", text: "جميع التخصصات" }
        ]
      },
      {
        title: "Moves",
        icon: "fa-route",
        links: [
          { href: "https://t.me/COC_8_moves", type: "initiative", icon: "fa-globe", text: "جميع التخصصات" }
        ]
      },
      {
        title: "HKR",
        icon: "fa-user-secret",
        links: [
          { href: "https://t.me/level8cs", type: "initiative", icon: "fa-code", text: "CS" }
        ]
      }
    ]
  },
  {
    category: 'levels',
    level: 'level-9',
    title: 'المستوى التاسع',
    icon: 'fa-layer-group',
    sections: [
      {
        title: "Computer",
        icon: "fa-laptop",
        links: [
          { href: "https://t.me/+e5BVsgTxwzE2YTQ0", type: "initiative", icon: "fa-globe", text: "جميع التخصصات" }
        ]
      }
    ]
  },
  {
    category: 'levels',
    level: 'level-10',
    title: 'المستوى العاشر',
    icon: 'fa-layer-group',
    sections: [
      {
        title: "Computer",
        icon: "fa-laptop",
        links: [
          { href: "https://t.me/+1V10TL04xv9jNzE0", type: "initiative", icon: "fa-globe", text: "جميع التخصصات" }
        ]
      }
    ]
  }
];
