"use client";

import { useLayoutEffect } from "react";

function ScrollTop() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return null;
}

export default ScrollTop;
