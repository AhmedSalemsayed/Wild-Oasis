import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenToCapture = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenToCapture);

      return () =>
        document.removeEventListener("click", handleClick, listenToCapture);
    },
    [handler, listenToCapture]
  );
  return ref
}
