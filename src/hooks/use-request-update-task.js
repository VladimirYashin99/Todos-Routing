import { useState } from 'react';
export const useRequestUpdateTask = (setTodos, setOriginalTodos) => {
	const [editId, setEditId] = useState(null);
	const [editText, setEditText] = useState('');
	const requestUpdateTask = (id) => {
		if (!editText.trim()) return;

		fetch(`http://localhost:3004/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: editText,
			}),
		})
			.then((response) => {
				if (!response.ok) throw new Error('Ошибка при изменении задачи');
				return response.json();
			})
			.then((updatedTodo) => {
				setTodos((todos) =>
					todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
				);

				setOriginalTodos((todos) =>
					todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
				);
				setEditId(null);
				setEditText('');
			})
			.catch((error) => console.error('Ошибка при изменении задачи:', error))
	};
	return { requestUpdateTask, editId, setEditId, editText, setEditText };
};
