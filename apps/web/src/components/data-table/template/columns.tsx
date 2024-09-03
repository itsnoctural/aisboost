"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";

export type Template = {
  id: number;
  type: string;
  createdAt: Date;
  applicationId: number;
};

export const columns: ColumnDef<Template>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <span>
          {new Date(row.original.createdAt).toLocaleDateString("en-US")}
        </span>
      );
    },
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
