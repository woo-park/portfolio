import React, { Component } from 'react';
import Description from './Description';



const VideoMargin = props => {
  return(
    <div className="">
      <Description
        project={props.project}
        onThumbsUp={props.onThumbsUp}
      />
    </div>
  )
}

export default VideoMargin;
