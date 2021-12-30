import React, {Component} from 'react';
import AgileProjects from './AgileProjects'
import ProjectDetails from './ProjectDetails'
import PageHeader from './PageHeader'
import Form from './Form'
import ReactModal from 'react-modal'

const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };


  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement(document.getElementById('root'));

const ModalDiag = () =>
{
	let subtitle;

	const [modalIsOpen, setIsOpen] = React.useState(false);

	function handleOpenModal () 
	{
		setIsOpen(true);
	}
	  
	function handleAfterOpenModal ()
	{
		subtitle.style.color = '#f00'
	}
	
	
	function handleCloseModal () 
	{
		setIsOpen(false);
	}

		   return (
			  <div>
				<br /><br />
				<button onClick={handleOpenModal}>Trigger Modal</button>

			    <ReactModal isOpen={modalIsOpen}
							onAfterOpen={handleAfterOpenModal}
							onRequestClose={handleCloseModal}
							style={customStyles}
							contentLabel="Example Modal"
							>
                			<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
							<button onClick={handleCloseModal}>Close Modal</button>
						
							<div>I am a modal</div>
							<form>
								<input />
								<button>tab navigation</button>
								<button>stays</button>
								<button>inside</button>
								<button>the modal</button>
							</form>
        		</ReactModal>
				<br /><br />
			  </div>
		   );
}



class App extends Component 
{	
	constructor(props)
	{
		super(props);
	
		this.state = 
		{
			page: "Agile",
			auth: false,
			authCode: 0,
			authText: '',
			submit: false,
			user: '',
			password: '',
			showDetails: false,
			projectDet: {},
			showAgileProjects: false,
			showProjects: false,
			showModal: false,
		};
		
		this.testPatchResRestrict = this.testPatchResRestrict.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setProject = this.setProject.bind(this);
		this.goBack = this.goBack.bind(this);
		this.setShowAgileProjects = this.setShowAgileProjects.bind(this);
		this.setShowProjects = this.setShowProjects.bind(this);
	} 

	handleChange(changeObject) 
	{
		//this.setState(changeObject);
	}
	
	goBack()
	{
		this.setState({showDetails: false, projectDet: ''});
	}
	
	setShowAgileProjects(shAgileProjects)
	{
		this.setState({showAgileProjects: shAgileProjects});
	}
	
	setShowProjects(shProjects)
	{
		this.setState({showProjects: shProjects});
	}
	

	handleSubmit(submitObject) 
	{
		console.log("App HandleSubmit: "+submitObject.user+" | "+submitObject.password);
		this.setState({user: submitObject.user, password: submitObject.password});
		
		this.userAuthenticate(this.state.user,this.state.password);
		this.setState({submit: true});
	}
	
	setProject(project)
	{
		this.setState({projectDet: project, showDetails: true});		
	}

	userAuthenticate(user, password)
	{
		// creates entity
		fetch("http://localhost:8000/users/authenticate", 
		{
		  "method": "POST",
		  "headers": {
			"content-type": "application/json",
			"accept": "application/json"
		  },
		  "body": JSON.stringify({
			username: user,
			password: password,
		  })
		})
		.then(response => {this.setState({authCode: response.status, authText: response.statusText});}) 
		.then(response => {
			if(this.state.authCode === 200)
			{	this.setState({auth: true, submit: false,});
			
			}else{return false;}
		  return true;
		})
		.catch(err => {
		  console.log("Caught Error: "+err);
		  this.setState({authCode: err.status, authText: err.statusText});
			
		  return false;
		});
	}


		
	testPatchResRestrict()
	{
		var res = 'PMOINTEGUSER2';
		var prjCode = 'LNPRJ00005';
		
		// creates entity
		fetch("http://localhost:8000/resource-restrict", 
		{
		  "method": "PATCH",
		  "headers": {
			"content-type": "application/json",
			"accept": "application/json"
		  },
		  "body": JSON.stringify({
			resourceID: res,
			ProjectCode: prjCode
		  })
		})
		.then(response => {this.setState({authCode: response.status, authText: response.statusText});}) 
		.then(response => {
			if(this.state.authCode === 200)
			{	this.setState({auth: true, submit: false,});
			
			}else{return false;}
		  return true;
		})
		.catch(err => {
		  console.log("Caught Error: "+err);
		  this.setState({authCode: err.status, authText: err.statusText});
			
		  return false;
		});
	}
		
	
	componentDidMount() 
	{
		
//////////////////////////////////////////////////////
// override authentication whilst server offline.
//		this.setState({auth: true,});
//////////////////////////////////////////////////////
		
	}
	
	render() 
	{	
		const {showAgileProjects, showProjects} = this.state;
				
		let mainBody;
		var errorCode = '';
		var form = '';		
		var pTitle = "Authenticate!";
		
		if(this.state.auth === true)
		{	
			form = "";
			errorCode = "";
			pTitle = '';
			if(this.state.showDetails === true)
			{		mainBody = 	<ProjectDetails projectDet={this.state.projectDet} goBack={this.goBack} />
			}else 
			{		mainBody = 	<AgileProjects setProject={this.setProject} 
												setShowAgileProjects={this.setShowAgileProjects} 
												setShowProjects={this.setShowProjects} 
												showAgileProjects={showAgileProjects} 
												showProjects={showProjects}
												/>
					
			}
			console.log(this.state);
		}else 
		{	
			form = <Form 	handleSubmit={this.handleSubmit}/>
			
			if(this.state.submit === true)
			{
				errorCode = <h3 style={{backgroundColor: "rgb(255,255,153)", color: "red", width: "400px"}}>
				Error: {this.state.authCode} - {this.state.authText}</h3>
			}
		}
		
		return (
				<div>
				<PageHeader user={this.state.user}/>
					<div style={{padding: "10px"}}>
						<h1>{pTitle}</h1><br />
						{errorCode}
						{form}
						{mainBody}						
					</div>
					<ModalDiag />
					<button onClick={this.testPatchResRestrict}>test Patch Res</button>
				</div>				
				);
	}
}

export default App