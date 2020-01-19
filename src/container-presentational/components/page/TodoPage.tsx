import React, { ChangeEvent, FormEvent } from "react";
import { Todo, TodoFilter, TodoStatus } from "../../container/TodoContainer";

export interface TodoPageProps {
  todoList: Array<Todo>;
  filter: TodoFilter;
  text: string;
  handleFormTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleDeleteButtonClick: (id: number) => void;
  handleCompleteButtonClick: (id: number) => void;
  handleActiveButtonClick: (id: number) => void;
}

export function TodoPage({
  filter,
  handleActiveButtonClick,
  handleCompleteButtonClick,
  handleDeleteButtonClick,
  handleFilterChange,
  handleFormSubmit,
  handleFormTextChange,
  text,
  todoList
}: TodoPageProps): JSX.Element {
  const todo = todoList.map(t => (
    <li key={t.id}>
      <span
        style={{
          textDecoration:
            t.status === TodoStatus.COMPLETE ? "line-through" : "unset"
        }}
      >
        {t.text}
      </span>
      {t.status === TodoStatus.ACTIVE && (
        <button
          type="button"
          onClick={(): void => handleCompleteButtonClick(t.id)}
        >
          完了
        </button>
      )}
      {t.status === TodoStatus.COMPLETE && (
        <button
          type="button"
          onClick={(): void => handleActiveButtonClick(t.id)}
        >
          未完了
        </button>
      )}
      <button type="button" onClick={(): void => handleDeleteButtonClick(t.id)}>
        削除
      </button>
    </li>
  ));
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={text} onChange={handleFormTextChange} />
        <button type="submit">追加</button>
      </form>
      <div>
        <label htmlFor={TodoFilter.ALL}>ALL:</label>
        <input
          type="radio"
          value={TodoFilter.ALL}
          id={TodoFilter.ALL}
          checked={filter === TodoFilter.ALL}
          onChange={handleFilterChange}
        />

        <label htmlFor={TodoFilter.ACTIVE}>ACTIVE:</label>
        <input
          type="radio"
          value={TodoFilter.ACTIVE}
          id={TodoFilter.ACTIVE}
          checked={filter === TodoFilter.ACTIVE}
          onChange={handleFilterChange}
        />
        <label htmlFor={TodoFilter.COMPLETE}>COMPLETE:</label>
        <input
          id={TodoFilter.COMPLETE}
          type="radio"
          value={TodoFilter.COMPLETE}
          checked={filter === TodoFilter.COMPLETE}
          onChange={handleFilterChange}
        />
      </div>
      <ul>{todo}</ul>
    </>
  );
}
