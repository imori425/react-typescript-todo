import React, {ChangeEvent, FormEvent} from "react";

export const TodoForm: React.FC<{
    text: string,
    handleFormTextChange: (event: ChangeEvent<HTMLInputElement>) => void,
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void
}> = ({text, handleFormTextChange, handleFormSubmit}) => {

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" value={text} onChange={handleFormTextChange}/>
            <button type={"submit"}>追加</button>
        </form>
    )
}