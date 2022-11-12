import { Spinner } from "../Icon";

interface ButtonProps {
  isLoading?: boolean;
  text: string;
  loadingText?: string;
}

export const Button = (props: ButtonProps) => (
  <button
    type="submit"
    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
    data-mdb-ripple="true"
    data-mdb-ripple-color="light"
  >
    {props.isLoading && (
      <Spinner className="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline" />
    )}
    {props.isLoading ? props.loadingText || "Processing" : props.text}
  </button>
);
