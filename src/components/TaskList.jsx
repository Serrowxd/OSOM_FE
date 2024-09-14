import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onAddTask, onRemoveTask, onTaskClick }) {
	// Sort tasks by priority and due date
	const sortedTasks = tasks.sort((a, b) => {
		if (b.priority !== a.priority) {
			return b.priority - a.priority; // Higher priority first
		}
		if (a.dueDate && b.dueDate) {
			return new Date(a.dueDate) - new Date(b.dueDate); // Earlier due date first
		}
		return 0;
	});
	
	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
			{sortedTasks.map((task) => (
				<TaskItem
					key={task.id}
					task={task}
					onRemoveTask={onRemoveTask}
					onTaskClick={onTaskClick}
				/>
			))}
			
			<div className="mt-4 flex justify-center">
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
					onClick={onAddTask}
				>
					<span className="text-xl font-bold mr-2">+</span> Add Task
				</button>
			</div>
		</div>
	);
}
