import {TodoFilter} from "../../container/TodoContainer";
import React, {ChangeEvent} from "react";

export const TodoFilterRadio: React.FC<{
    filter: TodoFilter, filterType: TodoFilter, handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void
}> = ({filter, filterType, handleFilterChange}) => {

    return (
        <label>
            {filterType}:
            <input type={"radio"}
                   value={filterType}
                   checked={filter === filterType}
                   onChange={handleFilterChange}
            />
        </label>
    )
}