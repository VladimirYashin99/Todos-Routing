export const useRequestDeleteTask = (setTodos) => {
	const requestDeleteTask = (id) => {
		fetch(`http://localhost:3004/todos/${id}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (!response.ok) throw new Error('Ошибка при удалении задачи');
			})
			.then(() => {
				setTodos((todos) => todos.filter((todo) => todo.id !== id));
			})
			.catch((error) => console.error('Ошибка при удалении задачи:', error));
	};
	return { requestDeleteTask };
};
