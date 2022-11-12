import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Spinner } from "../Icon";
import { Pagination } from "./Pagination";

interface TableProps<D extends object> {
  columns: ColumnDef<D>[];
  data: D[];
  loading?: boolean;
  pagination?: boolean;
}

export const Table = <D extends object>(props: TableProps<D>) => {
  const table = useReactTable<D>({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: props.pagination
      ? getPaginationRowModel()
      : undefined,
  });

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  scope="col"
                  className="py-3 px-6"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-4 px-6">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {props.loading && (
        <Spinner className="animate-spin h-10 w-10 mx-auto mt-5 text-blue-700" />
      )}
      {!props.loading && props.pagination && (
        <Pagination
          {...table.getState().pagination}
          entriesCount={props.data.length}
          previousPage={table.previousPage}
          nextPage={table.nextPage}
          getCanPreviousPage={table.getCanPreviousPage}
          getCanNextPage={table.getCanNextPage}
        />
      )}
    </div>
  );
};
