"use client";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { DataTableRowActions } from "./data-table-row-actions";

export type Key = {
  id: string;
  expiresAt: Date;
  hwid: string;
  applicationId: number;
};

export const columns: ColumnDef<Key>[] = [
  {
    accessorKey: "id",
    header: "Key",
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => {
      return (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expires At
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(row.original.expiresAt))}
        </span>
      );
    },
  },
  {
    accessorKey: "hwid",
    header: "HWID",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <DataTableRowActions row={row} />
        </div>
      );
    },
  },
];
