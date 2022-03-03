import React, { Component } from "react";
import Slide from "react-reveal";

class Resume extends Component {
  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.props.data) return null;
    
    const education = this.props.data.education.map(function (education) {
      return (
        <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">
            {education.degree} <span>&bull;</span>
            <em className="date">{education.graduated}</em>
          </p>
          <p>{education.description}</p>
          <h4>{education.courseheader}</h4>
          <ul>{education.courses.map(course => <li className="course-list" style={{marginLeft: "2em"}}>{course}</li>)}</ul>
        </div>
      );
    });

    const work = this.props.data.work.map(function (work) {
      return (
        <div key={work.company}>
          <h3>{work.company}</h3>
          <p className="info">
            {work.title}
            <span>&bull;</span> <em className="date">{work.years}</em>
          </p>
          <p>
            {work.description}
            
            {(() => {
              if (work.website != null){
                  return (
                    <div>
                      <a href={work.website}> Here's a link to the MetricAid Blog. </a> 
                      Keep in mind, anything produced on this page in the recent past has been written, edited, or managed by myself.
                    </div>
                    
                  )
              }
              return null;
            })()}
            
          </p>
        </div>
      );
    });

    const uwaterloo = "images/" + this.props.data.uwimage;
    const metricaid = "images/" + this.props.data.maimage

    return (
      <section id="resume">
        <Slide left duration={1300}>
          <div className="row education">
            <div className="three columns header-col">
              <h1>
                <span>Education</span>
              </h1>
              {/* <img
                className="display-images"
                src={uwaterloo}
              /> */}
              
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{education}</div>
              </div>
            </div>
          </div>
        </Slide>

        <Slide left duration={1300}>
          <div className="row work">
            <div className="three columns header-col">
              <h1>
                <span>Work</span>
              </h1>
              {/* <img
                className="display-images"
                src={metricaid}
              /> */}
            </div>

            <div className="nine columns main-col">{work}</div>
          </div>
        </Slide>
      </section>
    );
  }
}

export default Resume;
