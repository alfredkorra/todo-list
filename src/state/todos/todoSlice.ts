import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  items: Todo[];
  filter: string;
}

const loadState = (): TodoState => {
  try {
    const serializedState = localStorage.getItem('todos');
    return serializedState ? JSON.parse(serializedState) : { items: [], filter: 'all' };
  } catch (err) {
    return { items: [], filter: 'all' };
  }
};

const saveState = (state: TodoState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const initialState: TodoState = loadState();

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; completed: boolean }>) => {
      state.items.push({ ...action.payload, id: Date.now() });
      saveState(state); 
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
      saveState(state); 
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
      saveState(state); 
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      saveState(state); 
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
