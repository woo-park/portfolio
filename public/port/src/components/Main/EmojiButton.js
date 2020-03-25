import React from 'react';
// import axios from 'axios';
import * as api from '../../api'
import ReactGA from 'react-ga';

const EmojiButton = props => {


  // const clickHandler = () => {
  //   ReactGA.event({
  //     category: 'Button',
  //     action: 'Pressed Like Button'
  //   });
  // }
  function onThumbsUp() {
    props.onThumbsUp(props.project.id);
      ReactGA.event({
        category: 'Emoji Button',
        action: `id # ${props.project.id} pressed -> counts : ${props.project.counts}`
      });

    let addCountPost = {
      id: props.project.id,
      counts: props.project.counts,
    }

    // const API_BASE_URL = 'http://localhost:3535';
    //
    // // axios.create takes in an object with baseURL and headers
    // const client = axios.create({
    //   baseURL: API_BASE_URL,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //
    // client.post('/portfolio/db', { ...addCountPost});

    // axios.post('http://localhost:3535/portfolio/db', addCountPost, {
    //      headers: {
    //           'content-type': 'application/json',
    //      },
    // })
    // .then(res => console.log(res.data,'retrieved'))
    // .then(success => {
    //   console.log(success,'success');
    // })

    // axios({
    //   method: 'post',
    //   url: 'https://wooyongpark.com/portfolio/db',
    //   params: addCountPost
    // })
    // .then(res => console.log(res.data,'retrieved')) //update the store here

    api.pressButton(addCountPost)
    .then(res => console.log(res.data,'retrieved')) //update the store here
  }




  return (
    <div className="emojiButton">
      <span>Like </span>
      <button
        onClick={onThumbsUp}
        className="eButton"
      >
        {props.project.counts}{'\u2728'}
      </button>
    </div>
  );
}

export default EmojiButton;
