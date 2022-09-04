import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://630f483137925634188bbefc.mockapi.io/todos";

export interface Todo {
	id: string;
	text: string;
	isFavorite: boolean;
	isCompleted: boolean;
	date: number;
}

interface TodosState {
	todos: Todo[];
	loading: boolean;
	error: null | string | undefined;
}

const initialState = {
	todos: [],
	loading: false,
	error: null,
} as TodosState;

export const fetchTodos = createAsyncThunk<
	Todo[],
	undefined,
	{ rejectValue: string }
>("todos/fetchTodos", async function (undefined, { rejectWithValue }) {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error("Server Error");
		}

		const data = await response.json();
		return data;
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

export const addNewTodo = createAsyncThunk<
	Todo,
	string,
	{ rejectValue: string }
>("todos/addNewTodo", async function (text, { rejectWithValue }) {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: text,
				isFavorite: false,
				isCompleted: false,
				date: Date.now(),
			}),
		});

		if (!response.ok) {
			throw new Error("Server Error");
		}

		return (await response.json()) as Todo;
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

export const deleteTodo = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>("todos/deleteTodo", async function (id, { rejectWithValue }) {
	try {
		const response = await fetch(
			`https://630f483137925634188bbefc.mockapi.io/todos/${id}`,
			{
				method: "DELETE",
			}
		);

		if (!response.ok) {
			throw new Error("Server Error");
		}

		return id;
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

export const toggleCompleted = createAsyncThunk<
	Todo,
	string,
	{ rejectValue: string; state: { todos: TodosState } }
>("todos/toggleCompleted", async function (id, { rejectWithValue, getState }) {
	try {
		const todo = getState().todos.todos.find((todo) => todo.id === id);

		if (todo) {
			const response = await fetch(
				`https://630f483137925634188bbefc.mockapi.io/todos/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						isCompleted: !todo.isCompleted,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Server Error");
			}

			return (await response.json()) as Todo;
		}
		throw new Error("No such todo in state");
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

export const toggleFavorite = createAsyncThunk<
	Todo,
	string,
	{ rejectValue: string; state: { todos: TodosState } }
>("todos/toggleFavorite", async function (id, { rejectWithValue, getState }) {
	try {
		const todo = getState().todos.todos.find((todo) => todo.id === id);

		if (todo) {
			const response = await fetch(
				`https://630f483137925634188bbefc.mockapi.io/todos/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						isFavorite: !todo.isFavorite,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Server Error");
			}

			return (await response.json()) as Todo;
		}
		throw new Error("No such todo in state");
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

export const editTodo = createAsyncThunk<
	Todo,
	{ id: string; text: string },
	{ rejectValue: string; state: { todos: TodosState } }
>(
	"todos/editTodo",
	async function ({ id, text }, { rejectWithValue, getState }) {
		try {
			const todo = getState().todos.todos.find((todo) => todo.id === id);

			if (todo) {
				const response = await fetch(
					`https://630f483137925634188bbefc.mockapi.io/todos/${id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							text: text,
						}),
					}
				);

				if (!response.ok) {
					throw new Error("Server Error");
				}

				return (await response.json()) as Todo;
			}
			throw new Error("No such todo in state");
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.todos = action.payload;
				state.loading = false;
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(addNewTodo.fulfilled, (state, action) => {
				state.todos.push(action.payload);
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.todos = state.todos.filter(
					(todo) => todo.id !== action.payload
				);
			})
			.addCase(toggleCompleted.fulfilled, (state, action) => {
				const toggledTodo = state.todos.find(
					(todo) => todo.id === action.payload.id
				);
				if (toggledTodo) {
					toggledTodo.isCompleted = !toggledTodo.isCompleted;
				}
			})
			.addCase(toggleFavorite.fulfilled, (state, action) => {
				const toggledTodo = state.todos.find(
					(todo) => todo.id === action.payload.id
				);
				if (toggledTodo) {
					toggledTodo.isFavorite = !toggledTodo.isFavorite;
				}
			})
			.addCase(editTodo.fulfilled, (state, action) => {
				const editTodo = state.todos.find(
					(todo) => todo.id === action.payload.id
				);
				if (editTodo) {
					editTodo.text = action.payload.text;
				}
			});
	},
});

export default todosSlice.reducer;
