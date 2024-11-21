import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Task = ({ task, onDelete, onToogle }) => {
    return (
        <div
      className={`task ${task.remainder ? 'remainder' :''}`}
      onDoubleClick={() => onToogle(task.id)}
    >
            <h3>{task.text}{' '}
                <FaTimes style={{
                    color:
                        'red', cursor: 'pointer'
                }} onClick={() => onDelete(task.id)} />
            </h3>
            <p>{task.day}</p>
            <p><Link to={`/task/${task.id}`}>View Details</Link></p>
        </div>
    )
}

export default Task
