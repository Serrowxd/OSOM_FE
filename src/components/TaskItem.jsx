import React from 'react';
import { format, differenceInDays } from 'date-fns';

function TaskItem({ task, onRemoveTask, onTaskClick }) {
	// Determine the priority color
	const priorityColors = {
		1: 'bg-green-100 border-green-500',
		2: 'bg-yellow-100 border-yellow-500',
		3: 'bg-orange-100 border-orange-500',
		4: 'bg-red-100 border-red-500',
		5: 'bg-purple-100 border-purple-500',
	};
	
	function formatDueDate(dueDate) {
		const due = new Date(dueDate);
		const today = new Date();
		const diffInDays = differenceInDays(due, today);
		
		if (diffInDays <= 7) {
			// Due within 7 days
			return format(due, 'EEEE'); // e.g., 'Tuesday'
		} else {
			// Due in more than 7 days
			return format(due, 'EEEE the do'); // e.g., 'Tuesday the 24th'
		}
	}
	
	return (
		<div
			className={`mb-4 p-4 rounded-lg shadow cursor-pointer border-l-4 ${
				priorityColors[task.priority] || 'bg-gray-100 border-gray-500'
			}`}
			onClick={() => onTaskClick(task.id)}
		>
			<div className="flex justify-between items-start">
				<div>
					<h3 className="text-xl font-semibold">{task.title}</h3>
					{task.dueDate && (
						<p className="text-gray-600">Due: {formatDueDate(task.dueDate)}</p>
					)}
					{task.notes && <p className="text-gray-700 mt-2">{task.notes}</p>}
				</div>
				<button
					className="text-red-500 hover:text-red-700 text-2xl"
					onClick={(e) => {
						e.stopPropagation(); // Prevent triggering onTaskClick
						onRemoveTask(task.id);
					}}
					title="Remove Task"
				>
					&times;
				</button>
			</div>
		</div>
	);
}

export default TaskItem;
