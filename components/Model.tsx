"use client";
import { useBoardStore } from "@/store/BoardStore";
import { useModelStore } from "@/store/ModelStore";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import { FormEvent, useRef } from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";

function Model() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [isOpen, closeModel] = useModelStore((state) => [
    state.isOpen,
    state.closeModel,
  ]);
  const [addTask, image, setImage, newTaskInput, setNewTaskInput, newTaskType] = useBoardStore(
    (state) => [
      
      state.addTask,
      state.image,
      state.setImage,
      state.newTaskInput,
      state.setNewTaskInput,
      state.newTaskType,
    ]
  );
  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(!newTaskInput) return;
addTask(newTaskInput, newTaskType, image);
    setImage(null);
    closeModel();
  }
  return (

    <>
      <Dialog
        as="form"
        open={isOpen}
        onClose={closeModel}
        className="relative z-10"
        onSubmit={handleSubmit}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 bg-black bg-opacity-25 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full rounded-2xl max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all "
          >
            <DialogTitle
              as="h3"
              className="text-lg font-bold leading-6 text-gray-900 pb-2"
            >
              Add Tasks
            </DialogTitle>
            <div className="mt-2">
              <input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="Enter the task here.."
                className="w-full border border-gray-300 rounded-md outline-none p-5"
              />
            </div>
            <TaskTypeRadioGroup />

            <div>
              <button
                type="button"
                onClick={() => {
                  imagePickerRef.current?.click();
                }}
                className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                Upload Image
              </button>
              {image && (
                <Image
                  alt="Uploaded Image"
                  width={200}
                  height={200}
                  className="w-full h-66 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                  src={URL.createObjectURL(image)}
                  onClick={() => {
                    setImage(null);
                  }}
                />
              )}
              <input
                type="file"
                ref={imagePickerRef}
                hidden
                onChange={(e) => {
                  if (!e.target.files![0].type.startsWith("image/")) return;
                  setImage(e.target.files![0]);
                }}
              />
            </div>
            <div className="mt-4">
              <button 
              type="submit"
              disabled={!newTaskInput}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed">
                Add Task
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default Model;
