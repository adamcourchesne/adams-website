import React, { Component } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from "react-reveal";
import Link from '@mui/material/Link';

let id = 0;
class Portfolio extends Component {
  render() {
    if (!this.props.data) return null;

    const projects = this.props.data.projects.map(function (projects) {

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
}

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display:'flex',
  flexDirection: 'row',
  width: '75%',
};

function PortfolioModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let projectImage = "images/portfolio/" + props.projects.image;

  function IsLink(props) {
    const link = props.link;
    if (link !== undefined) {
      console.log('here');
      return <Link href={link}>Learn More!</Link>;
    }
    return null;
  }

  return (
    <div>
      <div className="project-display item-wrap" onClick={handleOpen}>
        <div className="project-display-image-container" 
          style={{  
          backgroundImage: "url(" + projectImage + ")",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          }}>
        </div>
        <div className="project-title" style={{ textAlign: "center" }}>{props.projects.title}</div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{width:'50%'}} className="project-description">
            <Typography id="modal-modal-title" variant="h2" component="h2">
            {props.projects.title}
            </Typography>
            <Typography id="modal-modal-description" variant="subtitle1" sx={{fontSize: '15px'}}>
            Skills Developed: {props.projects.skills}
            </Typography>
            <Typography id="modal-modal-description" variant="body1" sx={{fontSize: '15px'}}>
            {props.projects.description}
            </Typography>
            <IsLink link={props.projects.link}/>
          </Box>
          <Box sx={{width:'50%', display: 'flex'}} className='project-image'>
            <img style={{alignSelf: 'center'}} src={projectImage}/>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Portfolio;
