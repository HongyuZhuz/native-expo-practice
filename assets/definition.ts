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
    type: 'income' | 'cost' | 'transfer'; // Enforcing the CHECK constraint
    amount: number;
    description?: string; // Optional field
    created_at: string; // Using string for TIMESTAMP to handle ISO format dates
    target_account_id?: string; // Optional field
    account_name:string;
    target_account_name?:string;
  }