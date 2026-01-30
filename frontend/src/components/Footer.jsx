import React from 'react'

const Footer = ({completedTasksCount = 0, activeTasksCount = 0}) => {
  return <>
    {completedTasksCount + activeTasksCount > 0 && (
      <div className='text-center'>
        <p className='text-sm text-muted-foreground'>
          {
            completedTasksCount > 0 && (
              <>
                🤩 Tuyệt vời! Bạn đã hoàn thành {completedTasksCount} công việc.
                {
                  activeTasksCount > 0 && (
                    <>
                      Còn lại {activeTasksCount} công việc đang chờ bạn hoàn thành.
                    </>
                  )
                }
              </>
            )
          }

          {completedTasksCount === 0 && activeTasksCount > 0 && (
            <>
              🔥 Bạn có {activeTasksCount} công việc đang chờ bạn hoàn thành. Cố lên nhé!
            </>
          )}
        </p>
      </div>
    )}

  </>
    
}

export default Footer