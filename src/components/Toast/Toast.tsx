import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Close } from "../Icon";
import { Icon } from "./Icon";
import { ToastType } from "./types";

export type ModalProps = {
  title: string | null;
  type: ToastType;
  isShowing: boolean;
  toggle: () => void;
};

export const Toast = ({ isShowing, toggle, type, title }: ModalProps) => {
  useEffect(() => {
    if (!isShowing) {
      return;
    }

    const timeout = setTimeout(toggle, 3000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isShowing, toggle]);

  return isShowing
    ? createPortal(
        <React.Fragment>
          <div
            className="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed right-5 top-5"
            role="alert"
          >
            <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
              <Icon type={type} />
            </div>
            <div className="ml-3 text-sm font-normal">{title}</div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-warning"
              aria-label="Close"
              onClick={toggle}
            >
              <span className="sr-only">Close</span>
              <Close className="w-5 h-5" />
            </button>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
