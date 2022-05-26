import React from "react";
import ParticlesBg from "particles-bg";
import {motion} from 'framer-motion/dist/es/index'
import Fade from "react-reveal";

function HeaderNavItem(props) {
  const headerListItem = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  }

  return (
    <motion.div 
      variants={headerListItem} 
      initial="rest"
      whileHover="hover">
        {props.label}
    </motion.div>
  )
}

function Header(props) {
    if (!props.data) return null;

    const name = props.data.name;
    const description = props.data.description;
    
    return (
      <header id="home" >

        {<ParticlesBg color={["#69A6D1", "#94DFFF", "#C9EBEF", "#FFD4B1", "#FCADB0"]} num={10} type="circle" bg={true} />}
  
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                <HeaderNavItem label={"Home"}/>
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#about">
                <HeaderNavItem label={"About"}/>
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#resume">
                <HeaderNavItem label={"Resume"}/>
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#portfolio">
                <HeaderNavItem label={"Projects"}/>
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#testimonials">
                <HeaderNavItem label={"Testimonials"}/>
              </a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>{description}</h3>
            </Fade>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }


export default Header;
