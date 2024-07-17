import * as SQLite from 'expo-sqlite'

let db
export async function createTable () {
    try{
        db = await SQLite.openDatabaseAsync('testDatabase')
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS Account (
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
);`
    )
    console.log("have already tried to create table")
    const result = db.execAsync(`PRAGMA table_info(table_name)`)
    console.log(result)

}catch(e){
    console.log("failed to create table")
}

}