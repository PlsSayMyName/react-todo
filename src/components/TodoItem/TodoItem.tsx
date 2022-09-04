import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../redux/hooks/hook";
import {
	toggleFavorite,
	toggleCompleted,
	editTodo,
	deleteTodo,
} from "../../redux/store/slices/todosSlice";
import { Menu } from "../Menu/Menu";
import { Popup } from "../Popup/Popup";
import { LikeIcon } from "../../icons/LikeIcon";
import styles from "./TodoItem.module.css";
import { MenuIcon } from "../../icons/MenuIcon";
import { Button } from "../Button/Button";
import { CompleteIcon } from "../../icons/CompleteIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";

interface TodoItemProps {
	id: string;
	text: string;
	date: number;
	isFavorite: boolean;
	isCompleted: boolean;
}

type PopupClick = MouseEvent & {
	path: Node[];
};

export const TodoItem: React.FC<TodoItemProps> = ({
	id,
	text,
	date,
	isFavorite,
	isCompleted,
}) => {
	const [isEditActive, setIsEditActive] = useState(false);
	const [inputEditValue, setInputEditValue] = useState(text);
	const [isMenuActive, setIsMenuActive] = useState(false);
	const [isModalActive, setIsModalActive] = useState(false);
	const dispatch = useAppDispatch();
	const menuRef = useRef<HTMLDivElement>(null);

	const openMenu = () => {
		setIsMenuActive(true);
	};
	const switchModalActive = () => {
		setIsModalActive(!isModalActive);
	};
	const switchCompleted = (id: string) => {
		dispatch(toggleCompleted(id));
		setIsMenuActive(false);
	};
	const switchFavorite = (id: string) => {
		dispatch(toggleFavorite(id));
		setIsMenuActive(false);
	};
	const deleteItem = () => {
		setIsMenuActive(false);
		switchModalActive();
	};

	const editTodoBtn = (id: string) => {
		setIsMenuActive(false);
		setIsEditActive(true);
	};

	const handleInputEditChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setInputEditValue(e.target.value);
	};
	const handeInputEditKeyPress = (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		if (e.key === "Enter") {
			setIsEditActive(false);
			if (inputEditValue.trim()) {
				dispatch(editTodo({ id: id, text: inputEditValue }));
			} else {
				dispatch(deleteTodo(id));
			}
		}
	};
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const event = e as PopupClick;
			if (menuRef.current && !event.path.includes(menuRef.current)) {
				setIsMenuActive(false);
			}
		};
		document.body.addEventListener("click", handleClickOutside);
		return () =>
			document.body.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<div
			className={
				isCompleted
					? styles["compl-active"]
					: isFavorite
					? styles["fav-active"]
					: styles.item
			}
		>
			{isEditActive ? (
				<textarea
					onChange={(e) => handleInputEditChange(e)}
					onKeyPress={(e) => handeInputEditKeyPress(e)}
					className={styles.text_edit}
					defaultValue={text}
					maxLength={160}
					autoFocus
				/>
			) : (
				<p className={styles.text} onClick={() => switchCompleted(id)}>
					{text}
				</p>
			)}
			<div className={styles["btn-group"]}>
				<div className={styles.menu} ref={menuRef}>
					<Button onClick={openMenu}>
						<MenuIcon />
					</Button>
					{isMenuActive && (
						<Menu
							id={id}
							isFavorite={isFavorite}
							switchFavorite={switchFavorite}
							isCompleted={isCompleted}
							switchCompleted={switchCompleted}
							deleteItem={deleteItem}
							editTodo={editTodoBtn}
						/>
					)}
					{isModalActive && (
						<Popup
							id={id}
							text={text}
							date={date}
							switchModalActive={switchModalActive}
						/>
					)}
				</div>
				<Button
					className={isFavorite ? styles["fav-icon"] : styles.fav}
					onClick={() => switchFavorite(id)}
				>
					<LikeIcon />
				</Button>
				<Button
					className={isCompleted ? styles["compl-icon"] : styles.comp}
					onClick={() => switchCompleted(id)}
				>
					<CompleteIcon />
				</Button>
				<Button className={styles.delete} onClick={() => deleteItem()}>
					<DeleteIcon />
				</Button>
			</div>
		</div>
	);
};
