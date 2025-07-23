import { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

function AddListForm() {
  const [name, setName] = useState('');
  const { addList } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addList(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New list name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add List
        </button>
      </div>
    </form>
  );
}

export default AddListForm;