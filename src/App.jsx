import { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask'
import ListTask from './components/ListTask'
import  { Toaster }  from 'react-hot-toast'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
   // setTasks(JSON.parse(localStorage.getItem("tasks")))
  }, [])


  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <div className="bg-slate-300 w-screen h-screen flex flex-col items-center pt-32 gap-16">
          <CreateTask tasks={tasks} setTasks={setTasks}/>
          <ListTask tasks={tasks} setTasks={setTasks}/>
          <Toaster/> 
        </div>
        </DndProvider>
        <Footer />
    </>
  )
}

export default App
