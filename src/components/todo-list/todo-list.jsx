/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable max-len */

// All can be handled. Ignoring for now.
import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [showCompleted, updateFilter] = React.useState('all');
  const [search, updateSearch] = React.useState('');

  const handleDelete = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleCheck = (id) => {
    const fiteredTodos = todos.filter((todo) => todo.id !== id);
    todos.forEach((todo) => {
      if (todo.id === id) {
        setTodos([...fiteredTodos, { ...todo, checked: true }]);
      }
    });
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  const getCheckBox = ({ id, label, isChecked }) => (
    <Checkbox
      key={id}
      label={label}
      checked={isChecked}
      onClick={() => toggleCheck(id)}
      onKeyUp={(e) => handleKeyUp(e, id)}
      onDelete={() => handleDelete(id)}
    />
  );

  const showMessageIfEmpty = () => (
    <div className="no-todos">Looks like you&apos;re up for a challenge!</div>
  );

  const getFilters = () => {
    if (todos && !todos.length) { return showMessageIfEmpty(); }
    let filteredBySearch = [...todos];
    if (search && search.length) {
      filteredBySearch = todos.filter((todo) => todo.label.includes(search));
    }
    if (showCompleted === 'completed') {
      const filtered = filteredBySearch.filter((todo) => todo && todo.checked);
      if (filtered && !filtered.length) { return showMessageIfEmpty(); }
      return filtered.map((todoItem) => (
        getCheckBox({ id: todoItem.id, label: todoItem.label, isChecked: todoItem.checked })
      ));
    }
    if (showCompleted === 'incomplete') {
      const filtered = filteredBySearch.filter((todo) => todo && !todo.checked);
      if (filtered && !filtered.length) { return showMessageIfEmpty(); }
      return filtered.map((todoItem) => (
        getCheckBox({ id: todoItem.id, label: todoItem.label, isChecked: todoItem.checked })
      ));
    }
    return filteredBySearch.map((todoItem) => (
      getCheckBox({ id: todoItem.id, label: todoItem.label, isChecked: todoItem.checked })
    ));
  };

  return (
    <div className="todo-list">

      {/* Filters */}
      <div className="filters">
        <span className={`filters-options btn ${showCompleted === 'all' ? 'btn-primary' : 'btn-light'}`} role="button" onClick={() => updateFilter('all')}>Show All</span>
        <span className={`filters-options btn ${showCompleted === 'incomplete' ? 'btn-primary' : 'btn-light'}`} role="button" onClick={() => updateFilter('incomplete')}>Show Incomplete</span>
        <span className={`filters-options btn ${showCompleted === 'completed' ? 'btn-primary' : 'btn-light'}`} role="button" onClick={() => updateFilter('completed')}>Show Completed</span>
        <span className="filters-search"><input value={search} onChange={(e) => updateSearch(e.target.value)} type="text" placeholder="Search here" /></span>
      </div>
      <span className="todo-list-title">Things to do:</span>

      {todos.length ? (
        <div className="todo-list-content">
          {getFilters()}
        </div>
      ) : (
        <div className="no-todos">Looks like you&apos;re up for a challenge!</div>
      )}
    </div>
  );
};
