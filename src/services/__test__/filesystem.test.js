import fileSystem from "../filesystem.js";
import mock from "mock-fs";

mock({
  "path/to/fake/dir": {
    "some-file.epub": "file content here",
    "other-dir": {
      "some-other.epub": "other file content here",
      "some-third.epub": "other file content here",
    },
    "empty-dir": {},
  },
  "path/to/some.png": Buffer.from([8, 6, 7, 5, 3, 0, 9]),
});

describe("getAllEBooks", () => {
  it("should return an array of all ebooks in the directory and subdirectories", async () => {
    // Act
    const ebooks = await fileSystem.getAllEBooks("path/");

    // Assert
    expect(ebooks).toEqual([
      "path/to/fake/dir/other-dir/some-other.epub",
      "path/to/fake/dir/other-dir/some-third.epub",
      "path/to/fake/dir/some-file.epub",
    ]);
  });
});

describe("getAllEBooks", () => {
  it("should return empty array if no ebooks are found", async () => {
    // Act
    const ebooks = await fileSystem.getAllEBooks("path/to/fake/dir/empty-dir");

    // Assert
    expect(ebooks).toEqual([]);
  });
});
