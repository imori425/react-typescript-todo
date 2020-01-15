import React from 'react';
import './App.css';
import {TodoContainer} from "./container-presentational-atomic/container/TodoContainer";
import {TodoComponent} from "./fat-component/components/TodoComponent";

const App: React.FC = () => {
    return (
        <>
            <TodoContainer/>
            <hr/>
            <TodoComponent></TodoComponent>


        </>
    );
}

export default App;
