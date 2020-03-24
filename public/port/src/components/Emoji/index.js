import React, { Component } from 'react';
import { connect } from 'react-redux';

import Sketch from '../P5Wrapper/sketch.js';

class FeedBack extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
      <Sketch />
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}


export default connect(mapStateToProps)(FeedBack)


//
// curl -i -X POST -H "Content-Type: application/json" -d '{ "id":"1783551623, 9781783551620","title":"React.js Essentials: A Fast-paced Guide to Designing and Building Scalable and Maintainable Web Apps With React.js","author": "Artemij Fedosejev","description":"A fast-paced guide to designing and building scalable and maintainable web apps with React.js.","published_date":"2015-08-27T16:00:00Z","publisher":"Packt Publishing" }' localhost:3002/api/userDB
//
//
//
// curl -i -X POST -H "Content-Type: application/json" -d '[{"id": "0","interests": ['T','I','G','E','R','D','O'],"name":"tiger person"}]' localhost:3002/api/userDB
