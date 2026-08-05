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
      return "fill-amber-600 font-black text-[14px] animate-pulse";
    }
    return isSubtext 
      ? "fill-[#2563eb] font-semibold text-[11px]" 
      : `${customColor} font-bold text-[13px] sm:text-[14px]`;
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
      <line x1="80" y1="160" x2="850" y2="160" stroke="#004ce6" strokeWidth="2" />
      <line x1="80" y1="380" x2="1180" y2="380" stroke="#004ce6" strokeWidth="2.5" />
      <line x1="80" y1="620" x2="1000" y2="620" stroke="#004ce6" strokeWidth="2" />

      {/* Extensions to كلية العمارة والتخطيط */}
      <text x="70" y="155" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>
      <text x="70" y="375" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>
      <text x="70" y="615" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>

      {/* Top Left Services */}
      {getHighlightBg('دورة مياه', 220, 85, 75)}
      <text x="220" y="89" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

      {getHighlightBg('المصعد', 345, 90, 60)}
      <text x="345" y="94" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 345, 118, 60)}
      <text x="345" y="122" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

      {/* TOP HORIZONTAL LINE FOR CS CLASSROOMS EXTENDED TO LABS 125 & 126 */}
      <line x1="280" y1="160" x2="850" y2="160" stroke="#004ce6" strokeWidth="2" />
      <g>
        {getHighlightBg('CS 101', 320, 138, 70)}
        <text x="320" y="142" textAnchor="middle" className={getTextStyle('CS 101')}>CS 101</text>

        {getHighlightBg('CS 102', 375, 138, 70)}
        <text x="375" y="142" textAnchor="middle" className={getTextStyle('CS 102')}>CS 102</text>

        {getHighlightBg('CS 103', 430, 138, 70)}
        <text x="430" y="142" textAnchor="middle" className={getTextStyle('CS 103')}>CS 103</text>

        {getHighlightBg('CS 104', 485, 138, 70)}
        <text x="485" y="142" textAnchor="middle" className={getTextStyle('CS 104')}>CS 104</text>

        {getHighlightBg('CS 105', 540, 138, 70)}
        <text x="540" y="142" textAnchor="middle" className={getTextStyle('CS 105')}>CS 105</text>
      </g>

      {/* CENTER CIRCLE */}
      <circle cx="280" cy="380" r="55" fill="#ffffff" stroke="#004ce6" strokeWidth="2.5" />
      <g>
        {getHighlightBg('المصلى', 195, 340, 65)}
        <text x="195" y="344" textAnchor="middle" className={getTextStyle('المصلى')}>المصلى</text>

        {getHighlightBg('دورة مياه', 215, 290, 70)}
        <text x="215" y="294" textAnchor="middle" className={getTextStyle('دورة مياه', true)}>دورة مياه</text>

        {getHighlightBg('الصالة الرياضية', 185, 425, 110)}
        <text x="185" y="429" textAnchor="middle" className={getTextStyle('الصالة الرياضية')}>الصالة الرياضية</text>

        {/* Elevators and Stairs near Gym */}
        {getHighlightBg('السلالم', 205, 465, 55)}
        <text x="205" y="469" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 205, 495, 55)}
        <text x="205" y="499" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('الكافتيريا', 370, 335, 90)}
        <text x="370" y="339" textAnchor="middle" className={getTextStyle('الكافتيريا')}>الكافتيريا</text>

        {getHighlightBg('مسرح', 380, 435, 120)}
        <text x="380" y="439" textAnchor="middle" className={getTextStyle('مسرح')}>مسرح الدور الأرضي</text>

        {getHighlightBg('دورة مياه', 305, 480, 70)}
        <text x="305" y="484" textAnchor="middle" className={getTextStyle('دورة مياه', true)}>دورة مياه</text>
      </g>

      {/* BOTTOM LEFT (المدخل الرئيسي & Services) */}
      {getHighlightBg('السلالم', 345, 665, 60)}
      <text x="345" y="669" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
      {getHighlightBg('المصعد', 345, 695, 60)}
      <text x="345" y="699" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

      {getHighlightBg('دورة مياه', 220, 695, 75)}
      <text x="220" y="699" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

      {getHighlightBg('المدخل الرئيسي', 280, 770, 150)}
      <text x="280" y="775" textAnchor="middle" className="fill-[#003da5] font-black text-[20px]">المدخل الرئيسي</text>

      {/* MIDDLE VERTICAL SPINE */}
      <line x1="640" y1="110" x2="640" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* TOP SERVICES ABOVE CS 109 */}
      {getHighlightBg('المصعد', 610, 132, 55)}
      <text x="610" y="136" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 675, 132, 55)}
      <text x="675" y="136" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
      {getHighlightBg('دورة مياه', 695, 188, 75)}
      <text x="695" y="192" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

      {/* CS ROOMS (106, 107, 108, 109) */}
      <g>
        {getHighlightBg('CS 106', 590, 240, 70)}
        <text x="590" y="244" textAnchor="middle" className={getTextStyle('CS 106')}>CS 106</text>

        {getHighlightBg('CS 107', 590, 330, 70)}
        <text x="590" y="334" textAnchor="middle" className={getTextStyle('CS 107')}>CS 107</text>

        {getHighlightBg('المصعد', 590, 400, 55)}
        <text x="590" y="403" textAnchor="middle" className={getTextStyle('المصعد', true)}>المصعد</text>

        {getHighlightBg('CS 109', 690, 240, 70)}
        <text x="690" y="244" textAnchor="middle" className={getTextStyle('CS 109')}>CS 109</text>

        {getHighlightBg('CS 108', 690, 330, 70)}
        <text x="690" y="334" textAnchor="middle" className={getTextStyle('CS 108')}>CS 108</text>

        {/* CS Admin Offices */}
        {getHighlightBg('رئيس قسم علوم الحاسب', 790, 365, 170)}
        <text x="790" y="369" textAnchor="middle" className={getTextStyle('رئيس قسم علوم الحاسب')}>رئيس قسم علوم الحاسب</text>

        {getHighlightBg('مجلس قسم علوم الحاسب', 790, 405, 170)}
        <text x="790" y="409" textAnchor="middle" className={getTextStyle('مجلس قسم علوم الحاسب')}>مجلس قسم علوم الحاسب</text>

        {/* Staff Offices Blocks */}
        <g>
          {[550, 680, 940].map((posX, idx) => (
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
      <line x1="280" y1="620" x2="1180" y2="620" stroke="#004ce6" strokeWidth="2" />
      <g>
        {getHighlightBg('القاعة الهادئة', 400, 645, 120)}
        <text x="400" y="649" textAnchor="middle" className={getTextStyle('القاعة الهادئة')}>القاعة الهادئة</text>

        {/* ABOVE Y = 620 */}
        {getHighlightBg('دورة مياه', 570, 595, 75)}
        <text x="570" y="599" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

        {getHighlightBg('شؤون الطلاب', 700, 595, 100)}
        <text x="700" y="599" textAnchor="middle" className={getTextStyle('شؤون الطلاب')}>شؤون الطلاب</text>

        {getHighlightBg('مشرف النادي', 830, 595, 130)}
        <text x="830" y="599" textAnchor="middle" className={getTextStyle('مشرف النادي')}>مشرف النادي الطلابي</text>

        {getHighlightBg('دورة مياه', 940, 595, 75)}
        <text x="940" y="599" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

        {/* BELOW Y = 620 */}
        {getHighlightBg('السلالم', 645, 645, 55)}
        <text x="645" y="649" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {getHighlightBg(' اسـتــــراحــة الـــطـــلاب', 725, 645, 110)}
        <text x="725" y="649" textAnchor="middle" className={getTextStyle('استراحة الطلاب')}>استراحة الطلاب</text>

        {getHighlightBg('السلالم', 815, 645, 55)}
        <text x="815" y="649" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {getHighlightBg('المصعد', 870, 645, 55)}
        <text x="870" y="649" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {/* BELOW ELEVATOR & STAIRS ON LEFT */}
        {getHighlightBg('أمن الشبكات', 560, 695, 140)}
        <text x="560" y="699" textAnchor="middle" className={getTextStyle('أمن الشبكات')}>معمل أمن الشبكات</text>

        {/* Bottom middle elevator/stairs */}
        {getHighlightBg('السلالم', 670, 695, 55)}
        <text x="670" y="698" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 670, 755, 55)}
        <text x="670" y="758" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
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
        {getHighlightBg('121', 1110, 300, 120)}
        <text x="1110" y="295" textAnchor="middle" className={getTextStyle('121')}>معمل 121</text>
        <text x="1110" y="310" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - CS Net )</text>

        {/* Lab 122 Dev */}
        {getHighlightBg('122', 1110, 350, 120)}
        <text x="1110" y="345" textAnchor="middle" className={getTextStyle('122')}>معمل 122</text>
        <text x="1110" y="360" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - CS Dev )</text>

        {/* Stairs to the left of Lab 122 */}
        {getHighlightBg('السلالم', 970, 350, 60)}
        <text x="970" y="354" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

        {/* Lab 123 OS */}
        {getHighlightBg('123', 1110, 430, 120)}
        <text x="1110" y="425" textAnchor="middle" className={getTextStyle('123')}>معمل 123</text>
        <text x="1110" y="440" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - CS OS )</text>

        {/* Staff Offices under Lab 123 */}
        <g>
          {getHighlightBg('مكاتب أعضاء', 1110, 510, 120, 45)}
          <text x={1110} y={502} textAnchor="middle" className={getTextStyle('مكاتب أعضاء')}>مكاتب أعضاء</text>
          <text x={1110} y={517} textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">هيئة التدريس</text>
          <text x={1110} y={532} textAnchor="middle" className="fill-[#004ce6] font-medium text-[10px]">قسم علوم الحاسب</text>
        </g>

        {/* Right side restrooms & services */}
        {getHighlightBg('دورة مياه', 960, 410, 75)}
        <text x="960" y="414" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

        {getHighlightBg('دورة مياه', 870, 490, 75)}
        <text x="870" y="494" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

        {getHighlightBg('السلالم', 1065, 685, 60)}
        <text x="1065" y="689" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 1065, 715, 60)}
        <text x="1065" y="719" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('دورة مياه', 940, 700, 75)}
        <text x="940" y="704" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>
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
      <line x1="80" y1="160" x2="850" y2="160" stroke="#004ce6" strokeWidth="2" />
      <line x1="80" y1="380" x2="1180" y2="380" stroke="#004ce6" strokeWidth="2.5" />
      <line x1="80" y1="620" x2="1000" y2="620" stroke="#004ce6" strokeWidth="2" />

      {/* Extensions to كلية العمارة والتخطيط */}
      <text x="70" y="155" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>
      <text x="70" y="375" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>
      <text x="70" y="615" textAnchor="end" className="fill-slate-600 font-semibold text-[12px]">كلية العمارة والتخطيط</text>

      {/* Top Left Services */}
      {getHighlightBg('دورة مياه', 220, 85, 75)}
      <text x="220" y="89" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

      {getHighlightBg('المصعد', 345, 90, 60)}
      <text x="345" y="94" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 345, 118, 60)}
      <text x="345" y="122" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

      {/* TOP HORIZONTAL LINE FOR IT CLASSROOMS EXTENDED TO LABS */}
      <line x1="280" y1="160" x2="850" y2="160" stroke="#004ce6" strokeWidth="2" />
      <g>
        {getHighlightBg('IT 201', 320, 138, 70)}
        <text x="320" y="142" textAnchor="middle" className={getTextStyle('IT 201')}>IT 201</text>

        {getHighlightBg('IT 202', 375, 138, 70)}
        <text x="375" y="142" textAnchor="middle" className={getTextStyle('IT 202')}>IT 202</text>

        {getHighlightBg('IT 203', 430, 138, 70)}
        <text x="430" y="142" textAnchor="middle" className={getTextStyle('IT 203')}>IT 203</text>

        {getHighlightBg('IT 204', 485, 138, 70)}
        <text x="485" y="142" textAnchor="middle" className={getTextStyle('IT 204')}>IT 204</text>

        {getHighlightBg('IT 205', 540, 138, 70)}
        <text x="540" y="142" textAnchor="middle" className={getTextStyle('IT 205')}>IT 205</text>
      </g>

      {/* CENTER CIRCLE */}
      <circle cx="280" cy="380" r="55" fill="#ffffff" stroke="#004ce6" strokeWidth="2.5" />
      <g>
        {getHighlightBg('Lion cafe', 370, 335, 100)}
        <text x="370" y="339" textAnchor="middle" className="fill-amber-600 font-extrabold text-[15px]">Lion cafe</text>

        {getHighlightBg('المصلى', 195, 340, 65)}
        <text x="195" y="344" textAnchor="middle" className={getTextStyle('المصلى')}>المصلى</text>

        {getHighlightBg('دورة مياه', 215, 290, 70)}
        <text x="215" y="294" textAnchor="middle" className={getTextStyle('دورة مياه', true)}>دورة مياه</text>

        {getHighlightBg('النادي الطلابي', 185, 425, 110)}
        <text x="185" y="429" textAnchor="middle" className={getTextStyle('النادي الطلابي')}>النادي الطلابي</text>

        {/* Elevators and Stairs near Student Club */}
        {getHighlightBg('السلالم', 205, 465, 55)}
        <text x="205" y="469" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 205, 495, 55)}
        <text x="205" y="499" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('مسرح', 380, 435, 120)}
        <text x="380" y="439" textAnchor="middle" className={getTextStyle('مسرح')}>مسرح الدور الأول</text>

        {getHighlightBg('دورة مياه', 305, 480, 70)}
        <text x="305" y="484" textAnchor="middle" className={getTextStyle('دورة مياه', true)}>دورة مياه</text>
      </g>

      {/* MIDDLE VERTICAL SPINE */}
      <line x1="640" y1="110" x2="640" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* TOP SERVICES ABOVE IT 209 */}
      {getHighlightBg('المصعد', 610, 132, 55)}
      <text x="610" y="136" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 675, 132, 55)}
      <text x="675" y="136" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
      {getHighlightBg('دورة مياه', 695, 188, 75)}
      <text x="695" y="192" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

      {/* IT ROOMS (206, 207, 208, 209) & Admin */}
      <g>
        {getHighlightBg('IT 206', 590, 240, 70)}
        <text x="590" y="244" textAnchor="middle" className={getTextStyle('IT 206')}>IT 206</text>

        {getHighlightBg('IT 207', 590, 330, 70)}
        <text x="590" y="334" textAnchor="middle" className={getTextStyle('IT 207')}>IT 207</text>

        {getHighlightBg('المصعد', 590, 400, 55)}
        <text x="590" y="403" textAnchor="middle" className={getTextStyle('المصعد', true)}>المصعد</text>

        {getHighlightBg('IT 209', 690, 240, 70)}
        <text x="690" y="244" textAnchor="middle" className={getTextStyle('IT 209')}>IT 209</text>

        {getHighlightBg('IT 208', 690, 330, 70)}
        <text x="690" y="334" textAnchor="middle" className={getTextStyle('IT 208')}>IT 208</text>

        {/* IT Admin Offices */}
        {getHighlightBg('رئيس قسم تقنية المعلومات', 790, 390, 180)}
        <text x="790" y="394" textAnchor="middle" className={getTextStyle('رئيس قسم تقنية المعلومات')}>رئيس قسم تقنية المعلومات</text>

        {getHighlightBg('مجلس قسم تقنية المعلومات', 790, 430, 180)}
        <text x="790" y="434" textAnchor="middle" className={getTextStyle('مجلس قسم تقنية المعلومات')}>مجلس قسم تقنية المعلومات</text>

        {/* Staff Offices Blocks */}
        <g>
          {[550, 680, 810, 940].map((posX, idx) => (
            <g key={idx}>
              {getHighlightBg('مكاتب أعضاء', posX, 520, 120, 45)}
              <text x={posX} y={512} textAnchor="middle" className={getTextStyle('مكاتب أعضاء')}>مكاتب أعضاء</text>
              <text x={posX} y={527} textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">هيئة التدريس</text>
              <text x={posX} y={542} textAnchor="middle" className="fill-[#004ce6] font-medium text-[10px]">قسم تقنية المعلومات</text>
            </g>
          ))}
        </g>

        {getHighlightBg('دورة مياه', 590, 725, 75)}
        <text x="590" y="729" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>
      </g>

      {/* BOTTOM CORRIDOR */}
      <line x1="280" y1="620" x2="1000" y2="620" stroke="#004ce6" strokeWidth="2" />
      <g>
        {/* Forensics Lab */}
        {getHighlightBg('التحقيق الجنائي', 330, 700, 130, 40)}
        <text x="330" y="695" textAnchor="middle" className={getTextStyle('التحقيق الجنائي')}>معمل التحقيق</text>
        <text x="330" y="710" textAnchor="middle" className="fill-[#003da5] font-bold text-[12px]">الجنائي الرقمي</text>

        {/* Cyber Lab */}
        {getHighlightBg('الأمن السيبراني', 440, 700, 140, 40)}
        <text x="440" y="695" textAnchor="middle" className={getTextStyle('الأمن السيبراني')}>معمل الأمن السيبراني</text>
        <text x="440" y="710" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - IT 226 )</text>

        {/* TECH 1 Hall */}
        {getHighlightBg('وادي التقنية', 530, 640, 130, 40)}
        <text x="530" y="635" textAnchor="middle" className={getTextStyle('وادي التقنية')}>قاعة وادي التقنية</text>
        <text x="530" y="650" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( TECH 1 )</text>

        {/* Secure Software Lab */}
        {getHighlightBg('البرمجيات الآمنة', 530, 750, 140)}
        <text x="530" y="754" textAnchor="middle" className={getTextStyle('البرمجيات الآمنة')}>معمل البرمجيات الآمنة</text>

        {/* Cyber Dept Head */}
        {getHighlightBg('رئيس قسم الأمن', 760, 640, 170)}
        <text x="760" y="644" textAnchor="middle" className={getTextStyle('رئيس قسم الأمن')}>رئيس قسم الأمن السيبراني</text>

        {/* Classrooms */}
        {getHighlightBg('قاعات دراسية', 760, 725, 110)}
        <text x="760" y="729" textAnchor="middle" className={getTextStyle('قاعات دراسية')}>قاعات دراسية</text>

        {/* Bottom middle elevator/stairs */}
        <line x1="640" y1="725" x2="670" y2="725" stroke="#004ce6" strokeWidth="2" />
        <line x1="670" y1="710" x2="670" y2="740" stroke="#004ce6" strokeWidth="2" />
        {getHighlightBg('السلالم', 670, 695, 55)}
        <text x="670" y="698" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 670, 755, 55)}
        <text x="670" y="758" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
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
        {getHighlightBg('224', 870, 300, 130)}
        <text x="870" y="295" textAnchor="middle" className={getTextStyle('224')}>معمل البرمجة</text>
        <text x="870" y="310" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - IT 224 )</text>

        {/* Lab 223 Networks */}
        {getHighlightBg('223', 1110, 300, 130)}
        <text x="1110" y="295" textAnchor="middle" className={getTextStyle('223')}>معمل الشبكات</text>
        <text x="1110" y="310" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - IT 223 )</text>

        {/* Lab 222 IoT */}
        {getHighlightBg('222', 1110, 410, 140)}
        <text x="1110" y="405" textAnchor="middle" className={getTextStyle('222')}>معمل انترنت الأشياء</text>
        <text x="1110" y="420" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - IT 222 )</text>

        {/* Lab 221 Database */}
        {getHighlightBg('221', 1110, 490, 140)}
        <text x="1110" y="485" textAnchor="middle" className={getTextStyle('221')}>معمل قواعد البيانات</text>
        <text x="1110" y="500" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - IT 221 )</text>

        {/* Right side restrooms & services */}
        {getHighlightBg('دورة مياه', 870, 410, 75)}
        <text x="870" y="414" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

        {getHighlightBg('دورة مياه', 870, 490, 75)}
        <text x="870" y="494" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

        <line x1="1000" y1="700" x2="1030" y2="700" stroke="#004ce6" strokeWidth="2" />
        <line x1="1030" y1="685" x2="1030" y2="715" stroke="#004ce6" strokeWidth="2" />
        {getHighlightBg('السلالم', 1065, 685, 60)}
        <text x="1065" y="689" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 1065, 715, 60)}
        <text x="1065" y="719" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('دورة مياه', 940, 700, 75)}
        <text x="940" y="704" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>
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
      {/* Main Vertical Left Spine */}
      <line x1="280" y1="80" x2="280" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* Main Vertical Middle Spine */}
      <line x1="640" y1="140" x2="640" y2="760" stroke="#004ce6" strokeWidth="2.5" />

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
      {getHighlightBg('دورة مياه', 220, 85, 75)}
      <text x="220" y="89" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

      {getHighlightBg('المصعد', 345, 90, 60)}
      <text x="345" y="94" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('السلالم', 345, 118, 60)}
      <text x="345" y="122" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>

      {/* TOP HORIZONTAL LINE FOR COE CLASSROOMS EXTENDED TO LABS */}
      <line x1="280" y1="160" x2="850" y2="160" stroke="#004ce6" strokeWidth="2" />
      <g>
        {getHighlightBg('COE 301', 320, 138, 75)}
        <text x="320" y="142" textAnchor="middle" className={getTextStyle('COE 301')}>COE 301</text>

        {getHighlightBg('COE 302', 375, 138, 75)}
        <text x="375" y="142" textAnchor="middle" className={getTextStyle('COE 302')}>COE 302</text>

        {getHighlightBg('COE 303', 430, 138, 75)}
        <text x="430" y="142" textAnchor="middle" className={getTextStyle('COE 303')}>COE 303</text>

        {getHighlightBg('COE 304', 485, 138, 75)}
        <text x="485" y="142" textAnchor="middle" className={getTextStyle('COE 304')}>COE 304</text>
      </g>

      {/* CENTER CIRCLE */}
      <circle cx="280" cy="380" r="55" fill="#ffffff" stroke="#004ce6" strokeWidth="2.5" />
      <g>
        {getHighlightBg('نادي أعضاء', 380, 335, 150)}
        <text x="380" y="339" textAnchor="middle" className={getTextStyle('نادي أعضاء')}>نادي أعضاء هيئة التدريس</text>

        {getHighlightBg('المصلى', 195, 340, 65)}
        <text x="195" y="344" textAnchor="middle" className={getTextStyle('المصلى')}>المصلى</text>

        {getHighlightBg('نادي الروبوت', 185, 425, 100)}
        <text x="185" y="429" textAnchor="middle" className={getTextStyle('نادي الروبوت')}>نادي الروبوت</text>

        {/* Elevators and Stairs near Robot Club */}
        {getHighlightBg('السلالم', 205, 465, 55)}
        <text x="205" y="469" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 205, 495, 55)}
        <text x="205" y="499" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('منطقة المعرفة', 380, 435, 140)}
        <text x="380" y="439" textAnchor="middle" className={getTextStyle('منطقة المعرفة')}>منطقة المعرفة الرقمية</text>

        {getHighlightBg('دورة مياه', 305, 480, 70)}
        <text x="305" y="484" textAnchor="middle" className={getTextStyle('دورة مياه', true)}>دورة مياه</text>
      </g>

      {/* MIDDLE VERTICAL SPINE */}
      <line x1="640" y1="110" x2="640" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* TOP COE LABS ABOVE LINE */}
      <g>
        {/* COE 328 PLC */}
        {getHighlightBg('328', 530, 95, 200, 40)}
        <text x="530" y="90" textAnchor="middle" className={getTextStyle('328')}>معمل المتحكم المنطقي القابل للبرمجة</text>
        <text x="530" y="105" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 328 )</text>

        {/* COE 330 Robots */}
        {getHighlightBg('330', 710, 95, 140, 40)}
        <text x="710" y="90" textAnchor="middle" className={getTextStyle('330')}>معمل الروبوتات</text>
        <text x="710" y="105" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 330 )</text>

        {/* COE 337 Logic Design */}
        {getHighlightBg('337', 790, 155, 150, 40)}
        <text x="790" y="150" textAnchor="middle" className={getTextStyle('337')}>معمل التصميم المنطقي</text>
        <text x="790" y="165" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 337 )</text>

        {/* COE 339 Networks */}
        {getHighlightBg('339', 790, 215, 140, 40)}
        <text x="790" y="210" textAnchor="middle" className={getTextStyle('339')}>معمل الشبكات</text>
        <text x="790" y="225" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 339 )</text>
      </g>

      {/* COE ROOMS (305, 306, 307, 308) & Admin */}
      <g>
        {getHighlightBg('COE 305', 590, 240, 75)}
        <text x="590" y="244" textAnchor="middle" className={getTextStyle('COE 305')}>COE 305</text>

        {getHighlightBg('COE 306', 590, 330, 75)}
        <text x="590" y="334" textAnchor="middle" className={getTextStyle('COE 306')}>COE 306</text>

        {getHighlightBg('COE 308', 690, 240, 75)}
        <text x="690" y="244" textAnchor="middle" className={getTextStyle('COE 308')}>COE 308</text>

        {getHighlightBg('COE 307', 690, 330, 75)}
        <text x="690" y="334" textAnchor="middle" className={getTextStyle('COE 307')}>COE 307</text>

        {/* COE Admin Offices */}
        {getHighlightBg('رئيس قسم هندسة الحاسب', 790, 390, 180)}
        <text x="790" y="394" textAnchor="middle" className={getTextStyle('رئيس قسم هندسة الحاسب')}>رئيس قسم هندسة الحاسب</text>

        {getHighlightBg('مجلس قسم هندسة الحاسب', 790, 430, 180)}
        <text x="790" y="434" textAnchor="middle" className={getTextStyle('مجلس قسم هندسة الحاسب')}>مجلس قسم هندسة الحاسب</text>

        {/* Staff Offices Blocks */}
        <g>
          {[550, 680, 810, 940].map((posX, idx) => (
            <g key={idx}>
              {getHighlightBg('مكاتب أعضاء', posX, 520, 120, 45)}
              <text x={posX} y={512} textAnchor="middle" className={getTextStyle('مكاتب أعضاء')}>مكاتب أعضاء</text>
              <text x={posX} y={527} textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">هيئة التدريس</text>
              <text x={posX} y={542} textAnchor="middle" className="fill-[#004ce6] font-medium text-[10px]">قسم هندسة الحاسب</text>
            </g>
          ))}
        </g>

        {getHighlightBg('دورة مياه', 590, 725, 75)}
        <text x="590" y="729" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>
      </g>

      {/* BOTTOM CORRIDOR (DEANSHIP & ADMINISTRATION) */}
      <line x1="280" y1="620" x2="1000" y2="620" stroke="#004ce6" strokeWidth="2" />
      <g>
        {/* Dean */}
        {getHighlightBg('عميد الكلية', 370, 600, 110)}
        <text x="370" y="604" textAnchor="middle" className={getTextStyle('عميد الكلية')}>عميد الكلية</text>

        {/* Vice deans */}
        {getHighlightBg('وكيل الشؤون الطلابية', 510, 600, 140)}
        <text x="510" y="604" textAnchor="middle" className={getTextStyle('وكيل الشؤون الطلابية')}>وكيل الشؤون الطلابية</text>

        {getHighlightBg('وكيل الشؤون التعليمية', 510, 635, 140)}
        <text x="510" y="639" textAnchor="middle" className={getTextStyle('وكيل الشؤون التعليمية')}>وكيل الشؤون التعليمية</text>

        {/* Innovation Lab */}
        {getHighlightBg('معمل الابتكار', 530, 720, 200, 40)}
        <text x="530" y="715" textAnchor="middle" className={getTextStyle('معمل الابتكار')}>معمل الابتكار للبرمجيات</text>
        <text x="530" y="730" textAnchor="middle" className="fill-[#004ce6] font-semibold text-[11px]">مفتوحة المصدر</text>

        {/* Administration */}
        {getHighlightBg('الشؤون الإدارية', 760, 600, 130)}
        <text x="760" y="604" textAnchor="middle" className={getTextStyle('الشؤون الإدارية')}>الشؤون الإدارية</text>

        {getHighlightBg('الشؤون الإدارية', 760, 680, 130)}
        <text x="760" y="684" textAnchor="middle" className={getTextStyle('الشؤون الإدارية')}>الشؤون الإدارية</text>

        {/* Bottom middle elevator/stairs */}
        <line x1="640" y1="725" x2="670" y2="725" stroke="#004ce6" strokeWidth="2" />
        <line x1="670" y1="710" x2="670" y2="740" stroke="#004ce6" strokeWidth="2" />
        {getHighlightBg('السلالم', 670, 695, 55)}
        <text x="670" y="698" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 670, 755, 55)}
        <text x="670" y="758" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      </g>

      {/* RIGHT SIDE LABS SPINE AT X = 1000 */}
      <line x1="1000" y1="220" x2="1000" y2="760" stroke="#004ce6" strokeWidth="2.5" />

      {/* COE LABS LIST RIGHT SIDE */}
      <g>
        {/* Embedded Systems Lab 370 */}
        {getHighlightBg('370', 870, 300, 150)}
        <text x="870" y="295" textAnchor="middle" className={getTextStyle('370')}>معمل الأنظمة المدمجة</text>
        <text x="870" y="310" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 370 )</text>

        {/* Microprocessor Lab 373 */}
        {getHighlightBg('373', 1110, 300, 140)}
        <text x="1110" y="295" textAnchor="middle" className={getTextStyle('373')}>المعالج الدقيق</text>
        <text x="1110" y="310" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 373 )</text>

        {/* Projects Lab 382 */}
        {getHighlightBg('382', 1110, 410, 150)}
        <text x="1110" y="405" textAnchor="middle" className={getTextStyle('382')}>معمل المشاريع / التحكم</text>
        <text x="1110" y="420" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 382 )</text>

        {/* Electronics Lab 385 */}
        {getHighlightBg('385', 1110, 490, 150)}
        <text x="1110" y="485" textAnchor="middle" className={getTextStyle('385')}>معمل الإلكترونيات</text>
        <text x="1110" y="500" textAnchor="middle" className="fill-[#004ce6] font-mono text-[11px]">( Lab - COE 385 )</text>

        {/* Right side restrooms & services */}
        {getHighlightBg('دورة مياه', 870, 410, 75)}
        <text x="870" y="414" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

        {getHighlightBg('دورة مياه', 870, 490, 75)}
        <text x="870" y="494" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>

        <line x1="1000" y1="700" x2="1030" y2="700" stroke="#004ce6" strokeWidth="2" />
        <line x1="1030" y1="685" x2="1030" y2="715" stroke="#004ce6" strokeWidth="2" />
        {getHighlightBg('السلالم', 1065, 685, 60)}
        <text x="1065" y="689" textAnchor="middle" className={getTextStyle('السلالم')}>السلالم</text>
        {getHighlightBg('المصعد', 1065, 715, 60)}
        <text x="1065" y="719" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

        {getHighlightBg('دورة مياه', 940, 700, 75)}
        <text x="940" y="704" textAnchor="middle" className={getTextStyle('دورة مياه')}>دورة مياه</text>
      </g>
    </svg>
  );

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-2xl border border-blue-200 shadow-lg flex flex-col items-center gap-4 min-w-[320px]">
      {/* Zoom Toolbar */}
      <div className="w-full flex items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs">
        <span className="font-semibold text-slate-600 hidden sm:inline">
          مخطط كلية الحاسب الرئيسي (طلاب)
        </span>

        <div className="flex items-center gap-2 mr-auto">
          <div className="flex items-center bg-white rounded-lg border border-slate-300 p-1 shadow-sm">
            <button
              type="button"
              onClick={handleZoomOut}
              className="px-2.5 py-1 rounded hover:bg-slate-100 text-slate-700 transition-all"
              title="تصغير"
            >
              <Icon name="fa-minus" />
            </button>
            <span className="px-2 font-mono font-bold text-blue-600 min-w-[45px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="px-2.5 py-1 rounded hover:bg-slate-100 text-slate-700 transition-all"
              title="تكبير"
            >
              <Icon name="fa-plus" />
            </button>
            {zoom !== 1 && (
              <button
                type="button"
                onClick={handleResetZoom}
                className="px-2 py-1 mr-1 rounded bg-blue-100 text-blue-700 font-bold hover:bg-blue-200 text-[10px] transition-all"
              >
                إعادة ضبط
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main SVG Container */}
      <div className="w-full overflow-x-auto overflow-y-hidden flex justify-center py-2 custom-scrollbar">
        <div 
          className="transition-transform duration-200 ease-out origin-top-center w-full max-w-5xl"
          style={{ transform: `scale(${zoom})` }}
        >
          {floorId === 'ground' && renderGroundFloor()}
          {floorId === 'first' && renderFirstFloor()}
          {floorId === 'second' && renderSecondFloor()}
        </div>
      </div>

      {/* Credit Footer */}
      <div className="w-full text-left font-bold text-[14px] text-slate-600 dark:text-slate-400 pt-2 px-2 select-none" dir="ltr">
        Made by Vilwsn
      </div>
    </div>
  );
}
