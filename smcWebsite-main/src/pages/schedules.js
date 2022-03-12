import React from 'react'
import SlideCalendarRec from '../components/slideCalendarRec';
import SlideCalendarReh from '../components/slideCalendarReh';
import SlideCalendarCollab from '../components/slideCalendarCollab';
import SlideMessageRec from '../components/slideMessageRec';
import SlideMessageReh from '../components/slideMessageReh';
import SlideMessageCollab from '../components/slideMessageCollab';

function schedules() {
    return(  

        <div>
            <SlideMessageRec/>  
            <SlideCalendarRec/>
            <SlideMessageReh/> 
            <SlideCalendarReh/>
            <SlideMessageCollab/>
            <SlideCalendarCollab/>
        </div>     

    ) 
}

export default schedules