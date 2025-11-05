import styles from './SearchAndSort.module.css'
import { Button } from '../common';
export const SearchAndSort = ({ searchText, setSearchText, sortTodosText, isSortedTodosFlag }) => {
	return (
		<div className={styles.taskForm}>
			<Button onClick={sortTodosText}>
				{isSortedTodosFlag ? 'Вернуть исходный порядок' : 'Сортировка по алфавиту'}
			</Button>
			<input
				className={styles.inputNewTask}
				type="text"
				value={searchText}
				placeholder="Поиск дела по заданной фразе"
				onChange={(event) => setSearchText(event.target.value)}
			/>
		</div>
	);
};
