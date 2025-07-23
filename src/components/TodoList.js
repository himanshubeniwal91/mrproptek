import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import Task from './Task';
import AddTaskForm from './AddTaskForm';
import { Draggable } from 'react-beautiful-dnd';

function TodoList({ list }) {
  const { setLists } = useContext(TodoContext);

  return (
    <div className="w-full max-w-md mx-auto mb-8 bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">{list.name}</h1>
      {list.name === 'Today main focus' && (
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Design team meeting</h2>
      )}
      
      <div className="space-y-3 mb-4">
        {list.tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Task task={task} listId={list.id} />
              </div>
            )}
          </Draggable>
        ))}
      </div>

      {list.name !== 'Today tasks' && <AddTaskForm listId={list.id} />}
    </div>
  );
}

export default TodoList;
