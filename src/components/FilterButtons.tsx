import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setFilter} from '../state/todos/todoSlice'
import { Button } from 'antd';
import {RootState} from '../app/store'


const FilterButtons: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.todos.filter);

  const handleFilterChange = (newFilter: string) => {
      dispatch(setFilter(newFilter));
  };

  return (
    <div className="flex items-center justify-center mb-4">
        <Button
          type={filter === 'all' ? 'primary' : 'default'}
          onClick={() => handleFilterChange('all')}
          className="mr-2"
        >
          All
        </Button>
        <Button
          type={filter === 'active' ? 'primary' : 'default'}
          onClick={() => handleFilterChange('active')}
          className="mr-2"
        >
          Active
        </Button>
        <Button
          type={filter === 'completed' ? 'primary' : 'default'}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </Button>
    </div>
  );
};

export default FilterButtons;
