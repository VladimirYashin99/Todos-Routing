export const useRequestToggleCheckbox = ( setTodos) => {
	const requestToggleCheckbox = (id, newStatus) => {
		fetch(`http://localhost:3004/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: newStatus,
			}),
		})
			.then((response) => {
				if (!response.ok) throw new Error('Ошибка при обновлении статуса задачи');
				return response.json();
			})
			.then((updatedCheckbox) => {
				setTodos((todos) =>
					todos.map((todo) => (todo.id === id ? updatedCheckbox : todo)),
				);
			})
			.catch((error) => console.error('Ошибка при обновлении статуса задачи:', error))
	};
	return { requestToggleCheckbox };
};
