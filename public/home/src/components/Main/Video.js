import React from 'react';
import ReactGA from 'react-ga';
const Video = props => {

  function onVideoLeave(e) {
    let sideBlockLeft = e.target.parentElement.nextElementSibling;
    let sideBlockRight = e.target.parentElement.previousElementSibling;
    let scene = e.target.parentElement;
    let video = e.target;
    props.onVideoLeave(props.project.id, sideBlockLeft, sideBlockRight, scene, video);

    ReactGA.event({
      category: 'Video Hovered',
      action: `id # ${props.project.id} -> hovered`
    });
  }
  function onVideoEnter(e) {
    let sideBlockLeft = e.target.parentElement.nextElementSibling;
    let sideBlockRight = e.target.parentElement.previousElementSibling;
    let scene = e.target.parentElement;
    let video = e.target;
    props.onVideoEnter(props.project.id, sideBlockLeft, sideBlockRight, scene, video );
  }
  const onVideoPlay = () => {
    ReactGA.event({
      category: 'Video Played',
      action: `id # ${props.project.id} -> played`
    });
  }



  console.log('props.', props)
  return (
    <video
      className="videos"
      controls
      muted src={props.project.videoURL}
      onMouseEnter={onVideoEnter}
      onMouseLeave={onVideoLeave}
      onPlay={onVideoPlay}
    >
      Video Unavailable
    </video>
  );
}

export default Video;
