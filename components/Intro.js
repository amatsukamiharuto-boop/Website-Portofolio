'use client';
import { useEffect, useState } from 'react';
import L from './L';
import { CONFIG } from '../data/site';

// Daftar "modul" yang seolah-olah sedang dibangun
const STEPS = [
  'Initializing core', 'Loading Navbar', 'Loading About Me', 'Loading Experience', 'Loading Status',
  'Loading Tech Stack', 'Loading Projects', 'Loading Contact', 'Building styles'
];
const SPIN = '|/-\\';
const BAR = 24;

// Tahap: gate (tekan Masuk) -> loading (log terminal + persen) -> welcome -> exit (fade) -> done
export default function Intro() {
  const [stage, setStage] = useState('gate');
  const [p, setP] = useState({ idx: 0, step: 0, overall: 0 });

  // Jika animasi pembuka tidak aktif (dimatikan / reduced motion / sudah dilihat), lepas overlay
  useEffect(() => {
    if (document.documentElement.dataset.intro !== 'pending') setStage('done');
  }, []);

  // Tekan Enter di layar awal
  useEffect(() => {
    if (stage !== 'gate') return;
    const onKey = e => { if (e.key === 'Enter') setStage('loading'); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stage]);

  // Loading: tiap modul punya durasi acak. Persen 100 baru tercapai setelah halaman benar-benar selesai dimuat.
  useEffect(() => {
    if (stage !== 'loading') return;
    const dur = STEPS.map(() => 260 + Math.random() * 340);
    const total = dur.reduce((a, b) => a + b, 0);
    const t0 = performance.now();
    let raf = 0, timer = 0, last = '';
    const tick = now => {
      const e = now - t0;
      let acc = 0, idx = STEPS.length;
      for (let i = 0; i < STEPS.length; i++) {
        if (e < acc + dur[i]) { idx = i; break; }
        acc += dur[i];
      }
      const finished = idx === STEPS.length;
      const ready = document.readyState === 'complete' || e > total + 4000;
      let step, overall;
      if (finished && !ready) { idx = STEPS.length - 1; step = 99; overall = 99; }
      else if (finished) { step = 100; overall = 100; }
      else {
        const f = (e - acc) / dur[idx];
        step = Math.floor(f * 100);
        overall = Math.floor(((idx + f) / STEPS.length) * 100);
      }
      const key = `${idx}:${step}:${overall}`;
      if (key !== last) { last = key; setP({ idx, step, overall }); }
      if (finished && ready) { timer = setTimeout(() => setStage('welcome'), 600); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [stage]);

  // Welcome: tampil lalu fade
  useEffect(() => {
    if (stage !== 'welcome') return;
    const t = setTimeout(() => setStage('exit'), 2500);
    return () => clearTimeout(t);
  }, [stage]);

  // Exit: overlay memudar, animasi section dimulai
  useEffect(() => {
    if (stage !== 'exit') return;
    const d = document.documentElement;
    d.dataset.intro = 'exit';
    window.dispatchEvent(new Event('intro:done'));
    try { sessionStorage.setItem('introSeen', '1'); } catch (e) {}
    const t = setTimeout(() => { d.dataset.intro = 'done'; setStage('done'); }, 750);
    return () => clearTimeout(t);
  }, [stage]);

  if (stage === 'done') return null;

  const finished = p.idx >= STEPS.length;
  const filled = Math.round((p.overall / 100) * BAR);
  const pad = n => String(n).padStart(3, ' ');

  return (
    <div className="intro" aria-live="polite">
      {stage === 'gate' && (
        <div className="term">
          <div className="term-bar"><i /><i /><i /><span>guest@hitotobi:~</span></div>
          <div className="term-body">
            <p className="ln" style={{ '--n': 0 }}>{CONFIG.studio} Portfolio [Version 1.0]</p>
            <p className="ln" style={{ '--n': 1 }}>(c) {CONFIG.studio}. All rights reserved.</p>
            <p className="ln" style={{ '--n': 2 }}>&nbsp;</p>
            <p className="ln" style={{ '--n': 3 }}>&gt; system ready<span className="blink">_</span></p>
            <p className="ln dim" style={{ '--n': 4 }}>&gt; <L k="introHint" /></p>
            <button className="intro-btn ln" style={{ '--n': 5 }} onClick={() => setStage('loading')}>[ <L k="introEnter" /> ]</button>
          </div>
        </div>
      )}

      {stage === 'loading' && (
        <>
          <button className="intro-skip" onClick={() => setStage('exit')}><L k="introSkip" /> ›</button>
          <div className="term">
            <div className="term-bar"><i /><i /><i /><span>build --portfolio</span></div>
            <div className="term-body">
              <p className="dim">$ npm run build</p>
              {STEPS.map((s, i) => {
                if (i > p.idx) return null;
                const done = i < p.idx;
                return (
                  <p key={s} className="ln-row">
                    {done ? <><span className="ok">[ OK ]</span> {s}..... 100%</> : <>[ {SPIN[p.step % 4]}  ] {s}..... {pad(p.step)}%</>}
                  </p>
                );
              })}
              <p className="ln-row bar">[{'█'.repeat(filled)}{'░'.repeat(BAR - filled)}] {pad(p.overall)}%</p>
              {finished && <p className="ok">Build complete. Launching<span className="blink">_</span></p>}
            </div>
          </div>
        </>
      )}

      {stage === 'welcome' && <div className="intro-welcome">Welcome</div>}
    </div>
  );
}
