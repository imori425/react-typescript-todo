import React, {ChangeEvent, FormEvent} from "react";


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

export class TodoComponent extends React.Component<any, TodoState> {
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
        const todo = this.state.todoList.find(todo => todo.id === id) as Todo;
        todo.status = TodoStatus.COMPLETE;
        this.setState({...this.state})
    }

    /**
     * TODO削除処理
     * @param id TODOのID
     */
    handleDeleteButtonClick(id: number) {
        const todoList = this.state.todoList.filter(todo => todo.id !== id);
        this.setState({...this.state, todoList: todoList})
    }

    /**
     * TODO未完了処理
     * @param id TODOのID
     */
    handleActiveButtonClick(id: number) {
        const todo = this.state.todoList.find(todo => todo.id === id) as Todo;
        todo.status = TodoStatus.ACTIVE;
        this.setState({...this.state})
    }

    filterTodoList(): Array<Todo> {

        if (this.state.filter === TodoFilter.ALL) {
            return this.state.todoList
        }

        return this.state.todoList.filter(todo => todo.status.toString() === this.state.filter.toString())
    }

    render() {
        const todo = this.state.todoList.map((t,index) => <li key={index}>
                <span style={{textDecoration: t.status === TodoStatus.COMPLETE ? "line-through" : "unset"}}>{t.text}</span>
                {t.status === TodoStatus.ACTIVE &&
                <button onClick={() => this.handleCompleteButtonClick(t.id)}>完了</button>
                }
                {t.status === TodoStatus.COMPLETE &&
                <button onClick={() => this.handleActiveButtonClick(t.id)}>未完了</button>
                }
                <button onClick={() => this.handleDeleteButtonClick(t.id)}>
                    削除
                </button>
            </li>
        );
        return (
            <>
                <form onSubmit={this.handleFormSubmit}>
                    <input type="text" value={this.state.text} onChange={this.handleFormTextChange}/>
                    <button type={"submit"}>追加</button>
                </form>

                <div>
                    <label>
                        ALL:
                        <input type={"radio"} value={TodoFilter.ALL}
                               checked={this.state.filter === TodoFilter.ALL}
                               onChange={this.handleFilterChange}/>
                    </label>

                    <label>
                        ACTIVE:
                        <input type={"radio"} value={TodoFilter.ACTIVE}
                               checked={this.state.filter === TodoFilter.ACTIVE}
                               onChange={this.handleFilterChange}/>
                    </label>
                    <label>
                        COMPLETE:
                        <input type={"radio"} value={TodoFilter.COMPLETE}
                               checked={this.state.filter === TodoFilter.COMPLETE}
                               onChange={this.handleFilterChange}/></label>
                </div>
                <ul>{todo}</ul>
            </>
        )
    }
}