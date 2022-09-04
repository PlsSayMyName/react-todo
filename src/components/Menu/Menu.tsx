import React from "react";
import { Button } from "../Button/Button";
import styles from "./Menu.module.css";

interface MenuProps {
	id: string;
	isFavorite: boolean;
	isCompleted: boolean;
	switchFavorite: (id: string) => void;
	switchCompleted: (id: string) => void;
	deleteItem: () => void;
	editTodo: (id: string) => void;
}

export const Menu: React.FC<MenuProps> = ({
	id,
	isFavorite,
	isCompleted,
	switchFavorite,
	switchCompleted,
	deleteItem,
	editTodo,
}) => {
	return (
		<>
			<div className={styles.menu}>
				<Button onClick={() => switchFavorite(id)}>
					{isFavorite ? "Убрать из избранного" : "В избранное"}
				</Button>
				<Button onClick={() => switchCompleted(id)}>
					{isCompleted ? "Вернуть в работу" : "Выполнено"}
				</Button>
				<Button onClick={() => editTodo(id)}>Редактировать</Button>
				<Button onClick={deleteItem}>Удалить</Button>
			</div>
		</>
	);
};
