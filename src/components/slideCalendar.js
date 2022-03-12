import React from 'react'
import {useSpring, animated} from 'react-spring';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";

const noteStyle = {
    background: '#e7dcc8',
    color: 'white',
    padding: '1.5rem'
}

const embedStyle = {
    background: "transparent",
    border: ""
    
  };

function SlideCalendar() {

    const slideStyle = useSpring({
        from: {
            opacity: 0,
            marginRight:-500
        },
        to:{
            opacity: 1,
            marginRight:0
        }
    });


    return (
    <animated.div style={slideStyle}>
        <div style={noteStyle}>
            <br></br>
            <Box m="auto" sx={{ maxWidth: 900, width: "90%"}}>
            <iframe className ="airtable-embed" 
                src="https://airtable.com/embed/shr7XfOauvLgRzajc?backgroundColor=red"
                frameBorder="0"
                sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
                loading="lazy"
                width="100%" 
                height="533"
                style={embedStyle}
            />
            </Box>
        </div>
    </animated.div>
    )
}

export default SlideCalendar
