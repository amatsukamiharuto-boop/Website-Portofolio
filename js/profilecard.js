/* Port JavaScript biasa (tanpa React) dari komponen "Profile Card" milik React Bits
   https://reactbits.dev/components/profile-card  — lisensi MIT + Commons Clause.
   Pemakaian: const card = createProfileCard(elemen, { name, title, avatarUrl, ... }); card.setTheme('light'); */
(function () {
  const THEMES = {
    dark: {
      '--pc-frame': 'rgba(38, 35, 46, 0.66)', '--pc-frame-edge': 'rgba(255, 255, 255, 0.08)', '--pc-frame-highlight': 'rgba(255, 255, 255, 0.07)',
      '--pc-frame-shadow': '0 22px 44px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
      '--pc-tile': 'linear-gradient(180deg, #3a3644 0%, #27242f 100%)', '--pc-tile-edge': 'rgba(255, 255, 255, 0.07)', '--pc-tile-highlight': 'rgba(255, 255, 255, 0.12)',
      '--pc-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.7)', '--pc-ink': '#f4f4f5', '--pc-muted': 'rgba(244, 244, 245, 0.6)',
      '--pc-hover': 'brightness(1.12)', '--pc-press': 'brightness(0.8)', '--pc-shade': 'rgba(0, 0, 0, 0.4)'
    },
    light: {
      '--pc-frame': 'rgba(240, 240, 243, 0.8)', '--pc-frame-edge': 'rgba(24, 24, 27, 0.07)', '--pc-frame-highlight': 'rgba(255, 255, 255, 0.95)',
      '--pc-frame-shadow': '0 22px 44px -22px rgba(24, 24, 27, 0.3), 0 6px 16px -10px rgba(24, 24, 27, 0.16)',
      '--pc-tile': 'linear-gradient(180deg, #ffffff 0%, #f6f6f8 100%)', '--pc-tile-edge': 'rgba(24, 24, 27, 0.08)', '--pc-tile-highlight': 'rgba(255, 255, 255, 1)',
      '--pc-tile-shadow': '0 4px 10px -5px rgba(24, 24, 27, 0.25)', '--pc-ink': '#27272a', '--pc-muted': 'rgba(39, 39, 42, 0.6)',
      '--pc-hover': 'brightness(0.97)', '--pc-press': 'brightness(0.92)', '--pc-shade': 'rgba(24, 24, 27, 0.14)'
    }
  };
  const FOILS = {
    dark: { '--pc-blend': 'color-dodge', '--pc-holo-filter': 'hue-rotate(0deg)', '--pc-sheen': 'rgba(255, 255, 255, 0.16)' },
    light: { '--pc-blend': 'multiply', '--pc-holo-filter': 'invert(1) hue-rotate(180deg)', '--pc-sheen': 'rgba(255, 255, 255, 0)' }
  };
  const GRAIN = `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='g' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0.55 0 0 0 -0.24 0 0 0 0 1'/></filter><rect width='100%' height='100%' filter='url(#g)'/></svg>")}")`;
  const MAIL = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 8 8 6 8-6"/></svg>';

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const isDark = color => {
    const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(color).trim());
    if (!m) return null;
    const hex = m[1].length === 3 ? m[1].replace(/./g, d => d + d) : m[1];
    const [r, g, b] = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.5;
  };

  window.createProfileCard = function (mount, options) {
    const o = Object.assign({
      avatarUrl: '', iconUrl: '', miniAvatarUrl: '', name: '', title: '', handle: '', status: 'Online', statusColor: '#22c55e',
      contactText: 'Contact', showUserInfo: true, onContactClick: null, theme: 'dark', backdropColor: '', radius: 16,
      holo: 0.8, glare: 0.5, enableTilt: true, tiltStrength: 12, parallax: 8, enableMobileTilt: false, mobileTiltSensitivity: 5, intro: true
    }, options);

    const root = document.createElement('div');
    root.className = 'profile-card';
    root.innerHTML = `
      <div class="profile-card__body">
        <div class="profile-card__tile">
          <span class="profile-card__sheen"></span>
          <span class="profile-card__holo"><span class="profile-card__holo-glow"></span><span class="profile-card__holo-shift"></span></span>
          ${o.avatarUrl ? `<img class="profile-card__photo" src="${esc(o.avatarUrl)}" alt="${esc(o.name)}" loading="lazy" draggable="false">` : ''}
          ${o.name || o.title ? `<span class="profile-card__scrim"></span><div class="profile-card__info">
            ${o.name ? `<h3 class="profile-card__name">${esc(o.name)}</h3>` : ''}${o.title ? `<p class="profile-card__title">${esc(o.title)}</p>` : ''}</div>` : ''}
          <span class="profile-card__tile-rim"></span>
        </div>
        ${o.showUserInfo ? `<div class="profile-card__footer">
          ${o.miniAvatarUrl ? `<span class="profile-card__avatar"><img src="${esc(o.miniAvatarUrl)}" alt="" loading="lazy" draggable="false"></span>` : ''}
          <div class="profile-card__meta">${o.handle ? `<span class="profile-card__handle">@${esc(o.handle)}</span>` : ''}${o.status ? `<span class="profile-card__status">${esc(o.status)}</span>` : ''}</div>
          ${o.contactText ? `<button type="button" class="profile-card__contact" aria-label="${esc(o.contactText + ' ' + o.name)}">${MAIL}${esc(o.contactText)}</button>` : ''}
        </div>` : ''}
        <span class="profile-card__glare"></span><span class="profile-card__shade"></span><span class="profile-card__rim"></span>
      </div>`;
    mount.appendChild(root);

    // Jika gambar gagal dimuat, sembunyikan saja (kartu tetap tampil)
    root.querySelectorAll('img').forEach(img => img.addEventListener('error', () => (img.closest('.profile-card__avatar') || img).remove()));
    const btn = root.querySelector('.profile-card__contact');
    if (btn && typeof o.onContactClick === 'function') btn.addEventListener('click', o.onContactClick);

    const applyStyle = () => {
      const palette = o.theme === 'light' ? 'light' : 'dark';
      const bd = o.backdropColor ? isDark(o.backdropColor) : null;
      const foil = o.backdropColor ? ((bd ?? palette === 'dark') ? 'dark' : 'light') : palette;
      const backdrop = o.backdropColor
        ? `linear-gradient(180deg, color-mix(in srgb, ${o.backdropColor}, #ffffff 12%) 0%, color-mix(in srgb, ${o.backdropColor}, #000000 18%) 100%)`
        : 'var(--pc-tile)';
      const vars = Object.assign({}, THEMES[palette], FOILS[foil], {
        '--pc-radius': `${Math.max(0, o.radius)}px`, '--pc-backdrop': backdrop,
        '--pc-holo': clamp(o.holo, 0, 1), '--pc-glare': clamp(o.glare, 0, 1), '--pc-parallax': `${Math.max(0, o.parallax)}px`,
        '--pc-status': o.statusColor, '--pc-grain': GRAIN,
        '--pc-pattern': o.iconUrl ? `url("${o.iconUrl}")` : 'linear-gradient(#000, #000)',
        '--pc-pattern-size': o.iconUrl ? '180% auto' : '100% 100%',
        '--pc-holo-gain': o.iconUrl ? 1.25 : 0.75,
        '--pc-holo-detail': o.iconUrl && foil === 'dark' ? 1 : 0
      });
      for (const k in vars) root.style.setProperty(k, vars[k]);
    };
    applyStyle();

    /* ---- Mesin gerak (pegas) — sama dengan versi React ---- */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const size = { width: root.offsetWidth, height: root.offsetHeight };
    const x = { p: 0, v: 0, target: 0 }, y = { p: 0, v: 0, target: 0 }, light = { p: 0, target: 0 };
    let raf = 0, last = 0, slowUntil = 0, touchId = null;

    const write = () => {
      const angle = o.enableTilt && !reduced ? o.tiltStrength : 0;
      const depth = reduced ? 0 : o.parallax;
      const tilt = Math.min(1, Math.hypot(x.p, y.p));
      const s = root.style;
      s.setProperty('--pc-light-x', `${((x.p + 1) * 0.5 * size.width).toFixed(1)}px`);
      s.setProperty('--pc-light-y', `${((y.p + 1) * 0.5 * size.height).toFixed(1)}px`);
      s.setProperty('--pc-pointer-x', `${((x.p + 1) * 50).toFixed(2)}%`);
      s.setProperty('--pc-pointer-y', `${((y.p + 1) * 50).toFixed(2)}%`);
      s.setProperty('--pc-band-x', `${(50 + x.p * 15).toFixed(2)}%`);
      s.setProperty('--pc-band-y', `${(50 + y.p * 15).toFixed(2)}%`);
      s.setProperty('--pc-rotate-x', `${(y.p * angle).toFixed(3)}deg`);
      s.setProperty('--pc-rotate-y', `${(-x.p * angle).toFixed(3)}deg`);
      s.setProperty('--pc-shift-x', `${(x.p * depth).toFixed(2)}px`);
      s.setProperty('--pc-shift-y', `${(y.p * depth).toFixed(2)}px`);
      s.setProperty('--pc-reach', tilt.toFixed(4));
      s.setProperty('--pc-tilt', (tilt * light.p).toFixed(4));
      s.setProperty('--pc-active', light.p.toFixed(4));
    };

    const frame = now => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const slow = now < slowUntil;
      const stiffness = slow ? 24 : 120, damping = slow ? 9 : 16;
      const steps = Math.max(1, Math.ceil(dt / (1 / 120))), h = dt / steps;
      for (let i = 0; i < steps; i++) for (const a of [x, y]) { a.v += (stiffness * (a.target - a.p) - damping * a.v) * h; a.p += a.v * h; }
      const tau = light.target > light.p ? 0.18 : slow ? 0.9 : 0.45;
      light.p += (light.target - light.p) * (1 - Math.exp(-dt / tau));
      write();
      const moving = Math.abs(x.target - x.p) > 0.0005 || Math.abs(y.target - y.p) > 0.0005 || Math.abs(x.v) > 0.0005 || Math.abs(y.v) > 0.0005 || Math.abs(light.target - light.p) > 0.002;
      if (moving) raf = requestAnimationFrame(frame);
      else { x.p = x.target; y.p = y.target; light.p = light.target; write(); raf = 0; }
    };
    const wake = () => { if (raf) return; last = performance.now(); raf = requestAnimationFrame(frame); };
    const aim = (nx, ny, on = true) => { x.target = clamp(nx, -1, 1); y.target = clamp(ny, -1, 1); light.target = on ? 1 : 0; slowUntil = 0; wake(); };
    const aimAt = e => {
      const r = root.getBoundingClientRect();
      if (!r.width || !r.height) return;
      aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const release = () => aim(0, 0, false);

    const onEnter = e => { if (e.pointerType === 'mouse') aimAt(e); };
    const onMove = e => { if (e.pointerType === 'mouse' || e.pointerId === touchId) aimAt(e); };
    const onLeave = e => { if (e.pointerType === 'mouse') release(); };
    const onDown = e => { if (e.pointerType === 'mouse') return; touchId = e.pointerId; aimAt(e); };
    const onUp = e => { if (e.pointerId !== touchId) return; touchId = null; release(); };
    root.addEventListener('pointerenter', onEnter); root.addEventListener('pointermove', onMove); root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointerdown', onDown); root.addEventListener('pointerup', onUp); root.addEventListener('pointercancel', onUp);

    const observer = new ResizeObserver(() => { size.width = root.offsetWidth; size.height = root.offsetHeight; write(); });
    observer.observe(root);

    // Tilt lewat sensor HP (opsional)
    let listening = false;
    const onOrientation = e => {
      if (e.beta == null || e.gamma == null) return;
      aim((e.gamma * o.mobileTiltSensitivity) / 150, ((e.beta - 20) * o.mobileTiltSensitivity) / 150);
    };
    const listen = () => { if (listening) return; listening = true; window.addEventListener('deviceorientation', onOrientation); };
    const onClick = () => {
      const M = window.DeviceOrientationEvent;
      if (M && typeof M.requestPermission === 'function') M.requestPermission().then(st => { if (st === 'granted') listen(); }).catch(() => {});
      else listen();
    };
    if (o.enableMobileTilt) root.addEventListener('click', onClick);

    // Animasi pembuka
    if (o.intro && !reduced) {
      x.p = 0.62; y.p = -0.55; light.p = 1; slowUntil = performance.now() + 1400; write(); wake();
    } else write();

    return {
      setTheme(t) { o.theme = t === 'light' ? 'light' : 'dark'; applyStyle(); },
      destroy() {
        cancelAnimationFrame(raf); observer.disconnect(); window.removeEventListener('deviceorientation', onOrientation); root.remove();
      }
    };
  };
})();
