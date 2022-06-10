import React from "react";
import Fade from "react-reveal";
import {motion} from 'framer-motion/dist/es/index'
import { Carousel } from 'react-responsive-carousel';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';



let id = 0;
function Portfolio(props) {
    if (!props.data) return null;

    const projects = props.data.projects.map(function (projects) {

      return (
        <div key={id++} className="columns portfolio-item">
          <PortfolioModal projects={projects}/>
        </div>
      );
    });

    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Take a look at my portfolio! </h1>

              <div
                id="portfolio-wrapper"
                className="bgrid-quarters s-bgrid-thirds cf"
              >
                {projects}
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }

function PortfolioModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let projectImage = "images/portfolio/" + props.projects.image;

  const porfolioGridItem = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  }

  const skills = props.projects.skills;
  const skillsList = skills.map((skill) =>
    <li style={{marginLeft: "2em"}}>{skill}</li>
  );

  let carouselSlides = [];
  for (let i = 0; i < props.projects.carouselImages.length; i++) {
    carouselSlides.push(
      <div className="carousel-image-container">
        <img src={"images/portfolio/" + props.projects.carouselImages[i]} alt="" className="project-display-image carousel" />
        <p className="legend">{props.projects.carouselCaptions[i]}</p>
      </div>
    );
  }

  return (
    <div>
      <motion.div 
        style={{willChange: 'transform'}}
        variants={porfolioGridItem} 
        initial="rest"
        whileHover="hover">
          <div className="project-display item-wrap" onClick={handleOpen}>
            <div className="project-display-image-container">
              <img className="project-display-image" src={projectImage} alt=""/>
            </div>
            <div className="project-info">
              <div className={"project-type " + props.projects.type.toLowerCase()}> {props.projects.type}</div>
              <div className="project-title">{props.projects.title}</div>
            </div>
          </div>
      </motion.div>

      <Dialog
        open={open}
        id='portfolio'
        onClose={handleClose}
        scroll={'body'}
        className="portfolio-dialog"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={'xl'}
      >
        <DialogTitle>
          <Grid container>
            <Grid item xs={8}>
              <h3 className='dialog-header-text'>{props.projects.title}</h3>
              <h2 style={{paddingBottom: '0'}} className={"dialog-header-text project-type " + props.projects.type.toLowerCase()}>{props.projects.category}</h2>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: '#152238',
                }}
               >
                <CloseIcon sx={{ fontSize: "35px" }}/>
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid 
              container 
              justifyContent="center" 
              alignItems="center"
            >
            <Grid item xs={12} style={{maxWidth: '60%'}}>
              <Carousel>
                {carouselSlides}
              </Carousel>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <h4>Skills Developed:</h4>
              <ul>{skillsList}</ul>
            </Grid>
            <Grid item xs={10}>
              <h4>Description:</h4>
              <p>{props.projects.description}</p>
            </Grid>
          </Grid>  
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Portfolio;
