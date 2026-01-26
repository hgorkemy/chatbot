const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const langBtn = document.getElementById("lang-toggle");
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");
const suggestionsContainer = document.getElementById("suggestions");

let currentLang = "en"; // default EN

// Soru önerileri
const SUGGESTIONS = {
  en: [
    "Introduce yourself",
    "Education",
    "Projects",
    "Technical skills",
    "Career goals",
    "Erasmus experience",
    "Strengths"
  ],
  tr: [
    "Kendini tanıt",
    "Eğitim",
    "Projeler",
    "Teknik beceriler",
    "Kariyer hedefleri",
    "Erasmus deneyimi",
    "Güçlü yanlar"
  ]
};

const UI_TEXT = {
  en: {
    title: "Halil Görkem Yiğit Informational Chatbot",
    subtitle: "Ask about education, projects, experience, and career goals.",
    placeholder: "Ask something about Görkem...",
    greet:
      "Hi! I'm an informational chatbot about Halil Görkem Yiğit. Ask about education, projects, skills, experience, or career goals.",
    outOfScope:
      "This question seems outside the scope of this chatbot. Please ask about education, projects, technical skills, experience, or career goals."
  },
  tr: {
    title: "Halil Görkem Yiğit Bilgilendirici Chatbot",
    subtitle: "Eğitim, projeler, deneyim ve kariyer hedefleri hakkında soru sorabilirsiniz.",
    placeholder: "Görkem hakkında bir şey sor...",
    greet:
      "Merhaba! Ben Halil Görkem Yiğit hakkında bilgi veren chatbot'um. Eğitim, projeler, teknik beceriler, deneyim veya kariyer hedefleri hakkında soru sorabilirsin.",
    outOfScope:
      "Bu soru chatbot’un kapsamı dışında görünüyor. Eğitim, projeler, teknik beceriler, deneyim veya kariyer hedefleriyle ilgili sorular sorabilirsin."
  }
};

function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function normalize(text) {
  if (!text) return "";
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP_WORDS = new Set([
  // TR soru ekleri / bağlaçlar
  "mi", "mı", "mu", "mü", "misin", "mısın", "musun", "müsün", "misiniz", "mısınız", "musunuz", "müsünüz",
  "ne", "neden", "nasıl", "kaç", "kimi", "kime", "kimin", "nerden", "nereye",
  "ve", "veya", "ya", "de", "da", "ki", "bir", "bana", "bize", "ben", "sen", "bu", "şu", "o",
  "var", "yok", "evet", "hayır", "daha", "çok", "az", "gibi", "için", "ile", "olan", "olarak",

  // EN stopwords (hafif)
  "a", "an", "the", "is", "are", "am", "do", "does", "did", "what", "why", "how", "where", "who", "whom", "when",
  "and", "or", "to", "of", "in", "on", "for", "with", "can", "could", "would", "should", "will",
  "your", "you", "me", "my", "i", "we", "us", "our", "tell", "about", "please", "thanks"
]);

function tokenize(text) {
  const t = normalize(text);
  if (!t) return [];
  return t.split(" ").filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
}

// Türkçe kelime kökü çıkarma (geliştirilmiş)
function stemTr(w) {
  if (w.length < 4) return w;

  // Uzun eklerden kısalara doğru sırala
  const suffixes = [
    "lerinden", "larından", "lerine", "larına", "leriyle", "larıyla",
    "ların", "lerin", "ları", "leri", "lar", "ler",
    "inde", "ında", "ine", "ina", "den", "dan", "ten", "tan",
    "nın", "nin", "nun", "nün", "ını", "ini", "unu", "ünü",
    "ın", "in", "un", "ün", "im", "ım", "um", "üm",
    "de", "da", "te", "ta", "ye", "ya", "e", "a"
  ];

  for (const s of suffixes) {
    if (w.endsWith(s) && w.length > s.length + 2) {
      return w.slice(0, -s.length);
    }
  }
  return w;
}

function normalizeTokenForLang(token) {
  // TR modda stem uygula, EN modda aynen bırak
  return currentLang === "tr" ? stemTr(token) : token;
}

function getActivePairs() {
  return currentLang === "en" ? QA_PAIRS_EN : QA_PAIRS;
}

// PATTERN eşleşmesi (geliştirilmiş):
// - Hem tam eşleşme hem de kısmi eşleşme destekleniyor
// - Tek kelimelik pattern ve sorgularda özel işlem
function matchScore(questionTokens, patternText) {
  const pTokens = tokenize(patternText).map(normalizeTokenForLang);
  const qTokens = questionTokens;

  if (pTokens.length === 0 || qTokens.length === 0) return 0;

  let matched = 0;
  let partialBonus = 0;
  const usedQ = new Array(qTokens.length).fill(false);
  const usedP = new Array(pTokens.length).fill(false);

  // İlk geçiş: tam eşleşmeler
  for (let pi = 0; pi < pTokens.length; pi++) {
    const pt = pTokens[pi];
    for (let qi = 0; qi < qTokens.length; qi++) {
      if (usedQ[qi]) continue;
      const qt = qTokens[qi];

      if (qt === pt) {
        usedQ[qi] = true;
        usedP[pi] = true;
        matched++;
        break;
      }
    }
  }

  // İkinci geçiş: kısmi eşleşmeler (henüz eşleşmemişler için)
  for (let pi = 0; pi < pTokens.length; pi++) {
    if (usedP[pi]) continue;
    const pt = pTokens[pi];

    for (let qi = 0; qi < qTokens.length; qi++) {
      if (usedQ[qi]) continue;
      const qt = qTokens[qi];

      // Kısmi eşleşme: en az 4 karakter ortak kök (yanlış pozitif önlemek için)
      const minLen = Math.min(qt.length, pt.length);
      if (minLen >= 4) {
        // Başlangıç eşleşmesi (daha güçlü)
        const commonPrefix = getCommonPrefixLength(qt, pt);
        if (commonPrefix >= 4) {
          usedQ[qi] = true;
          usedP[pi] = true;
          matched += 0.8; // kısmi eşleşme biraz daha düşük puan
          break;
        }
        // İçerme kontrolü (daha zayıf)
        if (minLen >= 5 && (qt.includes(pt) || pt.includes(qt))) {
          usedQ[qi] = true;
          usedP[pi] = true;
          matched += 0.6;
          break;
        }
      }
    }
  }

  // Tek kelimelik pattern: direkt eşleşme yeterli
  if (pTokens.length === 1) {
    return matched >= 0.6 ? 1 : 0;
  }

  // Kullanıcı tek kelime sormuşsa ve pattern'de o kelime varsa
  if (qTokens.length === 1 && matched >= 0.6) {
    return 0.7; // tek kelime sorgusu için makul skor
  }

  // Çoklu kelime: oransal skor
  const score = matched / pTokens.length;

  // En az 1 tam eşleşme varsa bonus
  if (matched >= 1) {
    return Math.min(score + 0.1, 1);
  }

  return score;
}

// Ortak başlangıç uzunluğunu bul
function getCommonPrefixLength(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) {
    i++;
  }
  return i;
}

function findBestAnswer(question) {
  const qTokens = tokenize(question).map(normalizeTokenForLang);

  if (qTokens.length === 0) return UI_TEXT[currentLang].outOfScope;

  let bestQa = null;
  let best = 0;

  for (const qa of getActivePairs()) {
    let qaBest = 0;
    for (const p of qa.patterns || []) {
      const s = matchScore(qTokens, p);
      if (s > qaBest) qaBest = s;
    }
    if (qaBest > best) {
      best = qaBest;
      bestQa = qa;
    }
  }

  // Eşik: alakasız sorularda cevap seçmesin
  // Tek kelimelik sorularda daha düşük eşik
  const THRESHOLD = qTokens.length === 1 ? 0.35 : 0.4;
  if (!bestQa || best < THRESHOLD) {
    return UI_TEXT[currentLang].outOfScope;
  }

  return bestQa.answer;
}

// Soru önerilerini render et
function renderSuggestions() {
  if (!suggestionsContainer) return;

  suggestionsContainer.innerHTML = "";
  const suggestions = SUGGESTIONS[currentLang] || [];

  suggestions.forEach((text) => {
    const btn = document.createElement("button");
    btn.className = "suggestion-btn";
    btn.textContent = text;
    btn.addEventListener("click", () => {
      handleQuestion(text);
    });
    suggestionsContainer.appendChild(btn);
  });
}

// Soruyu işle (hem form hem öneri için)
function handleQuestion(text) {
  if (!text.trim()) return;

  addMessage(text, "user");
  userInput.value = "";

  const answer = findBestAnswer(text);
  setTimeout(() => addMessage(answer, "bot"), 150);
}

function applyLanguage(lang) {
  currentLang = lang;

  if (pageTitle) pageTitle.textContent = UI_TEXT[lang].title;
  if (pageSubtitle) pageSubtitle.textContent = UI_TEXT[lang].subtitle;
  if (userInput) userInput.placeholder = UI_TEXT[lang].placeholder;

  if (langBtn) langBtn.textContent =
  lang === "en" ? "Türkçe sohbet için basın" : "Press for ENG";

  addMessage(UI_TEXT[lang].greet, "bot");
  renderSuggestions();
}

if (langBtn) {
  langBtn.addEventListener("click", () => {
    applyLanguage(currentLang === "en" ? "tr" : "en");
  });
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleQuestion(userInput.value.trim());
});

// default EN
applyLanguage("en");