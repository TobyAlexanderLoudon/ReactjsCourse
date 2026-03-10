import { useRef, useState, useMemo, useCallback } from "react";
import ResultModal from "../resultsModal/ResultModal";
import classes from "./TimerChallange.module.css";

export default function TimerChallange({ title, targetTime }) {
  const [timerExpired, setTimerExpired] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const timerRef = useRef();
  const timerEndRef = useRef();
  const dialogRef = useRef();

  const { statusText, statusClass, buttonText } = useMemo(
    () =>
      challengeStarted
        ? {
            statusText: "Can you beat the clock?",
            statusClass: "active",
            buttonText: "Press Me!",
          }
        : {
            statusText: "Click the button to start the challenge!",
            statusClass: "",
            buttonText: "Start Challenge",
          },
    [challengeStarted]
  );

  const startChallenge = useCallback(() => {
    setChallengeStarted(true);
    timerEndRef.current = Date.now() + targetTime * 1000;
    timerRef.current = setTimeout(() => {
      setTimerExpired(true);
      setChallengeStarted(false);
      dialogRef.current.showModal();
    }, targetTime * 1000);
  }, [targetTime]);

  const stopChallenge = useCallback(() => {
    if (!timerExpired) {
      dialogRef.current.showModal();
      clearTimeout(timerRef.current);
      setChallengeStarted(false);
    } else {
      resetChallenge();
    }
  }, [timerExpired]);

  const resetChallenge = useCallback(() => {
    setTimerExpired(false);
    setChallengeStarted(false);
  }, []);

  return (
    <>
      <ResultModal
        result={!timerExpired}
        targetTime={targetTime}
        timeLeft={Math.max(0, timerEndRef.current - Date.now())}
        ref={dialogRef}
        onClose={resetChallenge}
      />

      <section className={classes.challenge}>
        <h2>{title}</h2>
        <p className={classes['challenge-time']}>
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button
            onClick={challengeStarted ? stopChallenge : startChallenge}
            aria-label={`${buttonText} - ${title} challenge with ${targetTime} second${targetTime > 1 ? "s" : ""} target time`}
          >
            {buttonText}
          </button>
        </p>
        <p className={classes[statusClass]}>{statusText}</p>
      </section>
    </>
  );
}
