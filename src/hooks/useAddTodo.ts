import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryProps, Todo } from "./useTodos";
import axios from "axios";

interface AddTodoContextProps {
    previousTodos: Todo[];
}

interface UseTodoProps {
    query: QueryProps;
    onAdd: () => void;
    onError: (message: string) => void;
}

const useAddTodo = ({query, onAdd, onError}: UseTodoProps) => {

    const queryClient = useQueryClient();
    return useMutation<Todo, Error, Todo, AddTodoContextProps>({
        mutationFn: (todo: Todo) => axios.post("https://jsonplaceholder.typicode.com/todos", todo)
            .then(response => response.data),
        onMutate: (newTodo) => {
            const previousTodos = queryClient.getQueryData<Todo[]>(["todos", query]) || [];
            queryClient.setQueryData<Todo[]>(["todos", query], (todos = []) => [newTodo, ...todos]);

            onAdd();

            return { previousTodos };
        },
        onSuccess: (savedTodo, newTodo) => {
            return queryClient.setQueryData<Todo[]>(["todos", query], (todos) => (todos || []).map(todo => (
                todo.title === newTodo.title ? savedTodo : todo
            )));
        },
        onError: (error, _newTodo, context) => {
            if(!context) { return; }
            if(error){ onError(error.message); }

            queryClient.setQueryData<Todo[]>(["todos", query], context.previousTodos);
        } 
    });
  
}

export default useAddTodo;