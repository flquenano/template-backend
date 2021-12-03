const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

//File actions
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

const Logger = require("../lib/winston");

const cmsPath = path.join(__dirname, "/..", "assets", "cms");

async function exists(filename) {
  try {
    await stat(`${cmsPath}/${filename}.json`);
    return true;
  } catch {
    return false;
  }
}

// filname = slug of record
const readRecord = async (filename) => {
  try {
    const result = await readFile(`${cmsPath}/${filename.trim()}.json`, "utf8");
    return JSON.parse(result);
  } catch (e) {
    throw new Error(e);
  }
};

const writeRecord = async (filename, content) => {
  try {
    let newContent = [];
    const exist = await exists(filename);
    let added = false;
    if (exist) {
      const records = await readRecord(filename);
      if (records.length !== 0) {
        newContent = records.map((record) => {
          if (record.id == content.id) {
            added = true;
            return content;
          }
          return record;
        });
      } else {
        newContent = [content];
      }
      if (!added) {
        newContent = [...records, content];
      }
    } else {
      newContent = [content];
    }

    //r+ :: open the file for reading and writing
    //w+ :: open the file for reading and writing, positioning the stream at the beginning of the file. The file is created if it does not exist
    //a :: open the file for writing, positioning the stream at the end of the file. The file is created if it does not exist
    //a+ :: open the file for reading and writing, positioning the stream at the end of the file. The file is created if it does not exist

    const result = await writeFile(
      `${cmsPath}/${filename}.json`,
      JSON.stringify(newContent, null, 2),
      { flag: "w+" }
    );
    return result;
    // write to file
    // return success
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  readRecord: readRecord,
  writeRecord: writeRecord,
  existRecord: exists
};
