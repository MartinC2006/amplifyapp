import React from 'react'

const ProjectsTableHeader = (props) => 
{	return (
		<thead>
          <tr>
            <th>Project Code</th>
			<th>Project Name</th>
			<th>Add Project?</th>	
			<th>	<input id="search-text-agile" aria-describedby="search-text-agile"
					placeholder="Filter Projects" autoFocus onChange={props.filterProject}/>
			</th>
			
          </tr>
        </thead>
	)
}

const ProjectsTableBody = (props) => 
{
	if(props.projects != null)
	{ 
		const rows = props.projects.filter(row => 
							{
								if (!props.filtPrj) return true
								
								if (row.ProjectCode.includes(props.filtPrj) || row.ProjectName.includes(props.filtPrj)) 
								{
									return true
								}
								return false
							})
							.map((row,index) => 
							{return (
										<tr key={index}>
											<td>{row.ProjectCode}</td>	  
											<td>{row.ProjectName}</td>				  
											<td>
												<button onClick={() => props.addAgileProject(row)}>Add Agile Project</button>
											</td>
											<td>
												<button onClick={() => props.projectDetails(row.ProjectCode)}>View Details</button>
											</td>						
										</tr>
									);
							 });
						
		return <tbody>{rows}</tbody>
	}else {return <tbody></tbody>}
}

const ProjectsTable = (props) =>
{
	const {projects, addAgileProject, projectDetails, filterProject, filtPrj} = props  
	 
		return (
			<table>
				<ProjectsTableHeader filterProject={filterProject}/>	  
				<ProjectsTableBody 	projects={projects} 
									addAgileProject={addAgileProject}
									projectDetails={projectDetails} 
									filtPrj={filtPrj}	/>									
			</table>		
		)
}


export default ProjectsTable