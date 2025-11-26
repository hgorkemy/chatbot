// =================== DOM ELEMANLARI ===================

const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// =================== YARDIMCI FONKSİYONLAR ===================

// Metni normalize et: küçük harf, noktalama temizleme, fazla boşlukları at
function normalize(text) {
  if (!text) return "";
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // harf/rakam dışını boşluk yap
    .replace(/\s+/g, " ")
    .trim();
}

// Kelimelere ayır
function tokenize(text) {
  const norm = normalize(text);
  if (!norm) return [];
  return norm.split(" ");
}

// İki kelimenin "yakın" olup olmadığını kontrol et
// - Tam eşleşme
// - Veya biri diğerini içeriyorsa ve en az 5 harfse (beklenti ~ beklentilerin)
function tokensMatch(a, b) {
  if (!a || !b) return false;
  if (a === b) return true;

  const minLen = Math.min(a.length, b.length);
  if (minLen >= 5 && (a.includes(b) || b.includes(a))) {
    return true;
  }
  return false;
}

// Bir soru ile tek bir QA kaydı arasındaki benzerliği skorla
function scoreQuestionForQA(question, qa) {
  const qTokens = tokenize(question);
  const patterns = qa.patterns || [];
  let bestPatternScore = 0;

  for (const pattern of patterns) {
    const pTokens = tokenize(pattern);
    if (!pTokens.length) continue;

    // Aynı soru kelimesini iki kez saymamak için işaretle
    const used = new Array(qTokens.length).fill(false);
    let overlap = 0;

    for (const pTok of pTokens) {
      for (let i = 0; i < qTokens.length; i++) {
        if (used[i]) continue;
        if (tokensMatch(pTok, qTokens[i])) {
          used[i] = true;
          overlap++;
          break;
        }
      }
    }

    if (overlap === 0) continue;

    // Temel skor: pattern kelimelerinin ne kadarı tuttu
    let score = overlap / pTokens.length;

    // Biraz bonus: daha fazla ortak kelime = biraz daha skor
    score += overlap * 0.05;

    if (score > bestPatternScore) {
      bestPatternScore = score;
    }
  }

  return bestPatternScore;
}

// Hakaret / uygunsuz kelime filtresi (çok basit)
function checkBadLanguage(question) {
  const qTokens = tokenize(question);
  const badWords = [
    "mal",
    "salak",
    "aptal",
    "gerizekalı",
    "orospu",
    "salakça",
    "aptalca"
  ];

  for (const bad of badWords) {
    if (qTokens.includes(bad)) {
      return true;
    }
  }
  return false;
}

// En iyi cevabı bul
function findBestAnswer(question) {
  const normalized = normalize(question);

  if (!normalized) {
    return "Herhangi bir soru yazmadın 🙂 Görkem hakkında merak ettiğin bir şeyi sorabilirsin. Örneğin: \"Eğitimin nedir?\", \"Projelerin neler?\", \"Kariyer hedefin ne?\"";
  }

  // Hakaret filtresi
  if (checkBadLanguage(normalized)) {
    return "Lütfen daha uygun bir dil kullanalım. Bu bot, Görkem’in eğitimi, projeleri ve kariyer planları hakkında bilgi vermek için tasarlandı.";
  }

  let bestQA = null;
  let bestScore = 0;

  for (const qa of QA_PAIRS) {
    const s = scoreQuestionForQA(normalized, qa);
    if (s > bestScore) {
      bestScore = s;
      bestQA = qa;
    }
  }

  // Eşik: çok alakasızsa zorla cevaplama
  const MIN_SCORE = 0.55;

  if (bestQA && bestScore >= MIN_SCORE) {
    return bestQA.answer;
  }

  // Hiçbir pattern yeterince iyi eşleşmediyse genel cevap
  return (
    "Bu soruya özel hazırlanmış bir cevabım yok gibi görünüyor. " +
    `Yine de kısaca özet geçeyim:\n\nAdım ${GORKEM_PROFILE.fullName}. ` +
    `${GORKEM_PROFILE.title} olarak ${GORKEM_PROFILE.technologies.join(
      ", "
    )} ile çalışıyorum. ` +
    "Eğitimim, projelerim ve kariyer hedeflerim hakkında daha net bir soru sorarsan daha detaylı yanıt verebilirim. "
  );
}

// Mesajı ekrana yazdır
function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// =================== OLAY DİNLEYİCİLERİ ===================

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
  "Merhaba, ben Görkem hakkında bilgi veren chatbot'um. Eğitim, projeler, teknik beceriler, Erasmus deneyimi veya kariyer hedefleri hakkında sorular sorabilirsin."
);