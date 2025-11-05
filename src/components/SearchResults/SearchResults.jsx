import styles from './SearchResults.module.css'
export const SearchResults = ({ filterTodos }) => {
	return (
		<div>
			{filterTodos.map((todo) => (
				<div className={styles.searchResults} key={todo.id}>
					{todo.title}
				</div>
			))}
		</div>
	);
};
