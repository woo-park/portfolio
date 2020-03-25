import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigation = (props) => {
  const onNavClick = () => {
    props.dispatch({
      type:'CHANGE_PAGE'
    })
  }

  return(
    <div className="navigation">
      <Link className="navigation-list" to="/">
        <section className="mymain">
          <span className="mymainLoc"
                onClick={onNavClick}
          >Main</span>
        </section>

      </Link>
      <Link className="navigation-list" to="/about">
        <section className="myabout">
          <span className="myaboutLoc"
                onClick={onNavClick}
          >About</span>
        </section>
      </Link>

      {/*
        <a href="/find">
        <section className="myfeedback">
          <span className="myfeedbackLoc"
                onClick={onNavClick}
          >Emoji Project</span>
        </section>

        </a>

        */}
      {
        /*
          <Link className="navigation-list" to="/feedback">


          </Link>
        */
      }

      <div className="bubble"></div>


    </div>
  )
};


export default connect()(Navigation);
