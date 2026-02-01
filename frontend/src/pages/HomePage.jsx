import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import { Header } from '@/components/Header'
import StatsAndFilters from '@/components/StatsAndFilters'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'

const HomePage = () => {
  const [taskBuffer , setTaskBuffer] = useState([]);
  const [activeTaskCount , setActiveTaskCount] = useState(0);
  const [completeTaskCount , setCompleteTaskCount] = useState(0);
  const [filter , setFilter] = useState('all');
  const [dateQuery , setDateQuery] = useState('today');
  const [page , setPage] = useState(1);
 
  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks ?? []);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error("lỗi xảy ra khi xuất tasks:", error);
      toast.error("lỗi xảy ra khi xuất tasks.");
    }
  }
  
   useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  const handleTaskChanged = () => {
    fetchTasks();
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //biến
  const safeTaskBuffer = Array.isArray(taskBuffer) ? taskBuffer : [];
  const filteredTasks = safeTaskBuffer.filter((task) => {
    switch (filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit, 
    page * visibleTaskLimit
  );

  if (visibleTasks.length === 0 && page > 1) {
    setPage(page - 1);
  }

  const handleNext = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);




  return (
  <div className="min-h-screen w-full bg-white relative">
  {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #ec4899 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Your Content/Components */}
      <div className='container pt-8 mx-auto relative z-10 px-4'>
          <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
              {/* Đầu trang */}
              <Header />

              {/* Thêm công việc */}
              <AddTask handleNewTaskAdded={handleTaskChanged}/>

              {/* Thống kê và bộ lọc */}
              <StatsAndFilters 
                filter={filter}
                setFilter={setFilter}
                activeTasksCount={activeTaskCount}
                completedTasksCount={completeTaskCount}
              />

              {/* Danh sách công việc */}
              <TaskList 
                filteredTasks={visibleTasks}
                filter={filter} 
                handleTaskChanged={handleTaskChanged}
               />

              {/* Phân trang danh sách công việc theo date */}
              <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
                <TaskListPagination 
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  handlePageChange={handlePageChange}
                  page={page}
                  totalPages={totalPages}
                />
                <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
              </div>

            {/* Chân trang */}
            <Footer 
              activeTasksCount={activeTaskCount}
              completedTasksCount={completeTaskCount}
            />

          </div>
        </div>
      </div>
   
  )
}

export default HomePage