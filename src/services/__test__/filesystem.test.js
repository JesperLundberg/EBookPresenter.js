import { jest } from "@jest/globals";
import getAllEBooks from "../filesystem.js";

jest.unstable_mockModule("fs", () => ({
  readdirSync: jest
    .fn()
    .returnValue([
      "src/tests/ebooks/ebook1.epub",
      "src/tests/ebooks/ebook2.epub",
    ]),
}));

describe("getAllEBooks", () => {
  it("should return an array of all ebooks in the directory and subdirectories", async () => {
    // Arrange
    const ebooks = await getAllEBooks();

    // Assert
    expect(ebooks).toEqual([
      "src/tests/ebooks/ebook1.epub",
      "src/tests/ebooks/ebook2.epub",
    ]);
  });
});
