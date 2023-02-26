import React from 'react'
import { Task } from '../model';
import TaskCard from './TaskCard';
import {Droppable} from 'react-beautiful-dnd';

interface Props{
    taskList: Task[];
    setTaskList:React.Dispatch<React.SetStateAction<Task[]>>;
    inProgressTasks: Task[];
    setInProgressTasks:React.Dispatch<React.SetStateAction<Task[]>>;
    completedTasks: Task[];
    setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
const TaskList: React.FC<Props> = ({taskList, setTaskList, inProgressTasks, setInProgressTasks, completedTasks, setCompletedTasks}: Props) => {
    return (
       <div className='container'>
            <Droppable droppableId='TodoList'>
                {
                    (provided, snapshot) => (
                        <div 
                            className={`taskList ${snapshot.isDraggingOver ? "dragTodo" : ""}`}
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                        >
                            <h2 className="column__heading">To Do</h2>
                            {
                                taskList.map((task, index) => (
                                    <TaskCard 
                                        key={task.id}
                                        task={task}
                                        taskList={taskList}
                                        setTaskList={setTaskList}
                                        index={index}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId='InProgressList'>
                {
                    (provided, snapshot) => (
                        <div 
                            className={`taskList inprogress ${snapshot.isDraggingOver ? "dragInProgress" : ""}`} 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                        >
                            <h2 className="column__heading">In progress</h2>
                            {
                                inProgressTasks.map((task, index) => (
                                    <TaskCard 
                                        key={task.id}
                                        task={task}
                                        taskList={inProgressTasks}
                                        setTaskList={setInProgressTasks}
                                        index={index}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId='CompletedList'>
                {
                    (provided, snapshot) => (
                        <div 
                            className={`taskList completed ${snapshot.isDraggingOver ? "dragComplete" : ""}`}
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                        >
                            <h2 className="column__heading">Completed</h2>
                            {
                                completedTasks.map((task, index) => (
                                    <TaskCard 
                                        key={task.id}
                                        task={task}
                                        taskList={completedTasks}
                                        setTaskList={setCompletedTasks}
                                        index={index}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
       </div>
    )
}

export default TaskList