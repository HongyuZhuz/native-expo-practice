import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'

let db;

export async function createTable() {
  try {
    console.log("try to do that")
    

    db = await SQLite.openDatabaseAsync('testDatabase2');
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


    await db.execAsync(
      `CREATE TRIGGER IF NOT EXISTS update_balance_income
    AFTER INSERT ON Bill
    WHEN NEW.type = 'income'
    BEGIN
      UPDATE Account
      SET account_balance = account_balance + NEW.amount
      WHERE account_id = NEW.account_id;
    END;`
    )
    await db.execAsync(
      `CREATE TRIGGER IF NOT EXISTS update_balance_cost
    AFTER INSERT ON Bill
    WHEN NEW.type = 'cost'
    BEGIN
      UPDATE Account
      SET account_balance = account_balance - NEW.amount
      WHERE account_id = NEW.account_id;
    END;`
    )
    await db.execAsync(
      `CREATE TRIGGER IF NOT EXISTS update_balance_transfer_source
    AFTER INSERT ON Bill
    WHEN NEW.type = 'transfer'
    BEGIN
      UPDATE Account
      SET account_balance = account_balance - NEW.amount
      WHERE account_id = NEW.account_id;
    END;`
    )
    await db.execAsync(
      `CREATE TRIGGER IF NOT EXISTS update_balance_transfer_target
    AFTER INSERT ON Bill
    WHEN NEW.type = 'transfer'
    BEGIN
      UPDATE Account
      SET account_balance = account_balance + NEW.amount
      WHERE account_id = NEW.target_account_id;
    END;`
    )
  

  } catch (e) {
    console.error("Failed to create table", e);
  }
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

export async function updateAccount (account_id:string,account_name:string) {
  db = await SQLite.openDatabaseAsync('testDatabase2');
  try{
    await db.runAsync('UPDATE account SET account_name = ?, created_at = CURRENT_TIMESTAMP WHERE account_id = ?',account_name,account_id)
    console.log("updated")
  }catch(e){
    console.log("update account fail")
  }
}

export async function getBills () {
  db = await SQLite.openDatabaseAsync('testDatabase2');
  try{
    const allRows = await db.getAllAsync(`SELECT * FROM Bill`)
    return allRows
  }catch(e){
    return ("get all bills error" + e)
  }
}


type BillType = 'income'|'cost'|'transfer'
export async function createBill (account_id:string,type:BillType,amount:number,description:string="",target_account_id:string ="") {
  const bill_id = uuidv4();

  db = await SQLite.openDatabaseAsync('testDatabase2');
  const statement = await db.prepareAsync(
    `INSERT INTO Bill (bill_id,account_id,type,amount,description,created_at,target_account_id)  
    VALUES ($bill_id,$account_id,$type, $amount,$description,CURRENT_TIMESTAMP,$target_account_id);
    `
  )
  try {
    let result = await statement.executeAsync({$bill_id:bill_id, $account_id:account_id,$type:type,$amount:amount,$description:description,$target_account_id:target_account_id});
    console.log("try to update bill")
    console.log(result)

  }finally{
    await statement.finalizeAsync();
  }
}
