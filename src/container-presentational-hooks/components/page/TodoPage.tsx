import {Todo, TodoFilter, TodoStatus} from "../../container/TodoContainer";
import React, {ChangeEvent, FormEvent} from "react";


export interface TodoPageProps {
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

export const TodoPage: React.FC<TodoPageProps> = props => {

    const todo = props.todoList.map(t => <li>
            <span style={{textDecoration: t.status === TodoStatus.COMPLETE ? "line-through" : "unset"}}>{t.text}</span>
            {t.status === TodoStatus.ACTIVE &&
            <button onClick={() => props.handleCompleteButtonClick(t.id)}>完了</button>
            }
            {t.status === TodoStatus.COMPLETE &&
            <button onClick={() => props.handleActiveButtonClick(t.id)}>未完了</button>
            }
            <button onClick={() => props.handleDeleteButtonClick(t.id)}>
                削除
            </button>
        </li>
    )
    return (
        <>
            <form onSubmit={props.handleFormSubmit}>
                <input type="text" value={props.text} onChange={props.handleFormTextChange}/>
                <button type={"submit"}>追加</button>
            </form>

            <div>
                <label>
                    ALL:
                    <input type={"radio"} value={TodoFilter.ALL}
                           checked={props.filter === TodoFilter.ALL}
                           onChange={props.handleFilterChange}/>
                </label>

                <label>
                    ACTIVE:
                    <input type={"radio"} value={TodoFilter.ACTIVE}
                           checked={props.filter === TodoFilter.ACTIVE}
                           onChange={props.handleFilterChange}/>
                </label>
                <label>
                    COMPLETE:
                    <input type={"radio"} value={TodoFilter.COMPLETE}
                           checked={props.filter === TodoFilter.COMPLETE}
                           onChange={props.handleFilterChange}/></label>
            </div>
            <ul>{todo}</ul>
        </>
    )
}
