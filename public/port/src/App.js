import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import Navigation from './components/Navigation';
import Main from './components/Main';
import FeedBack from './components/FeedBack';
import About from './components/About';
import Menu from './components/Menu';

import {BrowserRouter , Switch, Route} from 'react-router-dom';

import {
  fetchProjects,
} from './actions';



const mockProjects = [
  {
      id: 1,
      title: 'Wave Generator',
      description: 'description',
      link: '/whatever',
      videoURL: './assets/vids/2d3d_0x.mp4',
  },
  {
      id: 2,
      title: 'Alt Tage Generator',
      description: 'temp',
      link: '/whatever',
      videoURL: './assets/vids/altgenerator_0x.mp4',
  },
]



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mockProjects: mockProjects,
    }
  }

  componentDidMount() {

    this.props.dispatch(fetchProjects());
    console.log('dispatched?')

    const sections = document.querySelectorAll("section")
    console.log(sections,'sections')
    const options = {
      threshold: 0.4
    }
    const bubble = document.querySelector('.bubble');

    let observer = new IntersectionObserver(navCheck, options)

    sections.forEach(section => {
      // observer.observe(section);
      section.addEventListener('mouseenter', (element)=>{
        navCheck(element)
      })
    })

    function navCheck (entry) {
      // entries.forEach(entry => {
        const className = entry.target.className;
        console.log(className);
        const activeAnchor = document.querySelector(`.${className}Loc`)
        // const gradientIndex = entry.target.getAttribute('data-index');
        console.log(activeAnchor,'activeAnchor');
        const coords = activeAnchor.getBoundingClientRect();
        const directions = {
          height: coords.height,
          width: coords.width,
          top: coords.top,
          left: coords.left,
        }
            console.log(coords)
      //
      //
      //   if (entry.isIntersecting) {
      //     // console.log(coords)
      //     console.log(entry)
          bubble.style.setProperty("left", `${directions.left}px`);
          bubble.style.setProperty("top", `${directions.top}px`);
          bubble.style.setProperty("width", `${directions.width}px`);
          bubble.style.setProperty("height", `${directions.height}px`);
      //   }
      // // });
    }

  }





  render() {
    console.log(this.props,'from app js');
    console.log(this.states,'from app js');

    return(
      <BrowserRouter>

        {/* <Switch> doesn't work */}
        <div className="container">
          <div className="item-a header">
            <div className="portfolioLogo"></div>
            <div className="headerLogo"></div>
            <Navigation />
          </div>
          <div className="item-c side middle">
            <Menu projects={this.props.projects}/>
          </div>

          <div className="item-b main middle">
            <Route exact path="/" component={Main} />
            <Route exact path="/about" component={About} />
            <Route exact path="/feedback" component={FeedBack} />
          </div>
          <div className="item-d footer">


          </div>
        </div>


      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  console.log(state, 'from reducer')
  const { projects, projectsLength } = state.page;

  return {
    projects: projects,
    projectsLength: projectsLength,
  };
}

export default connect(mapStateToProps)(App);
