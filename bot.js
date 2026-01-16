const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const langBtn = document.getElementById("lang-toggle");
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");

let currentLang = "en"; // default EN

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
  "ne", "neden", "nasıl", "kaç", "kim", "kimi", "kime", "kimin", "nerede", "nerden", "nereye",
  "ve", "veya", "ya", "de", "da", "ki", "bir", "bana", "bize",

  // EN stopwords (hafif)
  "a", "an", "the", "is", "are", "am", "do", "does", "did", "what", "why", "how", "where", "who", "whom", "when",
  "and", "or", "to", "of", "in", "on", "for", "with"
]);

function tokenize(text) {
  const t = normalize(text);
  if (!t) return [];
  return t.split(" ").filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
}

// çok basit TR ek kesme (esneklik için)
function stemTr(w) {
  const suffixes = [
    "ların","lerin","ları","leri","lar","ler",
    "nın","nin","nun","nün",
    "ın","in","un","ün",
    "im","ım","um","üm",
    "m","n","y"
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

// PATTERN eşleşmesi:
// - Tek kelime eşleşmesi YETMESİN (Aliyi tanıt gibi)
// - En az 2 anlamlı kelime match olsun ya da pattern 1 kelimelikse direkt match olsun.
function matchScore(questionTokens, patternText) {
  const pTokens = tokenize(patternText).map(normalizeTokenForLang);
  const qTokens = questionTokens;

  if (pTokens.length === 0) return 0;

  let matched = 0;
  const used = new Array(qTokens.length).fill(false);

  for (const pt of pTokens) {
    for (let i = 0; i < qTokens.length; i++) {
      if (used[i]) continue;
      const qt = qTokens[i];

      if (qt === pt) {
        used[i] = true;
        matched++;
        break;
      }
      // kısmi eşleşme: beklenti ~ beklentilerin / expectation ~ expectations
      const minLen = Math.min(qt.length, pt.length);
      if (minLen >= 5 && (qt.includes(pt) || pt.includes(qt))) {
        used[i] = true;
        matched++;
        break;
      }
    }
  }

  // 1 kelimelik pattern ise (örn: "github", "erasmus") tek match yeterli
  if (pTokens.length === 1) return matched === 1 ? 1 : 0;

  // 2+ kelimelik patternlerde tek match yeterli değil
  if (matched >= 2) return matched / pTokens.length;

  return 0;
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
  const THRESHOLD = 0.45;
  if (!bestQa || best < THRESHOLD) {
    return UI_TEXT[currentLang].outOfScope;
  }

  return bestQa.answer;
}

function applyLanguage(lang) {
  currentLang = lang;

  if (pageTitle) pageTitle.textContent = UI_TEXT[lang].title;
  if (pageSubtitle) pageSubtitle.textContent = UI_TEXT[lang].subtitle;
  if (userInput) userInput.placeholder = UI_TEXT[lang].placeholder;

  if (langBtn) langBtn.textContent =
  lang === "en" ? "Türkçe sohbet için basın" : "Press for ENG";

  addMessage(UI_TEXT[lang].greet, "bot");
}

if (langBtn) {
  langBtn.addEventListener("click", () => {
    applyLanguage(currentLang === "en" ? "tr" : "en");
  });
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const answer = findBestAnswer(text);
  setTimeout(() => addMessage(answer, "bot"), 150);
});

// default EN
applyLanguage("en");