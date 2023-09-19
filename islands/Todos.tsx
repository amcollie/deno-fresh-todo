import { useState, useRef } from "preact/hooks"
import { ITodo } from "../interfaces/ITodo.ts"
import { Todo } from "../components/Todo.tsx";

export default function Todos() {
    const [counter, setCounter] = useState<number>(0)
    const [todos, setTodos] = useState<ITodo[]>([])
    const inputRef = useRef<HTMLInputElement | null>(null)

    const onNewTodo = (event: Event) => {
        event.preventDefault()
        if (inputRef.current?.value) {
            const newTodo: ITodo = {
                id: counter,
                title: inputRef.current.value
            }
            setTodos((prevState: ITodo[]) => {
                return [...prevState, newTodo]
            })

            setCounter((prevState: number) => ++prevState)
            inputRef.current.value = ""
        }
    }

    const onRemoveTodo = (id: number) => {
        setTodos((prevState: ITodo[]) => {
            return prevState.filter((todo: ITodo) => todo.id!== id)
        })
    }

    const onEditTodo = (todo: ITodo) => {
        setTodos((prevTodos: ITodo[]) => prevTodos.map(
            (prevTodo: ITodo) => prevTodo.id === todo.id? todo : prevTodo
        ))
    }

    return (
        <>
            <div className="mt-10 mx-auto max-w-sm w-full">
                <form onSubmit={onNewTodo}>
                    <input 
                        type="text" 
                        id="todo" 
                        name="todo" 
                        ref={inputRef} 
                        placeholder="Enter new Todo..." 
                        required
                        class="w-full py-1.5 px-3.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                    />
                </form>
            </div>
            {todos.length > 0 ? (
                <div className="mt-10">
                    {todos.map((todo: ITodo) => <Todo todo={todo} onTodoEdit={onEditTodo} onTodoRemove={onRemoveTodo} />)}
                </div>
            ) : (
                <div className="mt-10 text-center">
                    <div>
                        <img src="/images/i_can_fly.svg" alt="task list empty" />
                        <h2 className="text-2xl font-bold mb-5">All tasks are Completed</h2>
                        <p>GO have fun outside!</p>
                    </div>
                </div>
            )}
        </>
    )
}