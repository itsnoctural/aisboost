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
          {new Date(row.original.expiresAt).toLocaleDateString("en-US")}
        </span>
      );
    },
  },
  {
    accessorKey: "hwid",
    header: "HWID",
  },
];
