import { NextResponse } from "next/server";

// Server-side in-memory translation cache (persists across requests in node process)
const serverCache = {
  gu: new Map(),
  hi: new Map(),
};

// Fallback: translate a single string with multi-engine fallback
async function translateSingleText(trimmed, targetLang) {
  // Engine 1: Google GTX Single
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.[0])) {
        const full = data[0].map((item) => item[0]).join("");
        if (full) return full;
      }
    }
  } catch (e) {}

  // Engine 2: Google Clients5
  try {
    const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=${targetLang}&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0]) {
        return data[0];
      }
    }
  } catch (e) {}

  // Engine 3: MyMemory Fallback
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=en|${targetLang}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data?.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch (e) {}

  return trimmed;
}

// Batch translator for a chunk of texts joined by a delimiter
async function translateBatchChunk(chunk, targetLang) {
  const DELIM = " ||| ";
  const cleaned = chunk.map((t) => t.replace(/\|\|\|/g, " ").trim());
  const query = cleaned.join(DELIM);

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.[0])) {
        const full = data[0].map((item) => item[0]).join("");
        const parts = full.split(/\s*\|\|\|\s*/);
        if (parts.length === chunk.length) {
          return parts.map((p) => p.trim());
        }
      }
    }
  } catch (e) {
    // If batch endpoint failed or timed out, fall through to fallback
  }

  // Graceful fallback: translate items in this chunk individually with concurrency
  return Promise.all(chunk.map((text) => translateSingleText(text, targetLang)));
}

export async function POST(request) {
  try {
    const { texts, targetLang } = await request.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ error: "Missing texts array" }, { status: 400 });
    }

    // Support up to 600 items for rich full-page translations
    if (texts.length > 600) {
      return NextResponse.json(
        { error: "Payload exceeds maximum allowed items (600)" },
        { status: 413 }
      );
    }

    // Validate target language format
    if (!targetLang || typeof targetLang !== "string" || !/^[a-zA-Z]{2,5}(-[a-zA-Z]{2,5})?$/.test(targetLang)) {
      return NextResponse.json({ translations: texts });
    }

    const lang = targetLang.toLowerCase();
    if (lang === "en") {
      return NextResponse.json({ translations: texts });
    }

    if (!serverCache[lang]) {
      serverCache[lang] = new Map();
    }
    const currentLangCache = serverCache[lang];

    // Identify which unique texts need translation
    const uncachedTextsSet = new Set();
    texts.forEach((t) => {
      const trimmed = (t || "").trim();
      if (!trimmed || /^[\d\s,.\-+/%:()]+$/.test(trimmed)) {
        return;
      }
      if (!currentLangCache.has(trimmed)) {
        uncachedTextsSet.add(trimmed);
      }
    });

    const uncachedList = Array.from(uncachedTextsSet);

    // If there are uncached texts, batch them into chunks of 25 for rapid parallel processing
    if (uncachedList.length > 0) {
      const CHUNK_SIZE = 25;
      const chunks = [];
      for (let i = 0; i < uncachedList.length; i += CHUNK_SIZE) {
        chunks.push(uncachedList.slice(i, i + CHUNK_SIZE));
      }

      // Execute all chunks in parallel
      const chunkResults = await Promise.all(
        chunks.map((chunk) => translateBatchChunk(chunk, lang))
      );

      // Store results in server cache
      chunks.forEach((chunk, chunkIdx) => {
        const results = chunkResults[chunkIdx] || [];
        chunk.forEach((originalText, itemIdx) => {
          const translated = results[itemIdx] || originalText;
          currentLangCache.set(originalText, translated);
        });
      });
    }

    // Map all input texts to their translated versions
    const allTranslations = texts.map((t) => {
      const trimmed = (t || "").trim();
      if (!trimmed || /^[\d\s,.\-+/%:()]+$/.test(trimmed)) {
        return t;
      }
      return currentLangCache.get(trimmed) || t;
    });

    return NextResponse.json({ translations: allTranslations });
  } catch (error) {
    console.error("Translation API error:", error);
    return NextResponse.json(
      { error: "Failed to translate", details: error.message },
      { status: 500 }
    );
  }
}
