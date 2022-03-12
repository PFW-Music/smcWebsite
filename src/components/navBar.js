import React from 'react'
import CustomBtn from './customBtn'
import logo from '../SOM2.png'
import logoMobile from'../logo.png'
import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"; 
import { NavLink } from 'react-router-dom';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

const styles = makeStyles({
    bar:{
        paddingTop: "0.40rem",
        backgroundColor: "#000000",
        ['@media (max-width:780px)']: { 
           flexDirection: "column"
          }
    },
    logo: {
        width: "100%", 
        ['@media (max-width:780px)']: { 
           display: "none"
           }
    },
    logoMobile:{
        width: "100%", 
        display: "none", 
        ['@media (max-width:780px)']: { 
            display: "inline-block"
            }
    },
    menuItem: {
        cursor: "pointer", 
        flexGrow: 1,
        "&:hover": {
            color:  "#CFB991"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem"    }
    }
})

function NavBar() {
    const classes = styles()
    return (
        <div color="rgba(0, 0, 0, 0.87)" className={classes.bar}>
        <Box sx={{ width: "90%",  flexGrow: 2 }}>
        <Grid container spacing={0} columns={16} justifyContent="space-between" alignItems="center">

        <Grid item xs="auto">
            <Box sx={{ m: 3,  flexGrow: 1 }}>
            <a href="https://pfw-smc.notion.site/pfw-smc/PFW-Sweetwater-Music-Center-17d134f1dd704a56909044ddb24d61ed">
                <img src={logo} /> 
            </a>
            </Box>
        </Grid>      
        
        <Grid item xs>
            <Box sx={{ m: 2,  flexGrow: 1 }}>
            <Grid container justifyContent="center" alignItems="center" columns={15}>

            <Grid item xs="auto">
            <NavLink exact to='/' style={{ textDecoration: 'none' }} className="main-nav" activeClassName="main-nav-active">
                <CustomBtn txt="Book Rooms"/>                   
            </NavLink>
            </Grid>

            <Grid item xs="auto">
            <NavLink to='/schedules' style={{ textDecoration: 'none' }} className="main-nav" activeClassName="main-nav-active" >
                <CustomBtn txt="Room Schedules"/>
            </NavLink>
            </Grid>

            <Grid item xs="auto">
            <NavLink to='/gear' style={{ textDecoration: 'none' }} className="main-nav" activeClassName="main-nav-active">
                <CustomBtn txt="Gear Checkout"/>
            </NavLink>
            </Grid>  

            <Grid item xs="auto">
            <NavLink to='/contact' style={{ textDecoration: 'none' }} className="main-nav" activeClassName="main-nav-active">
                <CustomBtn txt="Contact Us"/>
            </NavLink>
            </Grid>  
                     
            </Grid>
            </Box> 
        </Grid>
        
          
        </Grid>
        </Box> 
        </div>
    )
}

export default NavBar
