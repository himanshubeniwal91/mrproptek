import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

const CATEGORY_COLORS = {
  Personal: 'bg-pink-500',
  Freelance: 'bg-blue-400',
  work: 'bg-yellow-400',
};

function Task({ task, listId }) {
  const { toggleTaskComplete, deleteTask } = useContext(TodoContext);

  const toggleComplete = () => {
    toggleTaskComplete(listId, task.id);
  };

  const handleDelete = () => {
    deleteTask(listId, task.id);
  };

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <label className="flex items-center space-x-3 cursor-pointer">
        {/* Colored round checkbox */}
        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-2 ${CATEGORY_COLORS[task.category] || 'bg-gray-300'} border-gray-300`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleComplete}
            className="opacity-0 absolute w-5 h-5 cursor-pointer"
          />
          {task.completed && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        <span className={`text-gray-700 ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.text}
        </span>
      </label>
      <div className="flex items-center space-x-4">
        {task.time && <span className="text-sm text-gray-500">{task.time}</span>}
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 focus:outline-none"
          aria-label="Delete task"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}

export default Task;
