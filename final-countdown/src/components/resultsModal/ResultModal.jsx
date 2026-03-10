import { createPortal } from "react-dom";

import classes from "./resultsModal.module.css";

export default function ResultModal({
  result,
  targetTime,
  timeLeft,
  ref,
  onClose,
}) {
  const formattedRemainingTime = (timeLeft / 1000).toFixed(2);
  const score = Math.round(((targetTime * 1000 - timeLeft) / (targetTime * 1000)) * 100);

  return createPortal(
    <dialog className={classes["result-modal"]} ref={ref} onClose={onClose}>
      <h2>You {result ? "won" : "lost"}!</h2>
      <p>Target time was: {targetTime} seconds!</p>
      {result ? (
        <>
          <p>
            You stopped the timer with{" "}
            <strong>{formattedRemainingTime} seconds left</strong>
          </p>
          <p className={classes.score}>
            Score: <strong>{score}</strong>/100
          </p>
        </>
      ) : (
        <p>Time's up! Better luck next time!</p>
      )}
      <form method="dialog" onSubmit={onClose}>
        <button aria-label="Close results modal">Close</button>
      </form>
    </dialog>,
    document.getElementById("modal"),
  );
}
