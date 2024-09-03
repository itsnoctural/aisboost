"use client";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableRowActions } from "./data-table-row-actions";

export type Application = {
  id: number;
  name: string;
  duration: number;
  checkpoints: number;
};

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, id } = row.original;

      return (
        <Link href={`/dashboard/apps/${id}`} prefetch={false}>
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return <span>{row.original.duration}h.</span>;
    },
  },
  {
    accessorKey: "checkpoints",
    header: "Checkpoints",
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
