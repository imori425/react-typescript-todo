import React from "react";
import { Todo, TodoStatus } from "../../container/TodoContainer";

export const TaskListItem: React.FC<{
  todo: Todo;
  handleCompleteButtonClick: (id: number) => void;
  handleActiveButtonClick: (id: number) => void;
  handleDeleteButtonClick: (id: number) => void;
}> = ({
  todo,
  handleCompleteButtonClick,
  handleActiveButtonClick,
  handleDeleteButtonClick
}) => {
  return (
    <li>
      <span
        style={{
          textDecoration:
            todo.status === TodoStatus.COMPLETE ? "line-through" : "unset"
        }}
      >
        {todo.text}
      </span>
      {todo.status === TodoStatus.ACTIVE && (
        <button
          type="button"
          onClick={(): void => handleCompleteButtonClick(todo.id)}
        >
          完了
        </button>
      )}
      {todo.status === TodoStatus.COMPLETE && (
        <button
          type="button"
          onClick={(): void => handleActiveButtonClick(todo.id)}
        >
          未完了
        </button>
      )}
      <button
        type="button"
        onClick={(): void => handleDeleteButtonClick(todo.id)}
      >
        削除
      </button>
    </li>
  );
};
