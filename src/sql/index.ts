import sql from "sqlite3";
import type { sqlite3 } from "sqlite3";
import path from "path";
import type { Word } from "../type";

export default class dictDB {
  #db;
  constructor(filePath: string) {
    const sqlite3: sqlite3 = sql.verbose();
    const dbfile = path.resolve(__dirname, filePath);
    this.#db = new sqlite3.Database(dbfile, (err) => {
      if (err) throw err;
    });
  }

  async init() {
    this.#db.exec(
      `CREATE TABLE IF NOT EXISTS "stardict" (` +
      `  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,` +
      `  "word" VARCHAR(64) COLLATE NOCASE NOT NULL UNIQUE,` +
      `  "sw" VARCHAR(64) COLLATE NOCASE NOT NULL,` +
      `  "phonetic" VARCHAR(64),` +
      `  "definition" TEXT,` +
      `  "translation" TEXT,` +
      `  "pos" VARCHAR(16),` +
      `  "collins" INTEGER DEFAULT(0),` +
      `  "oxford" INTEGER DEFAULT(0),` +
      `  "tag" VARCHAR(64),` +
      `  "bnc" INTEGER DEFAULT(NULL),` +
      `  "frq" INTEGER DEFAULT(NULL),` +
      `  "exchange" TEXT,` +
      `  "detail" TEXT,` +
      `  "audio" TEXT` +
      `);` +
      `CREATE UNIQUE INDEX IF NOT EXISTS "stardict_1" ON stardict (id);` +
      `CREATE UNIQUE INDEX IF NOT EXISTS "stardict_2" ON stardict (word);` +
      `CREATE INDEX IF NOT EXISTS "stardict_3" ON stardict (sw, word collate nocase);` +
      `CREATE INDEX IF NOT EXISTS "sd_1" ON stardict (word collate nocase);`
    );
  }

  queryAll(sql: string, params: Record<string, unknown>): Promise<Word[]> {
    return new Promise((resolve, reject) => {
      this.#db.all<Word>(sql, params, (err: Error, rows): void => {
        if(err) reject(err);
    
        resolve(rows);
      });
    });
  }
}
