import styles from './TodoItem.module.css';
import { Link } from 'react-router-dom';
export const TodoItem = ({ id, title }) => {
	return (
		<div
			className={styles.containerTodosTasks}
		>
			<Link to={`/todo/${id}`}>
				<span className={styles.taskText} title={title}>{title}</span>
			</Link>
		</div>
	);
};
