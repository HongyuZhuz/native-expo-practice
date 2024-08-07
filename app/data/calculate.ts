import { Bill } from "@/assets/definition";
import { getLatestMonthBill } from "./database";

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


function totalExpense(bills:Bill[]) {
    const costBills = bills.filter(bill=>bill.type==='cost');
    const totalExpense = costBills.reduce((sum,bill)=>sum+bill.amount,0)
    return totalExpense
}

function totalIncome (bills:Bill[]){
    const incomeBill = bills.filter(bill=>bill.type==='income');
    const totalIncome = incomeBill.reduce((sum,bill)=>sum+bill.amount,0)
    return totalIncome
}