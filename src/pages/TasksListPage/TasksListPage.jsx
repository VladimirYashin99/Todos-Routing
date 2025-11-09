import styles from './TasksListPage.module.css';
import { useState } from 'react';
import { useRequestGetTodos, useRequestNewTask, useSortTodosText } from '../../hooks';

import { NewTaskForm, SearchAndSort, TodosList, SearchResults } from '../../components';

export const TasksListPage = () => {
	const [todos, setTodos] = useState([]);
	const [originalTodos, setOriginalTodos] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	const { isLoading } = useRequestGetTodos(
		refreshTodosFlag,
		setOriginalTodos,
		setTodos,
	);

	const { newTaskCreating, setNewTaskCreating, requestNewTask } =
		useRequestNewTask(refreshTodos);

	const { sortTodosText, isSortedTodosFlag } = useSortTodosText(
		setTodos,
		originalTodos,
	);

	const filterTodos =
		searchText.trim() === ''
			? []
			: todos.filter((todo) =>
					todo.title.toUpperCase().includes(searchText.toUpperCase()),
				);

	return (
		<>
			<h1 className={styles.title}>Список дел</h1>
			{isLoading ? (
				<div className={styles.loading} />
			) : (
				<NewTaskForm
					newTaskCreating={newTaskCreating}
					setNewTaskCreating={setNewTaskCreating}
					requestNewTask={requestNewTask}
				/>
			)}
			<SearchAndSort
				searchText={searchText}
				setSearchText={setSearchText}
				sortTodosText={() => sortTodosText(todos)}
				isSortedTodosFlag={isSortedTodosFlag}
			/>
			{filterTodos.length > 0 && <SearchResults filterTodos={filterTodos} />}
			<TodosList todos={todos} />
		</>
	);
};
