import React from 'react';

const Title = props => {
  return (
    <p className="title">
      <a className="hyperLink" href={props.project.link}>{props.project.title}</a>
    </p>

  );
}

export default Title;
