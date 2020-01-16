import React from 'react';
import './App.css';
import {TodoContainer as TodoContainerAtomic} from "./container-presentational-atomic/container/TodoContainer";
import {TodoContainer as TodoContainerHooks} from "./container-presentational-hooks/container/TodoContainer";
import {TodoComponent} from "./fat-component/components/TodoComponent";
import {TodoContainer} from "./container-presentational/container/TodoContainer";

const App: React.FC = () => {
    return (
        <>
            <TodoContainerHooks></TodoContainerHooks>
            <hr/>
            <TodoContainerAtomic/>
            <hr/>
            <TodoContainer/>
            <hr/>
            <TodoComponent></TodoComponent>
        </>
    );
}

export default App;
