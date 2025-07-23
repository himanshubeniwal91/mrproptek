import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoList from './TodoList';
import AddListForm from './AddListForm';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function ListContainer() {
  const { lists, moveTask } = useContext(TodoContext);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    moveTask(
      parseInt(source.droppableId),
      parseInt(destination.droppableId),
      source.index,
      destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-8 overflow-x-auto">
        {lists.map(list => (
          <Droppable key={list.id} droppableId={list.id.toString()}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-shrink-0 w-80"
              >
                <TodoList list={list} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
        <AddListForm />
      </div>
    </DragDropContext>
  );
}

export default ListContainer;
