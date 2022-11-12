import React, { ReactNode, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { Close } from "../Icon";

const ESCAPE = "Escape";
const isKeyEscape = (key: string) => key === ESCAPE;

export interface ModalProps {
  title: string;
  content?: string;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isShowing: boolean;
  toggle: () => void;
}

export const Modal = ({
  isShowing,
  toggle,
  title,
  content,
  children,
}: ModalProps) => {
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (isKeyEscape(e.key) && isShowing) {
        toggle();
      }
    };

    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, [isShowing, toggle]);

  const onInnerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation(),
    []
  );

  return isShowing
    ? createPortal(
        <React.Fragment>
          <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40" />
          <div
            tabIndex={-1}
            aria-modal
            aria-hidden
            role="dialog"
            className="w-full inset-0 h-modal h-full grid place-items-center overflow-y-auto overflow-x-hidden fixed z-50"
            onClick={toggle}
          >
            <div
              onClick={onInnerClick}
              className="relative p-4 w-full h-full md:h-auto rounded-lg shadow dark:bg-gray-700 max-w-md text-white font-bold rounded py-0 px-0"
            >
              <div className="h-full">
                <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    aria-label="Close"
                    data-dismiss="modal"
                    onClick={toggle}
                  >
                    <Close className="w-5 h-5" />
                    <span className="sr-only" aria-hidden="true">
                      Close modal
                    </span>
                  </button>
                </div>
                <div className="p-6 space-y-6 text-white font-normal">
                  {content || children}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
