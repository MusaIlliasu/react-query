import { useState } from "react";
import useTodos from "../hooks/useTodos";
import TodoForm from "./TodoForm";

const Home = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data: todos, isLoading, error } = useTodos({page, pageSize});

  if(isLoading){
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center bg-[#e2e2e2] z-50">
        <div className="inline-block w-[100px] h-[100px] border-4 border-blue-400 border-b-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
        {!isLoading && error ? <p className="text-center py-2 px-4 bg-red-400">{error.message}</p> : null}
        {!isLoading && !error ? (
          <>
            <TodoForm page={page} pageSize={pageSize} />

            <ul className="mb-4">
              {
                todos?.map(todo => (
                  <li key={todo.id} className="w-full bg-white mb-2 py-2 px-4 hover:bg-sky-100">{todo.title}</li>
                ))
              }
            </ul>
          
            <div className="flex justify-start items-center gap-4">
              <button className="rounded-md py-2 px-4 text-xs bg-blue-600 text-white"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>

              <button className="rounded-md py-2 px-4 text-xs bg-blue-600 text-white"
                disabled={(page - 1) * pageSize >= 190}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>



          </>
        ) : (
          <p className="text-center py-2 px-4 bg-blue-500">No record found</p>
        )
      }
    </>
  )
}

export default Home;