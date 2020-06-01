import React from 'react';
import './Layout.css';
import logo from './Images/logo.png';
import home from './Images/home.png';
import home2 from './Images/home2.png';
import search from './Images/search.png';
import chat from './Images/chat.png';
import profile from './Images/profile.png';
import search2 from './Images/search2.png';
import chat2 from './Images/chat2.png';
import profile2 from './Images/profile2.png';
import { Link } from 'react-router-dom';
import Search from './Search';
import Profile from './Profile';

class Menu extends React.Component{
    constructor(){
        super();
        this.state = {
            currentPage: "Home",
            homeimg: home2,
            searchimg: search,
            chatimg: chat,
            profileimg: profile
        }
    }
    async setPage(num){
        
        if (num != this.state.currentPage){
            var selected = document.getElementById(this.state.currentPage);
            selected.classList.toggle('highlight');
            if(this.state.currentPage == "Home"){
                await this.setState({ homeimg: home})
            }
            else if(this.state.currentPage == "Search"){
                await this.setState({ searchimg: search})
            }
            else if(this.state.currentPage == "Chat"){
                await this.setState({ chatimg: chat})
            }
            else if(this.state.currentPage == "Profile"){
                await this.setState({ profileimg: profile})
            }

            await this.setState({ currentPage: num })

            if(this.state.currentPage == "Home"){
                this.props.changeLoa("sea");
                await this.setState({ homeimg: home2})

            }
            else if(this.state.currentPage == "Search"){
                await this.setState({ searchimg: search2})
            }
            else if(this.state.currentPage == "Chat"){
                await this.setState({ chatimg: chat2})
            }
            else if(this.state.currentPage == "Profile"){
                await this.setState({ profileimg: profile2})
            }
            
            
            var news = document.getElementById(this.state.currentPage);
            news.classList.toggle('highlight');
        }
        else if(num == "Home"){
            this.props.changeLoa("sea");
        }
        

    }
    render(){
    return (

        <ul className="List">

            <a onClick={() => {this.setPage("Home")}}>
            
                <Link style={{ color: "black", textDecoration: "none" }} to='/in/home'>
                    <li><img src={this.state.homeimg} className="Icon" /><header id="Home" className="IconT highlight"> Home </header></li>
                </Link>
            </a>
            <a onClick={() => {this.setPage("Search")}}>
                <Link style={{ color: "black", textDecoration: "none" }} to='/in/search'>
                    <li><img src={this.state.searchimg} className="Icon" /><header id="Search" className="IconT"> Search </header></li>
                </Link>
            </a>
            <a onClick={() => {this.setPage("Chat")}}>
                <Link style={{ color: "black", textDecoration: "none" }} to='/in/chat'>
                    <li><img src={this.state.chatimg} className="Icon" /><header id="Chat" className="IconT"> Discussion </header></li>
                </Link>
            </a>
            <a onClick={() => {this.setPage("Profile")}}>
                <Link style={{ color: "black", textDecoration: "none" }} to='/in/profile'>
                    <li><img src={this.state.profileimg} className="Icon" /><header id="Profile" className="IconT"> Profile </header></li>
                </Link>
            </a>
            
        </ul>

    );
    }
}

export default Menu;
