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
function totalExpense(bills:Bill[]) {
    const costBills = bills.filter(bill=>bill.type==='cost');
    const totalExpense = costBills.reduce((sum,bill)=>sum+bill.amount,0)
    return totalExpense
}