import * as cheerio from "cheerio";
import englishWords from "./en.words.json";

type WordResponse = {
  word: string;
  meanings?: string[];
  pronunciations?: string[];
  examples?: string[];
};

export default class Dictionary {
  public word: string | null;
  public words: string[];
  public lang: "en" | "nl";
  private pronunciations: string[] | null;
  private meanings: string[] | null;
  private examples: string[] | null;
  constructor() {
    this.word = null;
    this.words = [];
    this.lang = "en";
    this.meanings = null;
    this.pronunciations = null;
    this.examples = null;
  }

  private decodeHtmlEntities(text: string): string {
    const $ = cheerio.load(text);
    return $("body").text().trim();
  }

  getRandomWord(lang: "en" | "nl") {
    if (lang === "en")
      return englishWords[Math.floor(Math.random() * englishWords.length)];
    return;
  }

  async getWiktionaryText(word: string, lang: "en" | "nl") {
    const url = new URL(`https://${lang}.wiktionary.org/w/api.php`);
    url.searchParams.set("action", "parse");
    url.searchParams.set("page", word.toLowerCase());
    url.searchParams.set("prop", "text");
    url.searchParams.set("format", "json");
    url.searchParams.set("origin", "*");
    const response = await fetch(url.toString());
    const data = await response.json();
    if (data.error) return null;
    return data.parse.text;
  }

  getMeanings(text: string) {
    const $ = cheerio.load(text);

    let meanings: string[] | boolean = [];
    meanings =
      this.lang === "en" &&
      $("div.mw-content-ltr > ol > li")
        .toArray()
        .map((el) =>
          $(el)
            .text()
            .split("\n")[0]
            .replace(/\([^)]*\)/g, "")
            .replace(/:/g, "")
            .trim()
        );

    if (!meanings) return [];
    return meanings.filter((text) => text.length > 0);
  }

  getpronunciations(text: string, lang: "en" | "nl") {
    // console.log(text);
    const $ = cheerio.load(text);

    let pronunciations: string[] | boolean = [];
    pronunciations =
      lang === "en" &&
      $("span.IPA")
        .toArray()
        .map((el) => $(el).text().trim());

    if (!pronunciations) return [];
    return pronunciations.filter((text) => text.length > 0);
  }

  getExampleUsage(text: string, lang: "en" | "nl") {
    const $ = cheerio.load(text);

    const examples =
      lang === "en"
        ? $("div.h-usage-example > i.e-example")
            .toArray()
            .map((el) => $(el).text().trim())
        : $("ol li dl dd")
            .toArray()
            .map((el) => $(el).text().trim());

    if (!examples) return [];
    return examples
      .filter((text) => text.length > 0)
      .map((text) =>
        text
          .replace(/\[\d+\]/g, "")
          .replace(/▸/g, "")
          .trim()
      );
  }

  async transform(word: string, lang: "en" | "nl"): Promise<WordResponse> {
    const text = await this.getWiktionaryText(word, lang);

    const textContent = text["*"];
    this.meanings = this.getMeanings(textContent);
    this.pronunciations = this.getpronunciations(textContent, lang);
    this.examples = this.getExampleUsage(textContent, lang);

    return {
      word: word,
      meanings: this.meanings,
      pronunciations: this.pronunciations,
      examples: this.examples,
    };
  }
}

export const dictionary = new Dictionary();
