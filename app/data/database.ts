import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'

let db;

export async function createTable() {
  try {
    console.log("try to do that")

    db = await SQLite.openDatabaseAsync('testDatabase');
    console.log(db); 

    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS Account (
        account_id TEXT PRIMARY KEY,
        account_name TEXT NOT NULL,
        account_balance REAL NOT NULL DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Bill (
        bill_id TEXT PRIMARY KEY,
        account_id TEXT,
        type TEXT NOT NULL CHECK (type IN ('income', 'cost', 'transfer')),
        amount REAL NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        target_account_id TEXT,
        FOREIGN KEY (account_id) REFERENCES Account(account_id),
        FOREIGN KEY (target_account_id) REFERENCES Account(account_id)
      );
    `);

    console.log("Tables created successfully");

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

async function readExcelAndInsertData () {
  return
}


//need to change bill_id and account_id's type from integer to text
export async function insertBill (type:string,amount:number, discrption:string,target_account_id:number) {
  const bill_id = uuidv4();
  
}

export async function createAccount (account_name:string){
  console.log("try to create uuid")
  const account_id = uuidv4();
  console.log(account_id)
  db = await SQLite.openDatabaseAsync('testDatabase2');
  const statement = await db.prepareAsync(
    `INSERT INTO Account (account_id,account_name,created_at)  
    VALUES ($account_id,$account_name,CURRENT_TIMESTAMP);
    `
  )
  try {
    let result = await statement.executeAsync({$account_id:account_id,$account_name:account_name});
    console.log (`${account_id} and ${account_name} :`, result.lastInsertRowId, result.changes)

    const r = await db.getAllAsync('SELECT * FROM Account');
    console.log(r)

  }finally{
    await statement.finalizeAsync();
  }
}
