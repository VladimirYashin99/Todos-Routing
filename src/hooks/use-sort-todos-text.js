import { useState } from 'react';
export const useSortTodosText = ( setTodos, originalTodos) => {
	const [isSortedTodosFlag, setIsSortedTodosFlag] = useState(false);

	const sortTodosText = (todos) => {
		if (!isSortedTodosFlag) {
			const sorted = [...todos].sort((a, b) => {
				const titleA = a.title.toUpperCase();
				const titleB = b.title.toUpperCase();
				if (titleA < titleB) return -1;
				if (titleA > titleB) return 1;
				return 0;
			});
			setTodos(sorted);
		} else {
			setTodos(originalTodos);
		}
		setIsSortedTodosFlag(!isSortedTodosFlag);
	};
	return { sortTodosText, isSortedTodosFlag, setIsSortedTodosFlag};
};
