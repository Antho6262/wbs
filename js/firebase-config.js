// ============================================================
// W.B.S — Config Firebase
// Nouveau projet Firebase dédié à W.B.S (ne pas réutiliser celui des Mugiwara) :
// Console Firebase → Paramètres du projet → Général → Tes applications → Web (</>)
// ============================================================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAzHiYENatVYTFuveq1ttjyIrRC_ddY-JU",
  authDomain: "kronen-krieg.firebaseapp.com",
  databaseURL: "https://kronen-krieg-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kronen-krieg",
  storageBucket: "kronen-krieg.firebasestorage.app",
  messagingSenderId: "401065875632",
  appId: "1:401065875632:web:ae6607ecb6ed0d38ff4375",
  measurementId: "G-K442JLMZC0"
};

firebase.initializeApp(FIREBASE_CONFIG);
const db = firebase.database();

// Grades fixes du groupe (créés automatiquement à l'initialisation)
const GRADES_DEFAUT = [
  { id: 'fondateur',    nom: 'Fondateur',   emoji: '👑', ordre: 0 },
  { id: 'chef',         nom: 'Chef',        emoji: '🔱', ordre: 1 },
  { id: 'colead',       nom: 'Co Lead',     emoji: '💎', ordre: 2 },
  { id: 'brasdroit',    nom: 'Bras Droit',  emoji: '⚔️', ordre: 3 },
  { id: 'ga',           nom: 'GA',          emoji: '🛡️', ordre: 4 },
  { id: 'soldatchef',   nom: 'Soldat Chef', emoji: '🎖️', ordre: 5 },
  { id: 'soldat2',      nom: 'Soldat II',   emoji: '⭐', ordre: 6 },
  { id: 'soldat',       nom: 'Soldat',      emoji: '🪖', ordre: 7 },
  { id: 'recru',        nom: 'Recru',       emoji: '🔰', ordre: 8 },
];

function gradeInfo(id) {
  return GRADES_DEFAUT.find(g => g.id === id) || GRADES_DEFAUT[GRADES_DEFAUT.length - 1];
}

// ---- Session (stockée dans l'onglet du navigateur) ----
function getSession() {
  try { return JSON.parse(sessionStorage.getItem('wbs_session') || 'null'); }
  catch (e) { return null; }
}
function setSession(membre) {
  sessionStorage.setItem('wbs_session', JSON.stringify(membre));
}
function clearSession() {
  sessionStorage.removeItem('wbs_session');
}
function requireSession() {
  const s = getSession();
  if (!s) {
    const inPages = window.location.pathname.includes('/pages/');
    window.location.href = inPages ? '../index.html' : 'index.html';
    return null;
  }
  return s;
}
function isAdmin(membre) {
  return !!(membre && membre.role === 'admin');
}

// ---- Utilitaire : Object -> [[id, val], ...] (jamais orderByChild) ----
function entries(obj) {
  return Object.entries(obj || {});
}

function fmtMoney(n) {
  return '$' + Math.round(Number(n) || 0).toLocaleString('fr-FR');
}

function fmtDateHeure(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR') + ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
