import { FormEvent, useRef } from "react";
import { QueryProps } from "../hooks/useTodos";
import { toast } from "react-toastify";
import useAddTodo from "../hooks/useAddTodo";



const TodoForm = (query: QueryProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const addTodo = useAddTodo({
        query,
        onAdd: () => { if(inputRef.current){ inputRef.current.value = ""; } },
        onError: (message) => toast.error(message, {autoClose: 4000, pauseOnHover: false})
    });


    const handleFormSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if(inputRef.current?.value){
            addTodo.mutate({
                id: 0,
                userId: 1,
                title: inputRef.current.value,
                completed: false
            });
        }
    }

  return (
    <form onSubmit={handleFormSubmit} className="mb-4">
        <input ref={inputRef} type="text" 
            className="text-xs py-2 px-4 rounded border border-gray-200 outline-none focus:border-blue-400 transition-all"
            placeholder="Title"
        />
        <button className="py-2 px-4 bg-blue-600 text-white text-xs ml-2">Add</button>
    </form>
  )
}

export default TodoForm;