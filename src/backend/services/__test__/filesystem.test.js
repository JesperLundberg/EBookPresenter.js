var sut = require("../filesystem");

// mocking fs module
var fs = require("fs");
jest.mock("fs");

describe("getAllEBooks", () => {
  //
  // common mocks
  //

  // all of our directories ends with dir in the name
  fs.statSync.mockImplementation((path) => {
    return {
      isDirectory: () => {
        return path.endsWith("dir");
      },
    };
  });

  // yeah, in these tests all files exists
  fs.existsSync.mockImplementation(() => {
    return true;
  });

  it("should return an array of all ebooks in the directory and subdirectories", async () => {
    // arrange

    // mock file structure
    fs.readdirSync.mockImplementation((dirPath) => {
      if (dirPath.includes("other-dir")) {
        return ["some-other.epub", "some-third.epub"];
      }
      if (dirPath.includes("empty-dir")) {
        return [];
      }
      return ["some-file.epub", "other-dir", "empty-dir", "nsfw.png"];
    });

    // Act
    const ebooks = await sut.getAllEBooks("path/");

    // Assert
    expect(ebooks).toEqual([
      "path/some-file.epub",
      "path/other-dir/some-other.epub",
      "path/other-dir/some-third.epub",
    ]);
  });
});

describe("getAllEBooks", () => {
  it("should return empty array if no ebooks are found", async () => {
    // arrange

    // These are not the files you are looking for
    fs.readdirSync.mockImplementation((dirPath) => {
      if (dirPath.includes("other-dir")) {
        return ["some-other.som", "some-third.oth"];
      }
      if (dirPath.includes("empty-dir")) {
        return [];
      }
      return ["some.png"];
    });

    // Act
    const ebooks = await sut.getAllEBooks("path/");

    // Assert
    expect(ebooks).toEqual([]);
  });
});
