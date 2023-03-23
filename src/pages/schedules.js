import React from "react";
import SlideCalendarRec from "../components/calenders/slideCalendarRec";
import SlideCalendarReh from "../components/calenders/slideCalendarReh";
import SlideCalendarCollab from "../components/calenders/slideCalendarCollab";
import SlideMessageRec from "../components/calenders/slideMessageRec";
import SlideMessageReh from "../components/calenders/slideMessageReh";
import SlideMessageCollab from "../components/calenders/slideMessageCollab";

function schedules() {
  return (

    <div>
      <SlideMessageRec />
      <SlideCalendarRec />
      <SlideMessageReh />
      <SlideCalendarReh />
      <SlideMessageCollab />
      <SlideCalendarCollab />
    </div>

  );
}

export default schedules;