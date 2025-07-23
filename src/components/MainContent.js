import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoList from './TodoList';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const MainContent = () => {
  const { lists, setLists, filter } = useContext(TodoContext);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    
    //jab filter active hai, sirf Today tasks mein tasks ko reorder karo
    if (filter) {
      const todayIdx = lists.findIndex(list => list.name === 'Today tasks');
      if (todayIdx === -1) return;
      const allTasks = [...lists[todayIdx].tasks];
     
    
      const filteredTasks = allTasks.filter(task => task.category === filter);

      const movedTask = filteredTasks[source.index];
   
      filteredTasks.splice(source.index, 1);
   
      filteredTasks.splice(destination.index, 0, movedTask);
    
      let filteredIdx = 0;
      const newTasks = allTasks.map(task => {
        if (task.category === filter) {
          return filteredTasks[filteredIdx++];
        }
        return task;
      });
      const newLists = [...lists];
      newLists[todayIdx].tasks = newTasks;
      setLists(newLists);
      return;
    }

    // Default drag-and-drop for all lists
    const sourceListIdx = lists.findIndex(list => list.id.toString() === source.droppableId);
    const destListIdx = lists.findIndex(list => list.id.toString() === destination.droppableId);
    if (sourceListIdx === -1 || destListIdx === -1) return;
    const newLists = [...lists];
    const sourceTasks = [...newLists[sourceListIdx].tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);
    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      newLists[sourceListIdx].tasks = sourceTasks;
    } else {
      const destTasks = [...newLists[destListIdx].tasks];
      destTasks.splice(destination.index, 0, movedTask);
      newLists[sourceListIdx].tasks = sourceTasks;
      newLists[destListIdx].tasks = destTasks;
    }
    setLists(newLists);
  };

  // UI: Show only filtered tasks in Today tasks when filter is active
  let displayLists = lists;
  if (filter) {
    displayLists = lists.map(list => {
      if (list.name === 'Today tasks') {
        return {
          ...list,
          tasks: list.tasks.filter(task => task.category === filter),
        };
      }
      return { ...list, tasks: [] };
    });
  }

  return (
    <div className="flex-1 bg-purple-400 rounded-r-2xl p-8 text-white flex flex-col overflow-y-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {displayLists.map(list => (
          <Droppable droppableId={list.id.toString()} key={list.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TodoList list={list} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default MainContent;
