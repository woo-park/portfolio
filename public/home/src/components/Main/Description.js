import React from 'react';
// import EmojiButton from './EmojiButton';

const Description = props => {
  return (
    <div className="description">
      <p>{props.project.description}</p>
      {/*
        <EmojiButton
          onThumbsUp={props.onThumbsUp}
          project={props.project}
        />
        */}

    </div>

  );
}

export default Description;
