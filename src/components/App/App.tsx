import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import { fetchTodos } from "../../redux/store/slices/todosSlice";
import { Filter } from "../Filter/Filter";
import { Input } from "../Input/Input";
import { TodoList } from "../TodoList/TodoList";
import { Error } from "../Error/Error";
import "./App.css";

const App = () => {
	const dispatch = useAppDispatch();
	const { todos, error } = useAppSelector((state) => state.todos);
	const [filtredTodos, setFiltredTodos] = useState(todos);
	const [isFilterActive, setIsFilterActive] = useState({
		all: true,
		completed: false,
		favorite: false,
		inProgress: false,
	});

	useEffect(() => {
		dispatch(fetchTodos());
	}, []);

	useEffect(() => {
		setFiltredTodos(todos);
	}, [todos]);

	const filterTodos = (filter: string) => {
		switch (filter) {
			case "all":
				setFiltredTodos(todos);
				setIsFilterActive({
					all: true,
					completed: false,
					favorite: false,
					inProgress: false,
				});

				break;
			case "completed":
				setFiltredTodos(
					todos.filter((todo) => todo.isCompleted === true)
				);
				setIsFilterActive({
					all: false,
					completed: true,
					favorite: false,
					inProgress: false,
				});
				break;
			case "favorite":
				setFiltredTodos(
					todos.filter((todo) => todo.isFavorite === true)
				);
				setIsFilterActive({
					all: false,
					completed: false,
					favorite: true,
					inProgress: false,
				});
				break;
			case "inProgress":
				setFiltredTodos(
					todos.filter((todo) => todo.isCompleted !== true)
				);
				setIsFilterActive({
					all: false,
					completed: false,
					favorite: false,
					inProgress: true,
				});
				break;
			default:
				setFiltredTodos(todos);
				break;
		}
	};

	return (
		<main className="app">
			<section className="todo">
				<h1>Todo App</h1>
				<div className="wrapper">
					<Input />
					<Filter
						filterTodos={filterTodos}
						isFilterActive={isFilterActive}
					/>
					<TodoList todos={filtredTodos} />
					{error && <Error error={error} />}
				</div>
			</section>
		</main>
	);
};

export default App;
