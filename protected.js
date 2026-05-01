// protected.js

function normalize(input) {
  input = input.toLowerCase().trim();

  // email case
  if (input.includes("@")) {
    return input.replace(/\s+/g, "");
  }

  // 🔥 sab non-digit hata do
  let digits = input.replace(/\D/g, "");

  // 🔥 last 10 digit lo (main fix)
  if (digits.length >= 10) {
    digits = digits.slice(-10);
  }

  return digits;
}

async function hashText(text) {
  const normalized = normalize(text);

  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// 🔥 protected hashes (same)
const PROTECTED_HASHES = [
  "950d846b1adc09c4bc5640b2c0c5bdbcfbe387b9cb287d024a32eef335a3815b",
  "148afe0fb4cfe6eff4a244be7feedca1143d3f61869a4243e40f992e8aada46a",
  "7473728a599cc243a9c9c36a20fe6704e6263d3dab414ce2a4a580ea9fb2f170",
  "416dfe4617501fcd9278d7af24d3aa2602fa28e60bb534ed515ac27fbcf1f95f",
  "a5b6e7f051b435fa8af2268856ce846bb463526c55e1d497925dd2ad62d6caaf",
  "92295ddc2ef8767d2446d09f93fc827449bb8cefc5f0d09debd9c37f838fb6f2",
  "2ca8972ef76819e9707eedaa477e2de2d29bc9d9a09fb54b1ace6f31599be1f6",
  "f57c392f4c0ab4e20f2576c45185ddea0587cfd44ac705e1bc204a52016019d3",
  "20cd4027a46fa2825ac251f42d1d55498602204581925255cc332d750c423122",
  "da24514a73d12f923ea0ec9f27707306af860c413b4cee41c3e9749b2bc6cc32",
  "a91457ff00ccd1229cf4aea926928cc67e880a7186d57d416db25f432051bbee",
  "aea4541746fd06ac229e9b2bc58093515e5a9e077e500c63df67d265fa57327d"
];

async function checkProtected(query) {
  const hash = await hashText(query);
  return PROTECTED_HASHES.includes(hash);
}

function showProtectedWarning() {
  alert(
   "⚠️ PROTECTED DATA WARNING\n\n" +
   "This number/email is strictly private and protected by the owner.\n\n" +
   "Any unauthorized lookup or search activity is automatically monitored and logged.\n\n" +
   "Repeated attempts may trigger trace detection systems, and appropriate action will be taken.\n\n" +
   "If you're seeing this, consider it your final warning —\n" +
   "do not attempt to search or access this data again, anywhere.\n\n" +
   "Respect privacy. Stay safe."
  );
}


// ============================================================
// SMART INSPECT PROTECTION - Site normal chalegi
// ============================================================
(function () {
    'use strict';

    const REDIRECT_URL = "https://c.tenor.com/dYq7p59gWvsAAAAd/tenor.gif";
    const redirect = () => window.location.replace(REDIRECT_URL);

    // ── 1. Keyboard Shortcuts Block ──────────────────────────
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.key === 'F12') {
            e.preventDefault(); redirect(); return;
        }
        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools open shortcuts)
        if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) {
            e.preventDefault(); redirect(); return;
        }
        // Ctrl+U (View Page Source)
        if (e.ctrlKey && ['U','u'].includes(e.key)) {
            e.preventDefault(); redirect(); return;
        }
        // Ctrl+S (Save Page As)
        if (e.ctrlKey && ['S','s'].includes(e.key)) {
            e.preventDefault(); return;
        }
        // Ctrl+P (Print - source dekh sakte hain)
        if (e.ctrlKey && ['P','p'].includes(e.key)) {
            e.preventDefault(); return;
        }
        // Ctrl+A (Select All)
        if (e.ctrlKey && ['A','a'].includes(e.key)) {
            e.preventDefault(); return;
        }
    }, true);

    // ── 2. Right-Click Disable ───────────────────────────────
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    }, true);

    // ── 3. Text Selection Disable ────────────────────────────
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
    }, true);

    // ── 4. Drag Disable ──────────────────────────────────────
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    }, true);

    // ── 5. Window Size Check (DevTools side panel detect) ────
    // Sirf tab redirect karo jab window ALREADY load ho chuki ho
    let loaded = false;
    window.addEventListener('load', () => {
        setTimeout(() => { loaded = true; }, 2000); // 2 sec baad check shuru
    });

    setInterval(() => {
        if (!loaded) return; // Site load hone se pehle check mat karo
        if (
            window.outerWidth - window.innerWidth > 150 ||
            window.outerHeight - window.innerHeight > 150
        ) {
            redirect();
        }
    }, 1000);

    // ── 6. Print Dialog Block ────────────────────────────────
    window.addEventListener('beforeprint', (e) => {
        e.preventDefault();
        redirect();
    });

    // ── 7. CSS - Text Select & Drag Disable ─────────────────
    const style = document.createElement('style');
    style.innerHTML = `
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-user-drag: none !important;
        }
    `;
    document.head
        ? document.head.appendChild(style)
        : document.addEventListener('DOMContentLoaded', () => document.head.appendChild(style));

})();


// ── Track Player Functions ───────────────────────────────────

function playNextTrack(currentIndex) {
    let nextIndex = currentIndex + 1;
    let tracks = document.querySelectorAll('.get-download-submit');
    if (nextIndex < tracks.length) {
        tracks[nextIndex].click();
    } else {
        alert('You have reached the end of the playlist.');
    }
}

function playPreviousTrack(currentIndex) {
    let prevIndex = currentIndex - 1;
    let tracks = document.querySelectorAll('.get-download-submit');
    if (prevIndex >= 0) {
        tracks[prevIndex].click();
    } else {
        alert('You are at the beginning of the playlist.');
    }
}

let isRepeatEnabled = false;
function toggleRepeat() {
    isRepeatEnabled = !isRepeatEnabled;
    let repeatBtn = document.getElementById("repeat-btn");
    if (isRepeatEnabled) {
        repeatBtn.classList.add('repeat-enabled');
    } else {
        repeatBtn.classList.remove('repeat-enabled');
    }
}

function openTerms() {
    document.getElementById("terms-modal").style.display = "block";
}

function closeTerms() {
    document.getElementById("terms-modal").style.display = "none";
}

