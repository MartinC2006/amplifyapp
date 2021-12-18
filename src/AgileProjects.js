import React, {Component} from 'react';

import AgileTable from './AgileTable';
import ProjectsTable from './ProjectsTable';
//import Form from './Form'

const RenderAgileProjects = (props) => 
{	
	const { agileProjects, removeAgProject, handleEnabled, projectDetails, filterAgileProject, filtAgPrj} = props  
	
	return (
				<div className=".app-projects-list">
					<label> Enter Agile Project Search Text:&nbsp;</label>
					<input id="search-text-agile" aria-describedby="search-text-agile"
					placeholder="Filter Agile Projects" autoFocus onChange={filterAgileProject}/>

					<AgileTable 	agileProjects={agileProjects} 
									removeAgProject={removeAgProject} 
									handleEnabled={handleEnabled}
									projectDetails={projectDetails}
									filtAgPrj={filtAgPrj}/>
					<br /><br />
				</div>
			);
}	

const RenderProjects = (props) => 
{	
	const { projects, getProjects, addAgileProject, projectDetails, filterProject, filtPrj} = props 
	
	return (
				<div className=".app-projects-list">
					<button onClick={getProjects}>Get Projects</button>
					<label> Select Agile Team Projects for <u>"Scheduled Bulk Timesheet Uploading"</u>&nbsp;</label>
					<ProjectsTable 	projects={projects} 
									addAgileProject={addAgileProject}									
									projectDetails={projectDetails}
									filterProject={filterProject}
									filtPrj={filtPrj} />
					<br /><br />
				</div>
			);
			
}	


class AgileProjects extends Component 
{	
	constructor(props)
	{
		super(props);

		this.state = 
		{
			agileProjects: [],
			projects: [],
			projectDetails: {},
			showAgileProjects: this.props.showAgileProjects,			
			showProjects: this.props.showProjects,
			filtAgPrj: '',
			filtPrj: '',
		};

		
		console.log("Input props:");
		console.log(this.props.showAgileProjects);	
		console.log(this.props.showProjects);

		console.log("Internal State:");
		console.log(this.showAgileProjects);	
		console.log(this.showProjects);
		
		this.showHideAgileProjects = this.showHideAgileProjects.bind(this);
		this.showHideProjects = this.showHideProjects.bind(this);
		this.getAgileProjects = this.getAgileProjects.bind(this);
		this.getProjects = this.getProjects.bind(this);
		this.addAgileProject = this.addAgileProject.bind(this);
		this.updateAgileProject = this.updateAgileProject.bind(this);
		this.removeAgProject = this.removeAgProject.bind(this);
		this.projectDetails = this.projectDetails.bind(this);
		this.handleEnabled = this.handleEnabled.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.filterAgileProject = this.filterAgileProject.bind(this);
		this.filterProject = this.filterProject.bind(this);
	}

	componentDidMount() 
	{
		// get all entities - GET
		this.getAgileProjects();

	}
	
	filterAgileProject(e)
	{
		this.setState({filtAgPrj: e.target.value});
	}
	
	filterProject(e)
	{
		this.setState({filtPrj: e.target.value});
	}
	
	showHideAgileProjects()		
	{		
		if(this.state.showAgileProjects === false)
		{ this.setState({showAgileProjects: true})
		}else {this.setState({showAgileProjects: false})}

		// set Parent State for showHideAgileProjects
		this.props.setShowAgileProjects(this.state.showAgileProjects);
	}	
	
	showHideProjects()		
	{
		if(this.state.showProjects === false)
		{ this.setState({showProjects: true})
		}else {this.setState({showProjects: false})}

		// set Parent State for showHideProjects
		this.props.setShowProjects(this.state.showProjects);
	}
	

	updateAgileProject(e) 
	{
		// update entity - PUT
		e.preventDefault();
	}
		
	handleEnabled(item) 
	{
		//alert('Enabled: ' +item.ProjectCode);
		
		if(item.Enabled === true)
		{ item.Enabled = false;}
		else {item.Enabled = true;}
		
		fetch("http://localhost:8000/Agile-Projects", 
		{
		  "method": "PATCH",
		  "headers": {
			"content-type": "application/json"
		  },
		  "body": JSON.stringify({
			id: item.id,
			ProjectCode: item.ProjectCode,
			ProjectName: item.ProjectName,
			Enabled: item.Enabled,
		  })
		})
		.then(response => response.json())
		.then(response => {
		  
		  //refresh Agile Projects List
		  this.getAgileProjects();
		})
		.catch(err => {
		  console.log(err);
		});
				
	}
	
	
	handleChange(changeObject) 
	{
		this.setState(changeObject);
	}
	

	getAgileProjects()
	{
		console.log(this.state);
		
		fetch('http://localhost:8000/Agile-Projects')
		  .then((response) => {
			  if (!response.ok) 
			  {
					throw new Error('Network response was not ok');
			  }
			  return response.json();
		  })
		  .then((data) => {
				this.setState({agileProjects: data});				
		  })
		  .catch((err) => {
			// Do something for an error here
			console.log(err) 
		  })
	}
	
	getProjects()
	{
		fetch('http://localhost:8000/Projects-lite')
		  .then((response) => {
			  if (!response.ok) 
			  {
					throw new Error('Network response was not ok');
			  }
			  return response.json();
		  })
		  .then((data) => {
				this.setState({projects: data});
				console.log('After Get projects state update!');
				console.log(this.state);
		  })
		  .catch((err) => {
			// Do something for an error here
			console.log(err) 
		  })
	}

	addAgileProject(newAgPrj)
	{
		console.log(newAgPrj);
		
		if(!newAgPrj) {return}
		
		// ensure Agile Project does not already exist
		if(this.state.agileProjects.find(o => o.ProjectCode === newAgPrj.ProjectCode))
		{
			alert("Project \"" + newAgPrj.ProjectName + "\" already added");
			return;
		}
		
		// get max id
		const maxId = this.state.agileProjects.reduce((item, prj) => item = item > prj.id ? item : prj.id, 0);
		console.log(maxId);
		
		// creates entity
		fetch("http://localhost:8000/Agile-Projects", 
		{
		  "method": "POST",
		  "headers": {
			"content-type": "application/json"
		  },
		  "body": JSON.stringify({
			id: maxId+1,
			ProjectCode: newAgPrj.ProjectCode,
			ProjectName: newAgPrj.ProjectName,
			Enabled: false,
		  })
		})
		.then(response => response.json())
		.then(response => {
		  console.log(response);
		  
		  //refresh Agile Projects List
		  this.getAgileProjects();
		})
		.catch(err => {
		  console.log(err);
		});
	}
	
	removeAgProject(agPrj) 
	{
		console.log(agPrj);
		
		// delete entity
		fetch("http://localhost:8000/Agile-Projects/"+agPrj.id, 
		{
		  "method": "DELETE",
		  "headers": {
			"content-type": "application/json"
		  }
		})
		.then(response => response.json())
		.then(response => {
		  console.log(response);
		  
		  //refresh Agile Projects List
		  this.getAgileProjects();
		})
		.catch(err => {
		  console.log(err);
		});		
	}
	
	projectDetails(ProjectCode) 
	{
		fetch('http://localhost:8000/Project-Details/'+ProjectCode)
		  .then(response => response.json())
		  .then((response) => {
				this.setState({projectDetails: response});
				this.props.setProject(this.state.projectDetails);
		  })
		  .catch((err) => {
			// Do something for an error here
			console.log(err) 
		  })		
	}
	
	render() 
	{
		let agileTable;
		let projectsTable;

	
		if(this.state.showAgileProjects === true)
		{	agileTable = <RenderAgileProjects 	agileProjects={this.state.agileProjects} 
												removeAgProject={this.removeAgProject} 
												handleEnabled={this.handleEnabled}
												projectDetails={this.projectDetails}
												filterAgileProject={this.filterAgileProject}
												filtAgPrj={this.state.filtAgPrj}/>
		}
		
		if(this.state.showProjects === true)
		{	projectsTable = <RenderProjects 	projects={this.state.projects} 
												getProjects={this.getProjects}
												addAgileProject={this.addAgileProject} 
												projectDetails={this.projectDetails}
												filterProject={this.filterProject}
												filtPrj={this.state.filtPrj}/>
		}
		
		
		return (
				<div style={{padding: "10px"}}>
					<h1>Agile Projects!</h1>
					<div className=".button">
						<button onClick={this.showHideAgileProjects}>Show / Hide Agile Projects</button>
						<br /><br />
						{agileTable}
					</div>	
					<div className=".button">
						<button onClick={this.showHideProjects}>Show / Hide Projects</button>
						<br /><br />
						{projectsTable}
					</div>
				</div>
		
			);
	}	
}

export default AgileProjects
