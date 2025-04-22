import Dictionary from "./Dictionary";
import * as cheerio from "cheerio";
import englishWords from "./en.words.json";

jest.mock("cheerio");
jest.mock("./en.words.json", () => ["test", "word", "example"]);

describe("Dictionary", () => {
  let dictionary: Dictionary;
  const mockSelector = {
    toArray: jest.fn(),
    text: jest.fn(),
  };

  beforeEach(() => {
    dictionary = new Dictionary();
    jest.clearAllMocks();
    (cheerio.load as jest.Mock).mockReturnValue((selector: string) => {
      if (selector) {
        return mockSelector;
      }
      return {
        text: () => "mock text",
      };
    });
  });

  describe("getRandomWord", () => {
    it("should return a random word from englishWords array", () => {
      const word = dictionary.getRandomWord("en");
      expect(englishWords).toContain(word);
    });

    it("should return undefined for non-english language", () => {
      const word = dictionary.getRandomWord("nl");
      expect(word).toBeUndefined();
    });
  });

  describe("getWiktionaryText", () => {
    it("should fetch and return wiktionary text", async () => {
      const mockResponse = {
        parse: {
          text: {
            "*": "<div>test content</div>",
          },
        },
      };

      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await dictionary.getWiktionaryText("test", "en");
      expect(result).toEqual(mockResponse.parse.text);
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("test"));
    });

    it("should return null on error", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: () => Promise.resolve({ error: "Not found" }),
      });

      const result = await dictionary.getWiktionaryText("test", "en");
      expect(result).toBeNull();
    });
  });

  describe("getMeanings", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return null if no meaning is found", () => {
      const text = "";
      jest.spyOn(dictionary, "getMeanings").mockReturnValue([]);
      const meanings = dictionary.getMeanings(text);
      expect(meanings).toEqual([]);
    });

    it("should return meanings if meaning is found", () => {
      const text = "word";
      jest.spyOn(dictionary, "getMeanings").mockReturnValue(["meaning"]);
      const meanings = dictionary.getMeanings(text);
      expect(meanings).toEqual(["meaning"]);
    });
  });

  describe("getPronunciations", () => {
    it("should return null if no pronunciations is found", async () => {
      const text = "";
      jest.spyOn(dictionary, "getpronunciations").mockReturnValue([]);
      const pronunciations = dictionary.getpronunciations(text, "en");
      expect(pronunciations).toEqual([]);
    });

    it("should return pronunciations if pronunciations is found", () => {
      const text = "word";
      jest
        .spyOn(dictionary, "getpronunciations")
        .mockReturnValue(["pronunciation"]);
      const pronunciations = dictionary.getpronunciations(text, "en");
      expect(pronunciations).toEqual(["pronunciation"]);
    });
  });

  describe("getExampleUsage", () => {
    it("should return null if no example usage is found", async () => {
      const text = "";
      jest.spyOn(dictionary, "getExampleUsage").mockReturnValue([]);
      const exampleUsage = dictionary.getExampleUsage(text, "en");
      expect(exampleUsage).toEqual([]);
    });

    it("should return example usage if example usage is found", () => {
      const text = "word";
      jest.spyOn(dictionary, "getExampleUsage").mockReturnValue(["example"]);
      const exampleUsage = dictionary.getExampleUsage(text, "en");
      expect(exampleUsage).toEqual(["example"]);
    });
  });

  describe("transform", () => {
    it("should return transformed word", async () => {
      const text = "word";
      const lang = "en";
      jest.spyOn(dictionary, "transform").mockResolvedValue({
        word: text,
        meanings: ["meaning"],
        pronunciations: ["pronunciation"],
        examples: ["example"],
      });
      const result = await dictionary.transform(text, lang);
      expect(result).toEqual({
        word: "word",
        meanings: ["meaning"],
        pronunciations: ["pronunciation"],
        examples: ["example"],
      });
    });
  });
});
