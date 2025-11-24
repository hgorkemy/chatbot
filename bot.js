// =================== DOM ELEMANLARI ===================

const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// =================== MESAJ GÖSTERME FONKSİYONU ===================

function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// =================== METİN NORMALİZASYONU ===================
// Türkçe karakterleri sadeleştir + küçük harfe çevir + noktalama temizle

function normalizeText(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/i̇/g, "i") // bazı sistemler için
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9\\s]/g, " ") // harf/rakam dışını boşluk yap
    .replace(/\\s+/g, " ")
    .trim();
}

function tokenize(str) {
  const norm = normalizeText(str);
  if (!norm) return [];
  return norm.split(" ").filter(Boolean);
}

// =================== EŞLEŞME SKORU ===================
// - Kelime kelime bakar
// - Aynı kelime ise yüksek puan
// - Baş harfleri aynıysa (eksik yazım) orta puan
// - Tam pattern içeriği geçiyorsa bonus

function scoreMatch(questionTokens, pattern) {
  const normPattern = normalizeText(pattern);
  const patternTokens = tokenize(pattern);

  if (!normPattern || patternTokens.length === 0) return 0;

  let score = 0;

  // 1) Soru içinde pattern’in normalize hali tamamen geçiyorsa bonus
  const normQuestion = questionTokens.join(" ");
  if (normQuestion.includes(normPattern)) {
    score += normPattern.length; // uzun pattern daha değerli
  }

  // 2) Kelime bazlı karşılaştırma
  for (const pTok of patternTokens) {
    if (pTok.length <= 2) continue; // çok kısa kelimeleri umursama

    for (const qTok of questionTokens) {
      if (qTok === pTok) {
        // tam aynı kelime
        score += 4;
      } else if (
        qTok.startsWith(pTok) || // soru kelimesi pattern ile başlıyorsa
        pTok.startsWith(qTok)    // pattern soru kelimesiyle başlıyorsa
      ) {
        score += 3; // kısmi ama anlamlı eşleşme
      }
    }
  }

  return score;
}

// =================== EN İYİ CEVABI BUL ===================

function findBestAnswer(question) {
  const qTokens = tokenize(question);

  let bestAnswer = null;
  let bestScore = 0;

  for (const qa of QA_PAIRS) {
    let qaScore = 0;

    for (const pattern of qa.patterns) {
      qaScore += scoreMatch(qTokens, pattern);
    }

    if (qaScore > bestScore) {
      bestScore = qaScore;
      bestAnswer = qa.answer;
    }
  }

  // Hiç anlamlı eşleşme yoksa (skor 0)
  if (!bestAnswer || bestScore === 0) {
    // GORKEM_PROFILE'dan özet oluştur
    if (typeof GORKEM_PROFILE !== "undefined") {
      const tech = GORKEM_PROFILE.technologies
        ? GORKEM_PROFILE.technologies.join(", ")
        : "";

      return (
        "Bu soruya özel hazırlanmış bir cevabım yok , başka bir kelime ile sormayı deneyebilirsin  ama kısaca kendimi özetleyeyim:\\n\\n" +
        `Adım ${GORKEM_PROFILE.fullName}. ${GORKEM_PROFILE.title} olarak ${tech} ile çalışıyorum. ` +
        "Data Science ve Machine Learning alanında ilerlemeyi hedefliyorum. " +
        "Eğitim, projeler, kariyer hedefi veya teknik becerilerim hakkında daha spesifik bir soru sorarsanız daha net yanıt verebilirim."
      );
    }

    // GORKEM_PROFILE yoksa daha genel fallback
    return (
      "Bu soruya özel hazırlanmış bir cevabım yok. Eğitim, projeler, teknik beceriler veya kariyer hedefiyle ilgili daha spesifik sorular sorabilirsiniz."
    );
  }

  return bestAnswer;
}

// =================== FORM EVENTİ ===================

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const answer = findBestAnswer(text);

  // Küçük bir gecikme ile daha 'bot havası'
  setTimeout(() => {
    addMessage(answer, "bot");
  }, 250);
});

// =================== İLK KARŞILAMA MESAJI ===================

addMessage(
  "Merhaba, ben Halil Görkem Yiğit hakkında bilgi veren chatbot'um. Eğitim, projeler, Almanya/THWS deneyimi, Data Science hedefleri veya kariyer planları hakkında sorular sorabilirsiniz."
);