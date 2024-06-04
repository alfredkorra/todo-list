import React from 'react';
import { useSelector } from 'react-redux';
import { List } from 'antd';
import TodoItem from './TodoItem';
import { RootState } from '../app/store';
import { AnimatePresence } from 'framer-motion';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const filter = useSelector((state: RootState) => state.todos.filter);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  }).reverse();

  return (
    <div className="max-h-96 overflow-x-hidden">
      <List>
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <div key={todo.id} className="mb-4">
              <TodoItem todo={todo} filter={filter} />
            </div>
          ))}
        </AnimatePresence>
      </List>
    </div>
  );
};

export default TodoList;
