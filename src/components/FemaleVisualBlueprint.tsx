import React, { useState } from 'react';
import Icon from './Icon';

interface FemaleVisualBlueprintProps {
  floorId: 'ground' | 'first';
  searchQuery?: string;
}

function FemaleVisualBlueprint({ floorId, searchQuery = '' }: FemaleVisualBlueprintProps) {
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
      : "fill-[#881337] font-bold text-[13px] sm:text-[14px]";
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
    <svg viewBox="0 0 900 480" className="w-full max-w-4xl h-auto select-none" dir="rtl">
      {/* Top Title Pill */}
      <g>
        <rect x="380" y="10" width="140" height="28" rx="14" fill="#ffe4e6" stroke="#fda4af" strokeWidth="1.2" />
        <text x="450" y="28" textAnchor="middle" className="fill-rose-800 font-bold text-[12px]">الدور الأرضي</text>
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
        <text x="450" y="430" textAnchor="middle" className="fill-rose-900 font-extrabold text-[14px]">الباب الرئيسي</text>
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
    <svg viewBox="0 0 900 480" className="w-full max-w-4xl h-auto select-none" dir="rtl">
      {/* Top Title Pill */}
      <g>
        <rect x="380" y="10" width="140" height="28" rx="14" fill="#ffe4e6" stroke="#fda4af" strokeWidth="1.2" />
        <text x="450" y="28" textAnchor="middle" className="fill-rose-800 font-bold text-[12px]">الدور الأول</text>
      </g>

      {/* Top Center Label: الواجهة المطلة */}
      {getHighlightBg('الواجهة المطلة', 450, 68, 110)}
      <text x="450" y="72" textAnchor="middle" className={getTextStyle('الواجهة المطلة')}>الواجهة المطلة</text>

      <line x1="50" y1="110" x2="395" y2="110" stroke="#f43f5e" strokeWidth="2.5" />
      <line x1="510" y1="110" x2="840" y2="110" stroke="#f43f5e" strokeWidth="2.5" />

      <line x1="50" y1="110" x2="50" y2="380" stroke="#f43f5e" strokeWidth="2.5" />
      <line x1="840" y1="110" x2="840" y2="380" stroke="#f43f5e" strokeWidth="2.5" />

      <line x1="50" y1="380" x2="395" y2="380" stroke="#f43f5e" strokeWidth="2.5" />
      <line x1="510" y1="380" x2="840" y2="380" stroke="#f43f5e" strokeWidth="2.5" />

      {getHighlightBg('3003', 110, 126, 50)}
      <text x="110" y="130" textAnchor="middle" className={getTextStyle('3003')}>3003</text>
      {getHighlightBg('3006', 230, 126, 50)}
      <text x="230" y="130" textAnchor="middle" className={getTextStyle('3006')}>3006</text>
      {getHighlightBg('3008', 330, 126, 50)}
      <text x="330" y="130" textAnchor="middle" className={getTextStyle('3008')}>3008</text>

      {getHighlightBg('3013', 570, 126, 50)}
      <text x="570" y="130" textAnchor="middle" className={getTextStyle('3013')}>3013</text>
      {getHighlightBg('3015', 680, 126, 50)}
      <text x="680" y="130" textAnchor="middle" className={getTextStyle('3015')}>3015</text>
      {getHighlightBg('3018', 780, 126, 50)}
      <text x="780" y="130" textAnchor="middle" className={getTextStyle('3018')}>3018</text>

      <rect x="105" y="150" width="285" height="175" fill="#fff5f7" />
      <line x1="105" y1="150" x2="390" y2="150" stroke="#f43f5e" strokeWidth="2" />
      <line x1="105" y1="150" x2="105" y2="325" stroke="#f43f5e" strokeWidth="2" />
      <line x1="105" y1="325" x2="390" y2="325" stroke="#f43f5e" strokeWidth="2" />
      <path d="M 390 150 L 390 185 L 375 185" stroke="#f43f5e" strokeWidth="2" fill="none" />
      <path d="M 375 243 L 390 243 L 390 265" stroke="#f43f5e" strokeWidth="2" fill="none" />
      <line x1="390" y1="297" x2="390" y2="325" stroke="#f43f5e" strokeWidth="2" />

      {getHighlightBg('3076', 160, 165, 50)}
      <text x="160" y="169" textAnchor="middle" className={getTextStyle('3076')}>3076</text>
      {getHighlightBg('3078', 260, 165, 50)}
      <text x="260" y="169" textAnchor="middle" className={getTextStyle('3078')}>3078</text>

      {getHighlightBg('المصعد', 350, 193, 60)}
      <text x="350" y="197" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
      {getHighlightBg('الدرج', 350, 235, 50)}
      <text x="350" y="239" textAnchor="middle" className={getTextStyle('الدرج')}>الدرج</text>
      {getHighlightBg('اللواكر', 350, 287, 60)}
      <text x="350" y="291" textAnchor="middle" className={getTextStyle('اللواكر')}>اللواكر</text>

      {getHighlightBg('3070', 210, 300, 50)}
      <text x="210" y="304" textAnchor="middle" className={getTextStyle('3070')}>3070</text>
      {getHighlightBg('3069', 300, 300, 50)}
      <text x="300" y="304" textAnchor="middle" className={getTextStyle('3069')}>3069</text>

      {getHighlightBg('3073', 77, 210, 50)}
      <text x="77" y="215" textAnchor="middle" className={getTextStyle('3073')}>3073</text>
      {getHighlightBg('3072', 77, 300, 50)}
      <text x="77" y="305" textAnchor="middle" className={getTextStyle('3072')}>3072</text>

      {getHighlightBg('3065', 130, 350, 50)}
      <text x="130" y="354" textAnchor="middle" className={getTextStyle('3065')}>3065</text>

      <rect x="425" y="160" width="70" height="155" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" fill="#fff" />
      <g transform="rotate(90 512 237)">
        {getHighlightBg('3030', 512, 237, 50)}
        <text x="512" y="241" textAnchor="middle" className={getTextStyle('3030')}>3030</text>
      </g>

      <rect x="530" y="150" width="250" height="175" stroke="#f43f5e" strokeWidth="2" fill="#fff5f7" />

      {getHighlightBg('3092', 630, 165, 50)}
      <text x="630" y="169" textAnchor="middle" className={getTextStyle('3092')}>3092</text>
      {getHighlightBg('3091', 740, 165, 50)}
      <text x="740" y="169" textAnchor="middle" className={getTextStyle('3091')}>3091</text>

      {getHighlightBg('3028', 580, 300, 50)}
      <text x="580" y="304" textAnchor="middle" className={getTextStyle('3028')}>3028</text>
      {getHighlightBg('3026', 690, 300, 50)}
      <text x="690" y="304" textAnchor="middle" className={getTextStyle('3026')}>3026</text>

      {getHighlightBg('3022', 810, 210, 50)}
      <text x="810" y="215" textAnchor="middle" className={getTextStyle('3022')}>3022</text>
      {getHighlightBg('3023', 810, 300, 50)}
      <text x="810" y="305" textAnchor="middle" className={getTextStyle('3023')}>3023</text>

      {getHighlightBg('3037', 750, 350, 50)}
      <text x="750" y="354" textAnchor="middle" className={getTextStyle('3037')}>3037</text>

      <g>
        <line x1="395" y1="380" x2="395" y2="445" stroke="#f43f5e" strokeWidth="2.5" />
        <line x1="510" y1="380" x2="510" y2="445" stroke="#f43f5e" strokeWidth="2.5" />

        <line x1="430" y1="380" x2="430" y2="395" stroke="#f43f5e" strokeWidth="2" />
        <line x1="485" y1="380" x2="485" y2="395" stroke="#f43f5e" strokeWidth="2" />

        {getHighlightBg('المصعد', 435, 412, 60)}
        <text x="435" y="416" textAnchor="middle" className={getTextStyle('المصعد')}>المصعد</text>
        {getHighlightBg('الدرج', 485, 412, 50)}
        <text x="485" y="416" textAnchor="middle" className={getTextStyle('الدرج')}>الدرج</text>

        <path d="M 422 428 L 432 428 L 432 438" stroke="#f43f5e" strokeWidth="2" fill="none" />
        <path d="M 493 428 L 483 428 L 483 438" stroke="#f43f5e" strokeWidth="2" fill="none" />

        {getHighlightBg('الكافتيريا', 452, 460, 80)}
        <text x="452" y="464" textAnchor="middle" className={getTextStyle('الكافتيريا')}>الكافتيريا</text>
      </g>
    </svg>
  );

  return (
    <div className="w-full bg-[#161b26] p-2.5 sm:p-3.5 rounded-2xl border border-white/10 shadow-xl flex flex-col min-w-[320px] floor-map-canvas-wrapper">
      {/* Main SVG Container on crisp clean canvas with overlaid Zoom Controls & Rights */}
      <div className="relative w-full overflow-hidden overflow-x-auto overflow-y-auto flex justify-center items-center py-4 px-3 sm:px-6 bg-white rounded-xl border border-slate-200 custom-scrollbar shadow-inner min-h-[300px] sm:min-h-[380px]">
        {/* Zoom Controls Overlay - Top Left inside canvas */}
        <div className="absolute top-3 left-3 z-20 flex items-center bg-pink-50/95 backdrop-blur-md rounded-xl p-1 border border-pink-200 shadow-md gap-1 text-xs" dir="ltr">
          <button
            type="button"
            onClick={handleZoomOut}
            className="px-2.5 py-1.5 rounded-lg hover:bg-pink-100 text-pink-700 transition-all cursor-pointer font-bold"
            title="تصغير"
          >
            <Icon name="fa-minus" className="text-xs" />
          </button>
          <span className="px-2 font-mono font-extrabold text-pink-700 text-xs min-w-[44px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="px-2.5 py-1.5 rounded-lg hover:bg-pink-100 text-pink-700 transition-all cursor-pointer font-bold"
            title="تكبير"
          >
            <Icon name="fa-plus" className="text-xs" />
          </button>
          {zoom !== 1 && (
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2.5 py-1 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-[11px] transition-all cursor-pointer ml-1 whitespace-nowrap shadow-sm"
              dir="rtl"
            >
              إعادة ضبط
            </button>
          )}
        </div>

        {/* Artist Credit Overlay - Bottom Left inside canvas */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center select-none" dir="ltr">
          <span className="bg-pink-50/95 backdrop-blur-md text-pink-700 border border-pink-200 px-2.5 py-1 rounded-lg font-bold text-xs shadow-md flex items-center gap-1 floor-map-artist-credit">
            <span className="text-pink-500 font-semibold text-[11px]">Made by</span>
            <span className="text-pink-700 font-extrabold text-[11px]">razan1razan</span>
          </span>
        </div>

        <div
          className="transition-transform duration-200 ease-out origin-center w-full max-w-4xl flex justify-center py-2"
          style={{ transform: `scale(${zoom})` }}
        >
          {floorId === 'ground' ? renderGroundFloor() : renderFirstFloor()}
        </div>
      </div>
    </div>
  );
}

export default React.memo(FemaleVisualBlueprint);
