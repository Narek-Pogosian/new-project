"use client";

function SkipToMain() {
  const handleClick = () => {
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.focus();
    }
  };

  return (
    <button
      role="link"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:m-2"
    >
      Skip to main content
    </button>
  );
}

export default SkipToMain;
