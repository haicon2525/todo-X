import { Card } from '@/components/ui/card'
import { Circle } from 'lucide-react'
import React from 'react'

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className='p-8 text-center border-0 bg-gradient-card shadow-custom-md'>
      <div className=' space-y-3'>
        <Circle className='mx-auto size-12 text-muted-foreground'/>
        <div>

            <h3 className='font-medium text-foreground'>
                {
                    filter === 'active' ? 
                    'Không có công việc đang hoạt động!' :
                    filter === 'completed' ? 
                    'Không có công việc đã hoàn thành!' :
                    'Không có công việc nào!'
                }
            </h3>

            <p className='text-sm text-muted-foreground'>
                {
                    filter === 'all' 
                        ? 'Hãy thêm công việc mới để bắt đầu quản lý công việc của bạn.' 
                        : `Chuyển sang tất cả để thấy những nhiệm vụ ${
                        filter === 'active' ? 'đã hoàn thành' : 'đang làm'
                    }`
                }
            </p>

        </div>

      </div>
    </Card> 
  )
}

export default TaskEmptyState