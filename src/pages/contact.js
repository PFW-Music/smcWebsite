import React from 'react';
import ReactDOM from 'react-dom';
import SlideMessageContact from '../components/slideMessageContact';


import '../fade-styles.css';

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

export default function Fades() {
  return (
    <div className="FadeStyles">
        <SlideMessageContact/>
      
        <FadeInSection>
          <div className="box" style={{ backgroundColor: 'transparent' }}>
            <h1>For Nonurgent Matters:</h1>
          </div>
        </FadeInSection>

        {//     Link to calendly
        }
        <FadeInSection key={'#f8e3a1'}>
          <div className="box" style={{ backgroundColor: '#f8e3a1' }}>
              <div className="grow">

                <a href="https://calendly.com/johnmbuteyn" style={{textDecoration:"none"}}>
                <img src="https://img.icons8.com/color/48/000000/calendar--v3.png"/>
                
                <h2>
                    Schedule Time
                </h2>
                <h3>
                    Meet in person or over the web
                </h3>
                </a>
              </div>
            </div>
        </FadeInSection>
        
        {//     Link to Slack DM
        }

        <FadeInSection key={'#f8e3a1'}>
        <div className="box" style={{ backgroundColor: '#f8e3a1' }}>
            <div className="grow">
                <a href="https://pfwpopularmusic.slack.com/archives/D0189HCR6AF" style={{textDecoration:"none"}}>
                    <img src="https://img.icons8.com/color/48/000000/slack-new.png"/>
                    <h2>
                        DM in Slack
                    </h2>
                    <h3>
                        Typically responds within 12 hours
                    </h3>
                </a>
            </div>
        </div>
        </FadeInSection>

        {//     Email
        }
        <FadeInSection key={'#f8e3a1'}>
        <div className="box" style={{ backgroundColor: '#f8e3a1' }}>
            <div className="grow">
                <a href="mailto:jbuteyn@pfw.edu" style={{textDecoration:"none"}}>
                    <img src="https://img.icons8.com/external-sbts2018-flat-sbts2018/58/000000/external-email-social-media-basic-1-sbts2018-flat-sbts2018.png"/>
                    <h2>
                        Send an email
                    </h2>
                    <h3>
                        Typically responds within 24 hours
                    </h3>
                </a>
            </div>
        </div>
        </FadeInSection>


        <FadeInSection key={'transparent'}>
          <div className="box" style={{ backgroundColor: 'transparent' }}>
            <h1>For Urgent Matters:</h1>
          </div>
        </FadeInSection>

        {//     Call
        }
        <FadeInSection key={'#f8e3a1'}>
          <div className="box" style={{ backgroundColor: '#f8e3a1' }}>
              <div className="grow">

                <a href="tel:17315405539" style={{textDecoration:"none"}}>
                <img src="https://img.icons8.com/nolan/58/phone.png"/>
                
                <h2>
                    (731) 540-5539
                </h2>
                <h3>
                    I'll call back if I'm unavailable
                </h3>
                </a>
              </div>
            </div>
        </FadeInSection>

        {//Slack emercgency DM
        }
        <FadeInSection key={'#f8e3a1'}>
        <div className="box" style={{ backgroundColor: '#f8e3a1' }}>
            <div className="grow">
                <a href="https://studentopportunity.slack.com/archives/D018UKRHMB2" style={{textDecoration:"none"}}>
                    <img src="https://img.icons8.com/color/48/000000/slack-new.png"/>
                    <h2>
                        Emergency DM in Slack
                    </h2>
                    <h3>
                        Typically responds within 6 hours
                    </h3>
                </a>
            </div>
        </div>
        </FadeInSection>

        {//     Text
        }
        <FadeInSection key={'#f8e3a1'}>
          <div className="box" style={{ backgroundColor: '#f8e3a1' }}>
              <div className="grow">

                <a href="sms:/17315405539/&body=/ /" style={{textDecoration:"none"}}>
                <img src="https://img.icons8.com/color/58/000000/messaging-.png"/>
                
                <h2>
                    (731) 540-5539
                </h2>
                <h3>
                    I'll call back if I'm unavailable
                </h3>
                </a>
              </div>
            </div>
        </FadeInSection>
      
    </div>
  );
}
