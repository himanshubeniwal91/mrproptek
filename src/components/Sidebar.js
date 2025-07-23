import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

const FILTERS = [
  { name: 'Personal', color: 'bg-pink-500' },
  { name: 'Freelance', color: 'bg-blue-400' },
  { name: 'work', color: 'bg-yellow-400' },
];

const Sidebar = () => {
  const { filter, setFilter } = useContext(TodoContext);

  return (
    <div className="w-64 bg-white rounded-l-2xl p-6 flex flex-col justify-between shadow-lg">
      <div>
        <div className="flex items-center space-x-4 mb-8">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-gray-700 font-semibold">Do-it</p>
            <p className="text-purple-500 font-semibold">Hamza mameri</p>
          </div>
        </div>
        <nav className="space-y-4 text-gray-700">
          <div className="font-semibold mb-2">Today tasks</div>
          <ul className="space-y-2">
            {FILTERS.map(f => (
              <li
                key={f.name}
                className={`flex items-center space-x-2 cursor-pointer ${filter === f.name ? 'font-bold text-purple-600' : ''}`}
                onClick={() => setFilter(f.name)}
              >
                <span className={`w-3 h-3 rounded-full ${f.color} inline-block`}></span>
                <span>{f.name}</span>
              </li>
            ))}
            <li className="text-gray-400 cursor-not-allowed">Add filter</li>
          </ul>
          <ul className="mt-6 space-y-4">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
              </svg>
              <span>Scheduled tasks</span>
            </li>
            <li className="flex items-center space-x-2 cursor-pointer hover:text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Settings</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
