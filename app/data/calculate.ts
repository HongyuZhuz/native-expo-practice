import { Bill } from "@/assets/definition";
import { getLatestMonthBill } from "./database";
import { BillIncludeAccountName,Section } from "@/assets/definition";

export async function getLatestMonthTotalExpense():Promise<number> {
    const bills = await getLatestMonthBill();
    let expense = 0
    if (bills){
        expense = totalExpense(bills);
    }
    return expense
}

export async function getLatestMonthTotalIncome():Promise<number> {
    const bills = await getLatestMonthBill();
    let income = 0
    if (bills){
        income = totalIncome(bills);
    }
    return income
}


export function totalExpense(bills:Bill[]|BillIncludeAccountName[]) {
    const costBills = bills.filter(bill=>bill.type==='cost');
    const totalExpense = costBills.reduce((sum,bill)=>sum+bill.amount,0)
    return totalExpense
}

export function totalIncome (bills:Bill[]|BillIncludeAccountName[]){
    const incomeBill = bills.filter(bill=>bill.type==='income');
    const totalIncome = incomeBill.reduce((sum,bill)=>sum+bill.amount,0)
    return totalIncome
}

export function groupBillsByDate(bills:BillIncludeAccountName[]):Section[] {
    const groupedBills:Record<string,BillIncludeAccountName[]> = {};
  
    bills.forEach(bill => {
      const date = bill.created_at.split(' ')[0]; // 提取日期部分
      if (!groupedBills[date]) {
        groupedBills[date] = [];
      }
      groupedBills[date].push(bill);
    });
  
    return Object.keys(groupedBills).map(date => ({
      title: date,
      data: groupedBills[date]
    }));
  }

 