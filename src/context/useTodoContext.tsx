/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, memo, useContext } from 'react';
import { useTodoController } from '../hooks/useTodoController';
import { Todo } from '../types/todo/Todo';
import { StatusFilter } from '../enums/statusFilter';

const emptyFunction = () => {};

type TodoContextType = {
  todos: Todo[];
  isThereAlLeastOneTodo: boolean;
  isAllTodosCompleted: boolean;
  onAddTodo: (todoTitle: string) => void;
  onTodoDelete: (todoId: Todo['id']) => void;
  onClearCompletedTodos: () => void;
  onTodoUpdate: (todoId: Todo['id'], todoDataToUpdate: Partial<Todo>) => void;
  onToggleTodos: () => void;
  statusFilter: StatusFilter;
  setStatusFilter: (statusFilter: StatusFilter) => void;
  filteredTodos: Todo[];
  activeTodosCount: number;
  isThereAtLeastOneCompletedTodo: boolean;
};

const TodoContext = createContext<TodoContextType>({
  todos: [],
  isThereAlLeastOneTodo: false,
  isAllTodosCompleted: false,
  onAddTodo: emptyFunction,
  onTodoDelete: emptyFunction,
  onClearCompletedTodos: emptyFunction,
  onTodoUpdate: emptyFunction,
  onToggleTodos: emptyFunction,
  statusFilter: StatusFilter.All,
  setStatusFilter: emptyFunction,
  filteredTodos: [],
  activeTodosCount: 0,
  isThereAtLeastOneCompletedTodo: false,
});

export const useTodoContext = () => useContext(TodoContext);

type Props = {
  children: React.ReactNode;
};

// eslint-disable-next-line react/display-name
export const TodoContextProvider: React.FC<Props> = memo(({ children }) => {
  const value = useTodoController();

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
});
