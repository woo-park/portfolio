import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
        <div className="">
              <div id="about_page" >
                  <div className="about_sections">
                      <h1>About Me</h1>
                      <h3>Open Access at The Met</h3>
                      <p>Coursework: Applied Internet Technology, Interactive Computing, Drawing on the Web, Creative Coding</p>
                      <div className="divide">
                          <div>Web Programming and Applications, Minor</div><div className="rightSide"></div>
                      </div>
                      <div className="divide">
                          <div>B.S., Media Communications</div><div></div>
                      </div>
                      <div className="divide">
                          <div>Studio Art Mino</div><div></div>
                      </div>


                      <p><em>-From the Met-</em></p>


                      <div>
                          <h3>SKILLs</h3>
                          <hr />
                          <br />
                          <ul>
                              <li>Languages: English, Korean</li>
                              <li>Programming Languages: JavaScript [Node.js, React.js, Three.js, AFrame.js, P5.js, D3.js, React Native, Redux, Processing.js], Python, HTML/CSS</li>
                              <li>MS Office: Microsoft Word, Microsoft Excel, Microsoft PowerPoint</li>
                              <li>Adobe Suite: Illustrator, Photoshop</li>
                          </ul>
                      </div>
                  </div>

                  <div className="about_sections">
                      <h3>PROFESSIONAL EXPERIENCE</h3>
                      <hr />
                      <br />
                      <div className="jobDescription">
                          <h4>New York University</h4>
                          <hr />
                          <h5><i>Intro to Web Design, Grader</i></h5>
                          <ul>
                              <li>Tested and inspected students’ projects on both remote and local host. Graded student projects under professor’s supervision.</li>
                          </ul>

                          <h5><i>Intro to Web Design, Teaching Assistant</i></h5>
                          <ul>
                              <li>Provided students with detailed explanations of core ideas presented in class.</li>
                          </ul>
                      </div>

                      <div className="jobDescription">
                          <h4>ROK Auxiliary Policeman</h4>
                          <hr />
                          <ul >
                            <li>Developed diet plans for a team of 200+ Auxiliary Policeman.
                            </li>
                            <li>Educated and provided dietary suggestion to promote the philosophy of good nutrition.
                            </li>
                            <li>Managed a given budget and distributed high-quality meals to the team in a cost-effective fashion.
                            </li>
                            <li>Administered weekly meetings with squad representatives to improve the diet plans, and modified special diet accordingly.
                            </li>
                          </ul>
                      </div>
                      <div className="jobDescription">
                          <h4>Note Inc.</h4>
                          <hr />
                          <ul >
                            <li>Acted as liaison for international company partners. Communicated with clients from outsourced factories.
                            </li>
                            <li>Translated and interpreted for both internal teams and external partner companies during the 18th Hong Kong Mega Showcase.
                            </li>
                          </ul>
                      </div>
                  </div>


              </div>
          </div>


    )
  }
}

function mapStateToProps(state) {
  return {
  };
}


export default connect(mapStateToProps)(About)
