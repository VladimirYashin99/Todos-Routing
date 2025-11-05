import styles from './NewTaskForm.module.css';
import { Button } from '../common';
export const NewTaskForm = ({ newTaskCreating, setNewTaskCreating, requestNewTask }) => {
	return (
		<div className={styles.taskForm}>
			<input
				className={styles.inputNewTask}
				type="text"
				value={newTaskCreating}
				placeholder="Введите новую задачу"
				onChange={(event) => setNewTaskCreating(event.target.value)}
			/>
			<Button onClick={requestNewTask}>Создать новую задачу</Button>
		</div>
	);
};
