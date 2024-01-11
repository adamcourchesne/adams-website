import React from "react";
import Fade from "react-reveal";
import {motion} from 'framer-motion/dist/es/index'
import { Carousel } from 'react-responsive-carousel';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';




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
              <h1>Projects</h1>

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

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function PortfolioModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => windowSize.innerWidth < 760 ? setOpen(false) : setOpen(true);
  const handleClose = () => setOpen(false);
  let projectImage = "images/portfolio/" + props.projects.image;
  const [modalDisplayImage, setModalDisplayImage] = React.useState(projectImage);

  const porfolioGridItem = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  }

  const porfolioGridModalItem = {
    rest: { scale: 1 },
    hover: { scale: 0.7 },
  }

  const skills = props.projects.skills;

  let commaSeparatedSkills = " "
  for (let i = 0; i < skills.length; i++) {
    if (i === skills.length - 1) {
      commaSeparatedSkills += skills[i]
    } else {
      commaSeparatedSkills += skills[i]
      commaSeparatedSkills += ", "
    }
  }

  let carouselSlides = [];
  for (let i = 0; i < props.projects.carouselImages.length; i++) {
    carouselSlides.push(
      <div className="carousel-image-container">
        <img src={"images/portfolio/" + props.projects.carouselImages[i]} alt="" className="project-display-image carousel" />
        {/* <p className="legend">{props.projects.carouselCaptions[i]}</p> */}
      </div>
    );
  }

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize]);

  let projectImageGridItems = [];
  for (let i = 0; i < props.projects.carouselImages.length; i++) {
    projectImageGridItems.push(
      <Grid item xs={6}>
        <motion.div 
          style={{willChange: 'transform'}}
          variants={porfolioGridModalItem} 
          initial="rest"
          whileHover = "hover"
          onClick={() => setModalDisplayImage("images/portfolio/" + props.projects.carouselImages[i])}
          >
          <div className="project-modal-grid-image-container">
            <img
              className="project-modal-grid-image" 
              src={"images/portfolio/" + props.projects.carouselImages[i]}
              alt=""
            /> 
          </div>
        </motion.div>
      </Grid>
    )
  }  


  let displayImageWidth = projectImageGridItems.length > 1 ? 8 : 12

  return (
    <div>
      <motion.div 
        style={{willChange: 'transform'}}
        variants={porfolioGridItem} 
        initial="rest"
        whileHover={windowSize.innerWidth < 760 ? "rest" : "hover"}>
          <div className={"item-wrap" + (windowSize.innerWidth < 760 ? "" : " project-display")} onClick={handleOpen}>
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
        fullScreen
        open={open}
        id='portfolio'
        onClose={handleClose}
        style={{paddingTop: '0px', paddingBottom: '0px', background:'none'}}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <Grid container>
            <Grid item xs={10}>
              <h3 className='dialog-header-text'>{props.projects.title}</h3>
              <h2 style={{paddingBottom: '0'}} className={"dialog-header-text project-type " + props.projects.type.toLowerCase()}>{props.projects.category}</h2>
              <p><b>Skills Developed:</b> {commaSeparatedSkills}</p>
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
          <div style={{width: '60%', float: 'right', paddingTop: '38px', paddingLeft: '18px'}}>
          {(carouselSlides.length > 1) ? 
            <Carousel>
              {carouselSlides}
            </Carousel> : 
            <div className="project-modal-grid-display-image-container">
              <img 
                src={modalDisplayImage}
                alt="" className="project-modal-grid-display-image" 
              /> 
            </div>
          }
          </div>
          <div style={{fontSize: '18px'}}>
            {props.projects.description && 
              <div>
                <h4>Description:</h4>
                <p>{props.projects.description}</p>
              </div> 
            }
            {props.projects.challenges && 
              <div>
                <h4>Challenges:</h4>
                <p>{props.projects.challenges}</p>
              </div> 
            }
            {props.projects.outcome && 
              <div>
                <h4>Outcome:</h4>
                <p>{props.projects.outcome}</p>
              </div> 
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Portfolio;
