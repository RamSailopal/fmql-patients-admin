import React from "react";
import { Menu, MenuItem, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
  
export default function AppMenu() {
    return (
        <Menu menuButton={
    <button className="btn-primary" style={{backgroundColor:'rgb(145, 196, 255)', height:'50px', width:'100px'}}>Menu</button>} transition>
            <MenuItem
                direction="bottom"
                position="right"
                offsetX="5"
                offsetY="25"
                href="/">Home
            </MenuItem>
            <MenuItem
                direction="bottom"
                position="right"
                offsetX="5"
                offsetY="25"
                href="/patients">List Patients
            </MenuItem>
            <SubMenu label="Select Patient" direction="right">
                    <MenuItem href="/patientbyid">
                    By ID</MenuItem>
                    <MenuItem href="/patientbyname">
                    By Name</MenuItem>
                    <MenuItem href="/patientbyssn">By SSN</MenuItem>
            </SubMenu>
            <SubMenu label="Analytics" direction="bottom">
                    <MenuItem href="/patientsbycity">
                    By City</MenuItem>
                    <MenuItem href="/patientsbystate">By State</MenuItem>
                    <MenuItem href="/patientsbyage">By Age</MenuItem>
                    <MenuItem href="/patientsbyoccupation">By Occupation</MenuItem>
            </SubMenu>
        </Menu>
    );
  }