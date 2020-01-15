import React, {ChangeEvent, FormEvent} from "react";
import {Todo, TodoFilter, TodoStatus} from "../container/TodoContainer";


interface TodoPageProps {
    todoList: Array<Todo>,
    filter: TodoFilter,
    text: string,
    handleFormTextChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void
    handleDeleteButtonClick: (id: number) => void
    handleCompleteButtonClick: (id: number) => void
    handleActiveButtonClick: (id: number) => void
}


export class TodoPage extends React.Component<TodoPageProps> {

    public render() {
        const todo = this.props.todoList.map(t => <li>
                <span style={{textDecoration: t.status === TodoStatus.COMPLETE ? "line-through" : "unset"}}>{t.text}</span>
                {t.status === TodoStatus.ACTIVE &&
                <button onClick={() => this.props.handleCompleteButtonClick(t.id)}>完了</button>
                }
                {t.status === TodoStatus.COMPLETE &&
                <button onClick={() => this.props.handleActiveButtonClick(t.id)}>未完了</button>
                }
                <button onClick={() => this.props.handleDeleteButtonClick(t.id)}>
                    削除
                </button>
            </li>
        )
        return (
            <>
                <form onSubmit={this.props.handleFormSubmit}>
                    <input type="text" value={this.props.text} onChange={this.props.handleFormTextChange}/>
                    <button type={"submit"}>追加</button>
                </form>

                <div>
                    <label>
                        ALL:
                        <input type={"radio"} value={TodoFilter.ALL}
                               checked={this.props.filter === TodoFilter.ALL}
                               onChange={this.props.handleFilterChange}/>
                    </label>

                    <label>
                        ACTIVE:
                        <input type={"radio"} value={TodoFilter.ACTIVE}
                               checked={this.props.filter === TodoFilter.ACTIVE}
                               onChange={this.props.handleFilterChange}/>
                    </label>
                    <label>
                        COMPLETE:
                        <input type={"radio"} value={TodoFilter.COMPLETE}
                               checked={this.props.filter === TodoFilter.COMPLETE}
                               onChange={this.props.handleFilterChange}/></label>
                </div>
                <ul>{todo}</ul>
            </>
        )
    }
}