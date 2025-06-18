/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/todo/Todo';
import { useTodoContext } from '../../context/useTodoContext';

const TODO_DIV_CLASSNAME = 'todo';
const TODO_REMOVE_BUTTON_CLASSNAME = 'todo__remove';
const TODO_STATUS_CHECKBOX_CLASSNAME = 'todo__status';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { onTodoUpdate, onTodoDelete } = useTodoContext();
  const [isEditingTitleFormOpened, setIsEditingTitleFormOpened] =
    useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);
  const editingTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitleFormOpened) {
      editingTitleInputRef.current?.focus();
    }
  }, [isEditingTitleFormOpened]);

  const handleChangeTodoStatus = () => {
    onTodoUpdate(todo.id, { completed: !todo.completed });
  };

  const handleDeleteTodo = () => {
    onTodoDelete(todo.id);
  };

  const handleDoubleClickOnTodo = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const target = event.target as HTMLElement;

    const isClickOnDeleteButton = target.closest(
      `.${TODO_REMOVE_BUTTON_CLASSNAME}`,
    );
    const isClickOnCheckbox = target.closest(
      `.${TODO_STATUS_CHECKBOX_CLASSNAME}`,
    );

    const isClickOnTodoDiv = (
      event.currentTarget as HTMLElement
    ).classList.contains(TODO_DIV_CLASSNAME);

    if (!isClickOnDeleteButton && !isClickOnCheckbox && isClickOnTodoDiv) {
      setIsEditingTitleFormOpened(true);
    }
  };

  const handleUpdateTodoOrDeleteIfEditingTextIsEmpty = (
    event?: React.FormEvent<HTMLFormElement>,
  ) => {
    if (event) {
      event.preventDefault();
    }

    const trimmedEditingTitle = editingTitle.trim();

    if (trimmedEditingTitle === todo.title) {
      setIsEditingTitleFormOpened(false);

      return;
    }

    if (editingTitle) {
      onTodoUpdate(todo.id, { title: trimmedEditingTitle });
    } else {
      onTodoDelete(todo.id);
    }

    setIsEditingTitleFormOpened(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditingTitle(todo.title);
      setIsEditingTitleFormOpened(false);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={cn(TODO_DIV_CLASSNAME, { completed: todo.completed })}
      onDoubleClick={handleDoubleClickOnTodo}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className={TODO_STATUS_CHECKBOX_CLASSNAME}
          checked={todo.completed}
          onChange={handleChangeTodoStatus}
        />
      </label>

      {isEditingTitleFormOpened ? (
        <form
          onSubmit={event =>
            handleUpdateTodoOrDeleteIfEditingTextIsEmpty(event)
          }
        >
          <input
            ref={editingTitleInputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={event => setEditingTitle(event.target.value.trimStart())}
            onBlur={() => handleUpdateTodoOrDeleteIfEditingTextIsEmpty()}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className={TODO_REMOVE_BUTTON_CLASSNAME}
            data-cy="TodoDelete"
            onClick={handleDeleteTodo}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
