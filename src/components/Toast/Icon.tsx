import { useMemo } from "react";
import { Danger, Success, Warning } from "../Icon";
import { ToastType } from "./types";

export const Icon = ({ type }: { type: ToastType }) => {
  const Icon = useMemo(() => {
    switch (type) {
      case "success": {
        return Success;
      }

      case "danger": {
        return Danger;
      }

      case "warning": {
        return Warning;
      }
    }
  }, [type]);

  return (
    <>
      <Icon className="w-5 h-5" />
      <span className="sr-only">{type} icon</span>
    </>
  );
};
