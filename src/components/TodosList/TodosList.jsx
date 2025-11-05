import styles from './TodosList.module.css';
import { TodoItem } from './TodoItem';

export const TodosList = ({ todos }) => {
	return (
		<div className={styles.todosList}>
			{todos.map(({ id, title }) => (
				<TodoItem key={id} id={id} title={title} />
			))}
		</div>
	);
};
