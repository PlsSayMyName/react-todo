import { Todo } from "../../redux/store/slices/todosSlice";
import styles from "./TodoList.module.css";
import { useAppSelector } from "../../redux/hooks/hook";
import { Loader } from "../Loader/Loader";
import { TodoItem } from "../TodoItem/TodoItem";

interface TodoListProps {
	todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
	const { loading } = useAppSelector((state) => state.todos);
	if (loading) return <Loader />;
	return (
		<div className={styles.container}>
			{todos.map((todo) => (
				<TodoItem key={todo.id} {...todo} />
			))}
		</div>
	);
};
