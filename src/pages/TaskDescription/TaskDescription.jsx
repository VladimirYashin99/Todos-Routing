import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../../components/common';
import styles from './TaskDescription.module.css';
import {
	useRequestDeleteTask,
	useRequestToggleCheckbox,
	useRequestUpdateTask,
} from '../../hooks';
export const TaskDescription = () => {
	const [task, setTask] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { id } = useParams();

	const { requestDeleteTask } = useRequestDeleteTask(() => {
		navigate('/');
	});
	const { requestToggleCheckbox } = useRequestToggleCheckbox(setTask);
	const { requestUpdateTask, editId, setEditId, editText, setEditText } =
		useRequestUpdateTask(setTask);

	useEffect(() => {
		fetch(`http://localhost:3004/todos/${id}`)
			.then((loadedData) => {
				if (!loadedData.ok) throw new Error('Ошибка загрузки задачи с сервера');
				return loadedData.json();
			})
			.then((dataTask) => {
				setTask(dataTask);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => setIsLoading(false));
	}, [id]);

	if (isLoading) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	if (!task) {
		return <Navigate to="/404" replace />;
	}

	const onClickGoBack = () => {
		navigate(-1);
	};

	const onClickUpdateTask = () => {
		setEditId(task.id);
		setEditText(task.title);
	};
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
				<Button onClick={onClickUpdateTask}>Изменить текст</Button>
				<Button
					className={styles.deleteButton}
					onClick={() => {
						requestDeleteTask(task.id);
					}}
				>
					Удалить задачу
				</Button>
			</div>
		</>
	);
};
