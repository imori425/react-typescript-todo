import React, { ChangeEvent, FormEvent, useState } from "react";
import { TodoPage } from "../components/page/TodoPage";

export interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
}

export enum TodoStatus {
  COMPLETE = "COMPLETE",
  ACTIVE = "ACTIVE"
}

export enum TodoFilter {
  COMPLETE = "COMPLETE",
  ACTIVE = "ACTIVE",
  ALL = "ALL"
}

export interface TodoState {
  todoList: Array<Todo>;
  filter: TodoFilter;
  text: string;
}

export const TodoContainer: React.FC = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, text: "a", status: TodoStatus.ACTIVE },
    { id: 2, text: "a", status: TodoStatus.ACTIVE },
    { id: 3, text: "a", status: TodoStatus.ACTIVE },
    { id: 4, text: "a", status: TodoStatus.ACTIVE }
  ]);
  const [filter, setFilter] = useState(TodoFilter.ALL);
  const [text, setText] = useState("");

  const handleFormTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const todoFilter = event.target.value as TodoFilter;
    setFilter(todoFilter);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const todo = {
      id: new Date().getTime(),
      text,
      status: TodoStatus.ACTIVE
    };
    setTodoList(todoList.concat(todo));
    setText("");
    event.preventDefault();
  };

  /**
   * TODO完了処理
   * @param id TODOのID
   */
  const handleCompleteButtonClick = (id: number): void => {
    const todo = todoList.find(t => t.id === id) as Todo;
    todo.status = TodoStatus.COMPLETE;
    setTodoList([...todoList]);
  };

  /**
   * TODO削除処理
   * @param id TODOのID
   */
  const handleDeleteButtonClick = (id: number): void => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  /**
   * TODO未完了処理
   * @param id TODOのID
   */
  const handleActiveButtonClick = (id: number): void => {
    const todo = todoList.find(t => t.id === id) as Todo;
    todo.status = TodoStatus.ACTIVE;
    setTodoList([...todoList]);
  };

  const filterTodoList = (): Array<Todo> => {
    if (filter === TodoFilter.ALL) {
      return todoList;
    }
    return todoList.filter(
      todo => todo.status.toString() === filter.toString()
    );
  };

  return (
    <>
      <h1>container-presentational-hooks</h1>
      <TodoPage
        text={text}
        filter={filter}
        todoList={filterTodoList()}
        handleFormTextChange={handleFormTextChange}
        handleFormSubmit={handleFormSubmit}
        handleFilterChange={handleFilterChange}
        handleActiveButtonClick={handleActiveButtonClick}
        handleCompleteButtonClick={handleCompleteButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    </>
  );
};
