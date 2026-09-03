import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { texts, targetLang } = await request.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ error: "Missing texts array" }, { status: 400 });
    }

    if (!targetLang || targetLang === "en") {
      return NextResponse.json({ translations: texts });
    }

    // Single item translator with multi-engine fallback
    const translateText = async (text) => {
      const trimmed = text.trim();
      if (!trimmed || /^[\d\s,.\-+/%:()]+$/.test(trimmed)) {
        return text;
      }

      // Engine 1: Google Clients5
      try {
        const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=${targetLang}&q=${encodeURIComponent(trimmed)}`;
        const res = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data[0]) {
            return data[0];
          }
        }
      } catch (e) {}

      // Engine 2: MyMemory Fallback
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=en|${targetLang}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data?.responseData?.translatedText) {
            return data.responseData.translatedText;
          }
        }
      } catch (e) {}

      return text;
    };

    // Process all texts in parallel for maximum speed
    const allTranslations = await Promise.all(texts.map((t) => translateText(t)));

    return NextResponse.json({ translations: allTranslations });
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: "Failed to translate", details: error.message },
      { status: 500 }
    );
  }
}
