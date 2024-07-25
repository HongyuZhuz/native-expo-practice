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


    const result = await db.getAllAsync('PRAGMA table_info(Bill)');
    const tableInfo = result.map(row=> ({
        name: row.name,
        type: row.type
      }));
  

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


    //test for success insert
    //console.log (`${account_id} and ${account_name} :`, result.lastInsertRowId, result.changes)
    /*const r = await db.getAllAsync('SELECT * FROM Account');
    console.log(r)*/

  }finally{
    await statement.finalizeAsync();
  }
}

export async function getAccounts () {
  db = await SQLite.openDatabaseAsync('testDatabase2');
  try{
    const allRows = await db.getAllAsync(`SELECT * FROM Account`)
    return allRows
  }catch(e){
    return ("get all accounts error" + e)
  }
}

export async function deleteAccountById (account_id:string) {
  db = await SQLite.openDatabaseAsync('testDatabase2');
  try{
    await db.runAsync(`DELETE FROM account WHERE account_id = $account_id`, {$account_id:account_id})
    console.log ("deleted")
  }catch(e){
    return("deleted accounts error" + e)
    
  }
}

export async function deleteAllAccounts () {
  db = await SQLite.openDatabaseAsync('testDatabase2');
  try{
    await db.runAsync(`DELETE FROM account `)
    console.log ("deleted all")

  }catch(e){
    console.log("delete failed")
    return("deleted all accounts error" + e)

  }
}
