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
  function visual(id, extraClass = '') {
    const m = D.media[id];
    const videoLabel = copy('Watch demo', '播放演示');
    return `<div class="media-preview ${extraClass}"><img src="${m.poster}" alt="${copy(`${id.replace('Detail', '')} research visualization`, `${id.replace('Detail', '')} 研究示意图`)}" loading="lazy" width="640" height="360">${m.video ? `<button class="media-play" data-media="${id}" aria-label="${videoLabel}"><span>${play}</span>${videoLabel}</button><span class="media-status available"><i></i>${copy('DEMO AVAILABLE', '演示视频已就绪')}</span>` : `<span class="media-status">${copy('VIDEO COMING SOON', '演示视频待更新')}</span>`}</div>`;
  }
  function moduleCard(id) {
    const m = D.modules[id];
    return `<article class="module-card module-${id}"><div class="card-top"><span class="module-number">${m.number} /</span><span class="module-icon">${icon(id)}</span></div><h3><a class="stretched-link" href="#/${id}">${m.name}<span>${arrow}</span></a></h3><p>${t(m.summary)}</p>${visual(id)}<div class="card-bottom"><span>${copy('Explore module', '了解这一模块')}</span><span>${m.lead === 'yue' ? 'Y. Chang' : 'R. Chen'} ${external}</span></div></article>`;
  }
  function paperRow(p) {
    return `<article class="paper-row" data-paper="${p.id}"><a class="paper-image" href="${url(p)}" target="_blank" rel="noopener noreferrer" aria-label="${p.title}"><img src="${p.image}" alt="${p.name} ${copy('paper figure', '论文插图')}" width="240" height="150" loading="lazy"></a><div class="paper-info"><div class="paper-meta"><span class="mono">2026</span>${p.modules.map(id => `<span class="paper-category">${moduleName(id)}</span>`).join('')}</div><h3>${extLink(url(p), p.title)}</h3><p>${t(p.summary)}</p><div class="paper-author">${person(p.lead).name} et al. <span>·</span> arXiv:${p.arxiv}</div></div><a class="paper-open" href="${url(p)}" target="_blank" rel="noopener noreferrer" aria-label="${copy('Read', '阅读')} ${p.name}">${external}</a></article>`;
  }
  function research() {
    return `<section class="research-section section-space" id="research"><div class="container"><div class="section-heading"><div><span class="eyebrow">02 / ${copy('THE RESEARCH', '研究成果')}</span><h2>${copy('Research, brought together.', '让研究彼此连接。')}</h2></div><p>${copy('Four papers. Complementary ideas.<br>A shared direction for embodied intelligence.', '四篇论文，互补的研究思路，<br>共同探索具身智能。')}</p></div><div class="research-toolbar"><div class="filter-group" role="group" aria-label="${copy('Filter publications', '筛选论文')}">${['all', 'perception', 'memory', 'navigation'].map(id => `<button class="filter-button ${activeFilter === id ? 'active' : ''}" type="button" data-filter="${id}" aria-pressed="${activeFilter === id}">${id === 'all' ? copy('All research', '全部研究') : moduleName(id)}</button>`).join('')}</div><span class="research-count mono" aria-live="polite"></span></div><div id="paper-list">${D.papers.filter(p => activeFilter === 'all' || p.modules.includes(activeFilter)).map(paperRow).join('')}</div></div></section>`;
  }
  function team() {
    return `<section class="team-section section-space" id="team"><div class="container"><div class="section-heading"><div><span class="eyebrow">03 / ${copy('THE PEOPLE', '研究团队')}</span><h2>${copy('Built by curious minds.', '由好奇心驱动。')}</h2></div>${extLink(D.lab.peopleUrl, copy('Meet the whole lab', '认识实验室团队'), 'text-link')}</div><div class="team-grid">${Object.values(D.people).map(p => `<a class="person-card" href="${p.url}" target="_blank" rel="noopener noreferrer"><img src="${p.image}" alt="${p.name}" width="190" height="210" loading="lazy"><div><span class="eyebrow">${t(p.role)}</span><h3>${p.name} ${external}</h3><span class="person-affiliation">PhD Student · HKUST(GZ)</span><p>${t(p.bio)}</p><span class="text-link">${copy('Personal website', '个人主页')} ${arrow}</span></div></a>`).join('')}</div></div></section>`;
  }
  function home() {
    return `<main id="main"><section class="hero container"><div class="hero-copy"><div class="eyebrow"><span class="small-cross">+</span> ${copy('EMBODIED INTELLIGENCE / EXRAIL LAB', '具身智能 / EXRAIL 实验室')}</div><h1 tabindex="-1">${copy('See. Remember.<br><span>Find a way.</span>', '感知世界。<br>记住所需。<br><span>找到方向。</span>')}</h1><p class="hero-description">${copy('Connecting perception, memory, and navigation.<br>Turning our robotics research into a shared system<br class="desktop-break"> for understanding and acting in the real world.', '连接感知、记忆与导航，将我们的机器人研究汇集为一个理解真实世界、在真实世界中行动的系统。')}</p><div class="hero-actions"><a class="button button-primary" href="#system">${copy('Explore the system', '探索整体系统')}${arrow}</a><button class="button button-text" type="button" data-media="perception">${play}${copy('Watch perception demo', '观看感知演示')}</button></div><div class="hero-affiliation"><span class="affiliation-rule"></span><span>TRUSTWORTHY AI EXPLORATION LAB<br><strong>THE HONG KONG UNIVERSITY OF SCIENCE AND TECHNOLOGY (GUANGZHOU)</strong></span></div></div><div class="hero-visual"><div class="visual-topline"><span><i></i> ${copy('FROM SENSORS TO UNDERSTANDING', '从传感到理解')}</span><span>EXR / 001</span></div><img class="scene-art" src="./assets/scene.svg" alt="${copy('Conceptual 3D scene: connected objects, sensor observations and a navigation path', '三维场景概念示意：相互连接的对象、传感观测与导航路径')}" width="700" height="570"><div class="scene-coordinate mono">X +02.48<br>Y −01.36<br>Z +00.00</div><span class="concept-label mono">${copy('CONCEPTUAL VISUALIZATION', '概念示意图')}</span><div class="visual-bottomline"><span class="visual-pipeline"><i></i> PERCEPTION <b>→</b> MEMORY <b>→</b> NAVIGATION</span><span>01 — 03</span></div></div></section>
      <div class="intro-strip"><div class="container"><span>${copy('ONE PLATFORM. THREE CONNECTED CAPABILITIES.', '一个平台，三种相互连接的能力。')}</span><span>PERCEIVE <i>/</i> REPRESENT <i>/</i> REASON <i>/</i> ACT ${arrow}</span></div></div>
      <section class="system-section section-space" id="system"><div class="container"><div class="section-heading"><div><span class="eyebrow">01 / ${copy('THE CONNECTED SYSTEM', '系统全貌')}</span><h2>${copy('The whole is connected.', '让每个模块协同思考。')}</h2></div><p>${copy('Explore the capabilities behind the platform.<br>Each module opens a closer look at the work.', '探索平台背后的三种能力。<br>点击模块，了解其中的研究工作。')}</p></div><div class="system-map"><svg class="system-connectors" viewBox="0 0 1200 760" preserveAspectRatio="none" aria-hidden="true"><path d="M360 180 C405 180 405 222 420 222M840 180 C795 180 795 222 780 222M600 320V410"/><circle class="flow-dot flow-one" r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M360 180 C405 180 405 222 420 222"/></circle><circle class="flow-dot flow-two" r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M840 180 C795 180 795 222 780 222"/></circle><circle class="flow-dot flow-three" r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M600 320V410"/></circle></svg>${moduleCard('perception')}${moduleCard('memory')}<div class="system-hub"><div class="hub-orbit">${mark}</div><span class="eyebrow">${copy('THE INTEGRATED PLATFORM', '一体化研究平台')}</span><h3>ExRAIL System</h3><p>${copy('Sense. Connect. Act.', '感知 · 连接 · 行动')}</p><button class="hub-demo" type="button" data-media="system">${D.media.system.video ? play : '<span class="soon-dot"></span>'}${D.media.system.video ? copy('Watch system demo', '观看系统演示') : copy('System demo · coming soon', '系统演示 · 即将呈现')}</button></div>${moduleCard('navigation')}<span class="map-note mono">${copy('SELECT A MODULE TO EXPLORE', '点击模块，深入了解')} ${arrow}</span><span class="map-caption">${copy('A shared foundation for embodied intelligence.', '面向具身智能的共同基础。')}</span></div></div></section>${research()}${team()}<section class="closing-section"><div class="container"><span class="eyebrow">${copy('AN EVOLVING RESEARCH PLATFORM', '持续探索中的研究平台')}</span><h2>${copy('Understanding the world.<br>One connection at a time.', '理解世界，<br>从每一次连接开始。')}</h2>${extLink(D.lab.url, copy('Discover ExRAIL Lab', '了解 ExRAIL 实验室'), 'button button-dark')}</div><span class="closing-watermark" aria-hidden="true">ExRAIL</span></section></main>`;
  }
  function flow(m) {
    return `<div class="io-grid">${[['inputs', copy('INPUT', '输入')], ['processing', copy('PROCESS', '处理')], ['outputs', copy('OUTPUT', '输出')]].map(([key, label], i) => `<div class="io-card ${i === 1 ? 'process-card' : ''}"><span class="eyebrow"><span>0${i + 1}</span> ${label}</span><ul>${t(m[key]).map(item => `<li>${item}</li>`).join('')}</ul>${i < 2 ? `<span class="io-arrow">${arrow}</span>` : ''}</div>`).join('')}</div>`;
  }
  function platform() {
    return `<section class="detail-section platform-section"><div class="section-heading"><div><span class="eyebrow">${copy('THE HARDWARE', '硬件平台')}</span><h2>${copy('Meet the mobile platform.', '认识我们的移动平台。')}</h2></div><span class="mono section-side-note">AGILEX SCOUT MINI</span></div><div class="platform-grid"><figure class="robot-figure"><img src="./assets/platform/robot.jpg" alt="Agilex SCOUT MINI robot with RealSense D435 and dual Livox MID360 LiDARs" width="534" height="580" loading="lazy"><figcaption>${copy('Robot image from RAG-3DSG, real-world deployment figure.', '小车图片摘自 RAG-3DSG 的真实机器人部署插图。')} ${extLink('https://arxiv.org/abs/2601.10168', copy('Source', '来源'))}</figcaption></figure><div class="sensor-list">${[
      ['01', 'RealSense D435', copy('RGB camera', 'RGB 相机'), copy('Visual appearance for RGB-D observations.', '为 RGB-D 观测提供 RGB 外观信息。')],
      ['02', '2 × Livox MID360', copy('LiDAR sensing', '激光雷达'), copy('Surrounding geometry, odometry, and depth correction.', '提供周围环境几何，用于里程计与深度修正。')],
      ['03', 'IMU', copy('Inertial sensing', '惯性传感器'), copy('Inertial measurements for LiDAR–IMU odometry.', '为激光惯性里程计提供惯性测量。')],
      ['04', 'multi-fastlio', copy('State estimation', '状态估计'), copy('LiDAR–IMU fusion for the current odometry pipeline.', '当前里程计方案采用的激光惯性融合方法。')]
    ].map(([n, name, label, desc]) => `<div class="sensor-item"><span class="mono">${n}</span><div><small>${label}</small><h3>${name}</h3><p>${desc}</p></div></div>`).join('')}</div></div></section>`;
  }
  function detailPaper(p, memory) {
    return `<article class="detail-paper"><div class="detail-paper-image"><img src="${p.image}" alt="${p.name} ${copy('research figure', '研究插图')}" width="640" height="360" loading="lazy"></div><div class="detail-paper-copy"><span class="eyebrow">${t(p.feature)}</span><h3>${p.name}</h3><p class="full-paper-title">${p.title}</p><p>${t(p.summary)}</p>${memory ? `<div class="mini-io"><div><span class="eyebrow">${copy('INPUT', '输入')}</span><p>${t(p.input)}</p></div><div><span class="eyebrow">${copy('OUTPUT', '输出')}</span><p>${t(p.output)}</p></div></div>` : ''}<div class="detail-paper-links">${extLink(url(p), copy('Read paper', '阅读论文'), 'text-link')}${p.code ? extLink(p.code, copy('Code', '代码'), 'text-link') : ''}${p.project ? extLink(p.project, copy('Project page', '项目主页'), 'text-link') : ''}</div><span class="detail-author">${copy('First author', '第一作者')}: ${person(p.lead).name} · arXiv:${p.arxiv}</span></div></article>`;
  }
  function detail(id) {
    const m = D.modules[id];
    const papers = D.papers.filter(p => p.modules.includes(id));
    return `<main id="main" class="detail-main"><div class="container"><div class="detail-breadcrumb"><a href="#">${copy('Home', '首页')}</a><span>/</span><a href="#system">${copy('The system', '整体系统')}</a><span>/</span><span>${m.name}</span></div><div class="detail-heading"><div><div class="eyebrow">${m.number} / ${copy('RESEARCH MODULE', '研究模块')}</div><h1 tabindex="-1">${m.name}<span class="detail-chinese-name">${m.chineseName}</span></h1><p>${t(m.tagline)}</p></div><div class="lead-card">${owner(m.lead)}<span>ExRAIL Lab · HKUST(GZ)</span></div></div><nav class="module-tabs" aria-label="${copy('Research modules', '研究模块')}">${Object.keys(D.modules).map(key => `<a href="#/${key}" class="${key === id ? 'active' : ''}" ${key === id ? 'aria-current="page"' : ''}>${icon(key)}${D.modules[key].name}<span>${D.modules[key].number}</span></a>`).join('')}</nav><section class="detail-overview"><div class="detail-overview-copy"><span class="eyebrow">${copy('OVERVIEW', '模块介绍')}</span><h2>${t(m.tagline)}</h2><p>${t(m.description)}</p><div class="tag-list">${m.tags.map(tag => `<span>${tag}</span>`).join('')}</div></div><div class="detail-visual">${visual(id === 'perception' ? 'perception' : id)}<div class="figure-caption">${copy(id === 'perception' ? 'Perception demo · recorded on our platform' : 'Conceptual module illustration · demo video to follow', id === 'perception' ? '感知演示 · 平台实录' : '模块概念示意 · 演示视频后续更新')}</div></div></section><section class="detail-section"><div class="section-heading"><div><span class="eyebrow">${copy('THE INTERFACE', '模块接口')}</span><h2>${copy('From input to insight.', '从输入到输出。')}</h2></div><span class="section-side-note">${copy('A module-level view of the research', '研究方法的模块级概览')}</span></div>${flow(m)}</section>${id === 'perception' ? platform() : ''}<section class="detail-section method-section"><div class="section-heading"><div><span class="eyebrow">${copy('HOW IT WORKS', '工作原理')}</span><h2>${copy('Inside the module.', '走进模块内部。')}</h2></div></div><div class="method-grid">${m.steps.map((step, i) => `<article><span class="step-number mono">0${i + 1}</span><h3>${t(step.title)}</h3><p>${t(step.text)}</p></article>`).join('')}</div></section><section class="detail-section detail-research"><div class="section-heading"><div><span class="eyebrow">${copy('RELATED RESEARCH', '相关研究')}</span><h2>${id === 'memory' ? copy('Three ideas. A richer memory.', '三项工作，丰富场景记忆。') : copy('The work behind it.', '模块背后的研究。')}</h2></div><span class="mono section-side-note">${String(papers.length).padStart(2, '0')} ${copy('PAPERS', '篇论文')}</span></div>${papers.map(p => detailPaper(p, id === 'memory')).join('')}</section><section class="detail-section extra-video"><div><span class="eyebrow">${copy('MORE FROM THE LAB', '更多实验演示')}</span><h2>${copy('A closer look, in motion.', '更多细节，动态呈现。')}</h2><p>${copy('Additional demonstrations and experiments from this module.', '本模块的更多演示与实验视频。')}</p></div>${visual(id + 'Detail')}</section><div class="detail-next"><a href="#system">${arrow}${copy('Back to the system', '返回整体系统')}</a><a href="#/${id === 'perception' ? 'memory' : id === 'memory' ? 'navigation' : 'perception'}">${copy('Next module', '下一个模块')}<strong>${D.modules[id === 'perception' ? 'memory' : id === 'memory' ? 'navigation' : 'perception'].name}</strong>${arrow}</a></div></div></main>`;
  }
  const dialog = document.querySelector('#media-dialog');
  function closeMedia() {
    const video = dialog.querySelector('video');
    if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
    dialog.close();
    document.querySelector('#media-body').replaceChildren();
    document.body.classList.remove('dialog-open');
  }
  function openMedia(id) {
    const media = D.media[id];
    if (!media) return;
    const key = id.replace('Detail', '');
    const title = key === 'system' ? 'ExRAIL System' : D.modules[key].name;
    document.querySelector('#media-title').textContent = `${title} / ${copy('DEMONSTRATION', '演示视频')}`;
    document.querySelector('#media-body').innerHTML = media.video ? `<video controls playsinline preload="metadata" poster="${media.poster}" src="${media.video}" aria-label="${title} demo"></video><p class="video-error" hidden>${copy('The video could not be loaded.', '视频暂时无法加载。')} <a href="${media.video}" download>${copy('Download video', '下载视频')}</a></p>` : `<div class="coming-soon"><img src="${media.poster}" alt=""><span class="eyebrow">${copy('IN PREPARATION', '正在准备中')}</span><h2>${copy('More to see. Soon.', '更多精彩，即将呈现。')}</h2><p>${copy('The system demonstration will appear here once the recording is ready.', '整体系统演示将在录制完成后更新至这里。')}</p><button class="button button-primary" data-close-media>${copy('Keep exploring', '继续探索')}${arrow}</button></div>`;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    const video = dialog.querySelector('video');
    if (video) {
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
