import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
      <TodoInput />
      <FilterButtons />
      <TodoList />
    </div>
  );
}

export default App;