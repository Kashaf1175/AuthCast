import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, listType, onDeleteTask }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="empty-state">
          {listType === 'pending' ? (
            <>
              <div className="empty-icon">📝</div>
              <p>No pending tasks</p>
              <p className="empty-hint">Add a new task to get started!</p>
            </>
          ) : (
            <>
              <div className="empty-icon">🎯</div>
              <p>No completed tasks</p>
              <p className="empty-hint">Drag tasks here when they're done!</p>
            </>
          )}
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            listType={listType}
            onDeleteTask={onDeleteTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;