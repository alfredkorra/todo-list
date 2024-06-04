import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../state/todos/todoSlice';
import { List, Button, Checkbox } from 'antd';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  filter: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, filter }) => {
  const dispatch = useDispatch();
  const [removing, setRemoving] = useState<boolean>(false);

  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => {
      dispatch(deleteTodo(todo.id));
      setRemoving(false);

    }, 800);
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const getBackgroundColor = () => {
    if (filter === 'all') return 'bg-gray-100';
    if (todo.completed) return 'bg-green-100';
    return 'bg-blue-100';
  };

  return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className={`${removing ? 'removing' : ''}`}
      >
        <List.Item
          className={`flex justify-between items-center p-4 border-b border-gray-200 ${getBackgroundColor()}`}
          actions={[
            <Checkbox
              className="mr-2"
              checked={todo.completed}
              onChange={handleToggle}
            >Complete this Todo</Checkbox>,
            <Button 
              danger
              onClick={handleDelete} 
              className="ml-2"
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={
              <span className={`ml-2 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-black'}`}>
                {todo.text}
              </span>
            }
          />
        </List.Item>
      </motion.div>
  );
};

export default TodoItem;
