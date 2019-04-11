import React from 'react'

export const Post = ({ id, title, body }) => {
  return (
    <React.Fragment>
      <div id={id}>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <hr />
    </React.Fragment>
  )
}
