import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export default function useOutsideClick(
  ref: RefObject<HTMLDivElement>,
  setIsOpen: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setIsOpen]);
}
