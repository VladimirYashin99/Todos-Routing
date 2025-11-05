import { useEffect, useState } from 'react';
export const useRequestGetTodos = (refreshTodosFlag, setOriginalTodos, setTodos) => {
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3004/todos')
			.then((loadedData) => {
				if (!loadedData.ok) throw new Error('Ошибка загрузки задач с сервера');
				return loadedData.json();
			})
			.then((loadedTodos) => {
				console.log(loadedTodos);
				setTodos(loadedTodos);
				setOriginalTodos(loadedTodos);
			})
			.catch((error) => console.error('Ошибка загрузки задач с сервера:', error))
			.finally(() => setIsLoading(false));
	}, [refreshTodosFlag]);
	return {
		isLoading,
	};
};
