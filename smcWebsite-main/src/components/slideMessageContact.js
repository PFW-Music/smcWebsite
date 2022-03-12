import React from 'react'
import {useSpring, animated} from 'react-spring';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

const noteStyle = {
    background: '#CFB991',
    color: '#3b3e43',
    padding: '1.5rem'
}

function SlideMessageContact() {

    const slideStyle = useSpring({
        from: {
            opacity: 0,
            marginLeft:-500
        },
        to:{
            opacity: 1,
            marginLeft:0
        }
    });


    return (
        <Grid item xs={12}>
    <animated.div style={slideStyle}>
        <div style={noteStyle}>
            <h1>
                Contact Us
            </h1>
            <h3>
                See below for information on getting in contact with John Buteyn...
            </h3>
        </div>
    </animated.div>
    </Grid>
           
    )
}

export default SlideMessageContact
