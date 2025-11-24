const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Türkçe karakterleri sadeleştir + lowercase
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u");
}

function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Basit benzerlik skoru: tam içerme + kelime kökü eşleşmeleri
function patternScore(questionNorm, patternNorm) {
  let score = 0;

  if (!patternNorm) return 0;

  // Tam pattern soru içinde geçiyorsa
  if (questionNorm.includes(patternNorm)) {
    score += patternNorm.length * 2;
  }

  // Kelime kelime bak (özellikle uzun kelimelerin ilk 3–4 harfine)
  const q = questionNorm;
  const words = patternNorm.split(" ").filter(Boolean);

  for (const w of words) {
    if (w.length >= 4) {
      const prefix = w.slice(0, 4);
      if (q.includes(prefix)) {
        score += w.length;
      }
    } else {
      if (q.includes(w)) {
        score += w.length;
      }
    }
  }

  return score;
}

function findBestAnswer(question) {
  const qNorm = normalize(question);

  let bestAnswer = null;
  let bestScore = 0;

  for (const qa of QA_PAIRS) {
    let totalScore = 0;

    for (const pattern of qa.patterns) {
      const pNorm = normalize(pattern);
      totalScore += patternScore(qNorm, pNorm);
    }

    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestAnswer = qa.answer;
    }
  }

  if (bestScore <= 0 || !bestAnswer) {
    // Hiçbir pattern tutmazsa genel fallback
    return (
      "Bu soruya özel hazırlanmış bir cevabım yok, ama kısaca kendimi anlatayım:\n\n" +
      `Adım ${GORKEM_PROFILE.fullName}. ${GORKEM_PROFILE.title} olarak ` +
      `${GORKEM_PROFILE.technologies.join(
        ", "
      )} teknolojileriyle projeler geliştiriyorum. ` +
      "Eğitimim, projelerim veya kariyer hedeflerim hakkında daha spesifik bir soru sorarsanız daha net cevap verebilirim."
    );
  }

  return bestAnswer;
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  const answer = findBestAnswer(text);

  setTimeout(() => {
    addMessage(answer, "bot");
  }, 200);
});

// Karşılama mesajı
addMessage(
  "Merhaba, ben Görkem hakkında bilgi veren chatbot'um. Eğitim, projeler, Almanya/THWS deneyimi veya Data Science hedefleri hakkında sorular sorabilirsin."
);