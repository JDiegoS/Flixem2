import React, {useState} from 'react';
import './Home.css';
import './Profile.css';
import { Link, Redirect } from 'react-router-dom';


class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            verified: false
        };
    }

    setUsername(newU){
        this.setState({username: newU});
    }
    setPassword(newU){
        this.setState({password: newU});
    }
    setResult(arr){
        this.setState({result: arr});
    }
    setVerified(){
        this.setState({verified: true});
    }

    addUser = async e =>{
        e.preventDefault();
        
        try{
            if (this.state.username != ""){
                const response = await fetch("http://localhost:5000/users/" + this.state.username);
                const userData = await response.json();
                if (userData.length > 0){
                    if(userData[0].password == this.state.password){
                        this.setVerified();
                        this.props.userChange(this.state.username);
                    }
                    
                }
            }
            
        } catch (err){
            console.error(err.message);
        }
    }
    render(){
    if (this.state.verified == true){
        return (
            <div>
            <Redirect to='/in/home' />
            </div>
        )
    }
    

    return (
        <div>
            <div className="ContainerT">
                <h1 className="Title1"> Log In </h1>
            </div>
            <form onSubmit={this.addUser}>
                <div className="ContainerU" style={{ display: "inline-flex" }}>
                    <h2 className="Title3"> Username </h2>
                    <input type="text" className="Inputus" placeholder="Type here" onChange={e => this.setUsername(e.target.value)}/>
                </div>
                <div className="ContainerU" style={{ display: "inline-flex" }}>
                    <h2 className="Title3"> Password </h2>
                    <input className="Inputus" placeholder="Type here" onChange={e => this.setPassword(e.target.value)}/>
                </div>    
                <button type="submit" className="ContainerH" >
                    <h2 className="TitleS"> Submit </h2>
                </button>
                
            </form>
            
            <h2 className="TitleC"> Dont have an account? <Link style={{ color: "#6ead3a" }} to='/new'>Sign up here </Link></h2>
            

        </div>
    );
    }
}
export default Login;

