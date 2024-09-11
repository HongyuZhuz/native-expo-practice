export interface Bill {
    bill_id: string;
    account_id: string;
    type: 'income' | 'cost' | 'transfer'; // Enforcing the CHECK constraint
    amount: number;
    description?: string; // Optional field
    created_at: string; // Using string for TIMESTAMP to handle ISO format dates
    target_account_id?: string; // Optional field
  }

  export interface BillIncludeAccountName {
    bill_id: string;
  account_id: string;
  account_name: string;
  type: 'income' | 'cost' | 'transfer'; // 限定 type 为特定的字符串值
  amount: number;
  description: string | null;
  created_at: string; // 通常 SQLite 的 TIMESTAMP 会作为字符串返回
  target_account_id: string | null;
  target_account_name: string | null;
  category_id: string;
  category_name: string;
  icon_name: string | null;
  parent_category_name: string | null;
  }

  
export interface Section {
  title: string;
  data: BillIncludeAccountName[];
}
export type BillType = 'income'|'cost'|'transfer'
