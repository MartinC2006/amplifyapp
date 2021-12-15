import React from 'react'

const AgileTableHeader = () => 
{	return (
		<thead>
          <tr>
            <th>Id</th>
            <th>Project Code</th>
			<th>Project Name</th>
			<th>Click on <br />'x' to delete</th>
		    <th>Enabled?</th>
			<th>View Details</th>			
          </tr>
        </thead>
	)
}

const AgileTableBody = (props) => 
{
	if(props.agileProjects != null)
	{
		const rows = props.agileProjects.filter(row => 
							{
								if (!props.filtAgPrj) return true
								
								if (row.ProjectCode.includes(props.filtAgPrj) || row.ProjectName.includes(props.filtAgPrj)) 
								{
									return true
								}
								return false
							})	
					.map((row,index) => 
					{	return (
									<tr key={index}>
										<td>{row.id}</td>
										<td>{row.ProjectCode}</td>	  
										<td>{row.ProjectName}</td>				  
										<td>
											<button onClick={() => 
												{if(window.confirm(`Are you sure you want to delete Agile project: \r\n\r\n${row.ProjectCode} - ${row.ProjectName}`)) 
												props.removeAgProject(row)
									        	}}>
												'x'
											</button>
										</td>
										<td>
											<input type="checkbox" checked={row.Enabled} onChange={() => props.handleEnabled(row)}/>
										</td>	
										<td>
											<button onClick={() => props.projectDetails(row.ProjectCode)}>View Details</button>
										</td>						
									</tr>
							);
							
					});
		return (<tbody>{rows}</tbody>)
	}else {return (<tbody></tbody>)}
}

const AgileTable = (props) =>
{
	const {agileProjects, removeAgProject, handleEnabled, projectDetails, filtAgPrj} = props  
		 
	return (
		<table>
			<AgileTableHeader />	  
			<AgileTableBody 	agileProjects={agileProjects} 
								removeAgProject={removeAgProject}
								handleEnabled={handleEnabled}
								projectDetails={projectDetails}
								filtAgPrj={filtAgPrj}	/>							
		</table>		
		)
}

export default AgileTable