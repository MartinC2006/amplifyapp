import React, {Component} from 'react';

import ProjectDetailsTable from './ProjectDetailsTable';

const RenderProjectDetails = (props) => 
{	
	return (
				<div className=".app-projects-list">
			
					<ProjectDetailsTable 	projectDet={props.projectDet}/>
					<br /><br />
				</div>
			);
}	

class ProjectDetails extends Component 
{	
	componentDidMount() 
	{
			
	}
	
	render() 
	{
		return (
				<div>
					<h1>Project Details!</h1><br /><br />
						<RenderProjectDetails projectDet={this.props.projectDet} />
						<br></br>
				</div>	
				);
	}	
}

export default ProjectDetails
