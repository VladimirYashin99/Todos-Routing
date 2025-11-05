import styles from './app.module.css';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
	useRequestDeleteTask,
	useRequestGetTodos,
	useRequestNewTask,
	useRequestToggleCheckbox,
	useRequestUpdateTask,
	useSortTodosText,
} from './hooks';

import { NewTaskForm, SearchAndSort, TodosList, SearchResults } from './components';
import { TaskDescription, NotFound } from './pages';

export const App = () => {
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
	const { requestDeleteTask } = useRequestDeleteTask(setTodos);
	const { newTaskCreating, setNewTaskCreating, requestNewTask } =
		useRequestNewTask(refreshTodos);
	const { requestToggleCheckbox } = useRequestToggleCheckbox(setTodos);
	const { requestUpdateTask, editId, setEditId, editText, setEditText } =
		useRequestUpdateTask(setTodos, setOriginalTodos);
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

	const onClickUpdateTask = (id, updateText) => {
		(setEditId(id), setEditText(updateText));
	};

	return (
		<div className={styles.app}>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<h1 className={styles.title}>Список дел</h1>
							{isLoading ? (
								<div className={styles.loading}></div>
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
							{filterTodos.length > 0 && (
								<SearchResults filterTodos={filterTodos} />
							)}
							<TodosList todos={todos} />
						</>
					}
				/>
				<Route
					path="/todo/:id"
					element={
						<TaskDescription
							todos={todos}
							editId={editId}
							editText={editText}
							setEditText={setEditText}
							onClickUpdateTask={onClickUpdateTask}
							requestUpdateTask={requestUpdateTask}
							requestToggleCheckbox={requestToggleCheckbox}
							requestDeleteTask={requestDeleteTask}
						/>
					}
				/>
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</div>
	);
};
