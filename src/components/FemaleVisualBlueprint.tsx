import React, { useState } from 'react';
import Icon from './Icon';

interface FemaleVisualBlueprintProps {
  floorId: 'ground' | 'first';
  searchQuery?: string;
}

export default function FemaleVisualBlueprint({ floorId, searchQuery = '' }: FemaleVisualBlueprintProps) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.6));
  const handleResetZoom = () => setZoom(1);

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

  const renderGroundFloor = () => (
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
      <line x1="70" y1="140" x2="390" y2="140" stroke="#f43f5e" strokeWidth="2.5" />
      <line x1="70" y1="140" x2="70" y2="410" stroke="#f43f5e" strokeWidth="2.5" />
      <line x1="70" y1="410" x2="390" y2="410" stroke="#f43f5e" strokeWidth="2.5" />

      {/* LEFT INNER RECTANGLE */}
      <rect x="120" y="190" width="270" height="160" fill="#fff5f7" />
      <line x1="120" y1="190" x2="390" y2="190" stroke="#f43f5e" strokeWidth="2" />
      <line x1="120" y1="190" x2="120" y2="350" stroke="#f43f5e" strokeWidth="2" />
      <line x1="120" y1="350" x2="390" y2="350" stroke="#f43f5e" strokeWidth="2" />
      <line x1="390" y1="190" x2="390" y2="220" stroke="#f43f5e" strokeWidth="2" />
      <line x1="390" y1="220" x2="370" y2="220" stroke="#f43f5e" strokeWidth="2" />
      <line x1="390" y1="258" x2="390" y2="282" stroke="#f43f5e" strokeWidth="2" />
      <line x1="390" y1="318" x2="370" y2="318" stroke="#f43f5e" strokeWidth="2" />
      <line x1="390" y1="318" x2="390" y2="350" stroke="#f43f5e" strokeWidth="2" />

      {/* LEFT WING NUMBERS & LABELS */}
      {getHighlightBg('2020', 230, 165, 55)}
      <text x="230" y="169" textAnchor="middle" className={getTextStyle('2020')}>2020</text>

      {getHighlightBg('2017', 95, 190, 50)}
      <text x="95" y="194" textAnchor="middle" className={getTextStyle('2017')}>2017</text>
      {getHighlightBg('2016', 95, 250, 50)}
      <text x="95" y="254" textAnchor="middle" className={getTextStyle('2016')}>2016</text>
      {getHighlightBg('2015', 95, 310, 50)}
      <text x="95" y="314" textAnchor="middle" className={getTextStyle('2015')}>2015</text>
      {getHighlightBg('2014', 95, 370, 50)}
      <text x="95" y="374" textAnchor="middle" className={getTextStyle('2014')}>2014</text>

      {getHighlightBg('2009', 150, 380, 50)}
      <text x="150" y="384" textAnchor="middle" className={getTextStyle('2009')}>2009</text>
      {getHighlightBg('2008', 230, 380, 50)}
      <text x="230" y="384" textAnchor="middle" className={getTextStyle('2008')}>2008</text>
      {getHighlightBg('2007', 310, 380, 50)}
      <text x="310" y="384" textAnchor="middle" className={getTextStyle('2007')}>2007</text>

      {getHighlightBg('2026', 170, 210, 50)}
      <text x="170" y="214" textAnchor="middle" className={getTextStyle('2026')}>2026</text>
      {getHighlightBg('2027', 330, 210, 50)}
      <text x="330" y="214" textAnchor="middle" className={getTextStyle('2027')}>2027</text>

      {getHighlightBg('Phones', 365, 238, 60)}
      <text x="365" y="242" textAnchor="middle" className={getTextStyle('Phones')}>Phones</text>
      {getHighlightBg('Lion', 365, 300, 50)}
      <text x="365" y="304" textAnchor="middle" className={getTextStyle('Lion')}>Lion</text>

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
      <line x1="510" y1="140" x2="830" y2="140" stroke="#f43f5e" strokeWidth="2.5" />
      <line x1="830" y1="140" x2="830" y2="410" stroke="#f43f5e" strokeWidth="2.5" />
      <line x1="510" y1="410" x2="830" y2="410" stroke="#f43f5e" strokeWidth="2.5" />

      {/* RIGHT INNER RECTANGLE */}
      <rect x="510" y="190" width="260" height="160" fill="#fff5f7" />
      <line x1="510" y1="190" x2="770" y2="190" stroke="#f43f5e" strokeWidth="2" />
      <line x1="770" y1="190" x2="770" y2="350" stroke="#f43f5e" strokeWidth="2" />
      <line x1="510" y1="350" x2="770" y2="350" stroke="#f43f5e" strokeWidth="2" />
      <line x1="510" y1="190" x2="510" y2="220" stroke="#f43f5e" strokeWidth="2" />
      <line x1="510" y1="220" x2="530" y2="220" stroke="#f43f5e" strokeWidth="2" />
      <line x1="510" y1="255" x2="510" y2="272" stroke="#f43f5e" strokeWidth="2" />
      <line x1="510" y1="330" x2="530" y2="330" stroke="#f43f5e" strokeWidth="2" />
      <line x1="510" y1="330" x2="510" y2="350" stroke="#f43f5e" strokeWidth="2" />

      {/* RIGHT WING NUMBERS & LABELS */}
      {getHighlightBg('2054', 670, 165, 55)}
      <text x="670" y="169" textAnchor="middle" className={getTextStyle('2054')}>2054</text>

      {getHighlightBg('2059', 570, 210, 50)}
      <text x="570" y="214" textAnchor="middle" className={getTextStyle('2059')}>2059</text>
      {getHighlightBg('2058', 690, 210, 50)}
      <text x="690" y="214" textAnchor="middle" className={getTextStyle('2058')}>2058</text>

      {getHighlightBg('المصلى', 545, 234, 60)}
      <text x="545" y="238" textAnchor="middle" className={getTextStyle('المصلى')}>المصلى</text>
      {getHighlightBg('الدرج', 545, 285, 50)}
      <text x="545" y="289" textAnchor="middle" className={getTextStyle('الدرج')}>الدرج</text>
      {getHighlightBg('المصعد', 545, 312, 60)}
      <text x="545" y="316" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>

      {getHighlightBg('2065', 570, 330, 50)}
      <text x="570" y="334" textAnchor="middle" className={getTextStyle('2065')}>2065</text>
      {getHighlightBg('2066', 640, 330, 50)}
      <text x="640" y="334" textAnchor="middle" className={getTextStyle('2066')}>2066</text>
      {getHighlightBg('2067', 710, 330, 50)}
      <text x="710" y="334" textAnchor="middle" className={getTextStyle('2067')}>2067</text>

      {getHighlightBg('2057', 800, 190, 50)}
      <text x="800" y="194" textAnchor="middle" className={getTextStyle('2057')}>2057</text>
      {getHighlightBg('2070', 800, 250, 50)}
      <text x="800" y="254" textAnchor="middle" className={getTextStyle('2070')}>2070</text>
      {getHighlightBg('2069', 800, 310, 50)}
      <text x="800" y="314" textAnchor="middle" className={getTextStyle('2069')}>2069</text>
      {getHighlightBg('2068', 800, 370, 50)}
      <text x="800" y="374" textAnchor="middle" className={getTextStyle('2068')}>2068</text>

      {getHighlightBg('2003', 590, 380, 50)}
      <text x="590" y="384" textAnchor="middle" className={getTextStyle('2003')}>2003</text>
      {getHighlightBg('2002', 670, 380, 50)}
      <text x="670" y="384" textAnchor="middle" className={getTextStyle('2002')}>2002</text>
      {getHighlightBg('2001', 750, 380, 50)}
      <text x="750" y="384" textAnchor="middle" className={getTextStyle('2001')}>2001</text>
    </svg>
  );

  const renderFirstFloor = () => (
    <svg viewBox="0 0 900 550" className="w-full max-w-4xl h-auto select-none" dir="rtl">
      {/* Top Title Pill */}
      <g>
        <rect x="360" y="10" width="180" height="36" rx="18" fill="#fecdd3" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="450" y="33" textAnchor="middle" className="fill-rose-900 font-extrabold text-[16px]">الدور الأول</text>
      </g>

      {/* Top Center Label: الواجهة المطلة */}
      {getHighlightBg('الواجهة المطلة', 450, 68, 110)}
      <text x="450" y="72" textAnchor="middle" className={getTextStyle('الواجهة المطلة')}>الواجهة المطلة</text>

      <line x1="50" y1="105" x2="395" y2="105" stroke="#f43f5e" strokeWidth="2.5" />
      <line x1="510" y1="105" x2="840" y2="105" stroke="#f43f5e" strokeWidth="2.5" />

      <line x1="50" y1="105" x2="50" y2="375" stroke="#f43f5e" strokeWidth="2.5" />
      <line x1="840" y1="105" x2="840" y2="375" stroke="#f43f5e" strokeWidth="2.5" />

      <line x1="50" y1="375" x2="395" y2="375" stroke="#f43f5e" strokeWidth="2.5" />
      <line x1="510" y1="375" x2="840" y2="375" stroke="#f43f5e" strokeWidth="2.5" />

      {getHighlightBg('3003', 110, 121, 50)}
      <text x="110" y="125" textAnchor="middle" className={getTextStyle('3003')}>3003</text>
      {getHighlightBg('3006', 230, 121, 50)}
      <text x="230" y="125" textAnchor="middle" className={getTextStyle('3006')}>3006</text>
      {getHighlightBg('3008', 330, 121, 50)}
      <text x="330" y="125" textAnchor="middle" className={getTextStyle('3008')}>3008</text>

      {getHighlightBg('3013', 570, 121, 50)}
      <text x="570" y="125" textAnchor="middle" className={getTextStyle('3013')}>3013</text>
      {getHighlightBg('3015', 680, 121, 50)}
      <text x="680" y="125" textAnchor="middle" className={getTextStyle('3015')}>3015</text>
      {getHighlightBg('3018', 780, 121, 50)}
      <text x="780" y="125" textAnchor="middle" className={getTextStyle('3018')}>3018</text>

      <rect x="105" y="145" width="285" height="175" fill="#fff5f7" />
      <line x1="105" y1="145" x2="390" y2="145" stroke="#f43f5e" strokeWidth="2" />
      <line x1="105" y1="145" x2="105" y2="320" stroke="#f43f5e" strokeWidth="2" />
      <line x1="105" y1="320" x2="390" y2="320" stroke="#f43f5e" strokeWidth="2" />
      <path d="M 390 145 L 390 180 L 375 180" stroke="#f43f5e" strokeWidth="2" fill="none" />
      <path d="M 375 238 L 390 238 L 390 260" stroke="#f43f5e" strokeWidth="2" fill="none" />
      <line x1="390" y1="292" x2="390" y2="320" stroke="#f43f5e" strokeWidth="2" />

      {getHighlightBg('3076', 160, 160, 50)}
      <text x="160" y="164" textAnchor="middle" className={getTextStyle('3076')}>3076</text>
      {getHighlightBg('3078', 260, 160, 50)}
      <text x="260" y="164" textAnchor="middle" className={getTextStyle('3078')}>3078</text>

      {getHighlightBg('المصعد', 350, 188, 60)}
      <text x="350" y="192" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('الدرج', 350, 230, 50)}
      <text x="350" y="234" textAnchor="middle" className={getTextStyle('الدرج')}>الدرج</text>
      {getHighlightBg('اللواكر', 350, 282, 60)}
      <text x="350" y="286" textAnchor="middle" className={getTextStyle('اللواكر')}>اللواكر</text>

      {getHighlightBg('3070', 210, 295, 50)}
      <text x="210" y="299" textAnchor="middle" className={getTextStyle('3070')}>3070</text>
      {getHighlightBg('3069', 300, 295, 50)}
      <text x="300" y="299" textAnchor="middle" className={getTextStyle('3069')}>3069</text>

      {getHighlightBg('3073', 77, 205, 50)}
      <text x="77" y="210" textAnchor="middle" className={getTextStyle('3073')}>3073</text>
      {getHighlightBg('3072', 77, 295, 50)}
      <text x="77" y="300" textAnchor="middle" className={getTextStyle('3072')}>3072</text>

      {getHighlightBg('3065', 130, 345, 50)}
      <text x="130" y="349" textAnchor="middle" className={getTextStyle('3065')}>3065</text>

      <rect x="425" y="155" width="70" height="155" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" fill="#fff" />
      <g transform="rotate(90 512 232)">
        {getHighlightBg('3030', 512, 232, 50)}
        <text x="512" y="236" textAnchor="middle" className={getTextStyle('3030')}>3030</text>
      </g>

      <rect x="530" y="145" width="250" height="175" stroke="#f43f5e" strokeWidth="2" fill="#fff5f7" />

      {getHighlightBg('3092', 630, 160, 50)}
      <text x="630" y="164" textAnchor="middle" className={getTextStyle('3092')}>3092</text>
      {getHighlightBg('3091', 740, 160, 50)}
      <text x="740" y="164" textAnchor="middle" className={getTextStyle('3091')}>3091</text>

      {getHighlightBg('3028', 580, 295, 50)}
      <text x="580" y="299" textAnchor="middle" className={getTextStyle('3028')}>3028</text>
      {getHighlightBg('3026', 690, 295, 50)}
      <text x="690" y="299" textAnchor="middle" className={getTextStyle('3026')}>3026</text>

      {getHighlightBg('3022', 810, 205, 50)}
      <text x="810" y="210" textAnchor="middle" className={getTextStyle('3022')}>3022</text>
      {getHighlightBg('3023', 810, 295, 50)}
      <text x="810" y="300" textAnchor="middle" className={getTextStyle('3023')}>3023</text>

      {getHighlightBg('3037', 750, 345, 50)}
      <text x="750" y="349" textAnchor="middle" className={getTextStyle('3037')}>3037</text>

      <g>
        <line x1="395" y1="375" x2="395" y2="465" stroke="#f43f5e" strokeWidth="2.5" />
        <line x1="510" y1="375" x2="510" y2="465" stroke="#f43f5e" strokeWidth="2.5" />

        <line x1="430" y1="375" x2="430" y2="390" stroke="#f43f5e" strokeWidth="2" />
        <line x1="485" y1="375" x2="485" y2="390" stroke="#f43f5e" strokeWidth="2" />

        {getHighlightBg('المصعد', 435, 418, 60)}
        <text x="435" y="422" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
        {getHighlightBg('الدرج', 485, 418, 50)}
        <text x="485" y="422" textAnchor="middle" className={getTextStyle('الدرج')}>الدرج</text>

        <path d="M 422 442 L 432 442 L 432 455" stroke="#f43f5e" strokeWidth="2" fill="none" />
        <path d="M 493 442 L 483 442 L 483 455" stroke="#f43f5e" strokeWidth="2" fill="none" />

        {getHighlightBg('الكافتيريا', 452, 495, 80)}
        <text x="452" y="499" textAnchor="middle" className={getTextStyle('الكافتيريا')}>الكافتيريا</text>
      </g>
    </svg>
  );

  return (
    <div className="w-full bg-[#161b26] p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center gap-5 min-w-[320px]">
      {/* Floating Zoom Toolbar */}
      <div className="w-full flex items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 text-pink-400 font-bold">
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
            <span className="px-2 font-mono font-bold text-pink-400 min-w-[52px] text-center text-xs sm:text-sm">
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
                className="px-3 py-1.5 mr-1 rounded-lg bg-pink-600/80 hover:bg-pink-600 text-white font-bold text-[11px] transition-all cursor-pointer shadow-sm"
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
          className="transition-transform duration-200 ease-out origin-top-center w-full max-w-4xl"
          style={{ transform: `scale(${zoom})` }}
        >
          {floorId === 'ground' ? renderGroundFloor() : renderFirstFloor()}
        </div>

        {/* Credit badge inside the white screen at bottom left */}
        <div className="w-full flex justify-start items-center pt-3 px-2 select-none" dir="ltr">
          <span className="bg-slate-700 text-slate-100 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center gap-2">
            <span className="text-slate-200 font-medium">Made by</span>
            <span className="text-pink-400 font-extrabold">razan1razan</span>
          </span>
        </div>
      </div>
    </div>
  );
}
