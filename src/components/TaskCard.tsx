import React, { useEffect, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../model';

interface Props{
    task: Task;
    taskList: Task[];
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
    index: number;
}
const TaskCard = ({task, taskList, setTaskList, index}: Props) => {
    //To edit the task we need to keep track of two state, one to see if we are editing and another one of the task text
    const [edit, setEdit] = useState<boolean>(false);
    const [editTask, setEditTask] = useState(task.task);

    //Delete a task
    const handleDelete = (id: string) => {
        setTaskList(taskList.filter((task) => task.id !== id));
    }

    // Edit a task
    const handleEdit = (e: React.FormEvent, id: string) => {
        e.preventDefault();
        setTaskList(
            taskList.map((task) => (
                task.id === id ? {...task, task: editTask}: task
            ))
        );
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {
                (provided, snapshot) => (
                    <form 
                        className={`taskCard ${snapshot.isDragging ? "dragging" : ""}`}
                        onSubmit={(e) => handleEdit(e, task.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {
                            edit ? (
                                <input 
                                    ref={inputRef}
                                    className="taskCard--text"
                                    value={editTask} 
                                    onChange={(e) => {
                                        setEditTask(e.target.value);
                                    }}
                                />
                            ) : (
                                <span className='taskCard--text'>
                                    {task.task}
                                </span>
                            )
                        }
                        <div>
                            <span 
                                className="icon"
                                onClick={() =>{
                                    if(!edit){
                                        setEdit(!edit);
                                    }
                                }}
                            > 
                                <i className="fa-regular fa-pen-to-square"></i> 
                            </span>
                            <span 
                                className="icon"
                                onClick={() => handleDelete(task.id)}
                            > 
                                <i className="fa-solid fa-trash"></i> 
                            </span>
                            
                            
                        </div>
                    </form>
                )
            }
        </Draggable>
       
    )
}

export default TaskCard;
