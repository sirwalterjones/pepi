import React from 'react';

// TODO: Fetch actual agent data from Supabase
const mockAgents = [
  { id: 1, name: 'Agent Smith', badge_number: '12345', created_at: '2025-01-15' },
  { id: 2, name: 'Agent Jones', badge_number: '67890', created_at: '2025-01-16' },
  { id: 3, name: 'Agent Brown', badge_number: '11223', created_at: '2025-02-01' },
];

export default function AgentsList() {
  // TODO: Implement state for managing agents (add, edit, delete)
  // TODO: Implement form/modal for adding/editing agents
  // TODO: Implement delete confirmation

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Manage Agents</h3>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
            + Add Agent
          </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badge Number</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockAgents.map((agent) => (
            <tr key={agent.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{agent.name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{agent.badge_number}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{agent.created_at}</td>
              <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                {/* TODO: Add actual action buttons/icons */}
                <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
           {mockAgents.length === 0 && (
             <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                    No agents found.
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 