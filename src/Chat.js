import React from 'react';
import './Home.css';
import './Chat.css';
import MessageItem from './MessageItem';


class Chat extends React.Component{
    constructor(){
        super();
        this.state = {
            ids: 1,
            moviet: "Inception",
            chatData: [],
            inpu: "",
            first: 0

        }
        this.addMessage = this.addMessage.bind(this);
    }
    async componentDidMount(){
        if( this.state.first == 0){

        
            await this.setState({ids: this.props.selected});
            
            const response = await fetch("http://localhost:5000/allp/" + this.state.ids , {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const userData = await response.json();
            await this.setState({moviet: userData[0].title});
            this.loadMessages();
            this.state.first ++;
        }
    }
    async loadMessages(){
        await this.setState({chatData: []});
        const response = await fetch("http://localhost:5000/chat/" + this.state.moviet , {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const userData = await response.json();

        if (userData.length > 0){
            var i;
            for (i = 0; i < userData.length; i++){
                await this.setState({
                    chatData: this.state.chatData.concat([userData[i]])
                })
            }
        }
        var box = document.getElementById('box');
        box.scrollTop = box.scrollHeight;
        var inp = document.getElementById('inp');
        inp.value = "";

    }
    async setInpu(newi){
        await this.setState({inpu: newi})
    }
    addMessage = async e =>{
        e.preventDefault();
        if (this.state.inpu != ""){
            const response = await fetch("http://localhost:5000/chat/" , {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            var userData = await response.json();
            var body = {
                user: this.props.user,
                message: this.state.inpu,
                movie: this.state.moviet,
                id: userData[0].inde
            }
            const response2 = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)  
            });
            this.loadMessages();
        }

    }

    render(){
        const movieList = this.state.chatData.map(item => <MessageItem key={item.id} userc={this.props.user} item={item} />)
    return (
        
        <div>
            <div className="ContainerT">
                <h1 className="Title1"> Discussion </h1>
                
            </div>
            <div className="ContainerH">
                <h2 className="Title2"> Topic: {this.state.moviet}</h2>

            </div>
            
            <div className="Txtb">
                <article id="box" readOnly className="Chatb" style={{ resize: "none", overflowY: "scroll" }}>
                    {movieList}
                </article>
            </div>
            <form onSubmit={this.addMessage}>
                <input id="inp" className="Searchc" onChange={e => this.setInpu(e.target.value)} placeholder="Type here" />
                <button type="submit" id="sendb" className="Bttn"> Send </button>
            </form>

        </div>
       
    );
    }
}


export default Chat;