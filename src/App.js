
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route, Routes, Link } from "react-router-dom";
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import Footer from './components/Footer';
import About from './components/About';
import TaskDetails from './components/TaskDetails'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const toogleRemainder = async (id) => {
    const taskToToogle = await fetchTask(id)
    const upTask = { ...taskToToogle, remainder: !taskToToogle.remainder }
    console.log(upTask)
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(upTask)
    }) 
    const data = await res.json()
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, remainder: upTask.remainder } : task)
    )

  }
  useEffect(() => {
    const getTasks = async () => {
      const tasksfromserver = await fetchTasks()
      setTasks(tasksfromserver)
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }
  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/' element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToogle={toogleRemainder}
                  />
                ) : ('No Tasks Available')
                }
              </>
            }
          />
          <Route path='/about' element={<About/>} />
          <Route path='/task/:id' element={<TaskDetails/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
