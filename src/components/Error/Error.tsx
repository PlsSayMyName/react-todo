import React from "react";
import styles from "./Error.module.css";

interface ErrorProps {
	error: string;
}

export const Error: React.FC<ErrorProps> = ({ error }) => {
	return (
		<div className={styles.background}>
			<div className={styles.error}>{error}</div>
		</div>
	);
};
