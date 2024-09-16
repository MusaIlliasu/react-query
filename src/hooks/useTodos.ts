import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
    id: number | string;
    userId: number | string;
    title: string;
    completed: boolean;
  }

  export interface QueryProps {
    page: number
    pageSize: number;
  }

  const fetchData = ({page, pageSize}: {page: number, pageSize: number}) => axios.get("https://jsonplaceholder.typicode.com/todos", {
    params: {
        _start: (page - 1) * pageSize,
        _limit: pageSize
    }
})
.then(response => response.data);

const useTodos = (query: QueryProps) => useQuery<Todo[], Error, Todo[]>({
    queryKey: ["todos", query],
    queryFn: () => fetchData({page: query.page, pageSize: query.pageSize}),
    staleTime: 1 * 60 * 1000, // 1m
});

export default useTodos;