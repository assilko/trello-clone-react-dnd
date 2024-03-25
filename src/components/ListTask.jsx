import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDrag, useDrop } from "react-dnd"

const ListTask = ({tasks, setTasks}) => {
    const [todo, setTodo] = useState([])
    const [inprogress, setInProgress] = useState([])
    const [done, setDone] = useState([])

    useEffect(()=> {

    const filterTodo = tasks.filter(task => task.status === "todo")
    const filterInProgress = tasks.filter(task => task.status === "inprogress")
    const filterDone = tasks.filter(task => task.status === "done")

            setTodo(filterTodo)
            setInProgress(filterInProgress)
            setDone(filterDone)
        
    }, [tasks])

    const statuses = ["todo", "inprogress", "done"]
    return (
        <div className="flex gap-16">
            {statuses.map((item, index) => <Section 
                                                    key={index}
                                                    value={item}
                                                    tasks={tasks}
                                                    setTasks={setTasks}
                                                    todo={todo}
                                                    inprogress={inprogress}
                                                    done={done}
                                                    />)}
        </div>
    )
}

export default ListTask


const Section = ({value, tasks, setTasks, todo, inprogress, done}) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))

    let text = "To-do"
    let bg = "bg-slate-500"
    let tasksToMap = todo

    if(value === "inprogress"){
        text = "In Progress"
        bg = "bg-purple-500"
        tasksToMap = inprogress
    }
    if(value === "done"){
        text = "Done"
        bg = "bg-green-500"
        tasksToMap = done
    }

    const addItemToSection = (id) => {
       setTasks(prev => {
        const modTasks = prev.map(t => {
            if(t.id === id) {
                return {...t, status: value}
            }

            return t
        })

        // localStorage.setItem("tasks", JSON.stringify(modTasks))
            return modTasks
       })
    }

    return (
            <div ref={drop} className={`w-64 p-2 rounded-md ${isOver ? "bg-slate-200" : ""}`}>
            <Header  text={text} bg={bg} count={tasksToMap.length}/> 
            {tasksToMap.length > 0 && tasksToMap.map(task => <Task key={task.id} tasks={tasks} setTasks={setTasks} task={task}/>)}
            </div>
            )
}

const Header = ({text, bg, count}) => {
    return <div className={`${bg} font-bold flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
        {text} <div className="ml-4 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">{count}</div>
            </div>
}

const Task = ({task, tasks, setTasks}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
     

    const handleRemove = (id) => {
        const filterTasks = tasks.filter(task => task.id !== id)
         // setTasks(JSON.parse(localStorage.getItem(filterTasks)))
        setTasks(filterTasks)
        toast("Ticket Removed", {icon: "❌"})
    }

    return (
        <div ref={drag}
         className={`relative p-4 mt-8 bg-slate-200 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-90"}`}>
        <p>{task.name}</p>
        <button className="absolute botton-1 right-1 top-1 text-slate-400" onClick={()=> handleRemove(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
        </button>
        </div>
    )
}




