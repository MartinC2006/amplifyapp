import React from 'react'
import logo from './assets/LogoDots_White.png';
import { HomeOutlined, HelpOutline, Person } from '@material-ui/icons';
import './header.css'

const PageHeaderBody = (props) => 
{
	
	return (
		<div className="app-top-bar">
			<div className="title-text">	
				<img src={logo} alt="" width="50px" height="46px" hspace="20px" />
			</div>
			<div className="pagesStyle" style={{borderLeft: "2px solid white", height: "44px"}}>Gamma<br />Agile Projects
			</div>					
			<div className=".title-text">
				<ul id="menu">
					<li><button className=".button" ><HomeOutlined /></button></li>
					<li><button className=".button" >Projects</button></li>
				</ul>
			</div>	
		
			<div className="menuBar">
				<ul id="menu">
					<li><Person fontSize="small" />{props.user}</li>	
				</ul>	
				<ul style={{listStyleType: "none"}}>
					<li><button className=".button"><HelpOutline fontSize="small" /></button>&nbsp;
					<button className="fancy-buttton" style={{backgroundColor: "white", color: "#6800d2"}}>Logout</button></li>
				</ul>			
			</div>
		</div>
	
		);
}

const PageHeader = (props) =>
{
	const {user} = props
	 
	return (
			<PageHeaderBody user={user}/>							
		)
}

export default PageHeader

