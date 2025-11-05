import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Button } from '../../components/common';
import styles from './TaskDescription.module.css';

export const TaskDescription = ({
	todos,
	editId,
	editText,
	setEditText,
	onClickUpdateTask,
	requestUpdateTask,
	requestToggleCheckbox,
	requestDeleteTask,
}) => {
	const { id } = useParams();
	const task = todos.find((todo) => Number(id) === todo.id);
	const navigate = useNavigate();
	const onClickGoBack = () => {
		navigate(-1);
	};

	if (!task) {
		return <Navigate to="/404" replace />;
	}

	return (
		<>
			<h3 className={styles.title}>Описание дела</h3>
			<Button className={styles.goBackBtn} onClick={() => onClickGoBack()}>
				Назад
			</Button>
			<div
				className={`${styles.containerTodosTasks} ${task.completed ? styles.itemCompleted : ''}`}
			>
				<div className={styles.containerCheckboxAndText}>
					<input
						className={styles.itemCheckbox}
						type="checkbox"
						checked={task.completed}
						onChange={() => requestToggleCheckbox(task.id, !task.completed)}
					/>
					{editId === task.id ? (
						<input
							className={styles.inputUpdateTask}
							type="text"
							value={editText}
							autoFocus
							onChange={(e) => setEditText(e.target.value)}
							onBlur={() => requestUpdateTask(task.id)}
							onKeyDown={(e) =>
								e.key === 'Enter' && requestUpdateTask(task.id)
							}
						/>
					) : (
						<span className={styles.taskText}>{task.title}</span>
					)}
				</div>
				<Button onClick={() => onClickUpdateTask(task.id, task.title)}>
					Изменить текст 


				</Button>
				<Button
					className={styles.deleteButton}
					onClick={() => {requestDeleteTask(task.id, task.title)
						navigate('/')}
					}
				>
					Удалить задачу
				</Button>
			</div>
		</>
	);
};
