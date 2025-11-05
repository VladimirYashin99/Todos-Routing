import styles from './Button.module.css';
export const Button = ({ onClick, children, className = '', type = 'button' }) => {
	return (
		<button type={type} className={`${styles.formButton} ${className}`} onClick={onClick}>
			{children}
		</button>
	);
};
