import React from 'react'

const Star = (props) => {

    const { history, id, handleClickStar } = props;

  return (
    <p onClick={() => handleClickStar(id)}>{ history[id].favourite ? "★" : "☆"}</p>
  )
}

export default Star