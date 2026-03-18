import { useRef } from "react";
import NewTask from "./NewTask";
import Button from "./Button";

export default function Tasks({
  tasks,
  handleAddTask,
  projectId,
  handleDeleteTask,
}) {
  const newTaskRef = useRef();

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

      <NewTask handleAddTask={handleAddTask} projectId={projectId} />

      {tasks.length === 0 ? (
        <p className="text-stone-800 my-4">No tasks available.</p>
      ) : (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between my-4"
            >
              <span className="">{task.name}</span>
              <Button onClick={() => handleDeleteTask(projectId, task.id)}>
                Delete Task
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
