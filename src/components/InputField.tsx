import React, { useRef } from 'react'

interface Props{
    task: string,
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({task, setTask, handleAdd}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form 
            className="input" 
            onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.blur();
                }}>
            <input 
                ref={inputRef}
                type="input"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task" 
                className='input__box' 
            />
            <button className="input_submit" type="submit"><i className="fa-solid fa-plus input_icon"></i></button>
        
        </form>
    )
}

export default InputField
