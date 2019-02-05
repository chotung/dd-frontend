import React from 'react'

export default (props) => {
  return (
    <div className="dashboard" id={props.data.id}>
      <h1>{props.data.name}</h1>
      <p onClick={() => props.delete(props.data.id)}>X</p>
      <ul>
        <li>Created At: {props.data.created}</li>
        <li>Created By: {props.data.author.name} </li>
      </ul>
     
    </div>
  )
}
