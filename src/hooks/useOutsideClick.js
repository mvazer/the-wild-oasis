import { useEffect, useRef } from "react";

function useCloseModal(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function clickHandler(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", clickHandler, listenCapturing);

      return () =>
        document.removeEventListener("click", clickHandler, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}

export default useCloseModal;
