import React from "react";
import { useAppDispatch } from "../../redux/hooks/hook";
import { deleteTodo } from "../../redux/store/slices/todosSlice";
import { convertDate } from "../../helpers/convertDate";
import { Button } from "../Button/Button";
import { CloseIcon } from "../../icons/CloseIcon";
import styles from "./Popup.module.css";

interface PopupProps {
	text: string;
	id: string;
	date: number;
	switchModalActive: () => void;
}

export const Popup: React.FC<PopupProps> = ({
	id,
	text,
	date,
	switchModalActive,
}) => {
	const dispatch = useAppDispatch();

	const removeTodo = (id: string) => {
		dispatch(deleteTodo(id));
		switchModalActive();
	};

	return (
		<div
			className={styles["window-background"]}
			onClick={switchModalActive}
		>
			<div
				className={styles["window-body"]}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles["window-title"]}>
					<h2>Вы действительно хотите удалить эту задачу?</h2>
					<Button
						className={styles.close}
						onClick={switchModalActive}
					>
						<CloseIcon />
					</Button>
				</div>
				<span>Содержимое:</span>
				<p className={styles.text}>{text}</p>
				<p className={styles.date}>
					<span>Дата создания:</span> {convertDate(date)}
				</p>
				<div className={styles["btn-group"]}>
					<Button onClick={switchModalActive}>Отмена</Button>
					<Button onClick={() => removeTodo(id)}>Удалить</Button>
				</div>
			</div>
		</div>
	);
};
