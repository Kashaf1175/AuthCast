import React, { useState } from 'react';
import './AddTask.css';

const AddTaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setTaskText('');
    setIsExpanded(false);
  };

  return (
    <div className="add-task-container">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onFocus={handleFocus}
        />
        
        {isExpanded && (
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="add-button" 
              disabled={!taskText.trim()}
            >
              Add Task
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTaskForm;