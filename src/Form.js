import React, {Component} from 'react'

class Form extends Component
{
	initialState = 
		{
			user: '',
			password:  '',
		}
		state = this.initialState
		
	
	handleChange = (event) => 
	{
		const {name, value} = event.target
		
		this.setState(
		{
			[name]:  value, 
		})
		
	}
	
	submitForm = () =>
	{
		this.props.handleSubmit(this.state);	
	}
	
	render()
	{
		const {user, password} = this.state
		
		return (
			<form>
				<label htmlFor="user">Username: </label>
				<input
					type="text"
					name="user"
					id="user"
					value={user}
					onChange={this.handleChange}/>
					<br /><br />
				<label htmlFor="password">Password: </label>
				<input 
					type="password"
					name="password"
					id="password"
					value={password}
					onChange={this.handleChange}/> <br /> <br />
				<input type="button" value="Submit" onClick={this.submitForm} />
			</form>
		);					
	}
}

export default Form
