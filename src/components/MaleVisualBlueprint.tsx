import React, { useState } from 'react';
import Icon from './Icon';

interface MaleVisualBlueprintProps {
  floorId: 'ground' | 'first' | 'second';
  searchQuery?: string;
}

export default function MaleVisualBlueprint({ floorId, searchQuery = '' }: MaleVisualBlueprintProps) {
  const [zoom, setZoom] = useState<number>(1);

  const isMatch = (text: string) => {
    if (!searchQuery.trim()) return false;
    return text.toLowerCase().includes(searchQuery.trim().toLowerCase());
  };

  const getTextStyle = (text: string, isSubtext = false, customColor = "fill-[#004ce6]") => {
    if (isMatch(text)) {
      return "fill-amber-600 font-black text-[13px] animate-pulse";
    }
    if (isSubtext) {
      return "fill-[#2563eb] font-semibold text-[11px]";
    }
    if (['دورة مياه', 'دورة المياة', 'السلالم', 'المصعد'].some(s => text.trim().includes(s))) {
      return `${customColor} font-bold text-[11px]`;
    }
    return `${customColor} font-bold text-[13px] sm:text-[14px]`;
  };

  const getHighlightBg = (text: string, x: number, y: number, width = 85, height = 24) => {
    if (!isMatch(text)) return null;
    return (
      <rect
        x={x - width / 2}
        y={y - height / 2 - 3}
        width={width}
        height={height}
        rx={6}
        fill="#fef08a"
        stroke="#f59e0b"
        strokeWidth="1.5"
        className="animate-pulse"
      />
    );
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  // ==========================================
  // GROUND FLOOR (الدور الأرضي - علوم الحاسب)
  // ==========================================
  const renderGroundFloor = () => (
    <svg viewBox="0 0 1200 850" className="w-full max-w-5xl h-auto select-none" dir="rtl">
      {/* Main Top Header */}
      <text x="600" y="45" textAnchor="middle" className="fill-[#003da5] font-extrabold text-[24px]">الدور الأرضي</text>

      {/* BLUE STRUCTURAL LINES */}
      {/* Main Vertical Left Spine */}
      <line x1="280" y1="80" x2="280" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* Main Vertical Middle Spine */}
      <line x1="640" y1="140" x2="640" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* Main Vertical Right Spine */}
      <line x1="1000" y1="220" x2="1000" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* Main Horizontal Corridors */}
      <line x1="80" y1="160" x2="980" y2="160" stroke="#004ce6" strokeWidth="2" />
      <line x1="80" y1="380" x2="1180" y2="380" stroke="#004ce6" strokeWidth="2.5" />
      <line x1="80" y1="620" x2="1000" y2="620" stroke="#004ce6" strokeWidth="2" />

      {/* Extensions to كلية العمارة والتخطيط */}
      <text x="70" y="155" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>
      <text x="70" y="375" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>
      <text x="70" y="615" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>

      {/* Top Left Services */}
      {getHighlightBg('دورة المياة', 220, 85, 75)}
      <text x="220" y="89" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

      {getHighlightBg('المصعد', 315, 78, 60)}
      <text x="315" y="82" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 315, 106, 60)}
      <text x="315" y="110" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

      {/* TOP HORIZONTAL LINE FOR CS CLASSROOMS EXTENDED TO LABS 125 & 126 */}
      <line x1="280" y1="160" x2="980" y2="160" stroke="#004ce6" strokeWidth="2" />
      <g>
        {getHighlightBg('CS 101', 340, 138, 70)}
        <text x="340" y="142" textAnchor="middle" className={getTextStyle('CS 101')}>CS 101</text>

        {getHighlightBg('CS 102', 395, 138, 70)}
        <text x="395" y="142" textAnchor="middle" className={getTextStyle('CS 102')}>CS 102</text>

        {getHighlightBg('CS 103', 450, 138, 70)}
        <text x="450" y="142" textAnchor="middle" className={getTextStyle('CS 103')}>CS 103</text>

        {getHighlightBg('CS 104', 505, 138, 70)}
        <text x="505" y="142" textAnchor="middle" className={getTextStyle('CS 104')}>CS 104</text>

        {getHighlightBg('CS 105', 560, 138, 70)}
        <text x="560" y="142" textAnchor="middle" className={getTextStyle('CS 105')}>CS 105</text>
      </g>

      {/* CENTER CIRCLE */}
      <circle cx="280" cy="380" r="55" fill="#ffffff" stroke="#004ce6" strokeWidth="2.5" />
      <g>
        {getHighlightBg('المصلى', 195, 340, 65)}
        <text x="195" y="344" textAnchor="middle" className={getTextStyle('المصلى')}>المصلى</text>

        {getHighlightBg('دورة المياة', 215, 310, 70)}
        <text x="215" y="314" textAnchor="middle" className={getTextStyle('دورة المياة', true)}>دورة المياة</text>

        {getHighlightBg('الصالة الرياضية', 185, 425, 110)}
        <text x="185" y="429" textAnchor="middle" className={getTextStyle('الصالة الرياضية')}>الصالة الرياضية</text>

        {/* Elevators and Stairs near Gym */}
        {getHighlightBg('السلالم', 245, 465, 55)}
        <text x="245" y="469" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 245, 495, 55)}
        <text x="245" y="499" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('الكافتيريا', 370, 335, 90)}
        <text x="370" y="339" textAnchor="middle" className={getTextStyle('الكافتيريا')}>الكافتيريا</text>

        {getHighlightBg('مسرح', 380, 435, 120)}
        <text x="380" y="439" textAnchor="middle" className={getTextStyle('مسرح')}>مسرح الدور الأرضي</text>

        {getHighlightBg('دورة المياة', 335, 480, 70)}
        <text x="335" y="484" textAnchor="middle" className={getTextStyle('دورة المياة', true)}>دورة المياة</text>
      </g>

      {/* BOTTOM LEFT (المدخل الرئيسي & Services) */}
      {getHighlightBg('السلالم', 310, 705, 60)}
      <text x="310" y="709" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
      {getHighlightBg('المصعد', 310, 735, 60)}
      <text x="310" y="739" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

      {getHighlightBg('دورة المياة', 220, 725, 75)}
      <text x="220" y="729" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

      {getHighlightBg('المدخل الرئيسي', 280, 770, 150)}
      <text x="280" y="775" textAnchor="middle" className="fill-[#003da5] font-black text-[20px]">المدخل الرئيسي</text>

      {/* MIDDLE VERTICAL SPINE */}
      <line x1="640" y1="110" x2="640" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* TOP SERVICES ABOVE CS 109 */}
      {getHighlightBg('المصعد', 610, 132, 55)}
      <text x="610" y="136" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 675, 142, 55)}
      <text x="675" y="146" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
      {getHighlightBg('دورة المياة', 675, 175, 75)}
      <text x="675" y="179" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

      {/* CS ROOMS (106, 107, 108, 109) */}
      <g>
        {getHighlightBg('CS 106', 590, 240, 70)}
        <text x="590" y="244" textAnchor="middle" className={getTextStyle('CS 106')}>CS 106</text>

        {getHighlightBg('CS 107', 590, 330, 70)}
        <text x="590" y="334" textAnchor="middle" className={getTextStyle('CS 107')}>CS 107</text>

        {getHighlightBg('المصعد', 600, 365, 55)}
        <text x="600" y="368" textAnchor="middle" className={getTextStyle('المصعد', true)}>المصعد</text>

        {getHighlightBg('السلالم', 600, 400, 55)}
        <text x="600" y="404" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {getHighlightBg('CS 109', 690, 240, 70)}
        <text x="690" y="244" textAnchor="middle" className={getTextStyle('CS 109')}>CS 109</text>

        {getHighlightBg('CS 108', 690, 330, 70)}
        <text x="690" y="334" textAnchor="middle" className={getTextStyle('CS 108')}>CS 108</text>

        {/* CS Admin Offices */}
        {getHighlightBg('رئيس قسم علوم الحاسب', 830, 365, 170)}
        <text x="830" y="369" textAnchor="middle" className={getTextStyle('رئيس قسم علوم الحاسب')}>رئيس قسم علوم الحاسب</text>

        {getHighlightBg('مجلس قسم علوم الحاسب', 830, 405, 170)}
        <text x="830" y="409" textAnchor="middle" className={getTextStyle('مجلس قسم علوم الحاسب')}>مجلس قسم علوم الحاسب</text>

        {getHighlightBg('دورة المياة', 675, 398, 75)}
        <text x="675" y="402" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

        {/* Staff Offices Blocks */}
        <g>
          {[580, 730, 940].map((posX, idx) => (
            <g key={idx}>
              {getHighlightBg('مكاتب أعضاء', posX, 520, 120, 45)}
              <text x={posX} y={512} textAnchor="middle" className={getTextStyle('مكاتب أعضاء')}>مكاتب أعضاء</text>
              <text x={posX} y={527} textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">هيئة التدريس</text>
              <text x={posX} y={542} textAnchor="middle" className="fill-[#004ce6] font-medium text-[10px]">قسم علوم الحاسب</text>
            </g>
          ))}
        </g>
      </g>

      {/* BOTTOM CORRIDOR ALONG Y = 620 */}
      <line x1="280" y1="620" x2="1070" y2="620" stroke="#004ce6" strokeWidth="2" />
      <g>
        {getHighlightBg('القاعة الهادئة', 460, 645, 120)}
        <text x="460" y="649" textAnchor="middle" className={getTextStyle('القاعة الهادئة')}>الــقــاعــة الهــادئــة</text>

        {/* ABOVE Y = 620 */}
        {getHighlightBg('دورة المياة', 602, 595, 75)}
        <text x="602" y="599" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

        {getHighlightBg('شؤون الطلاب', 735, 595, 100)}
        <text x="735" y="599" textAnchor="middle" className={getTextStyle('شؤون الطلاب')}>شؤون الطلاب</text>

        {getHighlightBg('مشرف النادي', 865, 595, 130)}
        <text x="865" y="599" textAnchor="middle" className={getTextStyle('مشرف النادي')}>مشرف النادي الطلابي</text>

        {getHighlightBg('السلالم', 1040, 595, 60)}
        <text x="1040" y="599" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {/* BELOW Y = 620 */}
        {getHighlightBg('دورة المياة', 1040, 645, 75)}
        <text x="1040" y="649" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

        {getHighlightBg('المصعد', 612, 645, 55)}
        <text x="612" y="649" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('السلالم', 670, 645, 55)}
        <text x="670" y="649" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {getHighlightBg('استراحة الطلاب', 820, 645, 110)}
        <text x="820" y="649" textAnchor="middle" className={getTextStyle('استراحة الطلاب')}>اســتـراحــة الطـــلاب</text>

        {getHighlightBg('المصعد', 965, 645, 55)}
        <text x="965" y="649" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {/* BELOW ELEVATOR & STAIRS ON LEFT */}
        {getHighlightBg('أمن الشبكات', 560, 695, 140)}
        <text x="560" y="699" textAnchor="middle" className={getTextStyle('أمن الشبكات')}>معمل أمن الشبكات</text>
      </g>

      {/* RIGHT SIDE LABS SPINE AT X = 1000 */}
      <line x1="1000" y1="220" x2="1000" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* LABS LIST RIGHT SIDE */}
      <g>
        {/* Lab 126 AI */}
        {getHighlightBg('126', 780, 130, 120)}
        <text x="780" y="125" textAnchor="middle" className={getTextStyle('126')}>معمل 126</text>
        <text x="780" y="140" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - CS AI )</text>

        {/* Lab 125 Web */}
        {getHighlightBg('125', 780, 190, 120)}
        <text x="780" y="185" textAnchor="middle" className={getTextStyle('125')}>معمل 125</text>
        <text x="780" y="200" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - CS Web )</text>

        {/* Lab 124 Algo */}
        {getHighlightBg('124', 910, 300, 120)}
        <text x="910" y="295" textAnchor="middle" className={getTextStyle('124')}>معمل 124</text>
        <text x="910" y="310" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - CS Algo )</text>

        {/* Lab 121 Net */}
        {getHighlightBg('121', 1060, 300, 120)}
        <text x="1060" y="295" textAnchor="middle" className={getTextStyle('121')}>معمل 121</text>
        <text x="1060" y="310" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - CS Net )</text>

        {/* Lab 122 Dev */}
        {getHighlightBg('122', 1140, 350, 120)}
        <text x="1140" y="345" textAnchor="middle" className={getTextStyle('122')}>معمل 122</text>
        <text x="1140" y="360" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - CS Dev )</text>

        {/* Stairs across the line to the right */}
        {getHighlightBg('السلالم', 1040, 350, 60)}
        <text x="1040" y="354" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {/* Lab 123 OS */}
        {getHighlightBg('123', 1140, 400, 120)}
        <text x="1140" y="395" textAnchor="middle" className={getTextStyle('123')}>معمل 123</text>
        <text x="1140" y="410" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - CS OS )</text>

        {/* Staff Offices under Lab 123 */}
        <g>
          {getHighlightBg('مكاتب أعضاء', 1065, 520, 120, 45)}
          <text x={1065} y={512} textAnchor="middle" className={getTextStyle('مكاتب أعضاء')}>مكاتب أعضاء</text>
          <text x={1065} y={527} textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">هيئة التدريس</text>
          <text x={1065} y={542} textAnchor="middle" className="fill-[#004ce6] font-medium text-[10px]">قسم علوم الحاسب</text>
        </g>

        {/* Right side restrooms & services */}
        {getHighlightBg('دورة المياة', 1040, 410, 75)}
        <text x="1040" y="414" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>
      </g>
    </svg>
  );

  // ==========================================
  // FIRST FLOOR (الدور الأول - تقنية المعلومات)
  // ==========================================
  const renderFirstFloor = () => (
    <svg viewBox="0 0 1200 850" className="w-full max-w-5xl h-auto select-none" dir="rtl">
      {/* Main Top Header */}
      <text x="600" y="45" textAnchor="middle" className="fill-[#003da5] font-extrabold text-[24px]">الدور الأول</text>

      {/* BLUE STRUCTURAL LINES */}
      {/* Main Vertical Left Spine */}
      <line x1="280" y1="80" x2="280" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* Main Vertical Middle Spine */}
      <line x1="640" y1="140" x2="640" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* Main Vertical Right Spine */}
      <line x1="1000" y1="220" x2="1000" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* Main Horizontal Corridors */}
      <line x1="80" y1="160" x2="980" y2="160" stroke="#004ce6" strokeWidth="2" />
      <line x1="80" y1="380" x2="1180" y2="380" stroke="#004ce6" strokeWidth="2.5" />
      <line x1="80" y1="620" x2="1000" y2="620" stroke="#004ce6" strokeWidth="2" />

      {/* Extensions to كلية العمارة والتخطيط */}
      <text x="70" y="155" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>
      <text x="70" y="375" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>
      <text x="70" y="615" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>

      {/* Top Left Services */}
      {getHighlightBg('دورة المياة', 220, 85, 75)}
      <text x="220" y="89" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

      {getHighlightBg('المصعد', 315, 78, 60)}
      <text x="315" y="82" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 315, 106, 60)}
      <text x="315" y="110" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

      {/* TOP HORIZONTAL LINE FOR IT CLASSROOMS EXTENDED TO LABS */}
      <line x1="280" y1="160" x2="980" y2="160" stroke="#004ce6" strokeWidth="2" />
      <g>
        {getHighlightBg('IT 201', 340, 138, 70)}
        <text x="340" y="142" textAnchor="middle" className={getTextStyle('IT 201')}>IT 201</text>

        {getHighlightBg('IT 202', 395, 138, 70)}
        <text x="395" y="142" textAnchor="middle" className={getTextStyle('IT 202')}>IT 202</text>

        {getHighlightBg('IT 203', 450, 138, 70)}
        <text x="450" y="142" textAnchor="middle" className={getTextStyle('IT 203')}>IT 203</text>

        {getHighlightBg('IT 204', 505, 138, 70)}
        <text x="505" y="142" textAnchor="middle" className={getTextStyle('IT 204')}>IT 204</text>

        {getHighlightBg('IT 205', 560, 138, 70)}
        <text x="560" y="142" textAnchor="middle" className={getTextStyle('IT 205')}>IT 205</text>
      </g>

      {/* CENTER CIRCLE */}
      <circle cx="280" cy="380" r="55" fill="#ffffff" stroke="#004ce6" strokeWidth="2.5" />
      <g>
        {getHighlightBg('Lion cafe', 370, 335, 100)}
        <text x="370" y="339" textAnchor="middle" className={getTextStyle('Lion cafe')}>Lion cafe</text>

        {getHighlightBg('المصلى', 195, 340, 65)}
        <text x="195" y="344" textAnchor="middle" className={getTextStyle('المصلى')}>المصلى</text>

        {getHighlightBg('دورة المياة', 215, 310, 70)}
        <text x="215" y="314" textAnchor="middle" className={getTextStyle('دورة المياة', true)}>دورة المياة</text>

        {getHighlightBg('النادي الطلابي', 185, 425, 110)}
        <text x="185" y="429" textAnchor="middle" className={getTextStyle('النادي الطلابي')}>النادي الطلابي</text>

        {/* Elevators and Stairs near Student Club */}
        {getHighlightBg('السلالم', 245, 465, 55)}
        <text x="245" y="469" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 245, 495, 55)}
        <text x="245" y="499" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('مسرح', 380, 435, 120)}
        <text x="380" y="439" textAnchor="middle" className={getTextStyle('مسرح')}>مسرح الدور الأول</text>

        {getHighlightBg('دورة المياة', 335, 480, 70)}
        <text x="335" y="484" textAnchor="middle" className={getTextStyle('دورة المياة', true)}>دورة المياة</text>
      </g>

      {/* BOTTOM LEFT SERVICES */}
      {getHighlightBg('السلالم', 310, 705, 60)}
      <text x="310" y="709" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
      {getHighlightBg('المصعد', 310, 735, 60)}
      <text x="310" y="739" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

      {getHighlightBg('دورة المياة', 220, 725, 75)}
      <text x="220" y="729" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

      {/* MIDDLE VERTICAL SPINE */}
      <line x1="640" y1="110" x2="640" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* TOP SERVICES ABOVE IT 209 */}
      {getHighlightBg('المصعد', 610, 132, 55)}
      <text x="610" y="136" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 675, 142, 55)}
      <text x="675" y="146" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
      {getHighlightBg('دورة المياة', 675, 175, 75)}
      <text x="675" y="179" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

      {/* IT ROOMS (206, 207, 208, 209) & Admin */}
      <g>
        {getHighlightBg('IT 206', 590, 240, 70)}
        <text x="590" y="244" textAnchor="middle" className={getTextStyle('IT 206')}>IT 206</text>

        {getHighlightBg('IT 207', 590, 330, 70)}
        <text x="590" y="334" textAnchor="middle" className={getTextStyle('IT 207')}>IT 207</text>

        {getHighlightBg('المصعد', 600, 365, 55)}
        <text x="600" y="368" textAnchor="middle" className={getTextStyle('المصعد', true)}>المصعد</text>

        {getHighlightBg('السلالم', 600, 400, 55)}
        <text x="600" y="404" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {getHighlightBg('IT 209', 690, 240, 70)}
        <text x="690" y="244" textAnchor="middle" className={getTextStyle('IT 209')}>IT 209</text>

        {getHighlightBg('IT 208', 690, 330, 70)}
        <text x="690" y="334" textAnchor="middle" className={getTextStyle('IT 208')}>IT 208</text>

        {/* IT Admin Offices */}
        {getHighlightBg('رئيس قسم تقنية المعلومات', 830, 365, 180)}
        <text x="830" y="369" textAnchor="middle" className={getTextStyle('رئيس قسم تقنية المعلومات')}>رئيس قسم تقنية المعلومات</text>

        {getHighlightBg('مجلس قسم تقنية المعلومات', 830, 405, 180)}
        <text x="830" y="409" textAnchor="middle" className={getTextStyle('مجلس قسم تقنية المعلومات')}>مجلس قسم تقنية المعلومات</text>

        {getHighlightBg('دورة المياة', 675, 400, 75)}
        <text x="675" y="404" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

        {/* Staff Offices Blocks */}
        <g>
          {[580, 730, 940].map((posX, idx) => (
            <g key={idx}>
              {getHighlightBg('مكاتب أعضاء', posX, 520, 120, 45)}
              <text x={posX} y={512} textAnchor="middle" className={getTextStyle('مكاتب أعضاء')}>مكاتب أعضاء</text>
              <text x={posX} y={527} textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">هيئة التدريس</text>
              <text x={posX} y={542} textAnchor="middle" className="fill-[#004ce6] font-medium text-[10px]">قسم تقنية المعلومات</text>
            </g>
          ))}
        </g>
      </g>

      {/* BOTTOM CORRIDOR ALONG Y = 620 */}
      <line x1="280" y1="620" x2="1070" y2="620" stroke="#004ce6" strokeWidth="2" />
      <g>
        {/* Forensics Lab */}
        {getHighlightBg('التحقيق الجنائي', 325, 645, 90, 34)}
        <text x="325" y="638" textAnchor="middle" className={isMatch('التحقيق الجنائي') ? "fill-amber-600 font-black text-[12px] animate-pulse" : "fill-[#004ce6] font-bold text-[11px] sm:text-[12px]"}>معمل التحقيق</text>
        <text x="325" y="652" textAnchor="middle" className={isMatch('التحقيق الجنائي') ? "fill-amber-600 font-black text-[12px] animate-pulse" : "fill-[#004ce6] font-bold text-[11px] sm:text-[12px]"}>الجنائي الرقمي</text>

        {/* Cybersecurity Lab */}
        {getHighlightBg('الأمن السيبراني', 430, 645, 110, 34)}
        <text x="430" y="638" textAnchor="middle" className={isMatch('الأمن السيبراني') ? "fill-amber-600 font-black text-[12px] animate-pulse" : "fill-[#004ce6] font-bold text-[12px]"}>معمل الأمن السيبراني</text>
        <text x="430" y="652" textAnchor="middle" className="fill-[#004ce6] font-mono text-[10px]">(Lab - IT 226)</text>

        {/* TECH 1 Hall */}
        {getHighlightBg('وادي التقنية', 540, 645, 100, 34)}
        <text x="540" y="638" textAnchor="middle" className={isMatch('وادي التقنية') ? "fill-amber-600 font-black text-[12px] animate-pulse" : "fill-[#004ce6] font-bold text-[12px]"}>قاعة وادي التقنية</text>
        <text x="540" y="652" textAnchor="middle" className="fill-[#004ce6] font-mono text-[10px]">(TECH 1)</text>

        {/* ABOVE Y = 620 */}
        {getHighlightBg('دورة المياة', 612, 598, 75)}
        <text x="612" y="602" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

        {getHighlightBg('رئيس قسم الأمن', 820, 595, 160)}
        <text x="820" y="599" textAnchor="middle" className={getTextStyle('رئيس قسم الأمن')}>رئيس قسم الأمن السيبراني</text>

        {getHighlightBg('السلالم', 1040, 595, 60)}
        <text x="1040" y="599" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {/* BELOW Y = 620 */}
        {getHighlightBg('دورة المياة', 1040, 645, 75)}
        <text x="1040" y="649" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

        {getHighlightBg('المصعد', 612, 645, 55)}
        <text x="612" y="649" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('السلالم', 670, 645, 55)}
        <text x="670" y="649" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {getHighlightBg('قاعات دراسية', 815, 645, 110)}
        <text x="815" y="649" textAnchor="middle" className={getTextStyle('قاعات دراسية')}>قاعات دراسية</text>

        {getHighlightBg('المصعد', 965, 645, 55)}
        <text x="965" y="649" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {/* BELOW ELEVATOR & STAIRS */}
        {getHighlightBg('البرمجيات الآمنة', 560, 695, 140)}
        <text x="560" y="699" textAnchor="middle" className={getTextStyle('البرمجيات الآمنة')}>معمل البرمجيات الآمنة</text>
      </g>

      {/* RIGHT SIDE LABS SPINE AT X = 1000 */}
      <line x1="1000" y1="220" x2="1000" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* IT LABS LIST RIGHT SIDE */}
      <g>
        {/* Linux Lab */}
        {getHighlightBg('اللينكس', 780, 130, 120)}
        <text x="780" y="134" textAnchor="middle" className={getTextStyle('اللينكس')}>معمل اللينكس</text>

        {/* Lab 225 Data Science */}
        {getHighlightBg('225', 780, 190, 130)}
        <text x="780" y="185" textAnchor="middle" className={getTextStyle('225')}>معمل علوم البيانات</text>
        <text x="780" y="200" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - IT 225 )</text>

        {/* Lab 224 Programming */}
        {getHighlightBg('224', 910, 300, 130)}
        <text x="910" y="295" textAnchor="middle" className={getTextStyle('224')}>معمل البرمجة</text>
        <text x="910" y="310" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - IT 224 )</text>

        {/* Lab 223 Networks */}
        {getHighlightBg('223', 1060, 300, 130)}
        <text x="1060" y="295" textAnchor="middle" className={getTextStyle('223')}>معمل الشبكات</text>
        <text x="1060" y="310" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - IT 223 )</text>

        {/* Lab 222 IoT */}
        {getHighlightBg('222', 1140, 350, 140)}
        <text x="1140" y="345" textAnchor="middle" className={getTextStyle('222')}>معمل انترنت الأشياء</text>
        <text x="1140" y="360" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - IT 222 )</text>

        {/* Stairs across line to right */}
        {getHighlightBg('السلالم', 1040, 365, 60)}
        <text x="1040" y="369" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {/* Lab 221 Database */}
        {getHighlightBg('221', 1140, 400, 140)}
        <text x="1140" y="395" textAnchor="middle" className={getTextStyle('221')}>معمل قواعد البيانات</text>
        <text x="1140" y="410" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - IT 221 )</text>

        {/* Staff Offices under Lab 221 */}
        <g>
          {getHighlightBg('مكاتب أعضاء', 1065, 520, 120, 45)}
          <text x={1065} y={512} textAnchor="middle" className={getTextStyle('مكاتب أعضاء')}>مكاتب أعضاء</text>
          <text x={1065} y={527} textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">هيئة التدريس</text>
          <text x={1065} y={542} textAnchor="middle" className="fill-[#004ce6] font-medium text-[10px]">قسم تقنية المعلومات</text>
        </g>

        {/* Right side restrooms & services */}
        {getHighlightBg('دورة المياة', 1040, 395, 75)}
        <text x="1040" y="399" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>
      </g>
    </svg>
  );

  // ==========================================
  // SECOND FLOOR (الدور الثاني - هندسة الحاسب والعمادة)
  // ==========================================
  const renderSecondFloor = () => (
    <svg viewBox="0 0 1200 850" className="w-full max-w-5xl h-auto select-none" dir="rtl">
      {/* Main Top Header */}
      <text x="600" y="45" textAnchor="middle" className="fill-[#003da5] font-extrabold text-[24px]">الدور الثاني</text>

      {/* BLUE STRUCTURAL LINES */}
      {/* Main Vertical Left Spine extended upwards */}
      <line x1="280" y1="60" x2="280" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* Main Vertical Middle Spine extended upwards */}
      <line x1="640" y1="60" x2="640" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* Main Vertical Right Spine */}
      <line x1="1000" y1="220" x2="1000" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* Main Horizontal Corridors */}
      <line x1="80" y1="160" x2="850" y2="160" stroke="#004ce6" strokeWidth="2" />
      <line x1="80" y1="380" x2="1180" y2="380" stroke="#004ce6" strokeWidth="2.5" />
      <line x1="80" y1="620" x2="1000" y2="620" stroke="#004ce6" strokeWidth="2" />

      {/* Extensions to عمادة تقنية المعلومات */}
      <text x="70" y="155" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">عمادة تقنية المعلومات</text>
      <text x="70" y="375" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">عمادة تقنية المعلومات</text>
      <text x="70" y="615" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">عمادة تقنية المعلومات</text>

      {/* Top Left Services */}
      {getHighlightBg('دورة المياة', 220, 85, 75)}
      <text x="220" y="89" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

      {getHighlightBg('المصعد', 315, 78, 60)}
      <text x="315" y="82" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 315, 106, 60)}
      <text x="315" y="110" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

      {/* TOP HORIZONTAL LINE FOR COE CLASSROOMS EXTENDED TO LABS */}
      <line x1="280" y1="160" x2="880" y2="160" stroke="#004ce6" strokeWidth="2" />
      <g>
        {getHighlightBg('COE 301', 335, 138, 65)}
        <text x="335" y="142" textAnchor="middle" className={getTextStyle('COE 301')}>COE 301</text>

        {getHighlightBg('COE 302', 405, 138, 65)}
        <text x="405" y="142" textAnchor="middle" className={getTextStyle('COE 302')}>COE 302</text>

        {getHighlightBg('COE 303', 475, 138, 65)}
        <text x="475" y="142" textAnchor="middle" className={getTextStyle('COE 303')}>COE 303</text>

        {getHighlightBg('COE 304', 545, 138, 65)}
        <text x="545" y="142" textAnchor="middle" className={getTextStyle('COE 304')}>COE 304</text>
      </g>

      {/* CENTER CIRCLE */}
      <circle cx="280" cy="380" r="55" fill="#ffffff" stroke="#004ce6" strokeWidth="2.5" />
      <g>
        {getHighlightBg('نادي أعضاء', 400, 335, 150)}
        <text x="400" y="339" textAnchor="middle" className={getTextStyle('نادي أعضاء')}>نادي أعضاء هيئة التدريس</text>

        {getHighlightBg('المصلى', 195, 340, 65)}
        <text x="195" y="344" textAnchor="middle" className={getTextStyle('المصلى')}>المصلى</text>

        {getHighlightBg('دورة المياة', 215, 310, 70)}
        <text x="215" y="314" textAnchor="middle" className={getTextStyle('دورة المياة', true)}>دورة المياة</text>

        {getHighlightBg('نادي الروبوت', 185, 425, 100)}
        <text x="185" y="429" textAnchor="middle" className={getTextStyle('نادي الروبوت')}>نادي الروبوت</text>

        {/* Elevators and Stairs near Robot Club */}
        {getHighlightBg('السلالم', 245, 465, 55)}
        <text x="245" y="469" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 245, 495, 55)}
        <text x="245" y="499" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('منطقة المعرفة', 380, 435, 140)}
        <text x="380" y="439" textAnchor="middle" className={getTextStyle('منطقة المعرفة')}>منطقة المعرفة الرقمية</text>

        {getHighlightBg('دورة المياة', 335, 480, 70)}
        <text x="335" y="484" textAnchor="middle" className={getTextStyle('دورة المياة', true)}>دورة المياة</text>
      </g>

      {/* BOTTOM LEFT SERVICES */}
      {getHighlightBg('السلالم', 310, 705, 60)}
      <text x="310" y="709" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
      {getHighlightBg('المصعد', 310, 735, 60)}
      <text x="310" y="739" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

      {getHighlightBg('دورة المياة', 220, 725, 75)}
      <text x="220" y="729" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

      {/* MIDDLE VERTICAL SPINE */}
      <line x1="640" y1="110" x2="640" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* TOP SERVICES ABOVE COE LABS */}
      {getHighlightBg('المصعد', 610, 132, 55)}
      <text x="610" y="136" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 675, 142, 55)}
      <text x="675" y="146" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
      {getHighlightBg('دورة المياة', 675, 175, 75)}
      <text x="675" y="179" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

      {/* COE ROOMS (305, 306, 307, 308) & Admin */}
      <g>
        {getHighlightBg('COE 305', 590, 240, 75)}
        <text x="590" y="244" textAnchor="middle" className={getTextStyle('COE 305')}>COE 305</text>

        {getHighlightBg('COE 306', 590, 330, 75)}
        <text x="590" y="334" textAnchor="middle" className={getTextStyle('COE 306')}>COE 306</text>

        {getHighlightBg('المصعد', 600, 365, 55)}
        <text x="600" y="368" textAnchor="middle" className={getTextStyle('المصعد', true)}>المصعد</text>

        {getHighlightBg('السلالم', 600, 400, 55)}
        <text x="600" y="404" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {getHighlightBg('COE 308', 690, 240, 75)}
        <text x="690" y="244" textAnchor="middle" className={getTextStyle('COE 308')}>COE 308</text>

        {getHighlightBg('COE 307', 690, 330, 75)}
        <text x="690" y="334" textAnchor="middle" className={getTextStyle('COE 307')}>COE 307</text>

        {/* COE Admin Offices */}
        {getHighlightBg('رئيس قسم هندسة الحاسب', 830, 365, 170)}
        <text x="830" y="369" textAnchor="middle" className={getTextStyle('رئيس قسم هندسة الحاسب')}>رئيس قسم هندسة الحاسب</text>

        {getHighlightBg('المصعد', 965, 365, 55)}
        <text x="965" y="369" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('مجلس قسم هندسة الحاسب', 830, 405, 170)}
        <text x="830" y="409" textAnchor="middle" className={getTextStyle('مجلس قسم هندسة الحاسب')}>مجلس قسم هندسة الحاسب</text>

        {getHighlightBg('دورة المياة', 675, 400, 75)}
        <text x="675" y="404" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

        {/* Staff Offices Blocks */}
        <g>
          {[580, 730, 940].map((posX, idx) => (
            <g key={idx}>
              {getHighlightBg('مكاتب أعضاء', posX, 520, 120, 45)}
              <text x={posX} y={512} textAnchor="middle" className={getTextStyle('مكاتب أعضاء')}>مكاتب أعضاء</text>
              <text x={posX} y={527} textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">هيئة التدريس</text>
              <text x={posX} y={542} textAnchor="middle" className="fill-[#004ce6] font-medium text-[10px]">قسم هندسة الحاسب</text>
            </g>
          ))}
        </g>
      </g>

      {/* BOTTOM CORRIDOR (DEANSHIP & ADMINISTRATION) */}
      <line x1="280" y1="620" x2="1070" y2="620" stroke="#004ce6" strokeWidth="2" />
      <g>
        {/* ABOVE Y = 620 */}
        {getHighlightBg('دورة المياة', 670, 595, 75)}
        <text x="670" y="599" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

        {getHighlightBg('الشؤون الإدارية', 820, 595, 120)}
        <text x="820" y="599" textAnchor="middle" className={getTextStyle('الشؤون الإدارية')}>الشؤون الإدارية</text>

        {getHighlightBg('السلالم', 1040, 595, 60)}
        <text x="1040" y="599" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {/* BELOW Y = 620 */}
        {getHighlightBg('عميد الكلية', 340, 645, 110)}
        <text x="340" y="649" textAnchor="middle" className={getTextStyle('عميد الكلية')}>عـمـيـد الـكـلـيــة</text>

        {getHighlightBg('وكيل الشؤون الطلابية', 480, 638, 120, 20)}
        <text x="480" y="642" textAnchor="middle" className={getTextStyle('وكيل الشؤون الطلابية')}>وكيل الشؤون الطلابية</text>

        {getHighlightBg('وكيل الشؤون التعليمية', 480, 658, 120, 20)}
        <text x="480" y="662" textAnchor="middle" className={getTextStyle('وكيل الشؤون التعليمية')}>وكيل الشؤون التعليمية</text>

        {getHighlightBg('المصعد', 610, 642, 50)}
        <text x="610" y="646" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('السلالم', 670, 642, 55)}
        <text x="670" y="646" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {getHighlightBg('الشؤون الإدارية', 820, 645, 120)}
        <text x="820" y="649" textAnchor="middle" className={getTextStyle('الشؤون الإدارية')}>الشؤون الإدارية</text>

        {getHighlightBg('المصعد', 965, 645, 55)}
        <text x="965" y="649" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('دورة المياة', 1040, 645, 75)}
        <text x="1040" y="649" textAnchor="middle" className={getTextStyle('دورة المياة')}>دورة المياة</text>

        {/* Software Innovation Lab in place of Safe Software Lab */}
        {getHighlightBg('معمل الابتكار', 560, 720, 160)}
        <text x="560" y="717" textAnchor="middle" className={getTextStyle('معمل الابتكار')}>معمل الابتكار للبرمجيات</text>
        <text x="560" y="732" textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">مفتوحة المصدر</text>
      </g>

      {/* COE LABS LIST RIGHT SIDE */}
      <g>
        {/* COE 328 PLC - Moved right up to vertical line */}
        {getHighlightBg('328', 550, 85, 170)}
        <text x="550" y="80" textAnchor="middle" className="fill-[#004ce6] font-bold text-[10px]">معمل المتحكم المنطقي القابل للبرمجة</text>
        <text x="550" y="94" textAnchor="middle" className="fill-[#004ce6] font-mono text-[10px]">( Lab - COE 328 )</text>

        {/* COE 330 Robots - Moved right so text doesn't overlap vertical line */}
        {getHighlightBg('330', 715, 85, 120)}
        <text x="715" y="80" textAnchor="middle" className="fill-[#004ce6] font-semibold text-[10px]">معمل الروبوتات</text>
        <text x="715" y="93" textAnchor="middle" className="fill-[#004ce6] font-mono text-[10px]">( Lab - COE 330 )</text>

        {/* COE 337 Logic Design - Positioned where robotics was (above line at x=780, y=130) */}
        {getHighlightBg('337', 780, 130, 150)}
        <text x="780" y="125" textAnchor="middle" className={getTextStyle('337')}>معمل التصميم المنطقي</text>
        <text x="780" y="140" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 337 )</text>

        {/* COE 339 Networks - Positioned under the line at x=780, y=190 */}
        {getHighlightBg('339', 780, 190, 140)}
        <text x="780" y="185" textAnchor="middle" className={getTextStyle('339')}>معمل الشبكات</text>
        <text x="780" y="200" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 339 )</text>

        {/* COE 370 Embedded - Positioned on same level as Microprocessor at y=290 */}
        {getHighlightBg('370', 910, 290, 150)}
        <text x="910" y="285" textAnchor="middle" className={getTextStyle('370')}>معمل الأنظمة المدمجة</text>
        <text x="910" y="300" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 370 )</text>

        {/* COE 373 Microprocessor - Positioned at x=1060, y=290 */}
        {getHighlightBg('373', 1060, 290, 140)}
        <text x="1060" y="285" textAnchor="middle" className={getTextStyle('373')}>المعالج الدقيق</text>
        <text x="1060" y="300" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 373 )</text>

        {/* Stairs under COE 373 */}
        {getHighlightBg('السلالم', 1026, 355, 50)}
        <text x="1026" y="359" textAnchor="middle" className={isMatch('السلالم') ? getTextStyle('السلالم') : "fill-[#004ce6] font-bold text-[9px]"}>السلالم</text>

        {/* Restrooms under Stairs */}
        {getHighlightBg('دورة المياة', 1031, 405, 60)}
        <text x="1031" y="409" textAnchor="middle" className={isMatch('دورة المياة') ? getTextStyle('دورة المياة') : "fill-[#004ce6] font-bold text-[9px]"}>دورة المياة</text>

        {/* COE 382 Projects / Microcontroller - Positioned left at x=1120 */}
        {getHighlightBg('382', 1120, 355, 155)}
        <text x="1120" y="350" textAnchor="middle" className="fill-[#004ce6] font-bold text-[9.5px]">معمل المشاريع / المتحكم الدقيق</text>
        <text x="1120" y="363" textAnchor="middle" className="fill-[#004ce6] font-mono text-[9.5px]">( Lab - COE 382 )</text>

        {/* COE 385 Electronics / Electrical Circuits - Positioned left at x=1120 */}
        {getHighlightBg('385', 1120, 405, 165)}
        <text x="1120" y="400" textAnchor="middle" className="fill-[#004ce6] font-bold text-[9.5px]">معمل الإلكترونيات / الدوائر الكهربائية</text>
        <text x="1120" y="413" textAnchor="middle" className="fill-[#004ce6] font-mono text-[9.5px]">( Lab - COE 385 )</text>

        {/* Staff Offices */}
        <g>
          {getHighlightBg('مكاتب أعضاء', 1065, 520, 120, 45)}
          <text x={1065} y={512} textAnchor="middle" className={getTextStyle('مكاتب أعضاء')}>مكاتب أعضاء</text>
          <text x={1065} y={527} textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">هيئة التدريس</text>
          <text x={1065} y={542} textAnchor="middle" className="fill-[#004ce6] font-medium text-[10px]">قسم هندسة الحاسب</text>
        </g>
      </g>
    </svg>
  );

  return (
    <div className="w-full bg-[#161b26] p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center gap-5 min-w-[320px]">
      {/* Floating Zoom Toolbar */}
      <div className="w-full flex items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-blue-400 font-bold">
          <Icon name="fa-map-location-dot" className="text-base" />
          <span className="hidden sm:inline text-slate-200">مخطط كلية الحاسب</span>
        </div>

        <div className="flex items-center gap-2 mr-auto">
          <div className="flex items-center bg-slate-800 rounded-xl p-1.5 border border-white/10 shadow-inner gap-1">
            <button
              type="button"
              onClick={handleZoomOut}
              className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="تصغير"
            >
              <Icon name="fa-minus" />
            </button>
            <span className="px-2 font-mono font-bold text-blue-400 min-w-[52px] text-center text-xs sm:text-sm">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="px-3 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="تكبير"
            >
              <Icon name="fa-plus" />
            </button>
            {zoom !== 1 && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-3 py-1.5 mr-1 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white font-bold text-[11px] transition-all cursor-pointer shadow-sm"
              >
                إعادة ضبط
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main SVG Container on crisp clean canvas */}
      <div className="relative w-full overflow-x-auto overflow-y-hidden flex flex-col items-center py-6 px-3 sm:px-6 bg-white rounded-2xl border border-slate-200 custom-scrollbar shadow-inner gap-4">
        <div 
          className="transition-transform duration-200 ease-out origin-top-center w-full max-w-5xl"
          style={{ transform: `scale(${zoom})` }}
        >
          {floorId === 'ground' && renderGroundFloor()}
          {floorId === 'first' && renderFirstFloor()}
          {floorId === 'second' && renderSecondFloor()}
        </div>

        {/* Credit badge inside the white screen at bottom left */}
        <div className="w-full flex justify-start items-center pt-3 px-2 select-none" dir="ltr">
          <span className="bg-slate-700 text-slate-100 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center gap-2">
            <span className="text-slate-200 font-medium">Made by</span>
            <span className="text-blue-400 font-extrabold">Vilwsn</span>
          </span>
        </div>
      </div>
    </div>
  );
}
