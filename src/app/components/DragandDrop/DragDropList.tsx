"use client";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  status: "To Do" | "In Progress" | "Done";
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [taskStatus, setTaskStatus] = useState<"To Do" | "In Progress" | "Done">("To Do");
  const [draggingColumn, setDraggingColumn] = useState<string | null>(null);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks)) {
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error("Error parsing tasks from localStorage", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), title: inputValue.trim(), status: taskStatus },
      ]);
      setInputValue("");
    }
  };

  const startEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setInputValue(task.title);
    setTaskStatus(task.status);
  };

  const updateTask = () => {
    if (inputValue.trim() && editTaskId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId ? { ...task, title: inputValue.trim(), status: taskStatus } : task
        )
      );
      setInputValue("");
      setEditTaskId(null);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, task: Task) => {
    e.dataTransfer.setData("taskId", task.id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLUListElement>, status: string) => {
    e.preventDefault();
    setDraggingColumn(status);
  };

  const handleDrop = (e: React.DragEvent<HTMLUListElement>, targetStatus: Task["status"]) => {
    const draggedTaskId = e.dataTransfer.getData("taskId");
    const draggedTask = tasks.find((task) => task.id.toString() === draggedTaskId);
    if (draggedTask) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== draggedTask.id);
        const updatedTask = { ...draggedTask, status: targetStatus };
        updatedTasks.push(updatedTask);
        return updatedTasks;
      });
    }
    setDraggingColumn(null);
  };

  const removeTask = (taskToRemove: Task) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskToRemove.id));
  };

  const taskColumns = ["To Do", "In Progress", "Done"];

  return (
    <div className="w-[80%] mx-auto mb-[2rem] bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">My Current Tasks ✅</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        className="border p-2 rounded mb-2 w-full"
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start mb-2 gap-2">
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value as "To Do" | "In Progress" | "Done")}
          className="border p-2 rounded w-full sm:w-1/2 mr-2"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          onClick={editTaskId !== null ? updateTask : addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          {editTaskId !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {taskColumns.map((status) => (
          <div
            key={status}
            className={`bg-gray-50 p-4 rounded border flex flex-col items-center ${draggingColumn === status ? "bg-blue-100" : ""}`} // Centered content
          >
            <h2 className="font-bold mb-2 capitalize">{status}</h2>
            <ul
              onDrop={(e) => handleDrop(e, status as Task["status"])}
              onDragOver={(e) => handleDragOver(e, status)} 
              className="flex-1 min-h-[200px] overflow-y-auto w-full" // Set width to full
            >
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <li
                    key={task.id}
                    className="border p-2 mb-2 bg-gray-100 cursor-move hover:bg-gray-200 rounded flex justify-between items-center"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <span className="flex-1">{task.title}</span>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <button
                        onClick={() => startEditTask(task)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mb-2 sm:mb-0 sm:mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeTask(task)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}









// // pages/index.tsx
// "use client";
// import { useState } from "react";

// interface Task {
//   id: number;
//   title: string;
//   status: "todo" | "inProgress" | "done"; // Added status for the task
// }

// export default function Home() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [editTaskId, setEditTaskId] = useState<number | null>(null);
//   const [taskStatus, setTaskStatus] = useState<"todo" | "inProgress" | "done">("todo");

//   const addTask = () => {
//     if (inputValue.trim()) {
//       setTasks((prevTasks) => [
//         ...prevTasks,
//         { id: Date.now(), title: inputValue.trim(), status: taskStatus },
//       ]);
//       setInputValue("");
//     }
//   };

//   const startEditTask = (task: Task) => {
//     setEditTaskId(task.id);
//     setInputValue(task.title);
//     setTaskStatus(task.status); // Update status for edit mode
//   };

//   const updateTask = () => {
//     if (inputValue.trim() && editTaskId !== null) {
//       setTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task.id === editTaskId ? { ...task, title: inputValue.trim(), status: taskStatus } : task
//         )
//       );
//       setInputValue("");
//       setEditTaskId(null);
//     }
//   };

//   const handleDragStart = (e: React.DragEvent<HTMLLIElement>, task: Task) => {
//     e.dataTransfer.setData("taskId", task.id.toString());
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLUListElement>) => {
//     e.preventDefault(); // Necessary to allow dropping
//   };

//   const handleDrop = (e: React.DragEvent<HTMLUListElement>, targetStatus: Task['status']) => {
//     const draggedTaskId = e.dataTransfer.getData("taskId");
//     const draggedTask = tasks.find((task) => task.id.toString() === draggedTaskId);
    
//     if (draggedTask) {
//       setTasks((prevTasks) => {
//         const updatedTasks = prevTasks.filter((task) => task.id !== draggedTask.id);
//         const updatedTask = { ...draggedTask, status: targetStatus }; // Update task status
//         updatedTasks.push(updatedTask);
//         return updatedTasks;
//       });
//     }
//   };

//   const removeTask = (taskToRemove: Task) => {
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskToRemove.id));
//   };

//   const taskColumns = ["todo", "inProgress", "done"];

//   return (
//     <div className="App max-w-5xl mx-auto bg-white p-5 rounded shadow">
//       <h1 className="text-xl font-bold mb-4">My Tasks ✅</h1>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Add a new task..."
//         className="border p-2 rounded mb-2 w-full"
//       />
//       <select
//         value={taskStatus}
//         onChange={(e) => setTaskStatus(e.target.value as "todo" | "inProgress" | "done")}
//         className="border p-2 rounded mb-2 w-full"
//       >
//         <option value="todo">Todo</option>
//         <option value="inProgress">In Progress</option>
//         <option value="done">Done</option>
//       </select>
//       <button
//         onClick={editTaskId !== null ? updateTask : addTask}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {editTaskId !== null ? "Update Task" : "Add Task"}
//       </button>

//       <div className="grid grid-cols-3 gap-4 mt-4">
//         {taskColumns.map((status) => (
//           <div key={status} className="bg-gray-50 p-4 rounded border">
//             <h2 className="font-bold mb-2 capitalize">{status}</h2>
//             <ul
//               onDrop={(e) => handleDrop(e, status as Task["status"])}
//               onDragOver={handleDragOver}
//               className="h-48 overflow-y-auto"
//             >
//               {tasks
//                 .filter((task) => task.status === status)
//                 .map((task) => (
//                   <li
//                     key={task.id}
//                     className="border p-2 mb-2 bg-gray-100 cursor-move hover:bg-gray-200 rounded flex justify-between items-center"
//                     draggable
//                     onDragStart={(e) => handleDragStart(e, task)}
//                   >
//                     <span>{task.title}</span>
//                     <div>
//                       <button
//                         onClick={() => startEditTask(task)}
//                         className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => removeTask(task)}
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// // pages/index.tsx
// "use client";
// import { useState } from "react";

// interface Task {
//   id: number;
//   title: string;
//   status: "todo" | "inProgress" | "done"; // Thêm trạng thái cho công việc
// }

// export default function Home() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [editTaskId, setEditTaskId] = useState<number | null>(null);
//   const [taskStatus, setTaskStatus] = useState<"todo" | "inProgress" | "done">("todo");

//   const addTask = () => {
//     if (inputValue.trim()) {
//       setTasks((prevTasks) => [
//         ...prevTasks,
//         { id: Date.now(), title: inputValue.trim(), status: taskStatus },
//       ]);
//       setInputValue("");
//     }
//   };

//   const startEditTask = (task: Task) => {
//     setEditTaskId(task.id);
//     setInputValue(task.title);
//     setTaskStatus(task.status); // Cập nhật trạng thái cho chế độ chỉnh sửa
//   };

//   const updateTask = () => {
//     if (inputValue.trim() && editTaskId !== null) {
//       setTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task.id === editTaskId ? { ...task, title: inputValue.trim(), status: taskStatus } : task
//         )
//       );
//       setInputValue("");
//       setEditTaskId(null);
//     }
//   };

//   const handleDragStart = (e: React.DragEvent<HTMLLIElement>, task: Task) => {
//     e.dataTransfer.setData("taskId", task.id.toString());
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent<HTMLUListElement>, targetStatus: Task['status']) => {
//     const draggedTaskId = e.dataTransfer.getData("taskId");
//     const draggedTask = tasks.find((task) => task.id.toString() === draggedTaskId);
    
//     if (draggedTask) {
//       setTasks((prevTasks) => {
//         const updatedTasks = prevTasks.filter((task) => task.id !== draggedTask.id);
//         const updatedTask = { ...draggedTask, status: targetStatus }; // Cập nhật trạng thái cho công việc
//         updatedTasks.push(updatedTask);
//         return updatedTasks;
//       });
//     }
//   };

//   const removeTask = (taskToRemove: Task) => {
//     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskToRemove.id));
//   };

//   const taskColumns = ["todo", "inProgress", "done"];

//   return (
//     <div className="App max-w-5xl mx-auto bg-white p-5 rounded shadow">
//       <h1 className="text-xl font-bold mb-4">My Tasks ✅</h1>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Add a new task..."
//         className="border p-2 rounded mb-2 w-full"
//       />
//       <select
//         value={taskStatus}
//         onChange={(e) => setTaskStatus(e.target.value as "todo" | "inProgress" | "done")}
//         className="border p-2 rounded mb-2 w-full"
//       >
//         <option value="todo">Todo</option>
//         <option value="inProgress">In Progress</option>
//         <option value="done">Done</option>
//       </select>
//       <button
//         onClick={editTaskId !== null ? updateTask : addTask}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {editTaskId !== null ? "Update Task" : "Add Task"}
//       </button>

//       <div className="grid grid-cols-3 gap-4 mt-4">
//         {taskColumns.map((status) => (
//           <div key={status} className="bg-gray-50 p-4 rounded border">
//             <h2 className="font-bold mb-2 capitalize">{status}</h2>
//             <ul
//               onDrop={(e) => handleDrop(e, status as Task["status"])}
//               onDragOver={handleDragOver}
//               className="h-48 overflow-y-auto"
//             >
//               {tasks
//                 .filter((task) => task.status === status)
//                 .map((task) => (
//                   <li
//                     key={task.id}
//                     className="border p-2 mb-2 bg-gray-100 cursor-move hover:bg-gray-200 rounded flex justify-between items-center"
//                     draggable
//                     onDragStart={(e) => handleDragStart(e, task)}
//                   >
//                     <span>{task.title}</span>
//                     <div>
//                       <button
//                         onClick={() => startEditTask(task)}
//                         className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => removeTask(task)}
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// // pages/index.tsx
// "use client";
// import { useState } from "react";

// interface Task {
//   id: number;
//   title: string;
// }

// export default function Home() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [editTaskId, setEditTaskId] = useState<number | null>(null); // State to track which task is being edited

//   const addTask = () => {
//     if (inputValue.trim()) {
//       setTasks((prevTasks) => [
//         ...prevTasks,
//         { id: Date.now(), title: inputValue.trim() },
//       ]);
//       setInputValue("");
//     }
//   };

//   const startEditTask = (task: Task) => {
//     setEditTaskId(task.id);
//     setInputValue(task.title); // Set inputValue to the title of the task being edited
//   };

//   const updateTask = () => {
//     if (inputValue.trim() && editTaskId !== null) {
//       setTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task.id === editTaskId ? { ...task, title: inputValue.trim() } : task
//         )
//       );
//       setInputValue("");
//       setEditTaskId(null); // Reset edit state
//     }
//   };

//   const handleDragStart = (e: React.DragEvent<HTMLLIElement>, task: Task) => {
//     e.dataTransfer.setData("taskId", task.id.toString());
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
//     e.preventDefault(); // Necessary to allow dropping
//   };

//   const handleDrop = (e: React.DragEvent<HTMLLIElement>, targetTask: Task) => {
//     const draggedTaskId = e.dataTransfer.getData("taskId");
//     const draggedTask = tasks.find((task) => task.id.toString() === draggedTaskId);
//     if (draggedTask) {
//       setTasks((prevTasks) => {
//         const updatedTasks = prevTasks.filter((task) => task.id !== draggedTask.id);
//         const targetIndex = prevTasks.findIndex((task) => task.id === targetTask.id);
//         updatedTasks.splice(targetIndex, 0, draggedTask);
//         return updatedTasks;
//       });
//     }
//   };

//   const removeTask = (taskToRemove: Task) => {
//     setTasks((prevTasks) =>
//       prevTasks.filter((task) => task.id !== taskToRemove.id)
//     );
//   };

//   return (
//     <div className="App max-w-md mx-auto bg-white p-5 rounded shadow">
//       <h1 className="text-xl font-bold mb-4">My Tasks ✅</h1>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Add a new task..."
//         className="border p-2 rounded mb-2 w-full"
//       />
//       <button
//         onClick={editTaskId !== null ? updateTask : addTask} // Update task if editing
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         {editTaskId !== null ? "Update Task" : "Add Task"} {/* Change button text based on mode */}
//       </button>
//       <ul className="mt-4">
//         {tasks.map((task) => (
//           <li
//             key={task.id}
//             className="border p-2 mb-2 bg-gray-100 cursor-move hover:bg-gray-200 rounded flex justify-between items-center"
//             draggable
//             onDragStart={(e) => handleDragStart(e, task)}
//             onDragOver={handleDragOver}
//             onDrop={(e) => handleDrop(e, task)}
//           >
//             <span>{task.title}</span>
//             <div>
//               <button
//                 onClick={() => startEditTask(task)} // Start editing task
//                 className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => removeTask(task)} // Remove button
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }






















// // components/DragDropList.tsx
// "use client"
// // components/DragDropList.tsx
// "use client"
// import React, { useState } from 'react';
// import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';

// interface Item {
//   id: string;
//   text: string;
// }

// const DraggableItem = ({ item, index, moveItem }: { item: Item; index: number; moveItem: (fromIndex: number, toIndex: number) => void }) => {
//   const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
//     id: item.id,
//   });

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       style={{
//         padding: '8px',
//         margin: '4px 0',
//         border: '1px solid #ccc',
//         backgroundColor: isDragging ? '#e0e0e0' : '#fff',
//         cursor: 'move',
//       }}
//     >
//       {item.text}
//     </div>
//   );
// };

// const DropZone = ({ itemId, children, moveItem }: { itemId: string; children: React.ReactNode; moveItem: (fromIndex: number, toIndex: number) => void }) => {
//   const { setNodeRef } = useDroppable({ id: itemId });

//   return (
//     <div ref={setNodeRef} style={{ padding: '0', border: 'none' }}>
//       {children}
//     </div>
//   );
// };

// const DragDropList = () => {
//   const [items, setItems] = useState<Item[]>([
//     { id: '1', text: 'Item 1' },
//     { id: '2', text: 'Item 2' },
//     { id: '3', text: 'Item 3' },
//     { id: '4', text: 'Item 4' },
//   ]);

//   const moveItem = (fromIndex: number, toIndex: number) => {
//     const updatedItems = [...items];
//     const [removed] = updatedItems.splice(fromIndex, 1);
//     updatedItems.splice(toIndex, 0, removed);
//     setItems(updatedItems);
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (over && active.id !== over.id) {
//       const activeIndex = items.findIndex((item) => item.id === active.id);
//       const overIndex = items.findIndex((item) => item.id === over.id);

//       if (activeIndex !== overIndex) {
//         moveItem(activeIndex, overIndex);
//       }
//     }
//   };

//   return (
//     <DndContext onDragEnd={handleDragEnd}>
//       {items.map((item, index) => (
//         <DropZone key={item.id} itemId={item.id} moveItem={moveItem}>
//           <DraggableItem item={item} index={index} moveItem={moveItem} />
//         </DropZone>
//       ))}
//     </DndContext>
//   );
// };

// export default DragDropList;









