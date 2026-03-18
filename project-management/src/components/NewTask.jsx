import { useState } from "react";
import Button from "./Button";

export default function NewTask({ handleAddTask, projectId }) {
  const [taskName, setTaskName] = useState("");

  function handleInputChange(e) {
    setTaskName(e.target.value);
  }

  function addTask() {
    if (taskName.trim() === "") return;
    handleAddTask(projectId, { id: crypto.randomUUID(), name: taskName });
    setTaskName("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        value={taskName}
        onChange={handleInputChange}
      />
      <Button onClick={addTask}>Add Task</Button>
    </div>
  );
}
