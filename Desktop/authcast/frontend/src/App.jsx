import { useState, useEffect, useRef } from 'react';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddTaskForm from './components/AddTask';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState({
    pending: [],
    done: []
  });

  const pendingRef = useRef(null);
  const doneRef = useRef(null);
  const dragulaRef = useRef(null);

  // Initialize Dragula
  useEffect(() => {
    if (pendingRef.current && doneRef.current) {
      dragulaRef.current = dragula([pendingRef.current, doneRef.current])
        .on('drag', (el) => {
          el.classList.add('dragging');
        })
        .on('dragend', (el) => {
          el.classList.remove('dragging');
        })
        .on('drop', (el, target, source) => {
          const taskId = el.getAttribute('data-id');
          const taskText = el.getAttribute('data-text');

          if (!taskId) return;

          const sourceList = source === pendingRef.current ? 'pending' : 'done';
          const targetList = target === pendingRef.current ? 'pending' : 'done';

          if (sourceList !== targetList) {
            setTasks((prev) => {
              const movedTask = prev[sourceList].find(task => task.id === taskId);
              if (!movedTask) return prev;

              const newSource = prev[sourceList].filter(task => task.id !== taskId);
              const newTarget = [...prev[targetList], movedTask];

              return {
                ...prev,
                [sourceList]: newSource,
                [targetList]: newTarget
              };
            });
          }
        });
    }

    return () => {
      if (dragulaRef.current) {
        dragulaRef.current.destroy();
      }
    };
  }, []);

  const handleAddTask = (taskText) => {
    if (taskText && taskText.trim()) {
      const task = {
        id: Date.now().toString(),
        text: taskText.trim()
      };
      setTasks((prev) => ({
        ...prev,
        pending: [...prev.pending, task]
      }));
    }
  };

  const handleDeleteTask = (listType, taskId) => {
    if (!taskId || !listType) return;

    setTasks((prev) => ({
      ...prev,
      [listType]: prev[listType].filter(task => task.id !== taskId)
    }));
  };

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <div className="container">
          <div className="app-header text-center mb-4">
            <h1 className="text-2xl font-bold">Task Dashboard</h1>
            <p className="text-sm text-gray-600">
              Organize your tasks by dragging them between lists
            </p>
          </div>

          <AddTaskForm onAddTask={handleAddTask} />

          <div className="tasks-container grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="task-column bg-gray-50 rounded-lg p-4 shadow">
              <div className="column-header flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-lg font-semibold text-indigo-600">Pending Tasks</h2>
                <span className="text-sm text-gray-500">{tasks.pending.length}</span>
              </div>
              <div className="task-list-container min-h-[100px]" ref={pendingRef}>
                <TaskList
                  tasks={tasks.pending}
                  listType="pending"
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            </div>

            <div className="task-column bg-gray-50 rounded-lg p-4 shadow">
              <div className="column-header flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-lg font-semibold text-green-600">Completed Tasks</h2>
                <span className="text-sm text-gray-500">{tasks.done.length}</span>
              </div>
              <div className="task-list-container min-h-[100px]" ref={doneRef}>
                <TaskList
                  tasks={tasks.done}
                  listType="done"
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
