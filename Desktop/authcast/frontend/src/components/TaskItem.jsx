import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onDeleteTask, listType }) => {
  const handleDelete = () => {
    onDeleteTask(listType, task.id);
  };

  return (
    <div className="task-item" data-id={task.id} data-text={task.text}>
      <div className="task-content">
        <div className={`task-status ${listType === 'done' ? 'done' : ''}`}>
          {listType === 'done' && <span className="checkmark">✓</span>}
        </div>
        <p className={`task-text ${listType === 'done' ? 'completed' : ''}`}>{task.text}</p>
      </div>
      <div className="task-actions">
        <button className="delete-button" onClick={handleDelete}>
          <span className="delete-icon">×</span>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;