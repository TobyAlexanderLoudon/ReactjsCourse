import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ handleAddProject, setCreatingProject }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function addProject() {
    const titleValue = title.current.value.trim();
    const descriptionValue = description.current.value.trim();
    const dueDateValue = dueDate.current.value.trim();

    if (
      !titleValue ||
      titleValue === "" ||
      !descriptionValue ||
      descriptionValue === "" ||
      !dueDateValue ||
      dueDateValue === ""
    ) {
      modal.current.open();
      return;
    }

    handleAddProject({
      name: titleValue,
      description: descriptionValue,
      dueDate: dueDateValue,
    });
  }

  return (
    <>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <button
            className="text-stone-800 hover:bg-stone-800 hover:text-stone-50 border border-stone-950 px-6 py-2 rounded-md"
            onClick={() => setCreatingProject(false)}
          >
            Cancel
          </button>
          <button
            className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md"
            onClick={addProject}
          >
            Save
          </button>
        </menu>
        <div>
          <Input type="text" name="title" label="Title" ref={title} />
          <Input
            name="description"
            isTextarea={true}
            label="Description"
            ref={description}
          />
          <Input type="date" name="due-date" label="Due Date" ref={dueDate} />
        </div>
      </div>

      <Modal ref={modal}>
        <h2 className="text-xl font-bold text-stone-700 mt-4 my-4">
          Invalid Input
        </h2>
        <p className="text-stone-600 mb-4">
          Please fill out all fields before saving the project.
        </p>
      </Modal>
    </>
  );
}
