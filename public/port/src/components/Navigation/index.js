import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="navigation">
    <Link className="navigation-list" to="/">
      <section className="mymain">
        <span className="mymainLoc">Main</span>
      </section>

    </Link>
    <Link className="navigation-list" to="/about">
      <section className="myabout">
        <span className="myaboutLoc">About</span>
      </section>
    </Link>
    <Link className="navigation-list" to="/feedback">
      <section className="myfeedback">
        <span className="myfeedbackLoc">Feedback</span>
      </section>

    </Link>
    <div className="bubble"></div>


  </div>
);
