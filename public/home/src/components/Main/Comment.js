import React from 'react';

const Comment = props => {
  console.log(props.comment,' THIS IS COMMENT! BOTTOM CHAIN')
  console.log(Object.values(props.comment),'object values')
  return (
    <div>
      {Object.keys(props.comment)} : {Object.values(props.comment)}
    </div>

  );
}

export default Comment;
