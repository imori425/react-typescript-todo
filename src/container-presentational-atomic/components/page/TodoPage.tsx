import React, {ChangeEvent, FormEvent} from "react";
import {Todo, TodoFilter, TodoFilters} from "../../container/TodoContainer";
import {TaskListItem} from "../molecules/TaskListItem";
import {TodoFilterRadio} from "../molecules/TodoFilterRadio";
import {TodoForm} from "../molecules/TodoForm";


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


export const TodoPage: React.FC<TodoPageProps> = ({todoList, filter, text, handleFormTextChange, handleFormSubmit, handleFilterChange, handleDeleteButtonClick, handleActiveButtonClick, handleCompleteButtonClick}) => {
    const todoListItems = todoList.map((t,index) =>
        <TaskListItem key={index} todo={t} handleCompleteButtonClick={handleCompleteButtonClick}
                      handleActiveButtonClick={handleActiveButtonClick}
                      handleDeleteButtonClick={handleDeleteButtonClick}/>
    );

    const radios = TodoFilters.map((filterType, index) =>
        <TodoFilterRadio key={index} filter={filter}
                         filterType={filterType}
                         handleFilterChange={handleFilterChange}>
        </TodoFilterRadio>
    );

    return <>
        <TodoForm text={text}
                  handleFormSubmit={handleFormSubmit}
                  handleFormTextChange={handleFormTextChange}></TodoForm>
        <div>
            {radios}
        </div>
        <ul>{todoListItems}</ul>
    </>
}
