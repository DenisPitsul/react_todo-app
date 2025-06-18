import React from 'react';
import { TodoItem } from '../TodoItem';
import { useTodoContext } from '../../context/useTodoContext';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { filteredTodos } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
