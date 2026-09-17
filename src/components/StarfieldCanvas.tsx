import { useEffect, useRef } from 'react';

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let isRunning = true;
    let animationFrameId: number;
    let stars: Star[] = [];
    let symbols: CodeSymbol[] = [];
    const mouse = { x: -9999, y: -9999, radius: 180 };
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    let prevWidth = 0;
    let prevHeight = 0;

    function resizeCanvas(force = false) {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Only resize if dimensions changed significantly (prevent re-init on mobile address bar scroll)
      if (!force && Math.abs(w - prevWidth) < 20 && Math.abs(h - prevHeight) < 80) {
        return;
      }

      prevWidth = w;
      prevHeight = h;
      canvas.width = w;
      canvas.height = h;
      initElements(w, h);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    class CodeSymbol {
      x: number = 0;
      y: number = 0;
      vy: number = 0;
      text: string = '';
      fontSize: number = 0;
      opacity: number = 0;
      angle: number = 0;
      spinSpeed: number = 0;

      constructor(initSpread = false) {
        this.reset(initSpread);
      }

      reset(initSpread = false) {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = initSpread ? Math.random() * canvas.height : canvas.height + 30;
        this.vy = -(Math.random() * 0.25 + 0.1);
        const characters = ['0', '1', '</>', '{ }', '[ ]', '=>', '++', '&&', 'git', 'cpu', 'web', '[]', '();'];
        this.text = characters[Math.floor(Math.random() * characters.length)];
        this.fontSize = Math.floor(Math.random() * 4) + 11;
        this.opacity = Math.random() * 0.14 + 0.06;
        this.angle = (Math.random() - 0.5) * 0.1;
        this.spinSpeed = (Math.random() - 0.5) * 0.001;
      }

      update() {
        if (!canvas) return;
        this.y += this.vy;
        this.angle += this.spinSpeed;

        if (this.y < -30) {
          this.reset(false);
        }

        if (!isTouch && mouse.x !== -9999) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 0.8;
            this.y += (dy / dist) * force * 0.8;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.font = `${this.fontSize}px "JetBrains Mono", Consolas, monospace`;

        const isLight = document.body.classList.contains('light-mode');
        ctx.fillStyle = isLight
          ? `rgba(37, 99, 235, ${this.opacity * 1.5})`
          : `rgba(147, 197, 253, ${this.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }
    }

    class Star {
      x: number = 0;
      y: number = 0;
      baseX: number = 0;
      baseY: number = 0;
      vx: number = 0;
      vy: number = 0;
      radius: number = 0;
      alpha: number = 0;
      pulseSpeed: number = 0;
      pulsePhase: number = 0;
      color: string = '';

      constructor() {
        this.reset();
        if (canvas) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.baseX = this.x;
          this.baseY = this.y;
        }
      }

      reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.08;
        this.vy = (Math.random() - 0.5) * 0.08;
        this.radius = Math.random() * 1.2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.15;
        this.pulseSpeed = Math.random() * 0.015 + 0.005;
        this.pulsePhase = Math.random() * Math.PI * 2;

        const colors = [
          'rgba(255, 255, 255, ',
          'rgba(147, 197, 253, ',
          'rgba(196, 181, 253, ',
          'rgba(103, 114, 229, ',
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!canvas) return;
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseX > canvas.width) this.baseX = 0;
        if (this.baseY < 0) this.baseY = canvas.height;
        if (this.baseY > canvas.height) this.baseY = 0;

        this.x = this.baseX;
        this.y = this.baseY;
        this.pulsePhase += this.pulseSpeed;

        if (!isTouch && mouse.x !== -9999) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += (dx / dist) * force * 8;
            this.y += (dy / dist) * force * 8;
          }
        }
      }

      draw() {
        if (!ctx) return;
        const currentAlpha = Math.max(0.05, Math.min(1, this.alpha * (0.6 + Math.sin(this.pulsePhase) * 0.4)));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${currentAlpha})`;
        ctx.fill();
      }
    }

    function initElements(w: number, h: number) {
      stars = [];
      symbols = [];

      // Balanced count for silky 60fps even on low-end mobile devices
      const count = isMobile ? 35 : Math.min(75, Math.floor((w * h) / 18000));
      for (let i = 0; i < count; i++) {
        stars.push(new Star());
      }

      const symbolCount = isMobile ? 6 : Math.min(16, Math.floor((w * h) / 45000));
      for (let i = 0; i < symbolCount; i++) {
        symbols.push(new CodeSymbol(true));
      }
    }

    function animate() {
      if (!isRunning || !ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desktop interactive glow
      if (!isTouch && mouse.x !== -9999) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouse.radius * 1.3
        );
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.04)');
        gradient.addColorStop(0.5, 'rgba(147, 197, 253, 0.01)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Background symbols
      for (let i = 0; i < symbols.length; i++) {
        symbols[i].update();
        symbols[i].draw();
      }

      // Stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
      }

      // Constellation connection lines (only on desktop to save mobile battery & frame rate)
      if (!isMobile) {
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              const alpha = ((90 - dist) / 90) * 0.04 * stars[i].alpha;
              ctx.strokeStyle = `rgba(180, 198, 255, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    // Page Visibility and Lifecycle handlers (vital for Telegram / Safari bfcache)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          // Refresh dimensions upon returning to the tab
          resizeCanvas(true);
          animationFrameId = requestAnimationFrame(animate);
        }
      }
    };

    const handlePageShow = () => {
      if (!isRunning) {
        isRunning = true;
        resizeCanvas(true);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handlePageHide = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };

    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    window.addEventListener('resize', () => resizeCanvas(false), { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('pagehide', handlePageHide);

    resizeCanvas(true);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (!isTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', () => resizeCanvas(false));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('pagehide', handlePageHide);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="cosmic-bg-container"
      id="starfield-container"
      style={{ pointerEvents: 'none', userSelect: 'none' }}
      aria-hidden="true"
    >
      <canvas
        id="starfield-canvas"
        ref={canvasRef}
        style={{ pointerEvents: 'none', display: 'block' }}
      />
    </div>
  );
}
