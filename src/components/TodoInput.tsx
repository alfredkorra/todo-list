import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../state/todos/todoSlice';
import { Input, Button, Spin, Alert } from 'antd';

const TodoInput: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const handleClickAddTodo = () => {
    if (input.trim()) {
      setLoading(true);
      setError('');
      setTimeout(() => {
        dispatch(addTodo({
          text: input,
          completed: false,
        }));
        setInput('');
        setLoading(false);
      }, 1000);
    } else {
      setError('Please write a todo before adding.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError('');
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <Input
        value={input}
        size='large'
        onChange={handleChange}
        placeholder="Add a new todo"
        className="mb-6"
      />
      {error && <Alert message={error} type="error" showIcon className="mb-2" />}
      <Spin spinning={loading}>
        <Button type="primary" className='mb-4' onClick={handleClickAddTodo}>Add Todo</Button>
      </Spin>
    </div>
  );
};

export default TodoInput;
