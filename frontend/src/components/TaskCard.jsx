import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios';
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react';

import React, { useState } from 'react'
import { toast } from 'sonner';


const TaskCard = ({task , index , handleTaskChanged }) => {

    const [isEditing , setIsEditing] = useState(false);
    const [updatedTaskTitle , setUpdatedTaskTitle] = useState(task.title || '');
   

    const deleteTask = async() => {
        try {
            await api.delete(`/tasks/${task._id}`);
            toast.success("Xóa nhiệm vụ thành công!");
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi xảy ra khi xóa nhiệm vụ:", error);
            toast.error("Lỗi xảy ra khi xóa nhiệm vụ.");
        }
    }

    const updateTask = async () => {
        try {
            setIsEditing(false);
            await api.put(`/tasks/${task._id}`, { title: updatedTaskTitle });
            toast.success("Cập nhật nhiệm vụ thành công!");
            handleTaskChanged();
        } catch (error) {
            console.error("Lỗi xảy ra khi cập nhật nhiệm vụ:", error);
            toast.error("Lỗi xảy ra khi cập nhật nhiệm vụ.");
        }
    }

    const toggleTaskCompleteButton = async () => {
        try {
            if(task.status === 'active'){
                await api.put(`/tasks/${task._id}`, { 
                    status: 'completed',
                    completedAt: new Date().toISOString()
                });
                toast.success("Nhiệm vụ đã được đánh dấu là hoàn thành!!");
            } else {
                await api.put(`/tasks/${task._id}`, { 
                    status: 'active',
                    completedAt: null
            });
                toast.success("Nhiệm vụ đã được đánh dấu là chưa hoàn thành!");
            }
            handleTaskChanged();
    }catch (error) {
            console.error("Lỗi xảy ra khi cập nhật trạng thái nhiệm vụ:", error);
            toast.error("Lỗi xảy ra khi cập nhật trạng thái nhiệm vụ.");
        }
    };

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            updateTask();
        }
  };  

  return (
    <Card className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-face-in group",
        task.status === 'completed' && 'opacity-75' 
    )}
        style={{animationDelay: `${index * 50}ms`}}
    >
        <div className=' flex items-center gap-4'>
            <Button
                variant='ghost'
                size='icon'
                className={cn(
                    "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                    task.status === 'completed' ? 'text-success hover:text-success/40':
                    'text-muted-foreground hover:text-primary'
                )}
                onClick={toggleTaskCompleteButton}
            >
                {task.status === 'completed' ?(
                    <CheckCircle2 className='size-5'/>
                ) : <Circle className='size-5'/>}
               
            </Button>


            {/*  hiển thị hoặc chỉnh sửa tiêu đề */}
            <div className='flex-1 min-w-0'> 
                {isEditing ? (

                    <Input
                        placeholder='Chỉnh sửa tiêu đề công việc'
                        className='flex-1 h-12 text-base border-bordered/50 focus:border-primary/50 focus:ring-20'
                        type="text"
                        value={updatedTaskTitle}
                        onChange={(even) => setUpdatedTaskTitle(even.target.value)}
                        onKeyPress={ handleKeyPress }
                        onBlur={() => {
                            setIsEditing(false);
                            setUpdatedTaskTitle(task.title || '');
                        }}
                    />

                ) : (
                    <p className={cn(
                        "text-base transition-all duration-200",
                        task.status ==='completed' ? 
                        "line-through text-muted-foreground" :
                        "text-foreground"
                    )}
                    >
                        {task.title}
                    </p>
                )}
                {/* Ngày tạo và ngày hoàn thành */}
                <div className='flex items-center gap-2 mt-1'>
                    <Calendar className='size-3 text-muted-foreground'/>
                    <span className='text-xs text-muted-foreground'>
                        {new Date(task.createdAt).toLocaleString()}
                    </span>     

                    {task.completedAt && (
                        <>
                            <span className='text-xs text-muted-foreground'> - </span>
                            <Calendar className='size-3 text-muted-foreground'/>
                            <span className='text-xs text-muted-foreground'>
                                {new Date(task.completedAt).toLocaleString() }
                            </span>
                        </> 
                        
                    )}

                </div>
            </div>
            
            {/* Nút chỉnh sửa */}
            <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
                {/* nut edit */}
                <Button 
                    variant='ghost'
                    size='icon'
                    className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
                    onClick={() => {
                        setIsEditing(true);
                        setUpdatedTaskTitle(task.title || '');
                    }}
                >
                    <SquarePen className='size-4'/>

                </Button>

                {/* nut xoa */}

                <Button
                    variant='ghost'
                    size='icon'
                    className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'
                    onClick={() => deleteTask(task._id)}    
                >
                    <Trash2 className='size-4'/>
                </Button>

            </div>
        </div>

    </Card>
  )
}

export default TaskCard