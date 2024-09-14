import React, { useState } from 'react';

function AddTaskModal({ isOpen, onClose, onSave }) {
	const [title, setTitle] = useState('');
	const [priority, setPriority] = useState(3);
	const [dueDate, setDueDate] = useState('');
	const [notes, setNotes] = useState('');
	
	
	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (title.trim() === '') {
			alert('Please enter a task description.');
			return;
		}
		
		const newTask = {
			id: Date.now(),
			title,
			priority,
			dueDate,
			notes,
		};
		
		onSave(newTask);
		
		// Reset form fields
		setTitle('');
		setPriority(3);
		setDueDate('');
		setNotes('');
	};
	
	if (!isOpen) return null;
	
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-lg w-1/2">
				<h2 className="text-xl font-semibold mb-4">Add New Task</h2>
				<form onSubmit={handleSubmit}>
					{/* Task Title */}
					<div className="mb-4">
						<label className="block text-gray-700">Task Description</label>
						<input
							type="text"
							className="w-full mt-1 p-2 border rounded"
							placeholder="What's on your mind?"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					
					{/* Notes Field */}
					<div className="mb-4">
						<label className="block text-gray-700">Notes</label>
						<textarea
							className="w-full mt-1 p-2 border rounded"
							placeholder="Additional details..."
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						></textarea>
					</div>
					
					{/* Priority */}
					<div className="mb-4">
						<label className="block text-gray-700">Priority</label>
						<select
							className="w-full mt-1 p-2 border rounded"
							value={priority}
							onChange={(e) => setPriority(Number(e.target.value))}
						>
							<option value={1}>1 - Lowest</option>
							<option value={2}>2</option>
							<option value={3}>3 - Medium</option>
							<option value={4}>4</option>
							<option value={5}>5 - Highest</option>
						</select>
					</div>
					
					{/* Due Date */}
					<div className="mb-4">
						<label className="block text-gray-700">Due Date</label>
						<input
							type="date"
							className="w-full mt-1 p-2 border rounded"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
						/>
					</div>
					
					{/* Buttons */}
					<div className="flex justify-end">
						<button
							type="button"
							className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
							onClick={onClose}
						>
							Cancel
						</button>
						<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
							Add Task
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddTaskModal;
