import React from "react";
import { Button } from "../Button/Button";
import styles from "./Filter.module.css";

interface FilterBar {
	filterTodos: (filter: string) => void;
	isFilterActive: {
		all: boolean;
		completed: boolean;
		favorite: boolean;
		inProgress: boolean;
	};
}

export const Filter: React.FC<FilterBar> = ({
	filterTodos,
	isFilterActive,
}) => {
	return (
		<div className={styles.filter}>
			<Button
				onClick={() => filterTodos("all")}
				className={isFilterActive.all ? styles.active : null}
			>
				Все
			</Button>
			<Button
				onClick={() => filterTodos("completed")}
				className={isFilterActive.completed ? styles.active : null}
			>
				Выполненные задачи
			</Button>
			<Button
				onClick={() => filterTodos("favorite")}
				className={isFilterActive.favorite ? styles.active : null}
			>
				Избранные задачи
			</Button>
			<Button
				onClick={() => filterTodos("inProgress")}
				className={isFilterActive.inProgress ? styles.active : null}
			>
				Задачи в работе
			</Button>
		</div>
	);
};
