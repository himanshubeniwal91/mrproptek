import { createContext, useState, useEffect } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [lists, setLists] = useState(() => {
    const defaultLists = [
      {
        id: 1,
        name: 'Today main focus',
        tasks: [
          { id: 1, text: 'What is your next task?', time: '', completed: false },
          { id: 2, text: 'Work out', time: '8:00 am', completed: false },
          { id: 3, text: 'Design team meeting', time: '2:30 pm', completed: false },
          { id: 4, text: 'Hand off the project', time: '7:00 pm', completed: false },
          { id: 5, text: 'Read 5 pages of "sprint"', time: '10:30 pm', completed: false }
        ]
      },
      {
        id: 2,
        name: 'Today tasks',
        tasks: [
          { id: 6, text: 'Personal', time: '', completed: false },
          { id: 7, text: 'Freelance', time: '', completed: false },
          { id: 8, text: 'work', time: '', completed: false },
          { id: 9, text: 'Add filter', time: '', completed: false },
          { id: 10, text: 'Scheduled tasks', time: '', completed: false },
          { id: 11, text: 'Settings', time: '', completed: false }
        ]
      }
    ];
    let savedLists;
    try {
      savedLists = JSON.parse(localStorage.getItem('todoLists'));
      if (!Array.isArray(savedLists)) {
        savedLists = null;
      }
    } catch (error) {
      savedLists = null;
    }
    return savedLists || defaultLists;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(lists));
  }, [lists]);

  // Add any other context functions here as needed

  const addList = (name) => {
    setLists(prevLists => [
      ...prevLists,
      {
        id: Date.now(),
        name,
        tasks: [],
      },
    ]);
  };

  const renameList = (id, newName) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === id ? { ...list, name: newName } : list
      )
    );
  };

  const deleteList = (id) => {
    setLists(prevLists => prevLists.filter(list => list.id !== id));
  };

  const addTask = (listId, task) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: [{ ...task, id: Date.now() }, ...list.tasks] }
          : list
      )
    );
  };

  const deleteTask = (listId, taskId) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
          : list
      )
    );
  };

  const toggleTaskComplete = (listId, taskId) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : list
      )
    );
  };

  const moveTask = (sourceListId, destListId, sourceIndex, destIndex) => {
    setLists(prevLists => {
      const sourceList = prevLists.find(list => list.id === sourceListId);
      const destList = prevLists.find(list => list.id === destListId);
      if (!sourceList || !destList) return prevLists;

      const taskToMove = sourceList.tasks[sourceIndex];
      if (!taskToMove) return prevLists;

      // Remove task from source list
      const newSourceTasks = [...sourceList.tasks];
      newSourceTasks.splice(sourceIndex, 1);

      // Insert task into destination list
      const newDestTasks = [...destList.tasks];
      newDestTasks.splice(destIndex, 0, taskToMove);

      return prevLists.map(list => {
        if (list.id === sourceListId) {
          return { ...list, tasks: newSourceTasks };
        } else if (list.id === destListId) {
          return { ...list, tasks: newDestTasks };
        } else {
          return list;
        }
      });
    });
  };

  return (
    <TodoContext.Provider
      value={{
        lists,
        setLists,
        filter,
        setFilter,
        addList,
        renameList,
        deleteList,
        addTask,
        deleteTask,
        toggleTaskComplete,
        moveTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
