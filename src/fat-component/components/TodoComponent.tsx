import React, { ChangeEvent, FormEvent } from "react";

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

export class TodoComponent extends React.Component<{}, TodoState> {
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

  render(): JSX.Element {
    const { filter, text } = this.state;
    const todo = this.filterTodoList().map(t => (
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
            onClick={(): void => this.handleCompleteButtonClick(t.id)}
          >
            完了
          </button>
        )}
        {t.status === TodoStatus.COMPLETE && (
          <button
            type="button"
            onClick={(): void => this.handleActiveButtonClick(t.id)}
          >
            未完了
          </button>
        )}
        <button
          type="button"
          onClick={(): void => this.handleDeleteButtonClick(t.id)}
        >
          削除
        </button>
      </li>
    ));
    return (
      <>
        <h1>fat-component</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            value={text}
            onChange={this.handleFormTextChange}
          />
          <button type="submit">追加</button>
        </form>

        <div>
          <label>
            ALL:
            <input
              type="radio"
              value={TodoFilter.ALL}
              checked={filter === TodoFilter.ALL}
              onChange={this.handleFilterChange}
            />
          </label>

          <label>
            ACTIVE:
            <input
              type="radio"
              value={TodoFilter.ACTIVE}
              checked={filter === TodoFilter.ACTIVE}
              onChange={this.handleFilterChange}
            />
          </label>
          <label>
            COMPLETE:
            <input
              type="radio"
              value={TodoFilter.COMPLETE}
              checked={filter === TodoFilter.COMPLETE}
              onChange={this.handleFilterChange}
            />
          </label>
        </div>
        <ul>{todo}</ul>
      </>
    );
  }
}
