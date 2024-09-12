import * as SQLite from 'expo-sqlite';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'
import { Bill } from '@/assets/definition';

let db;
let databaseName = 'testDatabase2'

export async function createTable() {
  try {

    db = await SQLite.openDatabaseAsync(databaseName);

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
            category_id TEXT,
            FOREIGN KEY (account_id) REFERENCES Account(account_id),
            FOREIGN KEY (target_account_id) REFERENCES Account(account_id),
            FOREIGN KEY (category_id) REFERENCES Category(category_id)
          );

                CREATE TABLE IF NOT EXISTS Category (
                  category_id TEXT PRIMARY KEY,
                  category_name TEXT NOT NULL,
                  icon_name TEXT,
                  parent_category_id TEXT,
                  FOREIGN KEY (parent_category_id) REFERENCES Category(category_id)
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
    await db.execAsync(
      `CREATE TRIGGER IF NOT EXISTS update_balance_delete_income
      AFTER DELETE ON Bill
      WHEN OLD.type = 'income'
      BEGIN
        UPDATE Account
        SET account_balance = account_balance - OLD.amount
        WHERE account_id = OLD.account_id;
      END; `
    )
    await db.execAsync(
      `CREATE TRIGGER IF NOT EXISTS update_balance_delete_cost
      AFTER DELETE ON Bill
      WHEN OLD.type = 'cost'
      BEGIN
        UPDATE Account
        SET account_balance = account_balance + OLD.amount
        WHERE account_id = OLD.account_id;
      END; `
    )

  
    await db.execAsync(
      `CREATE TRIGGER IF NOT EXISTS update_balance_delete_transfer
      AFTER DELETE ON Bill
      WHEN OLD.type = 'transfer'
      BEGIN
        UPDATE Account
        SET account_balance = account_balance + OLD.amount
        WHERE account_id = OLD.account_id;

        UPDATE Account
        SET account_balance = account_balance - OLD.amount
        WHERE account_id = OLD.target_account_id;
      END; `
    )

    await createCategoriesFromIconLib()
    await fetchAndPrintCategories()
    

  } catch (e) {
    console.error("Failed to create table", e);
  }
}

import { iconLib } from '@/assets/icons/icon';

async function createCategoriesFromIconLib() {
  try {
    db = await SQLite.openDatabaseAsync(databaseName);

    for (const [parentCategory, children] of Object.entries(iconLib.expense)) {
      // 检查父分类是否已经存在
      const parentExists = await categoryExists(parentCategory);
      let parentId;

      if (!parentExists) {
        // 如果父分类不存在，则生成 ID 并插入
        parentId = uuidv4()
        await db.runAsync(
          `INSERT INTO Category (category_id, category_name, icon_name) VALUES (?, ?,?)`, parentId,parentCategory,parentCategory
        );
      } else {
        // 如果父分类已经存在，获取其 category_id
        parentId = parentExists;
      }

      // 插入子分类
      if (children.length > 0) {
        for (const childCategory of children) {
          const childExists = await categoryExists(childCategory);

          if (!childExists) {
            const childId = uuidv4()
            await db.runAsync(
              `INSERT INTO Category (category_id, category_name,icon_name, parent_category_id) 
              VALUES (?,?,?,?)`,childId,childCategory,childCategory,parentId
            );
          } else {
            console.log(`Category ${childCategory} already exists, skipping...`);
          }
        }
      }
    }

    console.log("Categories created successfully from iconLib!");

  } catch (e) {
    console.error("Failed to create categories from iconLib", e);
  }
}

// 检查 category 是否已经存在的函数
async function categoryExists(categoryName:string) {
  db = await SQLite.openDatabaseAsync(databaseName);
  const result = await db.getFirstAsync(
    `SELECT category_id FROM Category WHERE category_name = ?`,categoryName
  );
  const castResult = result as {category_id:string}|undefined;

  return castResult ?.category_id || null;
}

export async function fetchAndPrintCategories() {
  try {
    db = await SQLite.openDatabaseAsync(databaseName);
    const allRows = await db.getAllAsync('SELECT * FROM Category')
    for (const row of allRows){
      console.log(row)
    }
  } catch (e) {
    console.error("Failed to fetch categories", e);
  }
}



export async function createAccount (account_name:string){
  const account_id = uuidv4();
  console.log(account_id)
  db = await SQLite.openDatabaseAsync(databaseName);
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
  db = await SQLite.openDatabaseAsync(databaseName);
  try{
    const allRows = await db.getAllAsync(`SELECT * FROM Account`)
    return allRows
  }catch(e){
    return ("get all accounts error" + e)
  }
}

export async function deleteAccountById (account_id:string) {
  db = await SQLite.openDatabaseAsync(databaseName);
  try{
    await db.runAsync(`DELETE FROM account WHERE account_id = $account_id`, {$account_id:account_id})
    console.log ("deleted")
  }catch(e){
    return("deleted accounts error" + e)

  }
}

export async function deleteAllAccounts () {
  db = await SQLite.openDatabaseAsync(databaseName);
  try{
    await db.runAsync(`DELETE FROM account `)
    console.log ("deleted all")

  }catch(e){
    console.log("delete failed")
    return("deleted all accounts error" + e)

  }
}

export async function updateAccount (account_id:string,account_name:string) {
  db = await SQLite.openDatabaseAsync(databaseName);
  try{
    await db.runAsync('UPDATE account SET account_name = ?, created_at = CURRENT_TIMESTAMP WHERE account_id = ?',account_name,account_id)
    console.log("updated")
  }catch(e){
    console.log("update account fail")
  }
}

import { BillType } from '@/assets/definition';

export async function getBills () {
  db = await SQLite.openDatabaseAsync(databaseName);
  try{
    const allRows = await db.getAllAsync(`SELECT * FROM Bill`)
    console.log('bills' +allRows)
    return allRows
  }catch(e){
    return ("get all bills error" + e)
  }
}



export async function createBill (account_id:string,type:BillType,amount:number,description:string="",target_account_id:string ="",bill_id?:string) {
  if (!bill_id) {
    bill_id = uuidv4();
  }
  

  db = await SQLite.openDatabaseAsync(databaseName);
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

export async function deleteBill (bill_id:string){
  db = await SQLite.openDatabaseAsync(databaseName);
  try{
    await db.runAsync('DELETE FROM Bill WHERE bill_id = $bill_id', {$bill_id : bill_id})
    console.log('delete succeed')
  }catch(e){
    console.log("delete bill failed" + e)
  }
}

export async function updateBill (bill_id:string,account_id:string,type:BillType,amount:number,description:string="",target_account_id:string="",create_at:string){
  db = await SQLite.openDatabaseAsync(databaseName);
  try{
    
    await deleteBill(bill_id)
    await createBill(account_id,type,amount,description,target_account_id,bill_id)

    await db.runAsync('UPDATE Bill SET created_at= ? WHERE bill_id = ? ',create_at,bill_id)
    

  }catch(e){
    console.log("update bill failed"+e)
  }

}

export async function getBillById(bill_id:string){
  try{
    db = await SQLite.openDatabaseAsync(databaseName);
    const bill = await db.getFirstAsync(`SELECT * FROM Bill WHERE bill_id =?`,bill_id)
    if (bill){
      return bill
    }else{
      console.log("didn't find the bill")
      return null;
    }
  }catch(e){
    console.log("find bill by id error:" + e)
  }
}

export async function getLatestMonthBill ():Promise<Bill[]|null>{
  try{
    db = await SQLite.openDatabaseAsync(databaseName);
    const bills = await db.getAllAsync(`SELECT * FROM Bill WHERE strftime('%Y-%m',created_at) = strftime('%Y-%m', 'now');`)
    if (bills){
      return bills as Bill[]
    }else{
      console.log("didn't find the bill")
      return null;
    }
  }catch(e){
    console.log("find bills by latest month error: "+e)
    return null
  }
}

import { BillIncludeAccountName } from '@/assets/definition';
import { changeBillsToLocalTime } from './format';
export async function getLatestWeekBill ():Promise<BillIncludeAccountName[]|null> {
  try{
    db = await SQLite.openDatabaseAsync(databaseName)
    const bills = await db.getAllAsync(
      `SELECT 
  Bill.bill_id,
  Bill.account_id,
  Account1.account_name AS account_name,
  Bill.target_account_id,
  Account2.account_name AS target_account_name,
  Bill.type,
  Bill.amount,
  Bill.description,
  Bill.created_at,
  Bill.category_id,
  Category.category_name,
  Category.icon_name,
  ParentCategory.category_name AS parent_category_name
FROM 
  Bill
LEFT JOIN 
  Account AS Account1 ON Bill.account_id = Account1.account_id
LEFT JOIN 
  Account AS Account2 ON Bill.target_account_id = Account2.account_id
LEFT JOIN 
  Category ON Bill.category_id = Category.category_id
LEFT JOIN 
  Category AS ParentCategory ON Category.parent_category_id = ParentCategory.category_id
WHERE 
  Bill.created_at >= datetime('now', '-7 days')
ORDER BY 
  Bill.created_at DESC;`
    )

    if (bills){
      const newBills = changeBillsToLocalTime(bills as BillIncludeAccountName[])
      return newBills
    }else{
      console.log("didn't find the bill")
      return null;
    }
  }catch(e){
    console.log("find bills by latest week error: "+ e)
    return null
  }
}