'use strict';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = arr => arr[rand(0, arr.length - 1)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Saved progress ---------- */
const STORE_KEY = 'math-islands-v1';
const state = { hero: '', score: 0, best: {}, music: false, sfx: true };
try { Object.assign(state, JSON.parse(localStorage.getItem(STORE_KEY)) || {}); } catch (e) {}
const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} };

/* ---------- Characters (Damascene dress) ---------- */
const SKIN = '#f2c29b', SKIN_SHADE = '#e0a57c', GOLD = '#f2c14e';

const faceSVG = ({ lashes = false, brow = 3.5 } = {}) => `
  <g class="h-eyes">
    <ellipse cx="84" cy="76" rx="5.5" ry="7" fill="#2a1c17"/><ellipse cx="116" cy="76" rx="5.5" ry="7" fill="#2a1c17"/>
    <circle cx="86" cy="73" r="2" fill="#fff"/><circle cx="118" cy="73" r="2" fill="#fff"/>
    ${lashes ? '<path d="M78 71l-5-3M122 71l5-3" stroke="#2a1c17" stroke-width="2.5" stroke-linecap="round"/>' : ''}
  </g>
  <path d="M77 63q7-5 14 0M109 63q7-5 14 0" fill="none" stroke="#2b1d16" stroke-width="${brow}" stroke-linecap="round"/>
  <circle cx="71" cy="91" r="7.5" fill="#f58f8f" opacity=".45"/><circle cx="129" cy="91" r="7.5" fill="#f58f8f" opacity=".45"/>
  <path class="h-mouth m-smile" d="M88 92Q100 104 112 92" fill="none" stroke="#8a3b33" stroke-width="3.5" stroke-linecap="round"/>
  <g class="h-mouth m-open"><path d="M86 90Q100 113 114 90Z" fill="#8a2f2f"/><path d="M93 100Q100 107 107 100Q100 96 93 100Z" fill="#f58f8f"/></g>
  <path class="h-mouth m-sad" d="M90 101Q100 93 110 101" fill="none" stroke="#8a3b33" stroke-width="3.5" stroke-linecap="round"/>`;

// يامن: طربوش، صدرية مطرزة، زنار وشروال
const yamenBody = `
  <ellipse class="h-shadow" cx="100" cy="288" rx="56" ry="8" fill="#0b4a50" opacity=".2"/>
  <g class="h-all">
    <g class="h-body">
      <path d="M64 264h30q4 2 4 10v6H56q0-12 8-16Z" fill="#7a3b2e"/>
      <path d="M106 264h30q8 4 8 16H102v-6q0-8 4-10Z" fill="#7a3b2e"/>
      <path d="M60 180Q100 170 140 180Q150 226 132 266L106 266Q104 236 100 220Q96 236 94 266L68 266Q50 226 60 180Z" fill="#27344d"/>
      <path d="M100 198V220" stroke="#1b2538" stroke-width="2.5" stroke-linecap="round"/>
      <g class="h-arm h-arm-l"><path d="M68 130Q50 152 52 184" fill="none" stroke="#fbf7ea" stroke-width="19" stroke-linecap="round"/><circle cx="52" cy="192" r="10" fill="${SKIN}"/></g>
      <path d="M64 120Q100 108 136 120L140 186Q100 196 60 186Z" fill="#fbf7ea"/>
      <path d="M92 112L100 126L108 112" fill="none" stroke="#d9d3bd" stroke-width="2.5"/>
      <circle cx="100" cy="140" r="2" fill="#d9d3bd"/><circle cx="100" cy="154" r="2" fill="#d9d3bd"/>
      <path d="M64 120Q76 113 90 112Q92 150 84 186Q70 187 60 186Z" fill="#8c1f3c"/>
      <path d="M136 120Q124 113 110 112Q108 150 116 186Q130 187 140 186Z" fill="#8c1f3c"/>
      <path d="M90 112Q92 150 84 186M110 112Q108 150 116 186" fill="none" stroke="${GOLD}" stroke-width="3"/>
      <path d="M71 134q6-6 10 0t-6 8M71 154q6-6 10 0t-6 8M129 134q-6-6-10 0t6 8M129 154q-6-6-10 0t6 8" fill="none" stroke="${GOLD}" stroke-width="2" stroke-linecap="round"/>
      <path d="M59 172Q100 182 141 172L142 192Q100 202 58 192Z" fill="${GOLD}"/>
      <path d="M59 179Q100 189 141 179M58.500 186Q100 196 141.500 186" fill="none" stroke="#c2413a" stroke-width="2.5"/>
      <path d="M68 194L64 222L78 222L80 196Z" fill="${GOLD}"/><path d="M65 214h13" stroke="#c2413a" stroke-width="2.5"/>
      <g class="h-arm h-arm-r"><path d="M132 130Q150 152 148 184" fill="none" stroke="#fbf7ea" stroke-width="19" stroke-linecap="round"/><circle cx="148" cy="192" r="10" fill="${SKIN}"/></g>
    </g>
    <g class="h-head">
      <rect x="90" y="98" width="20" height="20" rx="8" fill="${SKIN_SHADE}"/>
      <circle cx="62" cy="76" r="8" fill="${SKIN}"/><circle cx="138" cy="76" r="8" fill="${SKIN}"/>
      <ellipse cx="100" cy="72" rx="38" ry="40" fill="${SKIN}"/>
      <path d="M62 64Q64 40 100 38Q136 40 138 64Q122 50 100 52Q78 50 62 64Z" fill="#2b1d16"/>
      <path d="M70 48L77 10Q100 3 123 10L130 48Q100 39 70 48Z" fill="#c62f3a"/>
      <ellipse cx="100" cy="9" rx="23" ry="5" fill="#a8222d"/>
      <g class="h-tassel"><path d="M100 9Q122 8 128 24" fill="none" stroke="#1f1f24" stroke-width="2.5"/><path d="M124 22h9l1 16h-11Z" fill="#1f1f24"/></g>
      ${faceSVG()}
    </g>
  </g>`;

// يمنى: ثوب بروكار دمشقي مطرز، زنار ذهبي وياسمينة شامية
const yumnaBody = `
  <ellipse class="h-shadow" cx="100" cy="288" rx="58" ry="8" fill="#0b4a50" opacity=".2"/>
  <g class="h-all">
    <g class="h-body">
      <ellipse cx="80" cy="274" rx="16" ry="8" fill="#7a3b2e"/><ellipse cx="120" cy="274" rx="16" ry="8" fill="#7a3b2e"/>
      <g class="h-arm h-arm-l"><path d="M70 130Q52 152 54 180" fill="none" stroke="#1c7a80" stroke-width="19" stroke-linecap="round"/><path d="M54 178V186" stroke="${GOLD}" stroke-width="21"/><circle cx="54" cy="195" r="10" fill="${SKIN}"/></g>
      <path d="M68 120Q100 108 132 120L158 264Q100 278 42 264Z" fill="#1c7a80"/>
      <path d="M78 200l4 6-4 6-4-6ZM100 208l4 6-4 6-4-6ZM122 200l4 6-4 6-4-6ZM66 226l4 6-4 6-4-6ZM89 232l4 6-4 6-4-6ZM111 232l4 6-4 6-4-6ZM134 226l4 6-4 6-4-6Z" fill="${GOLD}" opacity=".9"/>
      <path d="M45 248Q100 262 155 248L158 264Q100 278 42 264Z" fill="${GOLD}"/>
      <g fill="#c2325a"><circle cx="60" cy="259" r="2.5"/><circle cx="76" cy="262" r="2.5"/><circle cx="92" cy="264" r="2.5"/><circle cx="108" cy="264" r="2.5"/><circle cx="124" cy="262" r="2.5"/><circle cx="140" cy="259" r="2.5"/></g>
      <path d="M84 113Q100 109 116 113L112 152Q100 160 88 152Z" fill="#c2325a" stroke="${GOLD}" stroke-width="2.5"/>
      <path d="M92 124h16M92 134h16M94 144h12" stroke="${GOLD}" stroke-width="3" stroke-linecap="round" stroke-dasharray="0 5.300"/>
      <path d="M60 162Q100 171 140 162L142 176Q100 185 58 176Z" fill="${GOLD}"/>
      <path d="M124 176l-4 26h11l1-24Z" fill="${GOLD}"/><circle cx="126" cy="172" r="6" fill="#e0a932"/>
      <g class="h-arm h-arm-r"><path d="M130 130Q148 152 146 180" fill="none" stroke="#1c7a80" stroke-width="19" stroke-linecap="round"/><path d="M146 178V186" stroke="${GOLD}" stroke-width="21"/><circle cx="146" cy="195" r="10" fill="${SKIN}"/></g>
    </g>
    <g class="h-head">
      <path d="M60 70Q56 28 100 26Q144 28 140 70L144 112Q100 104 56 112Z" fill="#3a2418"/>
      <rect x="90" y="98" width="20" height="20" rx="8" fill="${SKIN_SHADE}"/>
      <ellipse cx="100" cy="72" rx="36" ry="38" fill="${SKIN}"/>
      <path d="M64 68Q64 34 100 34Q136 34 136 68Q126 46 100 50Q86 48 78 58Q72 62 64 68Z" fill="#3a2418"/>
      <path d="M67 48Q100 30 133 48" fill="none" stroke="${GOLD}" stroke-width="5" stroke-linecap="round"/>
      <g class="h-braid b-l"><path d="M63 96Q55 124 60 150" fill="none" stroke="#3a2418" stroke-width="13" stroke-linecap="round"/><circle cx="60" cy="148" r="5.500" fill="#c2325a"/></g>
      <g class="h-braid b-r"><path d="M137 96Q145 124 140 150" fill="none" stroke="#3a2418" stroke-width="13" stroke-linecap="round"/><circle cx="140" cy="148" r="5.500" fill="#c2325a"/></g>
      <g class="h-flower" fill="#fff"><circle cx="130" cy="38" r="5"/><circle cx="136" cy="43" r="5"/><circle cx="134" cy="50" r="5"/><circle cx="126" cy="50" r="5"/><circle cx="124" cy="43" r="5"/><circle cx="130" cy="45" r="3.500" fill="${GOLD}"/></g>
      <circle cx="65" cy="92" r="3" fill="${GOLD}"/><circle cx="135" cy="92" r="3" fill="${GOLD}"/>
      ${faceSVG({ lashes: true, brow: 2.5 })}
    </g>
  </g>`;

const HEROES = {
  yamen: { name: 'يامن', female: false, body: yamenBody },
  yumna: { name: 'يمنى', female: true, body: yumnaBody }
};
const hero = () => HEROES[state.hero] || HEROES.yamen;
// يختار الصيغة المناسبة (مذكر/مؤنث) حسب الشخصية
const g = (m, f) => (hero().female ? f : m);

const heroSVG = (id, attrs = 'role="img"') =>
  `<svg class="hero-svg" data-mood="idle" viewBox="0 0 200 300" ${attrs} aria-label="${HEROES[id].name}">${HEROES[id].body}</svg>`;

const moodTimers = new WeakMap();
function setMood(holder, mood, ms) {
  const svg = holder && holder.querySelector('.hero-svg');
  if (!svg) return;
  clearTimeout(moodTimers.get(svg));
  svg.dataset.mood = mood;
  if (ms) moodTimers.set(svg, setTimeout(() => { svg.dataset.mood = 'idle'; }, ms));
}

/* ---------- Islands ---------- */
const ISLANDS = {
  add: { name: 'جزيرة الجمع', sign: '+', desc: 'اجمع الأعداد واكتشف الكنز', color: '#ffc94d' },
  sub: { name: 'جزيرة الطرح', sign: '−', desc: 'حلّ الألغاز بسرعة وذكاء', color: '#5fc3ef' },
  mul: { name: 'جزيرة الضرب', sign: '×', desc: 'اضرب وانطلق نحو القمة', color: '#ff8f76' },
  div: { name: 'جزيرة القسمة', sign: '÷', desc: 'وزّع الكنوز بالتساوي', color: '#a98bf0' },
  challenge: { name: 'تحدي الأبطال', sign: '★', desc: 'مغامرة تجمع كل الجزر — 8 أسئلة متنوعة', color: '#f4aa36' }
};
const OPS = ['add', 'sub', 'mul', 'div'];

const islandSVG = kind => `
  <svg class="isle" viewBox="0 0 160 120" aria-hidden="true">
    <ellipse cx="80" cy="100" rx="72" ry="13" fill="#fff" opacity=".4"/>
    <ellipse cx="80" cy="94" rx="62" ry="14" fill="#f6dc9c"/>
    <path d="M30 92Q76 14 122 92Q76 82 30 92Z" fill="${ISLANDS[kind].color}"/>
    <path d="M118 92Q112 64 120 44" fill="none" stroke="#8a5a34" stroke-width="5" stroke-linecap="round"/>
    <g class="isle-palm"><path d="M120 44q-14-12-27-2M120 44q-5-17-20-18M120 44q9-15 24-9M120 44q15-4 21 9" fill="none" stroke="#2f9e5b" stroke-width="6" stroke-linecap="round"/></g>
    <circle cx="72" cy="68" r="21" fill="#fff"/>
    <text x="72" y="79" text-anchor="middle" font-size="32" font-weight="800" fill="#075b67" font-family="Arial,sans-serif">${ISLANDS[kind].sign}</text>
  </svg>`;

const starsText = n => '⭐'.repeat(n) + '☆'.repeat(3 - n);

function renderIslands() {
  $('#islandGrid').innerHTML = [...OPS, 'challenge'].map((kind, i) => `
    <button class="island ${kind}" data-island="${kind}" style="--i:${i}">
      <span class="isle-wrap">${islandSVG(kind)}</span>
      <span class="island-text">
        <strong>${ISLANDS[kind].name}</strong>
        <small>${ISLANDS[kind].desc}</small>
        <span class="island-stars" aria-label="أفضل نتيجة">${starsText(state.best[kind] || 0)}</span>
      </span>
    </button>`).join('');
  $$('.island').forEach(btn => { btn.onclick = () => travel(btn.dataset.island); });
}

/* ---------- Sound effects & music ---------- */
let audioCtx;
function tone(freq, start, dur, type = 'sine', vol = 0.07) {
  const o = audioCtx.createOscillator(), gain = audioCtx.createGain();
  const t = audioCtx.currentTime + start;
  o.type = type;
  o.frequency.value = freq;
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(gain).connect(audioCtx.destination);
  o.start(t);
  o.stop(t + dur);
}
const SFX = {
  tap: [[620, 0, 0.07]],
  go: [[520, 0, 0.1], [780, 0.09, 0.14]],
  good: [[660, 0, 0.12], [880, 0.1, 0.12], [1320, 0.2, 0.2]],
  bad: [[260, 0, 0.16, 'triangle'], [200, 0.14, 0.24, 'triangle']],
  sail: [[330, 0, 0.25, 'triangle'], [392, 0.2, 0.25, 'triangle'], [494, 0.4, 0.25, 'triangle'], [587, 0.6, 0.4, 'triangle']],
  win: [[523, 0, 0.15], [659, 0.13, 0.15], [784, 0.26, 0.15], [1047, 0.39, 0.4]]
};
const BUZZ = { good: 30, bad: [60, 50, 60], win: [40, 60, 40, 60, 120] };
function sfx(name) {
  if (!state.sfx) return;
  if (BUZZ[name] && navigator.vibrate) navigator.vibrate(BUZZ[name]);
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    SFX[name].forEach(n => tone(...n));
  } catch (e) {}
}

const bgm = $('#bgm');
bgm.volume = 0.35;
function syncAudioButtons() {
  $('#musicBtn').setAttribute('aria-pressed', state.music);
  $('#musicBtn .ico').textContent = state.music ? '🎵' : '🔇';
  $('#soundBtn').setAttribute('aria-pressed', state.sfx);
  $('#soundBtn .ico').textContent = state.sfx ? '🔊' : '🔈';
}
function playMusic() {
  if (!state.music || document.hidden) return;
  bgm.play().catch(() => {});
}
// الملف مفقود أو تالف: نعيد الزر إلى وضع الإيقاف بدل أن يبدو كأنه يعمل
bgm.addEventListener('error', () => {
  state.music = false;
  syncAudioButtons();
});
$('#musicBtn').onclick = () => {
  state.music = !state.music;
  save();
  syncAudioButtons();
  if (state.music) playMusic(); else bgm.pause();
};
$('#soundBtn').onclick = () => {
  state.sfx = !state.sfx;
  save();
  syncAudioButtons();
  sfx('tap');
};
// المتصفحات تمنع التشغيل التلقائي: نبدأ الموسيقى المحفوظة عند أول لمسة
addEventListener('pointerdown', playMusic, { once: true });
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('paused', document.hidden);
  if (document.hidden) bgm.pause(); else playMusic();
});

/* ---------- Screens ---------- */
function show(id) {
  $$('.screen').forEach(x => x.classList.toggle('active', x.id === id));
  scrollTo(0, 0);
}
const updateScore = () => { $('#score').textContent = state.score; };

/* ---------- Character select ---------- */
function selectHero(id, greet) {
  state.hero = id;
  save();
  $$('.hero-card').forEach(card => {
    const on = card.dataset.hero === id;
    card.classList.toggle('selected', on);
    card.setAttribute('aria-checked', on);
    setMood(card, on ? (greet ? 'happy' : 'wave') : 'idle');
    if (on && greet) setTimeout(() => { if (state.hero === id) setMood(card, 'wave'); }, 1100);
  });
  $('#pickHint').textContent = `${hero().name} ${g('جاهز', 'جاهزة')} للإبحار!`;
}
$$('.hero-card').forEach(card => {
  card.querySelector('.hero-figure').innerHTML = heroSVG(card.dataset.hero);
  card.onclick = () => { selectHero(card.dataset.hero, true); sfx('tap'); };
});
$('#startBtn').onclick = () => {
  if (!state.hero) {
    $('#pickHint').textContent = 'اختر يامن أو يمنى أولاً 😊';
    $$('.hero-card').forEach(card => {
      card.classList.remove('nudge');
      void card.offsetWidth;
      card.classList.add('nudge');
    });
    sfx('bad');
    return;
  }
  $('#guideFig').innerHTML = heroSVG(state.hero);
  setMood($('#guideFig'), 'wave');
  $('#helloLabel').textContent = `أهلاً يا ${hero().name}! 👋`;
  renderIslands();
  show('islands');
  sfx('go');
};
$('#backWelcome').onclick = () => show('welcome');

/* ---------- Ship travel ---------- */
const shipSVG = (id, sign) => `
  <svg class="ship-svg" viewBox="0 0 260 230">
    <path d="M150 18V160" stroke="#7a4a2a" stroke-width="7" stroke-linecap="round"/>
    <path class="flag" d="M150 18L118 27L150 38Z" fill="#c62f3a"/>
    <path d="M157 34Q232 80 236 150L157 150Z" fill="#fff6dc"/>
    <text x="190" y="136" text-anchor="middle" font-size="44" font-weight="800" fill="#ff7c67" font-family="Arial,sans-serif">${sign}</text>
    <path d="M143 50Q104 96 98 150L143 150Z" fill="#ffd978"/>
    ${heroSVG(id, 'x="12" y="56" width="86" height="129"')}
    <path d="M6 156H254Q244 208 204 212H66Q22 208 6 156Z" fill="#9a5b34"/>
    <path d="M24 180H238M40 196H222" stroke="#7a4426" stroke-width="3" stroke-linecap="round" opacity=".6"/>
    <rect x="2" y="150" width="256" height="12" rx="6" fill="#c17c46"/>
    <g fill="#ffe9a8" stroke="#7a4426" stroke-width="3"><circle cx="100" cy="186" r="7"/><circle cx="140" cy="186" r="7"/><circle cx="180" cy="186" r="7"/></g>
  </svg>`;

let activeIsland = '', travelTimer;
function travel(kind) {
  activeIsland = kind;
  $('#travelText').textContent = `${hero().name} ${g('يبحر', 'تبحر')} إلى ${ISLANDS[kind].name}…`;
  $('#destIsland').innerHTML = islandSVG(kind);
  $('#ship').innerHTML = shipSVG(state.hero, ISLANDS[kind].sign);
  setMood($('#ship'), 'wave');
  $('#shipScene').classList.add('show');
  sfx('sail');
  travelTimer = setTimeout(arrive, reducedMotion.matches ? 1200 : 3600);
}
function arrive() {
  clearTimeout(travelTimer);
  const scene = $('#shipScene');
  if (!scene.classList.contains('show')) return;
  scene.classList.remove('show');
  $('#ship').innerHTML = '';
  startGame(activeIsland);
}
$('#shipScene').onclick = arrive;

/* ---------- Questions ---------- */
function makeQuestion(kind) {
  let a, b, ans, op;
  if (kind === 'add') { a = rand(2, 40); b = rand(2, 35); ans = a + b; op = '+'; }
  else if (kind === 'sub') { a = rand(15, 60); b = rand(2, a - 1); ans = a - b; op = '−'; }
  else if (kind === 'mul') { a = rand(2, 12); b = rand(2, 10); ans = a * b; op = '×'; }
  else { b = rand(2, 10); ans = rand(2, 12); a = b * ans; op = '÷'; }
  return { a, b, ans, op };
}
function makeOptions(ans) {
  const opts = new Set([ans]);
  while (opts.size < 4) {
    const delta = rand(1, Math.max(5, Math.floor(ans * 0.35)));
    opts.add(Math.random() > 0.5 ? ans + delta : Math.max(0, ans - delta));
  }
  return [...opts].sort(() => Math.random() - 0.5);
}

let questions = [], qIndex = 0, session = 0, locked = false, nextTimer;
const say = text => {
  const bubble = $('#bubble');
  bubble.textContent = text;
  bubble.classList.remove('pop');
  void bubble.offsetWidth;
  bubble.classList.add('pop');
};

function startGame(kind) {
  activeIsland = kind;
  session = 0;
  qIndex = 0;
  questions = kind === 'challenge'
    ? Array.from({ length: 8 }, (_, i) => makeQuestion(OPS[i % 4]))
    : Array.from({ length: 5 }, () => makeQuestion(kind));
  $('#islandName').textContent = `${kind === 'challenge' ? '🏆' : '🏝️'} ${ISLANDS[kind].name}`;
  $('#sessionScore').textContent = 0;
  $('#sidekickFig').innerHTML = heroSVG(state.hero);
  setMood($('#sidekickFig'), 'wave', 1600);
  show('game');
  nextQuestion();
  say(`وصلنا! ${g('مستعد', 'مستعدة')} يا ${hero().name}؟`);
}

function nextQuestion() {
  if (qIndex >= questions.length) { finish(); return; }
  locked = false;
  const q = questions[qIndex];
  $('#qCount').textContent = `${qIndex + 1} / ${questions.length}`;
  $('#progressBar').style.transform = `scaleX(${qIndex / questions.length})`;
  const box = $('#question');
  box.textContent = `${q.a} ${q.op} ${q.b} = ?`;
  box.classList.remove('pop');
  void box.offsetWidth;
  box.classList.add('pop');
  $('#answers').innerHTML = makeOptions(q.ans)
    .map((n, i) => `<button class="answer" data-value="${n}" style="--i:${i}">${n}</button>`).join('');
  $$('.answer').forEach(b => { b.onclick = () => answer(b, q); });
  if (qIndex > 0) say(pick(['ما الجواب يا ترى؟ 🤔', 'فكّر جيداً…', 'السؤال التالي!', 'نقترب من الكنز! 🗝️']));
}

function answer(btn, q) {
  if (locked) return;
  locked = true;
  const ok = Number(btn.dataset.value) === q.ans;
  if (ok) {
    btn.classList.add('correct');
    session++;
    state.score++;
    save();
    updateScore();
    $('#sessionScore').textContent = session;
    $('.badge').classList.remove('bump');
    void $('.badge').offsetWidth;
    $('.badge').classList.add('bump');
    say(pick(['إجابة رائعة! ✨', `${g('بطل', 'بطلة')}! أحسنت 🎉`, 'ممتاز! 🌟', 'يا سلام! 👏']));
    setMood($('#sidekickFig'), 'happy', 1200);
    sfx('good');
  } else {
    btn.classList.add('wrong');
    $$('.answer').forEach(x => { if (Number(x.dataset.value) === q.ans) x.classList.add('correct'); });
    say(`قريب! الجواب ${q.ans} 💪`);
    setMood($('#sidekickFig'), 'sad', 1500);
    sfx('bad');
  }
  qIndex++;
  $('#progressBar').style.transform = `scaleX(${qIndex / questions.length})`;
  nextTimer = setTimeout(nextQuestion, ok ? 1200 : 1900);
}

function finish() {
  const total = questions.length, ratio = session / total;
  const stars = ratio === 1 ? 3 : ratio >= 0.6 ? 2 : 1;
  state.best[activeIsland] = Math.max(state.best[activeIsland] || 0, stars);
  save();
  $('#resultFig').innerHTML = heroSVG(state.hero);
  setMood($('#resultFig'), stars > 1 ? 'happy' : 'wave');
  $('#resultTitle').textContent = `${stars === 3 ? 'يا سلام' : stars === 2 ? 'أحسنت' : 'محاولة جميلة'} يا ${hero().name}!`;
  $('#resultText').textContent = `إجاباتك الصحيحة: ${session} من ${total}. استمر في التدريب لتصبح ${g('بطل', 'بطلة')} الرياضيات!`;
  $('#resultStars').textContent = starsText(stars);
  $('#resultModal').classList.add('show');
  $('#resultBtn').focus();
  sfx('win');
  if (stars > 1) confetti();
}
function leaveGame() {
  clearTimeout(nextTimer);
  $('#resultModal').classList.remove('show');
  $('#confetti').innerHTML = '';
  renderIslands();
  show('islands');
}
$('#backIslands').onclick = leaveGame;
$('#resultBtn').onclick = leaveGame;
$('#retryBtn').onclick = () => {
  $('#resultModal').classList.remove('show');
  startGame(activeIsland);
};

function confetti() {
  if (reducedMotion.matches) return;
  const colors = ['#ff7c67', '#ffd264', '#54bb86', '#5fc3ef', '#a98bf0', '#c62f3a'];
  const layer = $('#confetti');
  layer.innerHTML = Array.from({ length: 48 }, () =>
    `<i style="left:${rand(0, 100)}%;background:${pick(colors)};--d:${rand(0, 600)}ms;--t:${rand(1800, 3200)}ms;--x:${rand(-80, 80)}px;--r:${rand(360, 1080)}deg"></i>`
  ).join('');
  setTimeout(() => { layer.innerHTML = ''; }, 4000);
}

/* ---------- QR share ---------- */
$('#qrBtn').onclick = () => {
  const url = location.href.split('#')[0];
  const web = location.protocol.startsWith('http') && !/^(localhost|127\.|\[::1\])/.test(location.host);
  const box = $('#qrBox');
  box.innerHTML = '';
  if (web && window.qrcode) {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    box.innerHTML = qr.createSvgTag({ cellSize: 6, margin: 12, scalable: true });
    $('#qrMessage').textContent = 'امسح الرمز بكاميرا الجوال لفتح اللعبة مباشرة.';
  } else {
    $('#qrMessage').textContent = 'رمز QR يعمل بعد نشر اللعبة على رابط عام (مثل GitHub Pages) وفتحها من ذلك الرابط.';
  }
  $('#copyLink').textContent = 'نسخ رابط اللعبة';
  $('#qrModal').classList.add('show');
  $('#closeQr').focus();
};
$('#closeQr').onclick = () => $('#qrModal').classList.remove('show');
$('#closeIos').onclick = () => $('#iosModal').classList.remove('show');
['#qrModal', '#iosModal'].forEach(id => {
  $(id).onclick = e => { if (e.target === e.currentTarget) $(id).classList.remove('show'); };
});
$('#copyLink').onclick = async () => {
  try {
    await navigator.clipboard.writeText(location.href.split('#')[0]);
    $('#copyLink').textContent = 'تم نسخ الرابط ✓';
  } catch (e) {
    $('#qrMessage').textContent = 'تعذّر النسخ، انسخ الرابط من شريط العنوان.';
  }
};
addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  $('#qrModal').classList.remove('show');
  $('#iosModal').classList.remove('show');
  arrive();
});

/* ---------- PWA ---------- */
let installPrompt;
addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  installPrompt = e;
  $('#installBtn').hidden = false;
});
// iOS has no install prompt: show the "Add to Home Screen" steps instead
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
if (ios && !standalone) $('#installBtn').hidden = false;
$('#installBtn').onclick = async () => {
  if (!installPrompt && ios) {
    $('#iosModal').classList.add('show');
    $('#closeIos').focus();
    return;
  }
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  $('#installBtn').hidden = true;
};
addEventListener('appinstalled', () => { $('#installBtn').hidden = true; });
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* ---------- Start ---------- */
updateScore();
syncAudioButtons();
if (HEROES[state.hero]) selectHero(state.hero, false); else state.hero = '';
