import React, {useState} from 'react';
import './Home.css';
import './Profile.css';
import { Link, Redirect } from 'react-router-dom';


class CreateU extends React.Component {
    constructor(){
        super();
        this.state = {
            usern: "",
            passw: "",

            verified: false
        };
    }

    setUsername(newU){
        this.setState({usern: newU});
    }
    setPassword(newU){
        this.setState({passw: newU});
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
            if (this.state.usern != ""){
                const response = await fetch("http://localhost:5000/users/" + this.state.usern);
                const userData = await response.json();
                
                if (userData.length == 0){
                    var body = {
                        username: this.state.usern,
                        password: this.state.passw,
                        minDuration: 0,
                        maxDuration: 150,
                        mins: 0,
                        maxs: 5
                    };
                    const response = await fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                    });
                    alert("User created succesfully");
                    
                    this.setVerified();
                    
                }
                else{

                        alert("User already exists");
                }
            }
            
        } catch (err){
        }
    }
    render(){
    if (this.state.verified == true){

        return (
            <div>
            <Redirect to='/' />
            </div>
        )
    }
    

    return (
        <div>
            <div className="ContainerT">
                <h1 className="Title1"> Sign Up </h1>
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
                    <h2 className="TitleS"> Create User </h2>
                </button>
                
            </form>
            
            <h2 className="TitleC"> Already have an account? <Link style={{ color: "#6ead3a" }} to='/'>Log in here </Link></h2>
            

        </div>
    );
    }
}
export default CreateU;

