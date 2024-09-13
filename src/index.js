import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // tailwind

function App() {
	return (
		<div className="h-screen bg-gray-100 flex justify-center items-center">
			<h1 className="text-4xl text-blue-500">Out of Sight, Out of Mind App</h1>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));