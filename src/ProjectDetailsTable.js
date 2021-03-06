import React from 'react'

const ProjectDetailsTableHeader = () => 
{	return (
		<thead>
          <tr>
            <th>Project Code</th>
			<th>Project Name</th>
			<th>Project Manager</th>
			<th>Programme Code</th>	
			<th>Project Type</th>	
			<th>Last Edited By</th>	
			<th>Last Edit</th>	
			
          </tr>
        </thead>
	)
}

const ProjectDetailsTableBody = (props) => 
{
	console.log("PrjectDetailsTableBody:"); 
	console.log(props);
	
	var lastedit;
	if(typeof props.projectDet != 'undefined')
	{ 
		if(typeof props.projectDet.LastEditDate!= 'undefined')
		{ lastedit = JSON.stringify(new Date((props.projectDet.LastEditDate - (25567 + 1))*86400*1000));
		}else{ lastedit = "No LastEditDate";}
		
		return (
			<tbody>
				<tr key={0}>
					<td>{props.projectDet.ProjectCode}</td>
					<td>{props.projectDet.ProjectName}</td>
					<td>{props.projectDet.ProjectManagerCode}</td>
					<td>{props.projectDet.ProgrammeCode}</td>	
					<td>{props.projectDet.ProjectTypeName}</td>	
					<td>{props.projectDet.LastEditUser}</td>	
					<td>{lastedit}</td>
				</tr>
			</tbody>
			);
	}else
	{	return (
			<tbody>
				<tr key={0}>
					<td>No Project Details Data Found</td>
				</tr>
			</tbody>
		);
	}	
}

const ProjectDetailsTable = (props) =>
{
	const {projectDet}=props
	
		return (
			<div style={{padding: "10px"}}>
			<table>
				<ProjectDetailsTableHeader />	  
				<ProjectDetailsTableBody projectDet={projectDet} />							
			</table>
			</div>			
		)
}


export default ProjectDetailsTable