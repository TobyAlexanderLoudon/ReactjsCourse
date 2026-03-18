import { useState } from "react";

import Home from "./components/Home";
import NewProject from "./components/NewProject";
import Sidebar from "./components/Sidebar";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProject: undefined,
    creatingProject: false,
    projects: [],
  });

  function setCreatingProject(toggle) {
    setProjectState((prev) => ({
      ...prev,
      creatingProject: toggle,
    }));
  }

  function handleAddProject({ name, description, dueDate }) {
    const newProject = {
      id: crypto.randomUUID(),
      name: name,
      description: description,
      dueDate: dueDate,
      tasks: [],
    };

    setProjectState((prev) => ({
      ...prev,
      creatingProject: false,
      projects: [...prev.projects, newProject],
    }));
  }

  function selectProject(project) {
    setProjectState((prev) => ({
      ...prev,
      selectedProject: project,
    }));
  }

  function deleteProject(projectId) {
    setProjectState((prev) => ({
      ...prev,
      selectedProject: undefined,
      projects: prev.projects.filter((project) => project.id !== projectId),
    }));
  }

  function handleAddTask(projectId, task) {
    setProjectState((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === projectId
          ? { ...project, tasks: [...project.tasks, task] }
          : project,
      ),
      selectedProject:
        prev.selectedProject && prev.selectedProject.id === projectId
          ? {
              ...prev.selectedProject,
              tasks: [...prev.selectedProject.tasks, task],
            }
          : prev.selectedProject,
    }));
  }

  function handleDeleteTask(projectId, taskId) {
    setProjectState((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project,
      ),
      selectedProject:
        prev.selectedProject && prev.selectedProject.id === projectId
          ? {
              ...prev.selectedProject,
              tasks: prev.selectedProject.tasks.filter(
                (task) => task.id !== taskId,
              ),
            }
          : prev.selectedProject,
    }));
  }

  let view = <Home setCreatingProject={setCreatingProject} />;
  if (projectState.selectedProject) {
    view = (
      <ProjectDetails
        project={projectState.selectedProject}
        deleteProject={deleteProject}
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
      />
    );
  }
  if (projectState.creatingProject) {
    view = (
      <NewProject
        setCreatingProject={setCreatingProject}
        handleAddProject={handleAddProject}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        projects={projectState.projects}
        selectProject={selectProject}
        selectedProject={projectState.selectedProject}
        setCreatingProject={setCreatingProject}
      />
      {view}
    </main>
  );
}

export default App;
