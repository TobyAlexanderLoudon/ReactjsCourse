import Button from "./Button";

export default function Sidebar({
  projects,
  selectProject,
  selectedProject,
  setCreatingProject,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <Button onClick={() => setCreatingProject(true)}>+ Add Project</Button>
      <ul className="mt-8">
        {projects.map((project) => {
          let classes =
            "w-full text-left px-2 py-1 rounded-sm my-1  hover:text-stone-200 hover:bg-stone-800";
          if (project.id === selectedProject?.id) {
            classes += " bg-stone-800 text-stone-200";
          } else {
            classes += " text-stone-400";
          }

          return (
            <li
              key={project.id}
              onClick={() => selectProject(project)}
              className={classes}
            >
              {project.name}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
