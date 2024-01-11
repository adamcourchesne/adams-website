import React, { Component } from "react";
import Fade from "react-reveal";
import {motion} from 'framer-motion/dist/es/index'

function About(props) {
    if (!props.data) return null;

    const name = props.data.name;
    const profilepic = "images/" + props.data.image;
    const bio = props.data.bio;
    const phone = props.data.phone;
    const email = props.data.email;
    const resumeDownload = "images/" + props.data.resumedownload;
    const alternativeEmail =props.data.alternativeemail

    const headerListItem = {
      rest: { scale: 1 },
      hover: { scale: 1.1 },
    }

    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="three columns">
              <img
                className="profile-pic"
                src={profilepic}
                alt=""
              />
            </div>
            <div className="nine columns main-col">
              <h2>About Me</h2>

              <p>{bio}</p>
              <div className="row">
                <div className="columns contact-details">
                  <h2>Contact Details</h2>
                  <p className="address">
                    <span>{name}</span>
                    <br />
                    <span>{phone}</span>
                    <br />
                    <span>Home: {email}</span>
                    <br />
                    <span>Work: {alternativeEmail}</span>
                  </p>
                </div>
                <div className="columns download">
                  <p>
                    <motion.a 
                      href={resumeDownload} 
                      className="button" 
                      download
                      variants={headerListItem} 
                      initial="rest"
                      whileHover="hover">
                        <i className="fa fa-download"></i> Download Resume
                    </motion.a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }


export default About;
