import React, {ChangeEvent, FormEvent} from "react";
import {TodoPage} from "../components/page/TodoPage";

export interface Todo {
    id: number,
    text: string,
    status: TodoStatus
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

export const TodoFilters = [TodoFilter.ALL, TodoFilter.ACTIVE, TodoFilter.COMPLETE]


export interface TodoState {
    todoList: Array<Todo>
    filter: TodoFilter
    text: string
}

export class TodoContainer extends React.Component<any, TodoState> {
    constructor(props: any) {
        super(props);
        this.state = {
            todoList: [
                {id: 1, text: 'a', status: TodoStatus.ACTIVE},
                {id: 2, text: 'a', status: TodoStatus.ACTIVE},
                {id: 3, text: 'a', status: TodoStatus.ACTIVE},
                {id: 4, text: 'a', status: TodoStatus.ACTIVE}
            ],
            filter: TodoFilter.ALL,
            text: ""
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFormTextChange = this.handleFormTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleCompleteButtonClick = this.handleCompleteButtonClick.bind(this)
        this.handleActiveButtonClick = this.handleActiveButtonClick.bind(this)
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this)
    }

    handleFormTextChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({...this.state, text: event.target.value})
    }

    handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
        const todoFilter = event.target.value as TodoFilter
        this.setState({...this.state, filter: todoFilter})
    }

    handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        const todo = {id: new Date().getTime(), text: this.state.text, status: TodoStatus.ACTIVE};
        this.setState({...this.state, todoList: this.state.todoList.concat(todo), text: ""});
        event.preventDefault();
    }

    /**
     * TODO完了処理
     * @param TODOのID
     */
    handleCompleteButtonClick(id: number) {
        const todo = this.state.todoList.find(todo => todo.id === id) as Todo
        todo.status = TodoStatus.COMPLETE;
        this.setState({...this.state})
    }

    /**
     * TODO削除処理
     * @param id TODOのID
     */
    handleDeleteButtonClick(id: number) {
        const todoList = this.state.todoList.filter(todo => todo.id !== id)
        this.setState({...this.state, todoList: todoList})
    }

    /**
     * TODO未完了処理
     * @param id TODOのID
     */
    handleActiveButtonClick(id: number) {
        const todo = this.state.todoList.find(todo => todo.id === id) as Todo
        todo.status = TodoStatus.ACTIVE;
        this.setState({...this.state})
    }

    filterTodoList(): Array<Todo> {

        if (this.state.filter === TodoFilter.ALL) {
            return this.state.todoList
        }

        return this.state.todoList.filter(todo => todo.status.toString() === this.state.filter.toString())
    }

    public render() {
        return (
            <>
                <h1>container-presentational-atomic</h1>
                <TodoPage {...this.state}
                          todoList={this.filterTodoList()}
                          handleFormTextChange={this.handleFormTextChange}
                          handleFormSubmit={this.handleFormSubmit}
                          handleFilterChange={this.handleFilterChange}
                          handleActiveButtonClick={this.handleActiveButtonClick}
                          handleCompleteButtonClick={this.handleCompleteButtonClick}
                          handleDeleteButtonClick={this.handleDeleteButtonClick}
                />
            </>
        )
    }
}