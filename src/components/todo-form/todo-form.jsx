import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-form.scss';

export const TodoForm = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [task, setTask] = React.useState('');

  const handleAddTodo = () => {
    if (task && task.length) {
      setTodos([
        ...todos,
        {
          id: todos.length,
          label: task,
          checked: false,
        },
      ]);
      setTask('');
    } else {
      // alert("You haven't entered anything!");
    }
  };

  // eslint-disable-next-line max-len
  const clearAllCompletedTodo = () => setTodos(todos.filter((todo) => todo && !todo.checked));

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button disabled={task && !task.length} type="button" className="button-add" onClick={handleAddTodo}>
        Add task
      </button>
      <button disabled={!(todos.filter((todo) => todo && todo.checked).length)} type="button" className="btn btn-danger" onClick={clearAllCompletedTodo}>
        Clear Completed ToDos
      </button>
    </div>
  );
};
