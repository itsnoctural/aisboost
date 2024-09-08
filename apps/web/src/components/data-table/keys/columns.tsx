"use client";
import type { ColumnDef } from "@tanstack/react-table";

export type Key = {
  id: string;
  expiresAt: Date;
  hwid: string;
};

export const columns: ColumnDef<Key>[] = [
  {
    accessorKey: "id",
    header: "Key",
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
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
];
