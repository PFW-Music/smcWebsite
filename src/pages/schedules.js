import React from "react";
import IframeSlide from "../components/IframeSlide";
import HeaderWithSubtitle from "../components/HeaderWithSubtitle";

function schedules() {
  return (

    <div>
      <HeaderWithSubtitle
        title="Ready to go on record?"
        subtitle="Please check out the calendar below before you book a slot at the Recording Studio"
      />
      <IframeSlide src="https://airtable.com/embed/shr4OwRJGGOsC2lzf" />
      <HeaderWithSubtitle
        title="Need some practice?"
        subtitle="Please check out the calendar below before you book a Rehearsal Space"
      />
      <IframeSlide src="https://airtable.com/embed/shrZB6CzqbjamrPJU" />
      <HeaderWithSubtitle
        title="Looking for space?"
        subtitle="Take advantage of the edit suites and other collaboration spaces in the SMC building."
      />
      <IframeSlide src="https://airtable.com/embed/shru3rbc7s9mbQj2i" />
    </div>

  );
}

export default schedules;