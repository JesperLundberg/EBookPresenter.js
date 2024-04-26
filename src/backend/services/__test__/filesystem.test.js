var sut = require("../filesystem");

// mocking fs module
var fs = require("fs");
jest.mock("fs");

describe("filesystem", () => {
  //
  // common mocks
  //
  const birthtime = new Date();
  const lastModified = new Date();

  // all of our directories ends with dir in the name
  fs.statSync.mockImplementation((path) => {
    return {
      isDirectory: () => {
        return path.endsWith("dir");
      },
      size: 100,
      birthtime: birthtime,
      mtime: lastModified,
    };
  });

  describe("getAllEBooks", () => {
    it("should throw an error if the path is empty", async () => {
      // Act
      const ebooks = sut.getAllEBooks("");

      // Assert
      await expect(ebooks).rejects.toThrow("Path is required");
    });

    it("should throw an error if the path does not exist", async () => {
      // arrange
      fs.existsSync.mockImplementation(() => {
        return false;
      });

      // Act
      const ebooks = sut.getAllEBooks("path/");

      // Assert
      await expect(ebooks).rejects.toThrow("Path does not exist");
    });

    it("should return an array of all ebooks in the directory and subdirectories", async () => {
      // arrange

      // the path exists
      fs.existsSync.mockImplementation(() => {
        return true;
      });

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

    it("should return empty array if no ebooks are found", async () => {
      // arrange

      // the path exists
      fs.existsSync.mockImplementation(() => {
        return true;
      });
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

  describe("getSpecificEBook", () => {
    it("should return the info of the specific ebook", async () => {
      // arrange

      // the path exists
      fs.existsSync.mockImplementation(() => {
        return true;
      });

      // mock file structure
      fs.readdirSync.mockImplementation((dirPath) => {
        if (dirPath.includes("other-dir")) {
          return ["some-other.epub"];
        }
        return ["some-other.epub"];
      });

      const ebook = await sut.getSpecificEBook(
        "path/other-dir/some-other.epub",
      );

      // arrange
      const expected = {
        birthtime: birthtime,
        lastModified: lastModified,
        name: "some-other",
        path: "path/other-dir/some-other.epub",
        size: 100,
      };

      // Assert
      expect(ebook).toEqual(expected);
    });

    it("should throw an error if the file does not exist", async () => {
      // arrange

      // the path does not exist
      fs.existsSync.mockImplementation(() => {
        return false;
      });

      // Act
      const ebook = sut.getSpecificEBook("path/other-dir/some-other.epub");

      // Assert
      await expect(ebook).rejects.toThrow("File does not exist");
    });

    it("should throw an error if the path is empty", async () => {
      // Act
      const ebook = sut.getSpecificEBook("");

      // Assert
      await expect(ebook).rejects.toThrow("Path is required");
    });
  });
});
