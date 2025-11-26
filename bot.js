

const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// ----------------- UI YARDIMCI FONKSİYONLAR -----------------

function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ----------------- METİN NORMALİZASYON & TOKENIZE -----------------

function normalizeText(str) {
  return str
    .toLowerCase()
    .replace(/[!?.,;:()"'`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(str) {
  if (!str) return [];
  return normalizeText(str)
    .split(" ")
    .filter((w) => w.length > 1); // tek harfleri at
}

// Çok basit bir Türkçe stem fonksiyonu (sadece sık ekleri kesiyoruz)
function stemTr(word) {
  const suffixes = [
    "lar",
    "ler",
    "ları",
    "leri",
    "ların",
    "lerin",
    "larım",
    "lerim",
    "larımız",
    "lerimiz",
    "ım",
    "im",
    "um",
    "üm",
    "sın",
    "sin",
    "sun",
    "sün",
    "sınız",
    "siniz",
    "sunuz",
    "sünüz",
    "ın",
    "in",
    "un",
    "ün",
    "nın",
    "nin",
    "nun",
    "nün",
    "yım",
    "yim",
    "yum",
    "yüm",
    "mısın",
    "misin",
    "musun",
    "müsün",
    "mı",
    "mi",
    "mu",
    "mü"
  ];

  for (const suf of suffixes) {
    if (word.endsWith(suf) && word.length > suf.length + 1) {
      return word.slice(0, -suf.length);
    }
  }
  return word;
}

function normalizeTokens(tokens) {
  return tokens.map(stemTr);
}

// ----------------- SKOR HESABI -----------------

function scoreForQa(questionTokens, qaPatterns) {
  const qNorm = normalizeTokens(questionTokens);

  let score = 0;

  for (const pattern of qaPatterns) {
    const pTokens = normalizeTokens(tokenize(pattern));

    for (const qt of qNorm) {
      for (const pt of pTokens) {
        if (!qt || !pt) continue;
        if (qt === pt) {
          score += 3; // tam kök eşleşmesi
        } else if (qt.includes(pt) || pt.includes(qt)) {
          score += 1; // kısmi eşleşme
        }
      }
    }
  }

  return score;
}

// ----------------- EN İYİ CEVABI BUL -----------------

function findBestAnswer(question) {
  const q = normalizeText(question);
  const qTokens = tokenize(q);

  // Çok kısa, anlamsız şeyler yazılırsa direkt fallback:
  if (qTokens.length === 0) {
    return "Lütfen Görkem’in eğitimi, projeleri, teknik becerileri veya kariyer hedefleriyle ilgili bir soru sor.";
  }

  let bestAnswer = null;
  let bestScore = 0;

  for (const qa of QA_PAIRS) {
    const s = scoreForQa(qTokens, qa.patterns || []);
    if (s > bestScore) {
      bestScore = s;
      bestAnswer = qa.answer;
    }
  }

  // Eşik değeri: hiçbir şey yeterince iyi eşleşmezse fallback ver
  if (!bestAnswer || bestScore < 3) {
    return (
      "Bu soru doğrudan hazırladığım konuların dışında kalıyor olabilir. " +
      "Ben daha çok Görkem’in eğitimi, projeleri, teknik becerileri ve kariyer hedefleri hakkında bilgi verebiliyorum. " +
      "Bu alanlarda daha spesifik bir soru sorarsanız detaylı yanıt verebilirim."
    );
  }

  return bestAnswer;
}

// ----------------- FORM EVENTİ -----------------

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const answer = findBestAnswer(text);
  setTimeout(() => {
    addMessage(answer, "bot");
  }, 250);
});

// İlk karşılama mesajı
addMessage(
  "Merhaba, ben Halil Görkem Yiğit hakkında bilgi veren chatbot'um. Eğitim, projeler, teknik beceriler ve kariyer hedefleri hakkında sorular sorabilirsiniz."
);