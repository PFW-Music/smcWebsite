import React from 'react'
import {useSpring, animated} from 'react-spring';

const noteStyle = {
    background: '#e7dcc8',
    color: 'white',
    padding: '1.5rem'

}

const embedStyle = {
    background: "transparent",
    border: ""
    
  };

function SlideCalendarRec() {

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
            <iframe className="airtable-embed" 
                src="https://airtable.com/embed/shrZB6CzqbjamrPJU"
                frameBorder="0"
                sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
                loading="lazy"
                
                width="50%" 
                height="533"
                style={embedStyle}
            />
        </div>
    </animated.div>
           
    )
}

export default SlideCalendarRec
