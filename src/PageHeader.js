import React from 'react'
import logo from './assets/LogoDots_White.png';
import { HomeOutlined, HelpOutline, Person } from '@material-ui/icons';
import './header.css'

const PageHeaderBody = (props) => 
{
	
	return (
		<div className="app-top-bar-container">
			<div className="app-top-bar-logo">	
				<img src={logo} alt="" width="50px" height="46px" hspace="20px" />
			</div>
			<div className="app-top-bar-page-name" style={{borderLeft: "2px solid white", height: "44px"}}>Gamma<br />Agile Projects
			</div>					
			<div className="app-top-bar-pages">				
					<div><button className="button" ><HomeOutlined /></button></div>
					<div><div className="app-top-bar-pages-text"><button className="button" >Projects</button></div></div>
			</div>	
		
			<div className="app-top-bar-menuBar-container">				
				<div style={{backgroundColor: "white", color: "#6800d2"}}><Person fontSize="small" />{props.user}</div>

				<div className="app-top-bar-menuBar-row-container">				
					<div><button className="button"><HelpOutline fontSize="small" /></button></div>
					<div className="app-top-bar-menuBar-row-right">				
						<div><button className="button" style={{backgroundColor: "white",color:"#6800d2"}}>Logout</button></div>				
					</div>	
				</div>
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

