"use client";
/* ============ GOBIYA — Scroll-Scrub Engine (React Hook) ============ */
/* Lenis smooth scroll + GSAP ScrollTrigger + canvas frame scrub.
   Video clips (5 zones) are decoded to frame buffers lazily and
   scrubbed 1:1 with scroll progress. If clips are absent, a
   procedural node-field renderer keeps the experience intact. */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export const ZONES = [
  { id: 'chaos',       label: 'THE CHAOS',       unit: '% VISIBILITY', from: 0,   to: 100, grade: '#0B0F19' },
  { id: 'integration', label: 'THE INTEGRATION', unit: '% INDEXED',    from: 100, to: 180, grade: '#080b13' },
  { id: 'conversion',  label: 'THE CONVERSION',  unit: '% CVR LIFT',   from: 180, to: 260, grade: '#05070d' },
  { id: 'scale',       label: 'THE SCALE',       unit: '% TRAFFIC',    from: 260, to: 340, grade: '#020306' },
  { id: 'apex',        label: 'THE APEX',        unit: '% ROI SCALE',  from: 340, to: 400, grade: '#000000' },
];

const VIDEO_SOURCES = ZONES.map((z, i) => `/assets/videos/zone-${i + 1}-${z.id}.webm`);
const FRAMES_PER_CLIP = 60;

export function useScrollEngine() {
  useEffect(() => {
    const canvas = document.getElementById('scrub-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const poster = document.getElementById('poster');

    const reduceMotion = new URLSearchParams(location.search).has('static');
    const osReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Canvas sizing ----------
    let vw = 0, vh = 0, dpr = 1;
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      vw = innerWidth; vh = innerHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measure();
      setScroll(scrollY);
    }
    window.addEventListener('resize', resize, { passive: true });

    // ---------- Lenis smooth scroll ----------
    let lenis = null;
    if (!reduceMotion && !osReducedMotion) {
      lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      window.__lenis = lenis;
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const target = document.querySelector(a.getAttribute('href'));
          if (target) { e.preventDefault(); lenis.scrollTo(target, { duration: 1.6 }); }
        });
      });
    }

    // ---------- Frame buffers: lazy decode from video clips ----------
    const frames = new Array(ZONES.length).fill(null);
    const decoding = new Set();

    async function decodeClip(i) {
      if (frames[i] !== null || decoding.has(i)) return;
      decoding.add(i);
      let video;
      try {
        video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.preload = 'auto';
        // Detached (unattached) video elements are throttled/inconsistent for frame decoding
        // and requestVideoFrameCallback in some browsers — keep it in the DOM but invisible.
        video.style.cssText = 'position:fixed; left:-9999px; top:-9999px; width:1px; height:1px; opacity:0; pointer-events:none;';
        document.body.appendChild(video);
        video.src = VIDEO_SOURCES[i];
        await new Promise((res, rej) => {
          const t = setTimeout(() => rej(new Error('metadata timeout')), 5000);
          // loadeddata (not just loadedmetadata) guarantees a frame has actually been decoded,
          // otherwise the first seek below can grab a black bitmap before decoding has started.
          video.onloadeddata = () => { clearTimeout(t); res(); };
          video.onerror = (e) => { clearTimeout(t); rej(e); };
        });
        const buf = [];
        const dur = (video.duration && isFinite(video.duration)) ? video.duration : 10;
        for (let f = 0; f < FRAMES_PER_CLIP; f++) {
          video.currentTime = Math.max((f / (FRAMES_PER_CLIP - 1)) * Math.max(dur - 0.1, 0), 0.01);
          const seeked = await new Promise((res) => {
            const t = setTimeout(() => res(false), 2000);
            video.onseeked = () => { clearTimeout(t); res(true); };
            video.onerror = () => { clearTimeout(t); res(false); };
          });
          if (!seeked) break; // If seek hangs or errors, stop decoding this clip and use what we have
          // The seeked event can fire before the frame is actually painted, which grabs a black
          // bitmap. Wait for the next real video frame (or two rAFs as a fallback) before capturing.
          // Guarded with a timeout since requestVideoFrameCallback can fail to fire for a paused,
          // seeked video in some browsers, which would otherwise hang decoding forever.
          await new Promise((res) => {
            const t = setTimeout(res, 500);
            if (video.requestVideoFrameCallback) {
              video.requestVideoFrameCallback(() => { clearTimeout(t); res(); });
            } else {
              requestAnimationFrame(() => requestAnimationFrame(() => { clearTimeout(t); res(); }));
            }
          });
          buf.push(await createImageBitmap(video));
        }
        if (buf.length === 0) throw new Error('No frames decoded');
        frames[i] = buf;
        canvas.classList.add('ready');
        render();
      } catch {
        frames[i] = false; // clip missing → procedural fallback
      } finally {
        decoding.delete(i);
        video?.remove();
      }
    }

    // ---------- Procedural fallback renderer ----------
    const NODES = [];
    const NODE_COUNT = 140;
    for (let i = 0; i < NODE_COUNT; i++) {
      NODES.push({
        x: Math.random(), y: Math.random(), z: Math.random(),
        seed: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.8,
      });
    }

    function drawProcedural(p, t) {
      const g = ctx.createLinearGradient(0, 0, 0, vh);
      g.addColorStop(0, ZONES[act].grade);
      g.addColorStop(1, '#000');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);

      const cx = vw / 2, cy = vh / 2;
      const order = 1 - Math.max(0, 0.9 - p * 1.6);
      ctx.lineWidth = 1;

      const pts = NODES.map((n, i) => {
        const wob = Math.sin(t * 0.0004 * n.speed + n.seed);
        const chaosX = (n.x + 0.04 * wob) * vw;
        const chaosY = ((n.y + t * 0.00001 * n.speed) % 1) * vh;
        let sx, sy;
        if (act < 3) {
          const col = i % 14, row = Math.floor(i / 14);
          sx = (col + 1) / 15 * vw;
          sy = (row + 1) / 11 * vh;
        } else if (act === 3) {
          const a = n.seed + t * 0.00005;
          const r = 60 + n.z * Math.max(vw, vh) * 0.55;
          sx = cx + Math.cos(a) * r;
          sy = cy + Math.sin(a) * r * 0.6;
        } else {
          const a = n.seed + t * 0.0001;
          const r = 40 + n.z * 130 + Math.sin(t * 0.001 + n.seed) * 8;
          sx = cx + Math.cos(a) * r;
          sy = cy + Math.sin(a) * r;
        }
        return {
          x: chaosX + (sx - chaosX) * order,
          y: chaosY + (sy - chaosY) * order,
          z: n.z,
        };
      });

      ctx.strokeStyle = `rgba(0,240,255,${0.05 + order * 0.12})`;
      const linkDist = 90 + order * 60;
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < i + 5 && j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          if (dx * dx + dy * dy < linkDist * linkDist) {
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
          }
        }
      }
      ctx.stroke();

      for (const q of pts) {
        const r = 1 + q.z * 2.2;
        ctx.fillStyle = `rgba(0,240,255,${0.35 + q.z * 0.5})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (act === 4) {
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 220 + local * 60);
        glow.addColorStop(0, `rgba(0,240,255,${0.28 + 0.1 * Math.sin(t * 0.002)})`);
        glow.addColorStop(1, 'rgba(0,240,255,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, vw, vh);
      }
    }

    function drawFrame(bmp) {
      const s = Math.max(vw / bmp.width, vh / bmp.height);
      const w = bmp.width * s, h = bmp.height * s;
      ctx.drawImage(bmp, (vw - w) / 2, (vh - h) / 2, w, h);
    }

    // ---------- Zone geometry ----------
    const sections = [...document.querySelectorAll('.zone')];
    let zoneStarts = sections.map(() => 0);
    let maxScroll = 1;
    function measure() {
      zoneStarts = sections.map((s) => s.offsetTop);
      maxScroll = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    }

    let progress = 0, act = 0, local = 0;
    function setScroll(s) {
      progress = Math.min(Math.max(s / maxScroll, 0), 1);
      act = 0;
      for (let i = 0; i < zoneStarts.length; i++) if (s >= zoneStarts[i]) act = i;
      const start = zoneStarts[act];
      const end = act + 1 < zoneStarts.length ? zoneStarts[act + 1] : maxScroll;
      local = Math.min(Math.max((s - start) / Math.max(end - start, 1), 0), 1);
      updateHUD();
      render();
    }

    // ---------- Master render ----------
    function render() {
      if (reduceMotion || osReducedMotion || !vw) return;
      const t = performance.now();
      const clip = frames[act];
      if (clip && clip.length) {
        const idx = Math.min(Math.round(local * (clip.length - 1)), clip.length - 1);
        drawFrame(clip[idx]);
        canvas.classList.add('ready');
      } else if (clip === false) {
        drawProcedural(progress, t);
        canvas.classList.add('ready');
      }
      // If clip === null (still loading), do nothing and let the poster image show.
      
      decodeClip(act);
      if (act + 1 < ZONES.length) decodeClip(act + 1);
    }

    function loop() {
      if (!frames[act] || frames[act] === false) render();
      requestAnimationFrame(loop);
    }

    // ---------- HUD ----------
    const hudFill   = document.getElementById('hud-fill');
    const hudLabel  = document.getElementById('hud-zone-label');
    const hudCounter = document.getElementById('hud-counter');
    const hudUnit   = document.getElementById('hud-unit');
    const hudIndex  = document.getElementById('hud-index');
    const dots = [...document.querySelectorAll('.hud__nav a')];

    function updateHUD() {
      if (!hudFill) return;
      const z = ZONES[act];
      const value = Math.round(z.from + (z.to - z.from) * local);
      hudFill.style.height = `${(progress * 100).toFixed(2)}%`;
      if (hudLabel)   hudLabel.textContent   = z.label;
      if (hudCounter) hudCounter.textContent = value;
      if (hudUnit)    hudUnit.textContent    = z.unit;
      if (hudIndex)   hudIndex.textContent   = `Z-0${act + 1} / 05`;
      dots.forEach((d, i) => d.classList.toggle('active', i === act));
      document.body.dataset.zone = act + 1;
      document.body.style.setProperty('--grade', z.grade);
    }

    function initScrollTriggers() {
      gsap.registerPlugin(ScrollTrigger);
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
      } else {
        window.addEventListener('scroll', () => ScrollTrigger.update(), { passive: true });
      }

      ScrollTrigger.addEventListener('refresh', () => {
        measure();
        setScroll(scrollY);
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setScroll(self.scroll()),
      });

      document.querySelectorAll('.zone__pin').forEach((pin) => {
        ScrollTrigger.create({
          trigger: pin.parentElement,
          start: 'top 60%',
          onEnter: () => pin.classList.add('in'),
        });
      });

      document.querySelectorAll('.stat').forEach((el) => {
        const target = +el.dataset.count;
        el.innerText = '0';
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              innerText: target,
              duration: 1.6,
              ease: 'power2.out',
              snap: { innerText: 1 },
            });
          },
        });
      });
    }

    // ---------- Boot ----------
    function boot() {
      if (!reduceMotion) document.body.classList.add('motion');
      resize();
      if (!reduceMotion) {
        requestAnimationFrame(loop);
        // Decode only the first clip (hero) immediately.
        // The render loop handles lazy loading for the rest.
        decodeClip(0);
      }
      initScrollTriggers();
    }

    boot();

    return () => {
      window.removeEventListener('resize', resize);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
