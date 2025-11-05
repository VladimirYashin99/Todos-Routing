import { useState } from 'react';

export const useRequestNewTask = (refreshTodos) => {
	const [newTaskCreating, setNewTaskCreating] = useState('');

	const requestNewTask = () => {
		if (!newTaskCreating.trim()) return;
		const taskToAdd = {
			title: newTaskCreating,
			completed: false,
		};

		fetch('http://localhost:3004/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(taskToAdd),
		})
			.then((rawResponse) => {
				if (!rawResponse.ok) throw new Error('Ошибка при добавлении задач');
				return rawResponse.json();
			})
			.then(() => {
				setNewTaskCreating('');
				refreshTodos();
			})
			.catch((error) => console.error('Ошибка при добавлении задач:', error))
	};

	return { newTaskCreating, setNewTaskCreating, requestNewTask };
};
