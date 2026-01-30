
import TaskCard from '@/components/TaskCard';
import TaskEmptyState from '@/components/TaskEmptyState';
import React from 'react'


    
  const TaskList = ({filteredTasks, filter, handleTaskChanged}) => {

  if(!filteredTasks || filteredTasks.length === 0){
    return <TaskEmptyState filter={filter} />;
  }

  return (
     <div className='space-y-3'>
      {
      filteredTasks.map((task,index) => (
        <TaskCard
          key = {task._id ?? index}
          task = {task}
          index = {index}
          handleTaskChanged={handleTaskChanged}
        />

      ))
    }
     </div>
  );
}



export default TaskList;