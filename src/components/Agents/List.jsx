import React from 'react';
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Use Card for wrapper

// TODO: Fetch actual agent data from Supabase (using profiles table)
const mockAgents = [
  { id: 'uuid-1', full_name: 'Agent Smith', badge_number: '12345', created_at: '2025-01-15' },
  { id: 'uuid-2', full_name: 'Agent Jones', badge_number: '67890', created_at: '2025-01-16' },
  { id: 'uuid-3', full_name: 'Agent Brown', badge_number: '11223', created_at: '2025-02-01' },
];

export default function AgentsList() {
  // TODO: Implement state for managing agents (add, edit, delete modals/forms)
  // TODO: Implement actual add/edit/delete functionality

  const handleAddAgent = () => console.log("Open Add Agent Modal");
  const handleEditAgent = (agentId) => console.log("Open Edit Agent Modal:", agentId);
  const handleDeleteAgent = (agentId) => console.log("Confirm Delete Agent:", agentId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
             <CardTitle>Agent Management</CardTitle>
             <CardDescription>
                Add, edit, or remove agents.
             </CardDescription>
        </div>
         <Button size="sm" onClick={handleAddAgent}>+ Add Agent</Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Badge Number</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="w-[50px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAgents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No agents found.
                </TableCell>
              </TableRow>
            ) : (
              mockAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.full_name}</TableCell>
                  <TableCell className="text-muted-foreground">{agent.badge_number}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(agent.created_at).toLocaleDateString()}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditAgent(agent.id)}>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteAgent(agent.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
       {/* Optional Footer for pagination? */}
        {/* <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
        </CardFooter> */}
    </Card>
  );
} 