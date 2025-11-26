// bot.js

const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Mesajı ekrana yazdıran yardımcı fonksiyon
function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Basit tokenizer: cümleyi kelimelere böler
function tokenize(str) {
  return str
    .toLowerCase()
    .split(/[^a-zçğıöşü0-9]+/i)
    .filter(Boolean);
}

// En iyi cevabı bul
function findBestAnswer(question) {
  const qText = question.toLowerCase();
  const qWords = tokenize(question);

  let bestAnswer = null;
  let bestScore = 0;

  for (const qa of QA_PAIRS) {
    let score = 0;

    // 1) Tüm pattern ifadelerini tek tek ele al
    for (const pattern of qa.patterns) {
      const pText = pattern.toLowerCase();

      // a) Cümlenin içinde birebir geçiyorsa (ör: "maaş beklentisi")
      if (qText.includes(pText)) {
        score += 3; // ifade yakalanınca ekstra yüksek puan
      }

      // b) Ortak kelimelere göre puan
      const pWords = tokenize(pText);
      for (const w of pWords) {
        if (qWords.includes(w)) {
          score += 1;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestAnswer = qa.answer;
    }
  }

  // --- EŞİK KOYUYORUZ ---
  // Sadece 1 kelime tuttuysa (örn. sadece "kaç" veya sadece "tanıt")
  // bunu anlamlı eşleşme saymıyoruz.
  if (bestScore < 2) {
    return null;
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

  if (!answer) {
    // Hazır cevap yoksa genel açıklama
    addMessage(
      "Bu soruya özel hazırlanmış bir yanıtım yok. Bu chatbot, Halil Görkem Yiğit’in eğitimi, projeleri, iş tecrübeleri ve kariyer hedefleriyle ilgili soruları cevaplamak üzere hazırlandı. Bu konularla ilgili daha spesifik bir soru sorabilirsiniz."
    );
    return;
  }

  setTimeout(() => {
    addMessage(answer, "bot");
  }, 250);
});

// İlk karşılama mesajı
addMessage(
  "Merhaba, ben Halil Görkem Yiğit hakkında bilgi veren chatbot'um. Eğitim, projeler, teknik beceriler ve kariyer hedefleriyle ilgili sorular sorabilirsiniz."
);