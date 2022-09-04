import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hook";
import { addNewTodo } from "../../redux/store/slices/todosSlice";
import { Button } from "../Button/Button";
import { AddIcon } from "../../icons/AddIcon";
import styles from "./Input.module.css";

export const Input: React.FC = () => {
	const maxLenght: number = 160;
	const [areaText, setAreaText] = useState("");
	const [areaError, setAreaError] = useState(false);
	const dispatch = useAppDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setAreaText(e.target.value);
	};

	useEffect(() => {
		if (areaText.length === maxLenght) {
			setAreaError(true);
		} else {
			setAreaError(false);
		}
	}, [areaText]);

	const addTodoBtn = (text: string) => {
		dispatch(addNewTodo(text));
		setAreaText("");
	};
	console.log(areaError);

	return (
		<>
			<label className={styles.label}>
				<div className={styles["input-group"]}>
					<textarea
						placeholder="Введите текст"
						value={areaText}
						onChange={handleChange}
						maxLength={maxLenght}
						required
					></textarea>
					<Button onClick={() => addTodoBtn(areaText)} type="button">
						<AddIcon />
					</Button>
				</div>
				{areaError && (
					<div className={styles.error}>
						Превышен максимальный лимит символов ({maxLenght})
					</div>
				)}
			</label>
		</>
	);
};
