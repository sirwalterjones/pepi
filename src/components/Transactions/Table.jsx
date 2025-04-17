import React from 'react';
import { MoreHorizontal } from "lucide-react" // Icon for actions

import { Badge } from "@/components/ui/badge" // Use Badge for type
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption, // Optional: Can add a caption
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// TODO: Fetch actual transaction data from Supabase
const mockTransactions = [
  { id: 1, transaction_date: '2025-04-17', receipt_no: 1001, payee: 'Agent Smith', type: 'OUT', amount: -50.00, notes: 'Buy money for operation X', balance_after: 950.00 },
  { id: 2, transaction_date: '2025-04-18', receipt_no: 1002, payee: 'Jane Doe (Other)', type: 'OUT', amount: -25.50, notes: 'Confidential Informant Payment', balance_after: 924.50 },
  { id: 3, transaction_date: '2025-04-19', receipt_no: 1003, payee: 'DEPOSIT', type: 'IN', amount: 500.00, notes: 'Fund replenishment', balance_after: 1424.50 },
  { id: 4, transaction_date: '2025-04-20', receipt_no: 1004, payee: 'Agent Smith', type: 'RETURN', amount: 10.00, notes: 'Return unused buy money', balance_after: 1434.50 },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Function to determine badge variant based on transaction type
const getTypeBadgeVariant = (type) => {
  switch (type) {
    case 'IN': return 'success'; // Assuming success variant exists or is green
    case 'OUT': return 'destructive';
    case 'RETURN': return 'secondary'; // Or 'warning' if available
    default: return 'outline';
  }
};

export default function TransactionsTable() {
  // TODO: Implement pagination, sorting, filtering
  // TODO: Implement edit/void/print functionality in DropdownMenu actions

  const handleEdit = (txId) => console.log("Edit transaction:", txId);
  const handlePrint = (txId) => console.log("Print receipt for transaction:", txId);
  const handleVoid = (txId) => console.log("Void transaction:", txId);

  return (
    <div className="rounded-md border bg-card shadow">
      <Table>
        {/* <TableCaption>A list of recent PEPI fund transactions.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="w-[80px]">Receipt #</TableHead>
            <TableHead>Payee</TableHead>
            <TableHead className="w-[80px]">Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Balance After</TableHead>
            <TableHead className="w-[50px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                No transactions yet.
              </TableCell>
            </TableRow>
          ) : (
            mockTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.transaction_date}</TableCell>
                <TableCell>{tx.receipt_no}</TableCell>
                <TableCell>{tx.payee}</TableCell>
                <TableCell>
                  <Badge variant={getTypeBadgeVariant(tx.type)}>{tx.type}</Badge>
                </TableCell>
                <TableCell className={`text-right font-medium ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(tx.amount)}
                </TableCell>
                <TableCell className="max-w-[250px] truncate" title={tx.notes}>{tx.notes || '-'}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatCurrency(tx.balance_after)}</TableCell>
                <TableCell className="text-center">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(tx.id)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePrint(tx.id)}>Print Receipt</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleVoid(tx.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        Void
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        {/* Optional Footer for totals? */}
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
} 