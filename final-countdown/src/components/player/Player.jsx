import { useRef, useState, useCallback } from "react";
import classes from './player.module.css';

export default function Player() {
  const [playerName, setName] = useState();
  const nameRef = useRef();

  const handleClick = useCallback(() => {
    const name = nameRef.current.value.trim();
    if (name.length > 0) {
      setName(name);
      nameRef.current.value = "";
    }
  }, []);

  return (
    <section className={classes.player}>
      <h2 className={classes.title}>Welcome {playerName || "unknown entity"}</h2>
      <p className={classes['input-wrapper']}>
        <input
          className={classes.input}
          type="text"
          ref={nameRef}
          placeholder="Enter your name"
          aria-label="Player name input"
        />
        <button
          className={classes.button}
          onClick={handleClick}
          aria-label="Set player name"
        >
          Set Name
        </button>
      </p>
    </section>
  );
}
