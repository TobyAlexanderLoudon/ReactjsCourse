import { useState, useRef, useEffect } from 'react';

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function handleEditClick() {
    if (isEditing) {
      const trimmedName = playerName.trim();
      if (trimmedName) {
        onChangeName(symbol, trimmedName);
      } else {
        setPlayerName(playerName);
      }
    }
    setIsEditing((editing) => !editing);
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const trimmedName = playerName.trim();
      if (trimmedName) {
        onChangeName(symbol, trimmedName);
        setIsEditing(false);
      }
    } else if (event.key === 'Escape') {
      setPlayerName(initialName);
      setIsEditing(false);
    }
  }

  const isSaveDisabled = playerName.trim().length === 0;

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input
        ref={inputRef}
        type="text"
        required
        value={playerName}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick} disabled={isEditing && isSaveDisabled}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  );
}
