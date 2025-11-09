import styles from './app.module.css';

import { Route, Routes, Navigate } from 'react-router-dom';

import { TasksListPage, TaskDescription, NotFound } from './pages';

export const App = () => {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<TasksListPage />} />
				<Route path="/todo/:id" element={<TaskDescription />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</div>
	);
};
