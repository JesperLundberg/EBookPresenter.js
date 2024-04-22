import fs from "fs";
import { jest } from "@jest/globals";
import fileSystem from "../filesystem.js";

// jest.mock("fs");

// jest.mock("fs", () => ({
//   readdirSync: jest.fn(),
// }));

jest.unstable_mockModule("fs", () => ({
  readdirSync: jest
    .fn()
    .mockReturnValue([
      "src/tests/ebooks/ebook1.epub",
      "src/tests/ebooks/ebook2.epub",
    ]),
}));

describe("getAllEBooks", () => {
  it("should return an array of all ebooks in the directory and subdirectories", async () => {
    const readdirSync = jest.spyOn(fs, "readdirSync");
    // let fs = jest.mock("fs");
    //
    // fs.readdirSync = jest
    //   .mock()
    //   .fn()
    //   .mockReturnValue([
    //     "src/tests/ebooks/ebook1.epub",
    //     "src/tests/ebooks/ebook2.epub",
    //   ]);
    // Arrange

    // console.log("fs", fs.readdirSync());

    // Act
    const ebooks = await fileSystem.getAllEBooks();
    expect(fs.readdirSync).toHaveBeenCalledTimes(2);

    // Assert
    // expect(ebooks).toEqual([
    //   "src/tests/ebooks/ebook1.epub",
    //   "src/tests/ebooks/ebook2.epub",
    // ]);
  });
});
