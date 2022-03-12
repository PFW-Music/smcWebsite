import React from "react";
import { makeStyles } from "@material-ui/styles";
import {    Drawer as MUIDrawer,
            List,
            ListItem,
            ListItemIcon,
            ListItemText,
            Paper
        } from "@material-ui/core";
import logo from '../logo.png';
import CustomBtn from './customBtn';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({  
    drawer: {
        width: '160px',

    },

    paper: {
        background: '#242424',
        alignItems: "center"
    }
});

const Drawer = () => {
    const classes = useStyles();
    return(
        <MUIDrawer variant="permanent" className={classes.drawer} classes={{paper: classes.paper}}>
            <List>

                <ListItem>

                    <a href="https://pfw-smc.notion.site/pfw-smc/PFW-Sweetwater-Music-Center-17d134f1dd704a56909044ddb24d61ed">
                        <img src={logo} /> 
                    </a>
                </ListItem>
                
                <ListItem>
                &emsp;&emsp;<br></br><br></br><br></br><br></br>
                    <NavLink exact to='/' className="main-nav" activeClassName="main-nav-active">
                        <CustomBtn txt="View Calendar"/>                   
                    </NavLink>
                </ListItem>
                
                <ListItem>
                &emsp;&emsp;<br></br><br></br><br></br><br></br>
                    <NavLink to='/Recording' className="main-nav" activeClassName="main-nav-active" >
                        <CustomBtn txt="Book Recording Studio"/>
                    </NavLink>
                </ListItem>

                <ListItem>
                &emsp;&emsp;<br></br><br></br><br></br><br></br>
                    <NavLink to='/Rehearsal' className="main-nav" activeClassName="main-nav-active">
                        <CustomBtn txt="Book Rehearsal Spaces"/>
                    </NavLink>
                </ListItem>

                <ListItem>
                &emsp;&emsp;<br></br><br></br><br></br><br></br>
                    <NavLink to='/EditAndCollab' className="main-nav" activeClassName="main-nav-active">
                        <CustomBtn txt="Book Edit and Collab Spaces"/>
                    </NavLink>
                </ListItem>

            </List>
        </MUIDrawer>
    )

}

export default Drawer;