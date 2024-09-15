import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";
import PriorityMessage from "./components/PriorityMessage";
import CalendarComponent from "./components/CalendarComponent";
import Sidebar from "./components/Sidebar";
import EditTaskModal from "./components/EditTaskModal";

import { firestore } from "../firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Fetch tasks from Firestore when component mounts
  useEffect(() => {
    const tasksCollection = collection(firestore, "tasks");

    // Real-time updates using onSnapshot
    const unsubscribe = onSnapshot(tasksCollection, (querySnapshot) => {
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleAddTask = () => setIsModalOpen(true);

  const handleSaveTask = async (newTask) => {
    try {
      // Remove id if present
      const { id, ...taskData } = newTask;
      // Save the new task to Firestore
      await addDoc(collection(firestore, "tasks"), taskData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await deleteDoc(doc(firestore, "tasks", taskId));
    } catch (error) {
      console.error("Error removing task: ", error);
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleTaskClick = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedTask = async (editedTask) => {
    try {
      const taskRef = doc(firestore, "tasks", editedTask.id);
      const { id, ...taskData } = editedTask; // Exclude id from the data
      await updateDoc(taskRef, taskData);
      setIsEditModalOpen(false);
      setTaskToEdit(null);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <div className="main-background h-screen flex flex-col md:flex-row">
      <Sidebar />
      {/* Left Side: Task List */}
      <div className="w-full md:w-2/3 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <TaskList
            tasks={tasks}
            onAddTask={handleAddTask}
            onRemoveTask={handleRemoveTask}
            onTaskClick={handleTaskClick}
          />
        </div>
      </div>

      {/* Right Side: Priority Message and Calendar */}
      <div className="w-full md:w-1/3 flex flex-col">
        {/* Priority Message */}
        <div className="flex-1 p-6">
          <PriorityMessage />
        </div>

        {/* Calendar */}
        <div className="flex-1 p-6 border-t flex flex-col">
          <CalendarComponent tasks={tasks} />
        </div>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
      />

      {/* Edit Task Modal */}
      {taskToEdit && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveEditedTask}
          task={taskToEdit}
        />
      )}
    </div>
  );
}

export default App;
