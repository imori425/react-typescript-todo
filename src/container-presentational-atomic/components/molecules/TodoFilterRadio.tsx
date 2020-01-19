import React, { ChangeEvent } from "react";
import { TodoFilter } from "../../container/TodoContainer";

export const TodoFilterRadio: React.FC<{
  filter: TodoFilter;
  filterType: TodoFilter;
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ filter, filterType, handleFilterChange }) => {
  return (
    <>
      <label htmlFor={filterType}>{`${filterType}:`}</label>
      <input
        id={filterType}
        type="radio"
        value={filterType}
        checked={filter === filterType}
        onChange={handleFilterChange}
      />
    </>
  );
};
