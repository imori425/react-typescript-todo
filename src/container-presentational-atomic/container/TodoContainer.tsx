import React, { ChangeEvent, FormEvent } from "react";
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

export const TodoFilters = [
  TodoFilter.ALL,
  TodoFilter.ACTIVE,
  TodoFilter.COMPLETE
];

export interface TodoState {
  todoList: Array<Todo>;
  filter: TodoFilter;
  text: string;
}

export class TodoContainer extends React.Component<{}, TodoState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      todoList: [
        { id: 1, text: "a", status: TodoStatus.ACTIVE },
        { id: 2, text: "a", status: TodoStatus.ACTIVE },
        { id: 3, text: "a", status: TodoStatus.ACTIVE },
        { id: 4, text: "a", status: TodoStatus.ACTIVE }
      ],
      filter: TodoFilter.ALL,
      text: ""
    };
  }

  handleFormTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    this.setState(prevState => ({ ...prevState, text: event.target.value }));
  };

  handleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const todoFilter = event.target.value as TodoFilter;
    this.setState(prevState => ({ ...prevState, filter: todoFilter }));
  };

  handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const { text } = this.state;
    const todo = {
      id: new Date().getTime(),
      text,
      status: TodoStatus.ACTIVE
    };
    this.setState(prevState => ({
      ...prevState,
      todoList: prevState.todoList.concat(todo),
      text: ""
    }));
    event.preventDefault();
  };

  /**
   * TODO完了処理
   * @param id TODOのID
   */
  handleCompleteButtonClick = (id: number): void => {
    const { todoList } = this.state;
    const todo = todoList.find(t => t.id === id) as Todo;
    todo.status = TodoStatus.COMPLETE;
    this.setState(prevState => ({ ...prevState }));
  };

  /**
   * TODO削除処理
   * @param id TODOのID
   */
  handleDeleteButtonClick = (id: number): void => {
    const { todoList } = this.state;
    this.setState(prevState => ({
      ...prevState,
      todoList: todoList.filter(todo => todo.id !== id)
    }));
  };

  /**
   * TODO未完了処理
   * @param id TODOのID
   */
  handleActiveButtonClick = (id: number): void => {
    const { todoList } = this.state;
    const todo = todoList.find(t => t.id === id) as Todo;
    todo.status = TodoStatus.ACTIVE;
    this.setState(prevState => ({ ...prevState }));
  };

  filterTodoList(): Array<Todo> {
    const { filter, todoList } = this.state;
    if (filter === TodoFilter.ALL) {
      return todoList;
    }

    return todoList.filter(
      todo => todo.status.toString() === filter.toString()
    );
  }

  public render(): JSX.Element {
    const { filter, text } = this.state;
    return (
      <>
        <h1>container-presentational-atomic</h1>
        <TodoPage
          filter={filter}
          text={text}
          todoList={this.filterTodoList()}
          handleFormTextChange={this.handleFormTextChange}
          handleFormSubmit={this.handleFormSubmit}
          handleFilterChange={this.handleFilterChange}
          handleActiveButtonClick={this.handleActiveButtonClick}
          handleCompleteButtonClick={this.handleCompleteButtonClick}
          handleDeleteButtonClick={this.handleDeleteButtonClick}
        />
      </>
    );
  }
}
