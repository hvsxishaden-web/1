import React from 'react';

interface FemaleVisualBlueprintProps {
  floorId: 'ground' | 'first';
  searchQuery?: string;
}

export default function FemaleVisualBlueprint({ floorId, searchQuery = '' }: FemaleVisualBlueprintProps) {
  const isMatch = (text: string) => {
    if (!searchQuery.trim()) return false;
    return text.toLowerCase().includes(searchQuery.trim().toLowerCase());
  };

  const getTextStyle = (text: string) => {
    return isMatch(text)
      ? "fill-amber-600 font-black text-[15px] animate-pulse"
      : "fill-[#1e3a8a] font-bold text-[13px] sm:text-[14px]";
  };

  const getHighlightBg = (text: string, x: number, y: number, width = 50, height = 22) => {
    if (!isMatch(text)) return null;
    return (
      <rect
        x={x - width / 2}
        y={y - height / 2 - 4}
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

  if (floorId === 'ground') {
    return (
      <div className="w-full overflow-x-auto bg-white p-4 sm:p-6 rounded-2xl border border-rose-200 shadow-lg flex flex-col items-center min-w-[320px]">
        <svg viewBox="0 0 900 440" className="w-full max-w-4xl h-auto select-none" dir="rtl">
          {/* Top Title Pill */}
          <g>
            <rect x="360" y="10" width="180" height="36" rx="18" fill="#fecdd3" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="450" y="33" textAnchor="middle" className="fill-rose-900 font-extrabold text-[16px]">الدور الأرضي</text>
          </g>

          {/* Top Facilities Labels (Above building) */}
          <g>
            {/* Left Facility: المكتبة -> الدرج */}
            {getHighlightBg('المكتبة', 310, 68, 65)}
            <text x="310" y="72" textAnchor="middle" className={getTextStyle('المكتبة')}>المكتبة</text>
            <line x1="310" y1="80" x2="310" y2="100" stroke="#f43f5e" strokeWidth="2" />
            {getHighlightBg('الدرج', 310, 118, 55)}
            <text x="310" y="122" textAnchor="middle" className={getTextStyle('الدرج')}>الدرج</text>

            {/* Right Facility: المسرح -> المصاعد */}
            {getHighlightBg('المسرح', 590, 68, 65)}
            <text x="590" y="72" textAnchor="middle" className={getTextStyle('المسرح')}>المسرح</text>
            <line x1="590" y1="80" x2="590" y2="100" stroke="#f43f5e" strokeWidth="2" />
            {getHighlightBg('المصعد', 590, 118, 65)}
            <text x="590" y="122" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
          </g>

          {/* LEFT WING OUTWALL */}
          {/* Top Outer Line */}
          <line x1="70" y1="140" x2="390" y2="140" stroke="#f43f5e" strokeWidth="2.5" />
          {/* Left Vertical Outer Line */}
          <line x1="70" y1="140" x2="70" y2="410" stroke="#f43f5e" strokeWidth="2.5" />
          {/* Bottom Outer Line */}
          <line x1="70" y1="410" x2="390" y2="410" stroke="#f43f5e" strokeWidth="2.5" />

          {/* LEFT INNER RECTANGLE */}
          <rect x="120" y="190" width="270" height="160" fill="#fff5f7" />
          {/* Top Line */}
          <line x1="120" y1="190" x2="390" y2="190" stroke="#f43f5e" strokeWidth="2" />
          {/* Left Line */}
          <line x1="120" y1="190" x2="120" y2="350" stroke="#f43f5e" strokeWidth="2" />
          {/* Bottom Line */}
          <line x1="120" y1="350" x2="390" y2="350" stroke="#f43f5e" strokeWidth="2" />
          {/* Right Line */}
          <line x1="390" y1="190" x2="390" y2="220" stroke="#f43f5e" strokeWidth="2" />
          {/* Horizontal line above Phones turning left */}
          <line x1="390" y1="220" x2="370" y2="220" stroke="#f43f5e" strokeWidth="2" />
          {/* Short vertical line between Phones and Lion on the corridor wall boundary at x=390 */}
          <line x1="390" y1="258" x2="390" y2="282" stroke="#f43f5e" strokeWidth="2" />
          {/* Horizontal line under Lion */}
          <line x1="390" y1="318" x2="370" y2="318" stroke="#f43f5e" strokeWidth="2" />
          <line x1="390" y1="318" x2="390" y2="350" stroke="#f43f5e" strokeWidth="2" />

          {/* LEFT WING NUMBERS & LABELS (Inside Corridors) */}
          {/* Top Outer Corridor: 2020 */}
          {getHighlightBg('2020', 230, 165, 55)}
          <text x="230" y="169" textAnchor="middle" className={getTextStyle('2020')}>2020</text>

          {/* Left Vertical Corridor: 2017, 2016, 2015, 2014 */}
          {getHighlightBg('2017', 95, 190, 50)}
          <text x="95" y="194" textAnchor="middle" className={getTextStyle('2017')}>2017</text>
          {getHighlightBg('2016', 95, 250, 50)}
          <text x="95" y="254" textAnchor="middle" className={getTextStyle('2016')}>2016</text>
          {getHighlightBg('2015', 95, 310, 50)}
          <text x="95" y="314" textAnchor="middle" className={getTextStyle('2015')}>2015</text>
          {getHighlightBg('2014', 95, 370, 50)}
          <text x="95" y="374" textAnchor="middle" className={getTextStyle('2014')}>2014</text>

          {/* Bottom Outer Corridor: 2009, 2008, 2007 */}
          {getHighlightBg('2009', 150, 380, 50)}
          <text x="150" y="384" textAnchor="middle" className={getTextStyle('2009')}>2009</text>
          {getHighlightBg('2008', 230, 380, 50)}
          <text x="230" y="384" textAnchor="middle" className={getTextStyle('2008')}>2008</text>
          {getHighlightBg('2007', 310, 380, 50)}
          <text x="310" y="384" textAnchor="middle" className={getTextStyle('2007')}>2007</text>

          {/* Inner Top Wall: 2026, 2027 */}
          {getHighlightBg('2026', 170, 210, 50)}
          <text x="170" y="214" textAnchor="middle" className={getTextStyle('2026')}>2026</text>
          {getHighlightBg('2027', 330, 210, 50)}
          <text x="330" y="214" textAnchor="middle" className={getTextStyle('2027')}>2027</text>

          {/* Inner Right Wall Vertical Labels: Phones, Lion */}
          {getHighlightBg('Phones', 365, 238, 60)}
          <text x="365" y="242" textAnchor="middle" className={getTextStyle('Phones')}>Phones</text>
          {getHighlightBg('Lion', 365, 300, 50)}
          <text x="365" y="304" textAnchor="middle" className={getTextStyle('Lion')}>Lion</text>

          {/* Inner Bottom Wall: 2033, 2032, 2031 */}
          {getHighlightBg('2033', 170, 330, 50)}
          <text x="170" y="334" textAnchor="middle" className={getTextStyle('2033')}>2033</text>
          {getHighlightBg('2032', 250, 330, 50)}
          <text x="250" y="334" textAnchor="middle" className={getTextStyle('2032')}>2032</text>
          {getHighlightBg('2031', 330, 330, 50)}
          <text x="330" y="334" textAnchor="middle" className={getTextStyle('2031')}>2031</text>

          {/* CENTER BOTTOM: الباب الرئيسي */}
          <g>
            {getHighlightBg('الباب الرئيسي', 450, 426, 100)}
            <text x="450" y="430" textAnchor="middle" className="fill-blue-900 font-extrabold text-[14px]">الباب الرئيسي</text>
          </g>

          {/* RIGHT WING OUTWALL */}
          {/* Top Outer Line */}
          <line x1="510" y1="140" x2="830" y2="140" stroke="#f43f5e" strokeWidth="2.5" />
          {/* Right Vertical Outer Line */}
          <line x1="830" y1="140" x2="830" y2="410" stroke="#f43f5e" strokeWidth="2.5" />
          {/* Bottom Outer Line */}
          <line x1="510" y1="410" x2="830" y2="410" stroke="#f43f5e" strokeWidth="2.5" />

          {/* RIGHT INNER RECTANGLE */}
          <rect x="510" y="190" width="260" height="160" fill="#fff5f7" />
          {/* Top Line */}
          <line x1="510" y1="190" x2="770" y2="190" stroke="#f43f5e" strokeWidth="2" />
          {/* Right Line */}
          <line x1="770" y1="190" x2="770" y2="350" stroke="#f43f5e" strokeWidth="2" />
          {/* Bottom Line */}
          <line x1="510" y1="350" x2="770" y2="350" stroke="#f43f5e" strokeWidth="2" />
          {/* Left Line with turn above المصلى, vertical boundary line, and turn under المصعد */}
          <line x1="510" y1="190" x2="510" y2="220" stroke="#f43f5e" strokeWidth="2" />
          {/* Turn right above المصلى (like Phones) */}
          <line x1="510" y1="220" x2="530" y2="220" stroke="#f43f5e" strokeWidth="2" />
          {/* Vertical boundary line on x=510 separating المصلى from الدرج */}
          <line x1="510" y1="255" x2="510" y2="272" stroke="#f43f5e" strokeWidth="2" />
          {/* Turn right under المصعد */}
          <line x1="510" y1="330" x2="530" y2="330" stroke="#f43f5e" strokeWidth="2" />
          <line x1="510" y1="330" x2="510" y2="350" stroke="#f43f5e" strokeWidth="2" />

          {/* RIGHT WING NUMBERS & LABELS (Inside Corridors) */}
          {/* Top Outer Corridor: 2054 */}
          {getHighlightBg('2054', 670, 165, 55)}
          <text x="670" y="169" textAnchor="middle" className={getTextStyle('2054')}>2054</text>

          {/* Inner Top Wall: 2059, 2058 */}
          {getHighlightBg('2059', 570, 210, 50)}
          <text x="570" y="214" textAnchor="middle" className={getTextStyle('2059')}>2059</text>
          {getHighlightBg('2058', 690, 210, 50)}
          <text x="690" y="214" textAnchor="middle" className={getTextStyle('2058')}>2058</text>

          {/* Inner Left Wall Vertical Labels: المصلى, الدرج, المصعد */}
          {getHighlightBg('المصلى', 545, 234, 60)}
          <text x="545" y="238" textAnchor="middle" className={getTextStyle('المصلى')}>المصلى</text>
          {getHighlightBg('الدرج', 545, 285, 50)}
          <text x="545" y="289" textAnchor="middle" className={getTextStyle('الدرج')}>الدرج</text>
          {getHighlightBg('المصعد', 545, 312, 60)}
          <text x="545" y="316" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

          {/* Inner Bottom Wall: 2065, 2066, 2067 */}
          {getHighlightBg('2065', 570, 330, 50)}
          <text x="570" y="334" textAnchor="middle" className={getTextStyle('2065')}>2065</text>
          {getHighlightBg('2066', 640, 330, 50)}
          <text x="640" y="334" textAnchor="middle" className={getTextStyle('2066')}>2066</text>
          {getHighlightBg('2067', 710, 330, 50)}
          <text x="710" y="334" textAnchor="middle" className={getTextStyle('2067')}>2067</text>

          {/* Right Vertical Corridor: 2057, 2070, 2069, 2068 */}
          {getHighlightBg('2057', 800, 190, 50)}
          <text x="800" y="194" textAnchor="middle" className={getTextStyle('2057')}>2057</text>
          {getHighlightBg('2070', 800, 250, 50)}
          <text x="800" y="254" textAnchor="middle" className={getTextStyle('2070')}>2070</text>
          {getHighlightBg('2069', 800, 310, 50)}
          <text x="800" y="314" textAnchor="middle" className={getTextStyle('2069')}>2069</text>
          {getHighlightBg('2068', 800, 370, 50)}
          <text x="800" y="374" textAnchor="middle" className={getTextStyle('2068')}>2068</text>
          {/* Bottom Outer Corridor: 2003, 2002, 2001 */}
          {getHighlightBg('2003', 590, 380, 50)}
          <text x="590" y="384" textAnchor="middle" className={getTextStyle('2003')}>2003</text>
          {getHighlightBg('2002', 670, 380, 50)}
          <text x="670" y="384" textAnchor="middle" className={getTextStyle('2002')}>2002</text>
          {getHighlightBg('2001', 750, 380, 50)}
          <text x="750" y="384" textAnchor="middle" className={getTextStyle('2001')}>2001</text>
        </svg>
        <div className="w-full text-left font-bold text-[14px] text-slate-600 dark:text-slate-400 pt-2 px-2 select-none" dir="ltr">Made by razan1razan</div>
      </div>
    );
  }

  // Floor 1 (الدور الأول)
  return (
    <div className="w-full overflow-x-auto bg-white p-4 sm:p-6 rounded-2xl border border-rose-200 shadow-lg flex flex-col items-center min-w-[320px]">
      <svg viewBox="0 0 900 550" className="w-full max-w-4xl h-auto select-none" dir="rtl">
        {/* Top Title Pill */}
        <g>
          <rect x="360" y="10" width="180" height="36" rx="18" fill="#fecdd3" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="450" y="33" textAnchor="middle" className="fill-rose-900 font-extrabold text-[16px]">الدور الأول</text>
        </g>

        {/* Top Center Label: الواجهة المطلة */}
        {getHighlightBg('الواجهة المطلة', 450, 68, 110)}
        <text x="450" y="72" textAnchor="middle" className={getTextStyle('الواجهة المطلة')}>الواجهة المطلة</text>

        {/* Outer Top Wall Lines */}
        <line x1="50" y1="105" x2="395" y2="105" stroke="#f43f5e" strokeWidth="2.5" />
        <line x1="510" y1="105" x2="840" y2="105" stroke="#f43f5e" strokeWidth="2.5" />

        {/* Outer Vertical Outer Lines */}
        <line x1="50" y1="105" x2="50" y2="375" stroke="#f43f5e" strokeWidth="2.5" />
        <line x1="840" y1="105" x2="840" y2="375" stroke="#f43f5e" strokeWidth="2.5" />

        {/* Outer Bottom Wall Lines */}
        <line x1="50" y1="375" x2="395" y2="375" stroke="#f43f5e" strokeWidth="2.5" />
        <line x1="510" y1="375" x2="840" y2="375" stroke="#f43f5e" strokeWidth="2.5" />

        {/* Outer Top Wall Numbers (Inside Top Corridor) */}
        {/* Left wing top: 3003, 3006, 3008 */}
        {getHighlightBg('3003', 110, 121, 50)}
        <text x="110" y="125" textAnchor="middle" className={getTextStyle('3003')}>3003</text>
        {getHighlightBg('3006', 230, 121, 50)}
        <text x="230" y="125" textAnchor="middle" className={getTextStyle('3006')}>3006</text>
        {getHighlightBg('3008', 330, 121, 50)}
        <text x="330" y="125" textAnchor="middle" className={getTextStyle('3008')}>3008</text>

        {/* Right wing top: 3013, 3015, 3018 */}
        {getHighlightBg('3013', 570, 121, 50)}
        <text x="570" y="125" textAnchor="middle" className={getTextStyle('3013')}>3013</text>
        {getHighlightBg('3015', 680, 121, 50)}
        <text x="680" y="125" textAnchor="middle" className={getTextStyle('3015')}>3015</text>
        {getHighlightBg('3018', 780, 121, 50)}
        <text x="780" y="125" textAnchor="middle" className={getTextStyle('3018')}>3018</text>

        {/* LEFT WING INNER BOX (First Floor) */}
        <rect x="105" y="145" width="285" height="175" fill="#fff5f7" />
        <line x1="105" y1="145" x2="390" y2="145" stroke="#f43f5e" strokeWidth="2" />
        <line x1="105" y1="145" x2="105" y2="320" stroke="#f43f5e" strokeWidth="2" />
        <line x1="105" y1="320" x2="390" y2="320" stroke="#f43f5e" strokeWidth="2" />
        {/* Right inner wall with exact openings, stub, and L-bracket matching PDF reference */}
        <path d="M 390 145 L 390 180 L 375 180" stroke="#f43f5e" strokeWidth="2" fill="none" />
        <path d="M 375 238 L 390 238 L 390 260" stroke="#f43f5e" strokeWidth="2" fill="none" />
        <line x1="390" y1="292" x2="390" y2="320" stroke="#f43f5e" strokeWidth="2" />

        {/* Left Inner Top Wall: 3076, 3078 */}
        {getHighlightBg('3076', 160, 160, 50)}
        <text x="160" y="164" textAnchor="middle" className={getTextStyle('3076')}>3076</text>
        {getHighlightBg('3078', 260, 160, 50)}
        <text x="260" y="164" textAnchor="middle" className={getTextStyle('3078')}>3078</text>

        {/* Inner Right Wall Labels: المصعد, الدرج, اللواكر */}
        {getHighlightBg('المصعد', 350, 188, 60)}
        <text x="350" y="192" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
        {getHighlightBg('الدرج', 350, 230, 50)}
        <text x="350" y="234" textAnchor="middle" className={getTextStyle('الدرج')}>الدرج</text>
        {getHighlightBg('اللواكر', 350, 282, 60)}
        <text x="350" y="286" textAnchor="middle" className={getTextStyle('اللواكر')}>اللواكر</text>

        {/* Left Inner Bottom Wall: 3070, 3069 */}
        {getHighlightBg('3070', 210, 295, 50)}
        <text x="210" y="299" textAnchor="middle" className={getTextStyle('3070')}>3070</text>
        {getHighlightBg('3069', 300, 295, 50)}
        <text x="300" y="299" textAnchor="middle" className={getTextStyle('3069')}>3069</text>

        {/* Left Outer Vertical Wall: 3073, 3072 (Inside Corridor) */}
        {getHighlightBg('3073', 77, 205, 50)}
        <text x="77" y="210" textAnchor="middle" className={getTextStyle('3073')}>3073</text>
        {getHighlightBg('3072', 77, 295, 50)}
        <text x="77" y="300" textAnchor="middle" className={getTextStyle('3072')}>3072</text>

        {/* Left Outer Bottom Wall: 3065 (Inside Corridor) */}
        {getHighlightBg('3065', 130, 345, 50)}
        <text x="130" y="349" textAnchor="middle" className={getTextStyle('3065')}>3065</text>

        {/* CENTER DASHED BOX: 3030 */}
        <rect x="425" y="155" width="70" height="155" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" fill="#fff" />
        <g transform="rotate(90 512 232)">
          {getHighlightBg('3030', 512, 232, 50)}
          <text x="512" y="236" textAnchor="middle" className={getTextStyle('3030')}>3030</text>
        </g>

        {/* RIGHT WING INNER BOX (First Floor - Full Solid Rectangle) */}
        <rect x="530" y="145" width="250" height="175" stroke="#f43f5e" strokeWidth="2" fill="#fff5f7" />

        {/* Right Inner Top Wall: 3092, 3091 */}
        {getHighlightBg('3092', 630, 160, 50)}
        <text x="630" y="164" textAnchor="middle" className={getTextStyle('3092')}>3092</text>
        {getHighlightBg('3091', 740, 160, 50)}
        <text x="740" y="164" textAnchor="middle" className={getTextStyle('3091')}>3091</text>

        {/* Right Inner Bottom Wall: 3028, 3026 */}
        {getHighlightBg('3028', 580, 295, 50)}
        <text x="580" y="299" textAnchor="middle" className={getTextStyle('3028')}>3028</text>
        {getHighlightBg('3026', 690, 295, 50)}
        <text x="690" y="299" textAnchor="middle" className={getTextStyle('3026')}>3026</text>

        {/* Right Outer Vertical Wall: 3022, 3023 (Inside Corridor) */}
        {getHighlightBg('3022', 810, 205, 50)}
        <text x="810" y="210" textAnchor="middle" className={getTextStyle('3022')}>3022</text>
        {getHighlightBg('3023', 810, 295, 50)}
        <text x="810" y="300" textAnchor="middle" className={getTextStyle('3023')}>3023</text>

        {/* Right Outer Bottom Wall: 3037 (Inside Corridor) */}
        {getHighlightBg('3037', 750, 345, 50)}
        <text x="750" y="349" textAnchor="middle" className={getTextStyle('3037')}>3037</text>

        {/* BOTTOM CORRIDOR (First Floor): المصاعد, الدرج, الكافتيريا */}
        <g>
          <line x1="395" y1="375" x2="395" y2="465" stroke="#f43f5e" strokeWidth="2.5" />
          <line x1="510" y1="375" x2="510" y2="465" stroke="#f43f5e" strokeWidth="2.5" />

          {/* Top vertical ticks in corridor */}
          <line x1="430" y1="375" x2="430" y2="390" stroke="#f43f5e" strokeWidth="2" />
          <line x1="485" y1="375" x2="485" y2="390" stroke="#f43f5e" strokeWidth="2" />

          {getHighlightBg('المصعد', 435, 418, 60)}
          <text x="435" y="422" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
          {getHighlightBg('الدرج', 485, 418, 50)}
          <text x="485" y="422" textAnchor="middle" className={getTextStyle('الدرج')}>الدرج</text>

          {/* L shape corner marks below المصاعد and الدرج */}
          <path d="M 422 442 L 432 442 L 432 455" stroke="#f43f5e" strokeWidth="2" fill="none" />
          <path d="M 493 442 L 483 442 L 483 455" stroke="#f43f5e" strokeWidth="2" fill="none" />

          {/* الكافتيريا Label */}
          {getHighlightBg('الكافتيريا', 452, 495, 80)}
          <text x="452" y="499" textAnchor="middle" className={getTextStyle('الكافتيريا')}>الكافتيريا</text>
        </g>
      </svg>
      <div className="w-full text-left font-bold text-[14px] text-slate-600 dark:text-slate-400 pt-2 px-2 select-none" dir="ltr">Made by razan1razan</div>
    </div>
  );
}
