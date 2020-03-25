import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import Navigation from './components/Navigation';
import Main from './components/Main';
import FindEmoji from './components/FindEmoji';
import About from './components/About';
import Menu from './components/Menu';

import {BrowserRouter , Route} from 'react-router-dom';

import {
  fetchProjects,
} from './actions';
import ReactGA from 'react-ga';

// import Sketch from './components/P5Wrapper/sketch.js';


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
      mobile: false,
    }
  }

  // import ReactGA from 'react-ga';
  // const clickHandler = () => {
  //   ReactGA.event({
  //     category: 'Button',
  //     action: 'Pressed Like Button'
  //   });
  // }



  componentDidMount() {
    document.title = 'Woo Park Portfolio'

    const trackingId = "UA-156446443-1"; // Replace with your Google Analytics tracking ID
     ReactGA.initialize(trackingId);
     // ReactGA.pageview('/')
     ReactGA.pageview(window.location.pathname + window.location.search)


    this.props.dispatch(fetchProjects());
    console.log('dispatched?')

    const sections = document.querySelectorAll("section")
    console.log(sections,'sections')
    const options = {
      threshold: 0.4
    }
    const bubble = document.querySelector('.bubble');

    let observer = new IntersectionObserver(navCheck, options)


    const checkDevice = () => {
      if (window.screen.width < 660) {
        this.setState({mobile: true})
        return
      } else {
        this.setState({mobile: false})
      }
      console.log('mobile', this.state.mobile)
    }
    checkDevice();


    window.addEventListener("resize", function(){
        bubble.style.top = '-200px';
        bubble.style.left = '-200px';
        sections.forEach(section => {section.style.color = '#222222'}); //change all to black
        // console.log('RESIZED')
        checkDevice();

    });

    sections.forEach(section => {
      // observer.observe(section);


      section.addEventListener('mouseenter', (element)=>{
        sections.forEach(section => {section.style.color = '#222222'}); //change all to black once in the beginning
        element.target.style.color = '#F8F8FF';
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
          <div className="item-a header one-edge-shadow">
            <div className="portfolioLogo"></div>
            <div className="headerLogo"></div>
            <Navigation />
          </div>
          <div className="item-c side middle">
            {this.state.mobile == true ? <div className="message">Please use desktop to experience & experiment the provided links.</div> : ''}
            <Menu projects={this.props.projects}
            />

          </div>

          <div className="item-b main middle">

          {/*
            <Sketch


            />
            */}



            <Route exact path="/" component={Main} />
            <Route exact path="/about" component={About} />
            {/*<Route exact path="/emoji" component={FindEmoji} />*/}
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
