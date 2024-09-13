const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
	send: (channel, data) => {
		// Handle communication between front-end and main process
	},
});