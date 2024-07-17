import * as SQLite from 'expo-sqlite';

let db;

export async function createTable() {
  try {
    console.log("try to do that")
    // 打开数据库
    db = await SQLite.openDatabaseAsync('testDatabase');
    console.log(db); // 打印数据库对象以调试

    // 使用 execAsync 执行创建表的 SQL 语句
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS Account (
        account_id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_name TEXT NOT NULL,
        account_balance REAL NOT NULL DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Bill (
        bill_id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER,
        type TEXT NOT NULL CHECK (type IN ('income', 'cost', 'transfer')),
        amount REAL NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        target_account_id INTEGER,
        FOREIGN KEY (account_id) REFERENCES Account(account_id),
        FOREIGN KEY (target_account_id) REFERENCES Account(account_id)
      );
    `);

    console.log("Tables created successfully");

    // 获取表信息
    const result = await db.getAllAsync('PRAGMA table_info(Bill)');
    const tableInfo = result.map(row=> ({
        name: row.name,
        type: row.type
      }));
      console.log('Table info:', JSON.stringify(tableInfo, null, 2));

  } catch (e) {
    console.error("Failed to create table", e);
  }
}