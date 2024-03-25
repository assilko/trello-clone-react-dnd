import { useState } from "react"
import toast from "react-hot-toast"
import { v4 as uuid } from "uuid"

const CreateTask = ({tasks, setTasks}) => {

    const [task, setTask] = useState({
        id:"",
        name:"",
        status:"todo"
    })

   

    const handleSubmit = (e) => {
    e.preventDefault()

    if(task.name.length < 3 ) return toast.error("A ticket must have more than 3 characters!")
       
   setTasks((prev) => {
    const list = [...prev, task]
   // localStorage.setItem("tasks", JSON.stringify(list))
    return list
   }) 

   toast.success("Ticket Created!")

   setTask({
    id:"",
    name:"",
    status:"todo"
   })
}



    return (
       <form onSubmit={handleSubmit}>
            <input type="text" 
                   className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
                   onChange={(e) => setTask({...task, id: uuid(), name: e.target.value})}
                   value={task.name}
                   />
            <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">Create Ticket</button>
       </form>
    )
}

export default CreateTask