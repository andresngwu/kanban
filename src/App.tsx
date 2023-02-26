import React, {useState} from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import InputField from './components/InputField';
import TaskList from './components/TaskList';
import { Task } from './model';

/* Static data */
const taskListData = [
  {id: uuid(), task: "100 white breads"},
  {id: uuid(), task: "50 whole grain breads"},
  {id: uuid(), task: "103 muffins"},
  {id: uuid(), task: "54 milk breads"}
];

const inProgressData = [
  {id: uuid(), task: "200 donuts"},
  {id: uuid(), task: "34 chocolate breads"},
];

const CompletedData = [
  {id: uuid(), task: "300 apple pies"},
  {id: uuid(), task: "80 croissants"},
];



const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>(taskListData);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>(inProgressData);
  const [completedTasks, setCompletedTasks] = useState<Task[]>(CompletedData);


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(task){
      setTaskList([...taskList, {id: uuid(), task}]);
      setTask("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let draggedTask;
    let todoList = taskList;
    let inprogressList = inProgressTasks;
    let completedList = completedTasks;

    if(source.droppableId === "TodoList"){
      draggedTask = todoList[source.index];
      todoList.splice(source.index, 1)
    }
    else if(source.droppableId === "InProgressList"){
      draggedTask = inprogressList[source.index];
      inprogressList.splice(source.index, 1);
    }
    else{
      draggedTask = completedList[source.index];
      completedList.splice(source.index, 1);
    }

    if(destination.droppableId === "TodoList"){
      todoList.splice(destination.index, 0, draggedTask)
    }
    else if(destination.droppableId === "InProgressList"){
      inprogressList.splice(destination.index, 0, draggedTask);
    }
    else{
      completedList.splice(destination.index, 0, draggedTask);
    }

    setTaskList(todoList);
    setInProgressTasks(inprogressList);
    setCompletedTasks(completedList);
    console.log(result);
  }
  return (
    <DragDropContext 
      onDragEnd={onDragEnd}
    >
      <div className="App">
        <h1 className='heading'>Kanban Board</h1>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd}/>
        <TaskList 
          taskList={taskList} 
          setTaskList={setTaskList}
          inProgressTasks={inProgressTasks }
          setInProgressTasks={setInProgressTasks}
          completedTasks={completedTasks}
          setCompletedTasks={ setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
}

export default App;