import './App.css';
import TodoItem from './component/TodoItem';
import { Zoom } from "react-awesome-reveal";

function App() {
  return (
    <Zoom triggerOnce>
      <div className="todo_title">
        <h3>Todo List</h3>
      </div>
      <TodoItem />
    </Zoom>
  );
}

export default App;
