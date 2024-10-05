import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'; 
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
   
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e,id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodos)
    saveToLS()
  }

  const handleDrop = (e,id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodos)
    saveToLS()

  }
  const handleAdd = () => {
    settodos([...todos,{id:uuidv4(), todo , isCompleted: false}]) 
    settodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }
  
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLS()
  }
  
  

  return (
    <>
    <Navbar/>
       <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2">
       <h1 className='font-extrabold text-center text-3xl'>iTask - Your Todo Manager </h1>
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className='text-lg font-bold'>Add a todo </h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-xl px-5 py-2'/>
          <button onClick={handleAdd} disabled = {todo.length<=3} className='bg-slate-700 hover:bg-slate-950 hover:text-green-300 
           disabled:bg-slate-400 p-2 py-1 text-sm font-bold text-white rounded-md'>Save</button>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[95%] mx-auto my-2' ></div>
       <h2 className=' text-lg font-bold'>Your Todos</h2>
       <div className="todos">
        {todos.length === 0 && <div className='text-lg font-extrabold m-5'>No Todos to display</div> }
        {todos.map(item => {

        
       return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
        <div className='flex gap-5'>
        <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id=" "/>
        <div className={item.isCompleted? "line-through" : "" }>{item.todo}</div>
        </div>
       
        <div className="buttons flex h-full">
          <button onClick={(e) => handleEdit(e,item.id)} className='bg-slate-700 hover:bg-slate-950 hover:text-green-300 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdEditSquare /></button>
          <button onClick={(e) => handleDrop(e,item.id)} className='bg-slate-700 hover:bg-slate-950 hover:text-green-300 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><RiDeleteBin5Fill /></button>
        </div>
        </div>

    })}
       </div>
       </div>
    </>
  )
}

export default App
