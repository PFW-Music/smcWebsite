import React from 'react'
import {useSpring, animated} from 'react-spring';

const noteStyle = {
    background: '#CFB991',
    color: '#3b3e43',
    padding: '1.5rem'

}

function SlideMessageRec() {

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
    
    <animated.div style={slideStyle}>
        <div style={noteStyle}>
            
            <h1>
                Ready to go on record?
            </h1>
            <h3>
                Please check out the calendar below before you book a slot at the Recording Studio
            </h3>
        </div>
    </animated.div>
           
    )
}

export default SlideMessageRec
