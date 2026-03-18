import image from "../assets/no-projects.png";
import Button from "./Button";

export default function Home({ setCreatingProject, handleAddProject }) {
  return (
    <div className="mt-2 text-center w-2/3">
      <img
        src={image}
        alt="home"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 mt-4 my-4">
        Select Project
      </h2>
      <p className="text-stone-400 mb-4">
        Get started by selecting a project from the sidebar or creating a new
        one.
      </p>
      <p className="mt-8">
        <Button onClick={() => setCreatingProject(true)}>
          Create New Project
        </Button>
      </p>
    </div>
  );
}
