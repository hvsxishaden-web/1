import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Icon from './Icon';
import FemaleVisualBlueprint from './FemaleVisualBlueprint';
import MaleVisualBlueprint from './MaleVisualBlueprint';

interface FloorMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGender?: 'male' | 'female';
}

interface RoomItem {
  id: string;
  name: string;
  code?: string;
  subtext?: string;
  category: 'labs' | 'classrooms' | 'offices' | 'facilities';
  zone: 'east' | 'center' | 'west'; // East = المعامل والمكاتب, Center = القاعات, West = الخدمات والمرافق
  icon: string;
  dept?: string;
}

interface FloorData {
  id: 'ground' | 'first' | 'second';
  title: string;
  subtitle: string;
  rooms: RoomItem[];
}

const MALE_FLOORS: FloorData[] = [
  {
    id: 'ground',
    title: 'الدور الأرضي',
    subtitle: 'معامل علوم الحاسب، الإدارة الرئيسية، والخدمات الطلابية',
    rooms: [
      // المعامل والورش (East / Center)
      { id: 'g-121', name: 'معمل 121', code: 'Lab - CS Net', subtext: 'معمل شبكات الحاسب', category: 'labs', zone: 'east', icon: 'fa-network-wired', dept: 'CS' },
      { id: 'g-122', name: 'معمل 122', code: 'Lab - CS Dev', subtext: 'معمل تطوير البرمجيات', category: 'labs', zone: 'east', icon: 'fa-code', dept: 'CS' },
      { id: 'g-123', name: 'معمل 123', code: 'Lab - CS OS', subtext: 'معمل نظم التشغيل', category: 'labs', zone: 'east', icon: 'fa-laptop-code', dept: 'CS' },
      { id: 'g-124', name: 'معمل 124', code: 'Lab - CS Algo', subtext: 'معمل الخوارزميات', category: 'labs', zone: 'east', icon: 'fa-square-binary', dept: 'CS' },
      { id: 'g-125', name: 'معمل 125', code: 'Lab - CS Web', subtext: 'معمل برمجة الويب', category: 'labs', zone: 'east', icon: 'fa-globe', dept: 'CS' },
      { id: 'g-126', name: 'معمل 126', code: 'Lab - CS AI', subtext: 'معمل الذكاء الاصطناعي', category: 'labs', zone: 'east', icon: 'fa-brain', dept: 'CS' },
      { id: 'g-sec', name: 'معمل أمن الشبكات', code: 'Network Security Lab', subtext: 'معمل حماية الأنظمة والشبكات', category: 'labs', zone: 'east', icon: 'fa-shield-halved', dept: 'CS' },

      // القاعات (Center)
      { id: 'cs-101', name: 'قاعة CS 101', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'CS' },
      { id: 'cs-102', name: 'قاعة CS 102', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'CS' },
      { id: 'cs-103', name: 'قاعة CS 103', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'CS' },
      { id: 'cs-104', name: 'قاعة CS 104', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'CS' },
      { id: 'cs-105', name: 'قاعة CS 105', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'CS' },
      { id: 'cs-106', name: 'قاعة CS 106', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'CS' },
      { id: 'cs-107', name: 'قاعة CS 107', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'CS' },
      { id: 'cs-108', name: 'قاعة CS 108', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'CS' },
      { id: 'cs-109', name: 'قاعة CS 109', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'CS' },

      // الإدارة والمكاتب (East / Center)
      { id: 'cs-head', name: 'مكتب رئيس قسم علوم الحاسب', category: 'offices', zone: 'east', icon: 'fa-user-tie', dept: 'إدارة' },
      { id: 'cs-board', name: 'مجلس قسم علوم الحاسب', category: 'offices', zone: 'east', icon: 'fa-users-gear', dept: 'إدارة' },
      { id: 'student-affairs', name: 'شؤون الطلاب', category: 'offices', zone: 'center', icon: 'fa-id-card', dept: 'إدارة' },
      { id: 'club-supervisor', name: 'مشرف النادي الطلابي', category: 'offices', zone: 'center', icon: 'fa-user-check', dept: 'إدارة' },
      { id: 'cs-staff', name: 'مكاتب أعضاء هيئة التدريس (علوم الحاسب)', category: 'offices', zone: 'east', icon: 'fa-graduation-cap', dept: 'CS' },

      // المرافق والخدمات (West)
      { id: 'main-entrance', name: 'المدخل الرئيسي', category: 'facilities', zone: 'west', icon: 'fa-door-open' },
      { id: 'cafeteria', name: 'الكافيتريا', category: 'facilities', zone: 'west', icon: 'fa-utensils' },
      { id: 'mosque-g', name: 'المصلى', category: 'facilities', zone: 'west', icon: 'fa-kaaba' },
      { id: 'gym', name: 'الصالة الرياضية', category: 'facilities', zone: 'west', icon: 'fa-dumbbell' },
      { id: 'theater-g', name: 'مسرح الدور الأرضي', category: 'facilities', zone: 'west', icon: 'fa-masks-theater' },
      { id: 'quiet-hall', name: 'القاعة الهادئة', category: 'facilities', zone: 'center', icon: 'fa-book-open' },
      { id: 'lounge-g', name: 'استراحة الطلاب', category: 'facilities', zone: 'center', icon: 'fa-couch' },
      { id: 'services-g', name: 'المصاعد / السلالم / دورات المياه', category: 'facilities', zone: 'west', icon: 'fa-restroom' }
    ]
  },
  {
    id: 'first',
    title: 'الدور الأول',
    subtitle: 'معامل تقنية المعلومات، الأمن السيبراني والقاعات الدراسية',
    rooms: [
      // المعامل (East / Center)
      { id: 'f-221', name: 'معمل 221', code: 'Lab - IT 221', subtext: 'معمل قواعد البيانات', category: 'labs', zone: 'east', icon: 'fa-database', dept: 'IT' },
      { id: 'f-222', name: 'معمل 222', code: 'Lab - IT 222', subtext: 'معمل إنترنت الأشياء (IoT)', category: 'labs', zone: 'east', icon: 'fa-wifi', dept: 'IT' },
      { id: 'f-223', name: 'معمل 223', code: 'Lab - IT 223', subtext: 'معمل الشبكات', category: 'labs', zone: 'east', icon: 'fa-network-wired', dept: 'IT' },
      { id: 'f-224', name: 'معمل 224', code: 'Lab - IT 224', subtext: 'معمل البرمجة', category: 'labs', zone: 'east', icon: 'fa-code', dept: 'IT' },
      { id: 'f-225', name: 'معمل 225', code: 'Lab - IT 225', subtext: 'معمل علوم البيانات', category: 'labs', zone: 'east', icon: 'fa-chart-pie', dept: 'IT' },
      { id: 'f-226', name: 'معمل 226', code: 'Lab - IT 226', subtext: 'معمل الأمن السيبراني', category: 'labs', zone: 'center', icon: 'fa-user-shield', dept: 'CYS' },
      { id: 'f-linux', name: 'معمل اللينكس', code: 'Linux Lab', subtext: 'معمل أنظمة تشغيل لينكس', category: 'labs', zone: 'east', icon: 'fa-terminal', dept: 'IT' },
      { id: 'f-secure-sw', name: 'معمل البرمجيات الآمنة', subtext: 'Secure Software Lab', category: 'labs', zone: 'center', icon: 'fa-lock', dept: 'CYS' },
      { id: 'f-forensics', name: 'معمل التحقيق الجنائي الرقمي', subtext: 'Digital Forensics Lab', category: 'labs', zone: 'center', icon: 'fa-magnifying-glass-chart', dept: 'CYS' },

      // القاعات (Center)
      { id: 'it-201', name: 'قاعة IT 201', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'IT' },
      { id: 'it-202', name: 'قاعة IT 202', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'IT' },
      { id: 'it-203', name: 'قاعة IT 203', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'IT' },
      { id: 'it-204', name: 'قاعة IT 204', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'IT' },
      { id: 'it-205', name: 'قاعة IT 205', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'IT' },
      { id: 'it-206', name: 'قاعة IT 206', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'IT' },
      { id: 'it-207', name: 'قاعة IT 207', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'IT' },
      { id: 'it-208', name: 'قاعة IT 208', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'IT' },
      { id: 'it-209', name: 'قاعة IT 209', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'IT' },
      { id: 'tech-1', name: 'قاعة وادي التقنية', code: 'TECH 1', category: 'classrooms', zone: 'center', icon: 'fa-microchip', dept: 'عام' },

      // الإدارة والمكاتب (East / Center)
      { id: 'it-head', name: 'مكتب رئيس قسم تقنية المعلومات', category: 'offices', zone: 'east', icon: 'fa-user-tie', dept: 'إدارة' },
      { id: 'it-board', name: 'مجلس قسم تقنية المعلومات', category: 'offices', zone: 'east', icon: 'fa-users-gear', dept: 'إدارة' },
      { id: 'cys-head', name: 'مكتب رئيس قسم الأمن السيبراني', category: 'offices', zone: 'center', icon: 'fa-user-shield', dept: 'إدارة' },
      { id: 'it-staff', name: 'مكاتب أعضاء هيئة التدريس (تقنية المعلومات)', category: 'offices', zone: 'east', icon: 'fa-graduation-cap', dept: 'IT' },

      // المرافق والخدمات (West)
      { id: 'lion-cafe', name: 'Lion Cafe', category: 'facilities', zone: 'west', icon: 'fa-mug-hot' },
      { id: 'student-club-1', name: 'النادي الطلابي', category: 'facilities', zone: 'west', icon: 'fa-users' },
      { id: 'theater-1', name: 'مسرح الدور الأول', category: 'facilities', zone: 'west', icon: 'fa-masks-theater' },
      { id: 'services-1', name: 'المصاعد / السلالم / دورات المياه', category: 'facilities', zone: 'west', icon: 'fa-restroom' }
    ]
  },
  {
    id: 'second',
    title: 'الدور الثاني',
    subtitle: 'عمادة الكلية، قسم هندسة الحاسب ومعامل الأنظمة والميكروبروسيسور',
    rooms: [
      // المعامل والورش (East / Center)
      { id: 's-328', name: 'معمل 328', code: 'Lab - COE 328', subtext: 'المتحكم المنطقي القابل للبرمجة (PLC)', category: 'labs', zone: 'east', icon: 'fa-gears', dept: 'COE' },
      { id: 's-330', name: 'معمل 330', code: 'Lab - COE 330', subtext: 'معمل الروبوتات', category: 'labs', zone: 'east', icon: 'fa-robot', dept: 'COE' },
      { id: 's-337', name: 'معمل 337', code: 'Lab - COE 337', subtext: 'معمل التصميم المنطقي', category: 'labs', zone: 'east', icon: 'fa-microchip', dept: 'COE' },
      { id: 's-339', name: 'معمل 339', code: 'Lab - COE 339', subtext: 'معمل الشبكات والاتصالات', category: 'labs', zone: 'east', icon: 'fa-network-wired', dept: 'COE' },
      { id: 's-370', name: 'معمل 370', code: 'Lab - COE 370', subtext: 'معمل الأنظمة المدمجة', category: 'labs', zone: 'east', icon: 'fa-memory', dept: 'COE' },
      { id: 's-373', name: 'معمل 373', code: 'Lab - COE 373', subtext: 'معمل المعالج الدقيق (Microprocessor)', category: 'labs', zone: 'east', icon: 'fa-cpu', dept: 'COE' },
      { id: 's-382', name: 'معمل 382', code: 'Lab - COE 382', subtext: 'معمل المشاريع والمتحكم الدقيق', category: 'labs', zone: 'east', icon: 'fa-sitemap', dept: 'COE' },
      { id: 's-385', name: 'معمل 385', code: 'Lab - COE 385', subtext: 'معمل الإلكترونيات والدوائر الكهربائية', category: 'labs', zone: 'east', icon: 'fa-bolt', dept: 'COE' },
      { id: 's-open-sw', name: 'معمل الابتكار للبرمجيات مفتوحة المصدر', category: 'labs', zone: 'center', icon: 'fa-lightbulb', dept: 'COE' },

      // القاعات (Center)
      { id: 'coe-301', name: 'قاعة COE 301', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'COE' },
      { id: 'coe-302', name: 'قاعة COE 302', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'COE' },
      { id: 'coe-303', name: 'قاعة COE 303', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'COE' },
      { id: 'coe-304', name: 'قاعة COE 304', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'COE' },
      { id: 'coe-305', name: 'قاعة COE 305', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'COE' },
      { id: 'coe-306', name: 'قاعة COE 306', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'COE' },
      { id: 'coe-307', name: 'قاعة COE 307', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'COE' },
      { id: 'coe-308', name: 'قاعة COE 308', category: 'classrooms', zone: 'center', icon: 'fa-chalkboard-user', dept: 'COE' },

      // الإدارة والمكاتب (East / Center)
      { id: 'dean-office', name: 'مكتب عميد الكلية', category: 'offices', zone: 'center', icon: 'fa-user-tie', dept: 'العمادة' },
      { id: 'v-student', name: 'وكيل الشؤون الطلابية', category: 'offices', zone: 'center', icon: 'fa-user-graduate', dept: 'العمادة' },
      { id: 'v-edu', name: 'وكيل الشؤون التعليمية', category: 'offices', zone: 'center', icon: 'fa-briefcase', dept: 'العمادة' },
      { id: 'admin-affairs', name: 'الشؤون الإدارية', category: 'offices', zone: 'center', icon: 'fa-building-user', dept: 'إدارة' },
      { id: 'coe-head', name: 'مكتب رئيس قسم هندسة الحاسب', category: 'offices', zone: 'east', icon: 'fa-user-tie', dept: 'إدارة' },
      { id: 'coe-board', name: 'مجلس قسم هندسة الحاسب', category: 'offices', zone: 'east', icon: 'fa-users-gear', dept: 'إدارة' },
      { id: 'coe-staff', name: 'مكاتب أعضاء هيئة التدريس (هندسة الحاسب)', category: 'offices', zone: 'east', icon: 'fa-graduation-cap', dept: 'COE' },

      // المرافق والخدمات (West)
      { id: 'faculty-club', name: 'نادي أعضاء هيئة التدريس', category: 'facilities', zone: 'west', icon: 'fa-mug-hot' },
      { id: 'digital-knowledge', name: 'منطقة المعرفة الرقمية', category: 'facilities', zone: 'west', icon: 'fa-display' },
      { id: 'robot-club', name: 'نادي الروبوت', category: 'facilities', zone: 'west', icon: 'fa-robot' },
      { id: 'services-2', name: 'المصاعد / السلالم / دورات المياه', category: 'facilities', zone: 'west', icon: 'fa-restroom' }
    ]
  }
];

const FEMALE_FLOORS: FloorData[] = [
  {
    id: 'ground',
    title: 'الدور الأرضي',
    subtitle: 'مخطط الدور الأرضي - المقر الرئيسي (طالبات)',
    rooms: [
      // الجناح الجنوبي / الباب الرئيسي
      { id: 'fg-2001', name: 'قاعة 2001', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2002', name: 'قاعة 2002', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2003', name: 'قاعة 2003', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2007', name: 'قاعة 2007', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2008', name: 'قاعة 2008', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2009', name: 'قاعة 2009', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-main-door', name: 'الباب الرئيسي', category: 'facilities', zone: 'center', icon: 'fa-door-open', dept: 'مدخل' },

      // الجناح الغربي
      { id: 'fg-2014', name: 'قاعة 2014', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2015', name: 'قاعة 2015', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2016', name: 'قاعة 2016', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2017', name: 'قاعة 2017', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2020', name: 'قاعة 2020', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2026', name: 'قاعة 2026', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2027', name: 'قاعة 2027', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2031', name: 'قاعة 2031', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2032', name: 'قاعة 2032', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2033', name: 'قاعة 2033', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },

      // الجناح الشرقي
      { id: 'fg-2054', name: 'قاعة 2054', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2057', name: 'قاعة 2057', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2058', name: 'قاعة 2058', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2059', name: 'قاعة 2059', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2065', name: 'قاعة 2065', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2066', name: 'قاعة 2066', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2067', name: 'قاعة 2067', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2068', name: 'قاعة 2068', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2069', name: 'قاعة 2069', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'fg-2070', name: 'قاعة 2070', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },

      // المرافق
      { id: 'fg-library', name: 'المكتبة', category: 'facilities', zone: 'center', icon: 'fa-book' },
      { id: 'fg-theater', name: 'المسرح', category: 'facilities', zone: 'center', icon: 'fa-masks-theater' },
      { id: 'fg-mosque', name: 'المصلى', category: 'facilities', zone: 'center', icon: 'fa-kaaba' },
      { id: 'fg-phones', name: 'Phones / Lion', subtext: 'ركن الهواتف والاستراحة', category: 'facilities', zone: 'west', icon: 'fa-phone' },
      { id: 'fg-stairs', name: 'السلالم والمصاعد', category: 'facilities', zone: 'center', icon: 'fa-elevator' }
    ]
  },
  {
    id: 'first',
    title: 'الدور الأول',
    subtitle: 'مخطط الدور الأول - المقر الرئيسي (طالبات)',
    rooms: [
      { id: 'ff-3003', name: 'قاعة 3003', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3006', name: 'قاعة 3006', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3008', name: 'قاعة 3008', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3013', name: 'قاعة 3013', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3015', name: 'قاعة 3015', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3018', name: 'قاعة 3018', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3022', name: 'قاعة 3022', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3023', name: 'قاعة 3023', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3026', name: 'قاعة 3026', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3028', name: 'قاعة 3028', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3030', name: 'ممر 3030', category: 'facilities', zone: 'center', icon: 'fa-route' },
      { id: 'ff-3037', name: 'قاعة 3037', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3065', name: 'قاعة 3065', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3069', name: 'قاعة 3069', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3070', name: 'قاعة 3070', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3072', name: 'قاعة 3072', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3073', name: 'قاعة 3073', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3076', name: 'قاعة 3076', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3078', name: 'قاعة 3078', category: 'classrooms', zone: 'west', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3091', name: 'قاعة 3091', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },
      { id: 'ff-3092', name: 'قاعة 3092', category: 'classrooms', zone: 'east', icon: 'fa-chalkboard-user', dept: 'طالبات' },

      // المرافق
      { id: 'ff-cafeteria', name: 'الكافتيريا', category: 'facilities', zone: 'center', icon: 'fa-utensils' },
      { id: 'ff-lockers', name: 'اللواكر', category: 'facilities', zone: 'west', icon: 'fa-box-archive' },
      { id: 'ff-facade', name: 'الواجهة المطلة', category: 'facilities', zone: 'center', icon: 'fa-eye' },
      { id: 'ff-stairs', name: 'السلالم والمصاعد', category: 'facilities', zone: 'center', icon: 'fa-elevator' }
    ]
  }
];

export default function FloorMapModal({ isOpen, onClose, initialGender = 'male' }: FloorMapModalProps) {
  const [gender, setGender] = useState<'male' | 'female'>(initialGender);
  const [activeFloorId, setActiveFloorId] = useState<'ground' | 'first' | 'second'>('ground');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRoomDetail, setActiveRoomDetail] = useState<RoomItem | null>(null);

  useEffect(() => {
    setGender(initialGender);
  }, [initialGender]);

  // Reset floor when gender changes if second floor selected on female
  useEffect(() => {
    if (gender === 'female' && activeFloorId === 'second') {
      setActiveFloorId('ground');
    }
  }, [gender, activeFloorId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const currentFloors = useMemo(() => {
    return gender === 'male' ? MALE_FLOORS : FEMALE_FLOORS;
  }, [gender]);

  const activeFloor = useMemo(() => {
    return currentFloors.find(f => f.id === activeFloorId) || currentFloors[0];
  }, [currentFloors, activeFloorId]);

  // Filtered rooms on current floor
  const filteredRooms = useMemo(() => {
    return activeFloor.rooms.filter(room => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q ||
        room.name.toLowerCase().includes(q) ||
        (room.code && room.code.toLowerCase().includes(q)) ||
        (room.subtext && room.subtext.toLowerCase().includes(q)) ||
        (room.dept && room.dept.toLowerCase().includes(q));
      return matchesSearch;
    });
  }, [activeFloor, searchQuery]);

  // Handle global search across all floors if search query exists
  const globalSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.trim().toLowerCase();
    const results: { floorTitle: string; floorId: 'ground' | 'first' | 'second'; rooms: RoomItem[] }[] = [];

    currentFloors.forEach(floor => {
      const matches = floor.rooms.filter(room => 
        room.name.toLowerCase().includes(q) ||
        (room.code && room.code.toLowerCase().includes(q)) ||
        (room.subtext && room.subtext.toLowerCase().includes(q)) ||
        (room.dept && room.dept.toLowerCase().includes(q))
      );
      if (matches.length > 0) {
        results.push({
          floorTitle: floor.title,
          floorId: floor.id,
          rooms: matches
        });
      }
    });

    return results;
  }, [searchQuery, currentFloors]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/65 backdrop-blur-md transition-opacity duration-300">
        <motion.div
          id="floor-map-modal-container"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-7xl max-h-[88vh] sm:max-h-[85vh] h-auto my-auto rounded-2xl sm:rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-2xl text-white flex flex-col overflow-hidden floor-map-modal-card"
          dir="rtl"
        >
          {/* Top Bar / Header */}
          <div className={`pt-12 sm:pt-14 pb-5 sm:pb-6 px-6 sm:px-8 md:px-10 rounded-t-2xl sm:rounded-t-3xl bg-slate-900/90 flex items-center justify-between gap-3 sm:gap-4 shrink-0 relative z-30 ${
            gender === 'male'
              ? 'floor-map-modal-header-male'
              : 'floor-map-modal-header-female'
          }`}>
            {/* Title & Map Icon */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className={`p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border shrink-0 flex items-center justify-center ${
                gender === 'male'
                  ? 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                  : 'bg-pink-500/15 border-pink-500/30 text-pink-400'
              }`}>
                <Icon name="fa-map-location-dot" className="text-base sm:text-2xl" />
              </div>
              <div className="min-w-0 py-0.5">
                <h2 className="text-sm sm:text-lg md:text-xl font-bold text-white leading-normal floor-map-modal-title truncate">
                  {gender === 'male' ? 'المقر الرئيسي - طلاب' : 'المقر الرئيسي - طالبات'}
                </h2>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition-all border border-slate-700 hover:border-slate-500 floor-map-modal-close cursor-pointer shadow-sm flex items-center justify-center shrink-0 relative z-30"
              aria-label="إغلاق"
            >
              <Icon name="fa-xmark" className="text-lg sm:text-2xl" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-3.5 sm:px-5 pt-3 sm:pt-4 pb-3.5 sm:pb-5 space-y-4 sm:space-y-5 custom-scrollbar rounded-b-3xl">
            {/* Controls Bar: Search & Floor Switcher Stacked tightly */}
            <div className="flex flex-col gap-2 w-full mt-2 sm:mt-3 pb-0.5">
              {/* Search Input On Top - Full width and compact vertical height */}
              <div className="w-full relative h-6.5 sm:h-7.5" dir="rtl">
                <input
                  type="text"
                  dir="rtl"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="ابحث هنا..."
                  className={`w-full h-full rounded-lg bg-slate-900/80 border border-white/15 text-white placeholder-slate-400 text-[11px] sm:text-xs focus:outline-none transition-all floor-map-search-input ${
                    gender === 'male' ? 'focus:border-blue-500' : 'focus:border-pink-500'
                  }`}
                  style={{ paddingRight: '2rem', paddingLeft: '2rem', textAlign: 'right' }}
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[11px] pointer-events-none z-10 flex items-center justify-center">
                  <Icon name="fa-magnifying-glass" />
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 z-20 flex items-center justify-center rounded hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="مسح البحث"
                  >
                    <Icon name="fa-xmark" className="text-[10px]" />
                  </button>
                )}
              </div>

              {/* Floors Tabs Side-by-Side Underneath Search */}
              <div className="flex rounded-lg bg-white/5 p-1 border border-white/10 gap-1 sm:gap-1.5 w-full floor-map-tabs-container shadow-sm h-8 sm:h-9 items-center overflow-x-auto custom-scrollbar">
                {currentFloors.map(floor => {
                  const isActive = activeFloorId === floor.id;
                  return (
                    <button
                      key={floor.id}
                      type="button"
                      onClick={() => {
                        setActiveFloorId(floor.id);
                        setActiveRoomDetail(null);
                      }}
                      className={`flex-1 min-w-0 h-full px-2 sm:px-3 rounded-md text-[11px] sm:text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer select-none whitespace-nowrap ${
                        isActive
                          ? gender === 'male'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                            : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-white/5 floor-map-tab-inactive'
                      }`}
                    >
                      <Icon name={floor.id === 'ground' ? 'fa-layer-group' : 'fa-building'} className="text-[11px] sm:text-xs shrink-0" />
                      <span className="truncate">{floor.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

              {/* Global search auto-switch notification */}
              {globalSearchResults && globalSearchResults.length > 0 && searchQuery && (
                <div className="p-3 rounded-xl bg-blue-900/30 border border-blue-500/30 text-xs text-blue-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon name="fa-circle-info" className="text-blue-400 text-sm" />
                    <span>عثرنا على نتائج مطابقة في:</span>
                  </div>
                  <div className="flex gap-1.5">
                    {globalSearchResults.map(res => (
                      <button
                        key={res.floorId}
                        type="button"
                        onClick={() => setActiveFloorId(res.floorId)}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                          activeFloorId === res.floorId
                            ? 'bg-blue-500 text-white border-blue-400'
                            : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/20'
                        }`}
                      >
                        {res.floorTitle} ({res.rooms.length})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Blueprint Diagram based on Gender */}
              {gender === 'male' ? (
                <MaleVisualBlueprint
                  floorId={activeFloorId as 'ground' | 'first' | 'second'}
                  searchQuery={searchQuery}
                />
              ) : (
                <FemaleVisualBlueprint
                  floorId={activeFloorId as 'ground' | 'first'}
                  searchQuery={searchQuery}
                />
              )}
            </div>

          {/* Footer */}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function RoomCard({ room, onSelect }: { room: RoomItem; onSelect: () => void; key?: any }) {
  const getBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'labs':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'classrooms':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'offices':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      default:
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <button
      type="button"
      onClick={onSelect}
      className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-white/20 text-right transition-all group flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="p-2 rounded-lg bg-white/5 text-slate-300 group-hover:text-primary group-hover:bg-primary/10 transition-all shrink-0">
          <Icon name={room.icon} className="text-sm" />
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-white truncate">
            {room.name}
          </div>
          {room.code && (
            <div className="text-[11px] text-blue-300/80 font-mono truncate">{room.code}</div>
          )}
          {room.subtext && (
            <div className="text-[11px] text-slate-400 truncate">{room.subtext}</div>
          )}
        </div>
      </div>

      {room.dept && (
        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border shrink-0 ${getBadgeStyle(room.category)}`}>
          {room.dept}
        </span>
      )}
    </button>
  );
}
