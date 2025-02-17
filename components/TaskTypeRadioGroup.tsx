import { useBoardStore } from "@/store/BoardStore";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "In Progress",
    description: "A task that is currently being worked on",
    color: "bg-yellow-500",
  },
  {
    id: "done",
    name: "Done",
    description: "Task that has been completed",
    color: "bg-green-500",
  },
];

function TaskTypeRadioGroup() {
  const [setNewTaskType, newTaskType] = useBoardStore((state) => [
    state.setNewTaskType,
    state.newTaskType,
  ]);
  
  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={newTaskType}
          onChange={(e) => {
            setNewTaskType(e);
          }}
        >
          <div className="space-y-2">
            {types.map((type) => (
              
              <Radio
                key={type.id}
                value={type.id}
                

               className={(props) => {
                  const { active, checked } = props as unknown as { active: boolean; checked: boolean };
                  return `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  } 
                  ${
                    checked ? `${type.color} bg-opacity-75 text-white` : ""
                  } relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`;
                }}
              >
                
                
                {({checked})=>(

                <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p
                        className={`font-medium ${
                          checked ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {type.name}
                      </p>
                      <span
                        className={`inline ${
                          checked ? "text-sky-100" : "text-gray-500"
                        }`}
                      >
                        {type.description}
                      </span>
                    </div>
                  </div>
                  {checked && (
                   
                    
                    <CheckCircleIcon className="h-6 w-6" />
                     
                    
                    
                  )}
                </div>
                </>
                )}
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default TaskTypeRadioGroup;