import React, { useState, useEffect } from 'react';

function EditTaskModal({ isOpen, onClose, onSave, task }) {
	const [title, setTitle] = useState(task.title || '');
	const [priority, setPriority] = useState(task.priority || 3);
	const [dueDate, setDueDate] = useState(task.dueDate || '');
	const [notes, setNotes] = useState(task.notes || '');
	
	useEffect(() => {
		setTitle(task.title);
		setPriority(task.priority);
		setDueDate(task.dueDate);
		setNotes(task.notes);
	}, [task]);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		
		const editedTask = {
			...task,
			title,
			priority,
			dueDate,
			notes,
		};
		
		onSave(editedTask);
	};
	
	if (!isOpen) return null;
	
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white p-6 rounded-lg w-1/2">
				<h2 className="text-xl font-semibold mb-4">Edit Task</h2>
				<form onSubmit={handleSubmit}>
					{/* Task Title */}
					<div className="mb-4">
						<label className="block text-gray-700">Task Description</label>
						<input
							type="text"
							className="w-full mt-1 p-2 border rounded"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
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
					
					{/* Notes */}
					<div className="mb-4">
						<label className="block text-gray-700">Notes</label>
						<textarea
							className="w-full mt-1 p-2 border rounded"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						></textarea>
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
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default EditTaskModal;
