import React, { useState } from 'react';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import PriorityMessage from './components/PriorityMessage';
import CalendarComponent from './components/CalendarComponent';
import Sidebar from "./components/Sidebar";
import EditTaskModal from "./components/EditTaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  // Handlers
  const handleAddTask = () => setIsModalOpen(true);
  
  const handleSaveTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };
  
  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  
  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleTaskClick = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };
  
  const handleSaveEditedTask = (editedTask) => {
    setTasks(
      tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };
  
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };
  
  return (
    <div className="h-screen flex flex-col md:flex-row">
      <Sidebar />
      {/* Left Side: Task List */}
      <div className="w-full md:w-2/3 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <TaskList tasks={tasks} onAddTask={handleAddTask} onRemoveTask={handleRemoveTask} onTaskClick={handleTaskClick} />
        </div>
      </div>
      
      {/* Right Side: Priority Message and Calendar */}
      <div className="w-full md:w-1/3 flex flex-col">
        {/* Top Right Square: Priority Message */}
        <div className="flex-1 p-6">
          <PriorityMessage/>
        </div>
        {/* Bottom Right Square: Calendar */}
        <div className="flex-1 p-6 border-t">
          <CalendarComponent tasks={tasks}/>
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
