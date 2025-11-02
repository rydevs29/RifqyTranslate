const input = document.getElementById("inputText");
const output = document.getElementById("outputText");
const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");

document.getElementById("translateBtn").addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) {
    output.value = "⚠️ Teks tidak boleh kosong.";
    return;
  }

  output.value = "⏳ Menerjemahkan...";

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang.value}|${toLang.value}`
    );
    const data = await res.json();
    output.value = data.responseData.translatedText || "❌ Gagal menerjemahkan.";
  } catch {
    output.value = "🚫 Tidak dapat terhubung ke server penerjemah.";
  }
});

document.getElementById("swapBtn").addEventListener("click", () => {
  const temp = fromLang.value;
  fromLang.value = toLang.value;
  toLang.value = temp;
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  if (!output.value) return;
  await navigator.clipboard.writeText(output.value);
  const btn = document.getElementById("copyBtn");
  btn.textContent = "✅ Disalin!";
  setTimeout(() => (btn.textContent = "📋 Salin"), 2000);
});

document.getElementById("speakBtn").addEventListener("click", () => {
  const text = output.value;
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = toLang.value;
  speechSynthesis.speak(utterance);
});
