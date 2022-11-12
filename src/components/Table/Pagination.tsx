import { Left, Right } from "../Icon";

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  entriesCount: number;
  previousPage: () => void;
  nextPage: () => void;
  getCanNextPage: () => boolean;
  getCanPreviousPage: () => boolean;
}

export const Pagination = (props: PaginationProps) => {
  return (
    <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-700 p-5">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {props.pageIndex * props.pageSize + 1}
        </span>
        &nbsp;to&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {(props.pageIndex + 1) * props.pageSize}
        </span>
        &nbsp;of&nbsp;
        <span className="font-semibold text-gray-900 dark:text-white">
          {props.entriesCount}
        </span>
        &nbsp;Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={props.previousPage}
          disabled={!props.getCanPreviousPage()}
          className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <Left className="mr-2 w-5 h-5" />
          Prev
        </button>
        <button
          onClick={props.nextPage}
          disabled={!props.getCanNextPage()}
          className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <Right className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
