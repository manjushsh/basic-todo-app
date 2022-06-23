import * as React from 'react';
import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { TodoResults } from './components/todo-results';
import { TodosContext } from './todo-context';
import './index.scss';

const todosTemplate = [
  {
    id: 0,
    label: 'Fix the app to display list of all tasks',
    checked: false,
  },
  {
    id: 1,
    label: 'Fix the layout such that the checkboxes should be listed in a column',
    checked: false,
  },
  {
    id: 2,
    label: 'Fix the app to add a new task',
    checked: false,
  },
  {
    id: 3,
    label: 'Fix the app to mark a task as completed',
    checked: false,
  },
  {
    id: 4,
    label: 'Fix the app to delete a task',
    checked: false,
  },
  {
    id: 5,
    label: 'Fix the app to count the completed tasks',
    checked: false,
  },
  {
    id: 6,
    label: 'Add a filter button to render list of all checked or unchecked tasks',
    checked: false,
  },
  {
    id: 7,
    label: 'Bonus: Add a feature to search the tasks',
    checked: false,
  },
  {
    id: 8,
    label: 'Bonus: List pagination if greater than 10 items or lazy-load',
    checked: false,
  },
  {
    id: 9,
    label: 'Bonus: Write tests cases where possible',
    checked: false,
  },
  {
    id: 10,
    label: 'Bonus: Additional views',
    checked: false,
  },
];

export const App = () => {
  const [todos, setTodos] = React.useState(todosTemplate);

  return (
    <div className="root">
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TodoList />
        <TodoResults />
        <TodoForm />
      </TodosContext.Provider>
    </div>
  );
};
