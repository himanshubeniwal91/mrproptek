import { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

function AddTaskForm({ listId }) {
  const [taskText, setTaskText] = useState('');
  const { addTask, filter } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    // If filter is set, always add to Today tasks (id: 2)
    const targetListId = filter ? 2 : listId;
    addTask(targetListId, { text: taskText, time: '', completed: false, category: filter });
    setTaskText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm;