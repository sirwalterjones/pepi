import React from 'react';

// TODO: Fetch actual transaction data from Supabase
const mockTransactions = [
  {
    id: 1,
    date: '2025-04-17',
    receipt_no: 1001,
    payee: 'Agent Smith',
    type: 'OUT',
    amount: -50.00,
    notes: 'Buy money for operation X',
    balance_before: 1000.00,
    balance_after: 950.00
  },
  {
    id: 2,
    date: '2025-04-18',
    receipt_no: 1002,
    payee: 'Jane Doe (Other)',
    type: 'OUT',
    amount: -25.50,
    notes: 'Confidential Informant Payment',
    balance_before: 950.00,
    balance_after: 924.50
  },
   {
    id: 3,
    date: '2025-04-19',
    receipt_no: 1003,
    payee: 'DEPOSIT',
    type: 'IN',
    amount: 500.00,
    notes: 'Fund replenishment',
    balance_before: 924.50,
    balance_after: 1424.50
  },
  {
    id: 4,
    date: '2025-04-20',
    receipt_no: 1004,
    payee: 'Agent Smith',
    type: 'RETURN',
    amount: 10.00,
    notes: 'Return unused buy money',
    balance_before: 1424.50,
    balance_after: 1434.50
  },
];

export default function TransactionsTable() {
  // TODO: Implement pagination, sorting, filtering
  // TODO: Implement edit/void functionality
  // TODO: Implement receipt printing link/button

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt#</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payee</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance After</th>
            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockTransactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{tx.date}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{tx.receipt_no}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{tx.payee}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.type === 'IN' ? 'bg-green-100 text-green-800' : tx.type === 'OUT' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {tx.type}
                </span>
              </td>
              <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(tx.amount)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate" title={tx.notes}>{tx.notes}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(tx.balance_after)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                {/* TODO: Add actual action buttons/icons */}
                <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                <button className="text-blue-600 hover:text-blue-900">Print</button>
              </td>
            </tr>
          ))}
          {mockTransactions.length === 0 && (
             <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                    No transactions yet.
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 