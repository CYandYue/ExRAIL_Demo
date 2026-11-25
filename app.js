(() => {
  'use strict';
  const D = window.EXRAIL;
  let language = 'en';
  try { language = localStorage.getItem('exrail-language') === 'zh' ? 'zh' : 'en'; } catch {}
  let activeFilter = 'all';
  const t = value => typeof value === 'object' ? (value[language] ?? value.en) : value;
  const copy = (en, zh) => language === 'zh' ? zh : en;
  const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
  const external = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
  const play = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 6 10 6-10 6V6Z"/></svg>';
  const pause = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>';
  const expand = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5"/></svg>';
  const mark = '<svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M9 9h18M9 18h12M9 27h18M9 9v18m14-14 5 5-5 5"/></svg>';
  const icons = {
    perception: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
    memory: '<circle cx="5" cy="7" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="13" r="2"/><circle cx="5" cy="20" r="2"/><circle cx="20" cy="19" r="2"/><path d="m7 8 4 4m2-1 4-4m-5 8-5 4m7-5 4 4"/>',
    navigation: '<path d="m12 3 8 18-8-5-8 5L12 3Z"/><path d="M12 7v9"/>'
  };
  const icon = id => `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${icons[id]}</svg>`;
  const moduleName = id => language === 'zh' ? `${D.modules[id].chineseName}` : D.modules[id].name;
  const url = paper => `https://arxiv.org/abs/${paper.arxiv}`;
  const extLink = (href, label, cls = '') => `<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${label}${external}</a>`;
  const person = id => D.people[id];
  const mediaTitle = id => {
    const media = D.media[id];
    const moduleId = media.module ?? id.replace('Detail', '');
    return media.title ? t(media.title) : moduleId === 'system' ? 'ExRAIL System' : D.modules[moduleId].name;
  };
  const route = () => {
    const key = location.hash.replace('#/', '');
    return Object.hasOwn(D.modules, key) ? key : 'home';
  };
  const owner = (id, label = copy('MODULE LEAD', '模块负责人')) => {
    const p = person(id);
    return `<a class="owner" href="${p.url}" target="_blank" rel="noopener noreferrer"><img src="${p.image}" alt="${p.name}" width="38" height="38" loading="lazy"><span><small>${label}</small><strong>${p.name}</strong></span>${external}</a>`;
  };
  function header(current) {
    return `<header class="site-header"><div class="container header-inner">
      <a class="brand" href="#" aria-label="ExRAIL home"><span class="brand-mark">${mark}</span><span>ExRAIL<span class="brand-lab"> LAB</span></span></a>
      <nav id="site-nav" aria-label="${copy('Main navigation', '主导航')}">
        <a href="#system">${copy('The system', '整体系统')}</a><a href="${current === 'home' ? '#system' : '#/perception'}">${copy('Modules', '研究模块')}</a><a href="#research">${copy('Research', '相关论文')}</a><a href="#team">${copy('People', '研究团队')}</a>
      </nav>
      <div class="header-actions"><button class="language-toggle" type="button" aria-label="${copy('Switch to Chinese', '切换到英文')}"><span class="${language === 'en' ? 'selected' : ''}">EN</span><i>/</i><span class="${language === 'zh' ? 'selected' : ''}">中</span></button>${extLink(D.lab.url, copy('Lab website', '实验室主页'), 'lab-link')}<button class="menu-toggle icon-button" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="${copy('Open navigation', '打开导航')}"><span></span><span></span></button></div>
    </div></header>`;
  }
  function footer() {
    return `<footer class="site-footer"><div class="container footer-inner"><a class="brand" href="#"><span class="brand-mark">${mark}</span><span>ExRAIL<span class="brand-lab"> LAB</span></span></a><p>${copy('Trustworthy AI Exploration Lab', 'Trustworthy AI Exploration 实验室')}<br><span>HKUST(GZ) · ${copy('Guangzhou, China', '中国 · 广州')}</span></p><div>${extLink(D.lab.url, copy('Visit the lab', '实验室主页'))}${extLink(D.people.yue.url, 'Yue Chang')}</div><span class="footer-note">© 2026 ExRAIL Lab</span></div></footer>`;
  }
  function visual(id, { autoplay = false } = {}) {
    const m = D.media[id];
    const preview = Boolean(autoplay && m.video);
    const title = mediaTitle(id);
    const videoLabel = preview ? copy('Enlarge demo', '放大演示') : copy('Watch demo', '播放演示');
    const picture = preview
      ? `<video class="preview-video" data-preview="${id}" src="${m.video}" poster="${m.poster}" autoplay muted loop playsinline preload="metadata" aria-label="${title} ${copy('demo preview', '演示预览')}"></video>`
      : `<img src="${m.poster}" alt="${title} ${m.video ? copy('demo poster', '演示封面') : copy('conceptual illustration', '概念示意图')}" loading="lazy" width="640" height="360">`;
    return `<div class="media-preview${preview ? ' autoplay-preview' : ''}">${picture}${m.video ? `<button class="media-play${preview ? ' preview-expand' : ''}" data-media="${id}" aria-label="${videoLabel}">${preview ? `<span>${expand}</span>` : `<span class="play-pill">${play}<span>${videoLabel}</span></span>`}</button>${preview ? `<button class="preview-toggle" type="button" aria-label="${copy('Pause preview', '暂停预览')}">${pause}</button>` : ''}` : `<span class="media-status">${copy('Video coming soon', '演示视频待更新')}</span>`}</div>`;
  }
  function moduleCard(id) {
    const m = D.modules[id];
    return `<article class="module-card module-${id}"><h3><a class="stretched-link" href="#/${id}">${m.name}<span>${arrow}</span></a></h3><p>${t(m.summary)}</p>${visual(id, { autoplay: true })}</article>`;
  }
  function systemHub() {
    return `<div class="system-hub${D.media.system.video ? ' has-video' : ''}">${D.media.system.video ? `<h3>ExRAIL System</h3>${visual('system', { autoplay: true })}` : `<div class="hub-orbit">${mark}</div><h3>ExRAIL System</h3><button class="hub-demo" type="button" data-media="system">${copy('Video coming soon', '演示视频待更新')}</button>`}</div>`;
  }
  let connectionObserver = null;
  function connectSystem() {
    connectionObserver?.disconnect();
    const map = document.querySelector('.system-map');
    if (!map) return;
    const svg = map.querySelector('.system-connectors');
    const hub = map.querySelector('.system-hub');
    const modules = ['perception', 'memory', 'navigation'].map(id => map.querySelector(`.module-${id}`));
    const update = () => {
      if (getComputedStyle(svg).display === 'none') return;
      const bounds = map.getBoundingClientRect();
      const center = hub.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
      const paths = modules.map((module, index) => {
        const rect = module.getBoundingClientRect();
        if (index === 2) return `M${rect.x + rect.width / 2 - bounds.x} ${rect.top - bounds.y} L${center.x + center.width / 2 - bounds.x} ${center.bottom - bounds.y}`;
        const startX = (index === 0 ? rect.right : rect.left) - bounds.x;
        const startY = rect.y + rect.height / 2 - bounds.y;
        const endX = (index === 0 ? center.left : center.right) - bounds.x;
        const endY = center.y + center.height / 2 - bounds.y;
        const bendX = (startX + endX) / 2;
        return `M${startX} ${startY} C${bendX} ${startY} ${bendX} ${endY} ${endX} ${endY}`;
      });
      svg.querySelector('path').setAttribute('d', paths.join(' '));
      svg.querySelectorAll('animateMotion').forEach((motion, index) => motion.setAttribute('path', paths[index]));
    };
    connectionObserver = new ResizeObserver(update);
    [map, hub, ...modules].forEach(element => connectionObserver.observe(element));
    update();
  }
  function paperRow(p) {
    const resources = [
      p.code ? extLink(p.code, copy('Code', '代码')) : '',
      p.project ? extLink(p.project, copy('Project page', '项目主页')) : ''
    ].filter(Boolean).join('');
    return `<article class="paper-row" data-paper="${p.id}">
      <a class="paper-image" href="${url(p)}" target="_blank" rel="noopener noreferrer" aria-label="${p.title}"><img src="${p.image}" alt="${p.name} ${copy('paper figure', '论文插图')}" width="240" height="150" loading="lazy"></a>
      <div class="paper-info">
        <div class="paper-meta"><span class="mono">2026</span>${p.modules.map(id => `<span class="paper-category">${moduleName(id)}</span>`).join('')}</div>
        <h3>${extLink(url(p), p.title)}</h3><p>${t(p.summary)}</p>
        <div class="paper-footer"><div class="paper-author">${person(p.lead).name} et al. <span>·</span> arXiv:${p.arxiv}</div>${resources ? `<div class="paper-resources">${resources}</div>` : ''}</div>
      </div>
      <a class="paper-open" href="${url(p)}" target="_blank" rel="noopener noreferrer" aria-label="${copy('Read', '阅读')} ${p.name}">${external}</a>
    </article>`;
  }
  function research() {
    return `<section class="research-section section-space" id="research"><div class="container"><div class="section-heading"><div><h2>${copy('Research, brought together.', '让研究彼此连接。')}</h2></div></div><div class="research-toolbar"><div class="filter-group" role="group" aria-label="${copy('Filter publications', '筛选论文')}">${['all', 'perception', 'memory', 'navigation'].map(id => `<button class="filter-button ${activeFilter === id ? 'active' : ''}" type="button" data-filter="${id}" aria-pressed="${activeFilter === id}">${id === 'all' ? copy('All research', '全部研究') : moduleName(id)}</button>`).join('')}</div><span class="research-count sr-only" aria-live="polite"></span></div><div id="paper-list">${D.papers.filter(p => activeFilter === 'all' || p.modules.includes(activeFilter)).map(paperRow).join('')}</div></div></section>`;
  }
  function team() {
    return `<section class="team-section section-space" id="team"><div class="container"><div class="section-heading"><div><h2>${copy('Built by curious minds.', '由好奇心驱动。')}</h2></div>${extLink(D.lab.peopleUrl, copy('Meet the whole lab', '认识实验室团队'), 'text-link')}</div><div class="team-grid">${Object.values(D.people).map(p => `<a class="person-card" href="${p.url}" target="_blank" rel="noopener noreferrer"><img src="${p.image}" alt="${p.name}" width="190" height="210" loading="lazy"><div><span class="eyebrow">${t(p.role)}</span><h3>${p.name} ${external}</h3><span class="person-affiliation">PhD Student · HKUST(GZ)</span><p>${t(p.bio)}</p><span class="text-link">${copy('Personal website', '个人主页')} ${arrow}</span></div></a>`).join('')}</div></div></section>`;
  }
  function home() {
    return `<main id="main"><section class="hero container"><div class="hero-copy"><h1 tabindex="-1">${copy('See. Remember.<br><span>Find a way.</span>', '感知世界。<br>记住所需。<br><span>找到方向。</span>')}</h1><p class="hero-description">${copy('Connecting perception, memory, and navigation.<br>Turning our robotics research into a shared system<br class="desktop-break"> for understanding and acting in the real world.', '连接感知、记忆与导航，将我们的机器人研究汇集为一个理解真实世界、在真实世界中行动的系统。')}</p><div class="hero-actions"><a class="button button-primary" href="#system">${copy('Explore the system', '探索整体系统')}${arrow}</a><button class="button button-text" type="button" data-media="perception">${play}${copy('Watch perception demo', '观看感知演示')}</button></div></div><div class="hero-visual"><img class="scene-art" src="./assets/scene.svg" alt="${copy('Conceptual 3D scene: connected objects, sensor observations and a navigation path', '三维场景概念示意：相互连接的对象、传感观测与导航路径')}" width="700" height="570"></div></section>
      <section class="system-section section-space" id="system"><div class="container"><div class="section-heading"><div><h2>${copy('The whole is connected.', '让每个模块协同思考。')}</h2></div></div><div class="system-map"><svg class="system-connectors" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true"><path d="M360 180 C405 180 405 222 420 222M840 180 C795 180 795 222 780 222M600 320V410"/><circle class="flow-dot flow-one" r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M360 180 C405 180 405 222 420 222"/></circle><circle class="flow-dot flow-two" r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M840 180 C795 180 795 222 780 222"/></circle><circle class="flow-dot flow-three" r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M600 410V320"/></circle></svg>${moduleCard('perception')}${moduleCard('memory')}${systemHub()}${moduleCard('navigation')}</div></div></section>${research()}${team()}<section class="closing-section"><div class="container"><h2>${copy('Understanding the world.<br>One connection at a time.', '理解世界，<br>从每一次连接开始。')}</h2>${extLink(D.lab.url, copy('Discover ExRAIL Lab', '了解 ExRAIL 实验室'), 'button button-dark')}</div><span class="closing-watermark" aria-hidden="true">ExRAIL</span></section></main>`;
  }
  function flow(m) {
    const columns = [['inputs', copy('Input', '输入')], ['processing', m.processingLabel ? t(m.processingLabel) : copy('Process', '处理')], ['outputs', copy('Output', '输出')]];
    return `<div class="io-grid${m.interfaceTitle ? ' pipeline-io' : ''}">${columns.map(([key, label], i) => {
      const list = key === 'outputs' && m.interfaceTitle ? 'ol' : 'ul';
      const items = t(m[key]).map(item => typeof item === 'string' ? `<li>${item}</li>` : `<li><span>${item.label}</span><span class="io-item-detail">${item.detail}</span></li>`).join('');
      return `<div class="io-card ${i === 1 ? 'process-card' : ''}"><span class="eyebrow">${label}</span><${list}>${items}</${list}>${i < 2 ? `<span class="io-arrow">${arrow}</span>` : ''}</div>`;
    }).join('')}</div>`;
  }
  function platform() {
    return `<section class="detail-section platform-section"><div class="section-heading"><div><h2>${copy('Meet the mobile platform.', '认识我们的移动平台。')}</h2></div><span class="mono section-side-note">AGILEX SCOUT MINI</span></div><div class="platform-grid"><figure class="robot-figure"><img src="./assets/platform/robot-platform.jpg" alt="Agilex SCOUT MINI robot with RealSense D435 and dual Livox MID360 LiDARs" width="1600" height="1280" loading="lazy"></figure><div class="sensor-list">${[
      ['01', 'RealSense D435', copy('RGB camera', 'RGB 相机'), copy('Visual appearance for RGB-D observations.', '为 RGB-D 观测提供 RGB 外观信息。')],
      ['02', '2 × Livox MID360', copy('LiDAR sensing', '激光雷达'), copy('Surrounding geometry, odometry, and depth correction.', '提供周围环境几何，用于里程计与深度修正。')],
      ['03', 'CH110 IMU', copy('Inertial sensing', '惯性传感器'), copy('Inertial measurements for LiDAR–IMU odometry.', '为激光惯性里程计提供惯性测量。')],
      ['04', 'NVIDIA Jetson AGX Xavier', copy('Onboard computer', '机载计算机'), copy('Sensor acquisition, synchronization, and onboard odometry.', '负责传感器数据采集、同步与机载里程计计算。')]
    ].map(([n, name, label, desc]) => `<div class="sensor-item"><span class="mono">${n}</span><div><small>${label}</small><h3>${name}</h3><p>${desc}</p></div></div>`).join('')}</div></div></section>`;
  }
  function detailResearch(id, papers) {
    if (D.modules[id].showPapers === false) return '';
    return `<section class="detail-section detail-research"><div class="section-heading"><div><h2>${id === 'memory' ? copy('Three ideas. A richer memory.', '三项工作，丰富场景记忆。') : copy('The work behind it.', '模块背后的研究。')}</h2></div></div><div class="paper-list">${papers.map(paperRow).join('')}</div></section>`;
  }
  function demoSection(id) {
    const groups = D.videoGroups?.[id];
    if (!groups) return `<section class="detail-section extra-video"><div><h2>${copy('A closer look, in motion.', '更多细节，动态呈现。')}</h2></div>${visual(id + 'Detail')}</section>`;
    return `<section class="detail-section demo-gallery"><div class="section-heading"><h2>${copy('A closer look, in motion.', '更多细节，动态呈现。')}</h2>${extLink('https://psg-nav.github.io/', copy('PSG-Nav project', 'PSG-Nav 项目'), 'text-link')}</div>${groups.map(group => `<div class="demo-group"><div class="demo-group-heading"><h3>${t(group.title)}</h3>${group.platformLink ? `<a class="text-link" href="#/perception">${copy('Robot platform', '硬件平台')}${arrow}</a>` : ''}</div><div class="demo-grid">${group.videos.map(key => `<article class="demo-card">${visual(key)}<h4>${mediaTitle(key)}</h4></article>`).join('')}</div></div>`).join('')}</section>`;
  }
  function detail(id) {
    const m = D.modules[id];
    const papers = D.papers.filter(p => p.modules.includes(id));
    return `<main id="main" class="detail-main"><div class="container"><div class="detail-breadcrumb"><a href="#">${copy('Home', '首页')}</a><span>/</span><a href="#system">${copy('The system', '整体系统')}</a><span>/</span><span>${m.name}</span></div><div class="detail-heading"><div><h1 tabindex="-1">${m.name}<span class="detail-chinese-name">${m.chineseName}</span></h1></div><div class="lead-card">${owner(m.lead)}</div></div><nav class="module-tabs" aria-label="${copy('Research modules', '研究模块')}">${Object.keys(D.modules).map(key => `<a href="#/${key}" class="${key === id ? 'active' : ''}" ${key === id ? 'aria-current="page"' : ''}>${icon(key)}${D.modules[key].name}</a>`).join('')}</nav><section class="detail-overview"><div class="detail-overview-copy"><h2>${t(m.tagline)}</h2><p>${t(m.description)}</p><div class="tag-list">${m.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><div class="detail-visual">${visual(id, { autoplay: true })}</div></section><section class="detail-section"><div class="section-heading"><div><h2>${m.interfaceTitle ? t(m.interfaceTitle) : copy('From input to insight.', '从输入到输出。')}</h2></div></div>${flow(m)}</section>${id === 'perception' ? platform() : ''}<section class="detail-section method-section"><div class="section-heading"><div><h2>${copy('Inside the module.', '走进模块内部。')}</h2></div></div><div class="method-grid">${m.steps.map((step, i) => `<article><span class="step-number mono">0${i + 1}</span><h3>${t(step.title)}</h3><p>${t(step.text)}</p></article>`).join('')}</div></section>${detailResearch(id, papers)}${demoSection(id)}<div class="detail-next"><a href="#system">${arrow}${copy('Back to the system', '返回整体系统')}</a><a href="#/${id === 'perception' ? 'memory' : id === 'memory' ? 'navigation' : 'perception'}">${copy('Next module', '下一个模块')}<strong>${D.modules[id === 'perception' ? 'memory' : id === 'memory' ? 'navigation' : 'perception'].name}</strong>${arrow}</a></div></div></main>`;
  }
  const dialog = document.querySelector('#media-dialog');
  let previewsToResume = [];
  let dialogPreview = null;
  function updatePreviewToggle(video) {
    const button = video.closest('.media-preview').querySelector('.preview-toggle');
    button.innerHTML = video.paused ? play : pause;
    const label = video.paused ? copy('Play preview', '播放预览') : copy('Pause preview', '暂停预览');
    button.setAttribute('aria-label', label);
    button.title = label;
  }
  function startPreviews() {
    document.querySelectorAll('[data-preview]').forEach(video => {
      video.muted = true;
      video.addEventListener('play', () => updatePreviewToggle(video));
      video.addEventListener('pause', () => updatePreviewToggle(video));
      video.play().catch(() => updatePreviewToggle(video));
    });
  }
  function closeMedia() {
    const video = dialog.querySelector('video');
    if (video && video.readyState > 0 && dialogPreview?.isConnected && dialogPreview.readyState > 0) dialogPreview.currentTime = video.currentTime;
    if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
    dialog.close();
    document.querySelector('#media-body').replaceChildren();
    document.body.classList.remove('dialog-open');
    previewsToResume.forEach(preview => { if (preview.isConnected) preview.play().catch(() => {}); });
    previewsToResume = [];
    dialogPreview = null;
  }
  function openMedia(id) {
    const media = D.media[id];
    if (!media) return;
    const title = mediaTitle(id);
    dialogPreview = [...document.querySelectorAll('[data-preview]')].find(video => video.dataset.preview === id) ?? null;
    const startTime = dialogPreview?.currentTime ?? 0;
    previewsToResume = [...document.querySelectorAll('[data-preview]')].filter(video => !video.paused);
    previewsToResume.forEach(video => video.pause());
    document.querySelector('#media-title').textContent = `${title} / ${copy('DEMONSTRATION', '演示视频')}`;
    document.querySelector('#media-body').innerHTML = media.video ? `<video controls playsinline preload="metadata" poster="${media.poster}" src="${media.video}" aria-label="${title} demo"></video><p class="video-error" hidden>${copy('The video could not be loaded.', '视频暂时无法加载。')} <a href="${media.video}" download>${copy('Download video', '下载视频')}</a></p>` : `<div class="coming-soon"><img src="${media.poster}" alt=""><h2>${copy('System demo coming soon', '系统演示待更新')}</h2><button class="button button-primary" data-close-media>${copy('Keep exploring', '继续探索')}${arrow}</button></div>`;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    const video = dialog.querySelector('video');
    if (video) {
      if (startTime > 0) video.addEventListener('loadedmetadata', () => { video.currentTime = Math.min(startTime, video.duration); }, { once: true });
      video.addEventListener('error', () => { dialog.querySelector('.video-error').hidden = false; });
      video.play().catch(() => {});
    }
  }
  function updateCount() {
    const count = document.querySelector('.research-count');
    if (count) count.textContent = `${String(document.querySelectorAll('#paper-list .paper-row').length).padStart(2, '0')} ${copy('PUBLICATIONS', '篇论文')}`;
  }
  function render({ keepScroll = false, focus = false } = {}) {
    const scrollPosition = window.scrollY;
    const current = route();
    if (dialog.open) closeMedia();
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = current === 'home' ? 'ExRAIL · Embodied Intelligence, Connected' : `${D.modules[current].name} · ExRAIL Lab`;
    document.querySelector('#app').innerHTML = header(current) + (current === 'home' ? home() : detail(current)) + footer();
    startPreviews();
    connectSystem();
    updateCount();
    if (keepScroll) window.scrollTo({ top: scrollPosition, behavior: 'instant' });
    else {
      const anchor = ['#system', '#research', '#team'].includes(location.hash) ? document.querySelector(location.hash) : null;
      if (anchor) anchor.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }
    if (focus) document.querySelector('h1')?.focus({ preventScroll: true });
  }
  document.addEventListener('click', event => {
    if (event.target.closest('.skip-link')) { event.preventDefault(); const main = document.querySelector('main'); main.setAttribute('tabindex', '-1'); main.focus(); return; }
    const previewToggle = event.target.closest('.preview-toggle');
    if (previewToggle) {
      const video = previewToggle.closest('.media-preview').querySelector('video');
      if (video.paused) video.play().catch(() => {});
      else video.pause();
      updatePreviewToggle(video);
      return;
    }
    const mediaButton = event.target.closest('[data-media]');
    if (mediaButton) { openMedia(mediaButton.dataset.media); return; }
    if (event.target.closest('.dialog-close, [data-close-media]')) { closeMedia(); return; }
    if (event.target.closest('.language-toggle')) {
      language = language === 'en' ? 'zh' : 'en';
      try { localStorage.setItem('exrail-language', language); } catch {}
      render({ keepScroll: true });
      document.querySelector('.language-toggle').focus({ preventScroll: true });
      return;
    }
    const menu = event.target.closest('.menu-toggle');
    if (menu) {
      const expanded = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(expanded));
      document.querySelector('#site-nav').classList.toggle('is-open', expanded);
      return;
    }
    const filter = event.target.closest('[data-filter]');
    if (filter) {
      activeFilter = filter.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(button => { button.classList.toggle('active', button === filter); button.setAttribute('aria-pressed', String(button === filter)); });
      document.querySelector('#paper-list').innerHTML = D.papers.filter(p => activeFilter === 'all' || p.modules.includes(activeFilter)).map(paperRow).join('');
      updateCount();
    }
    if (event.target.closest('#site-nav a')) {
      document.querySelector('#site-nav').classList.remove('is-open');
      document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeMedia(); } });
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeMedia(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      document.querySelector('#site-nav')?.classList.remove('is-open');
      document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
    }
  });
  window.addEventListener('hashchange', () => render({ focus: route() !== 'home' }));
  render();
})();
