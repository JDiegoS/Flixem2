import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import more from './Images/more.png';
import chat from './Images/chat.png';

function RecomItem(props){


    if (props.item.cast.length > 70){
        var newt = props.item.cast.substr(0,69) + "...";
    }
    else{
        var newt = props.item.cast
    }
    if (props.item.description.length > 100){
        var newd = props.item.description.substr(0,99) + "...";
    }
    else{
        var newd = props.item.description
    }
    return(
        <div className="Containers">
            <img src={props.item.poster} className="Images" />
            <h3 className="Descrip" style={{textAlign: "center"}}> {props.item.title} </h3>
            <h3 className="Descrip"> {newt} </h3>
            <h3 className="Descrip"> {newd} </h3>
            <h3 className="Descrip"> {props.item.genre} </h3>
            <a onClick={() => {props.changeSelecte(props.item.ids)}} >
                <Link style={{ color: "black", textDecoration: "none" }} to='/in/movie'>
                    <img src={more} className="More" />
                </Link>
            </a>
            <a onClick={() => {props.changeSelecte(props.item.ids)}} >
                <Link style={{ color: "black", textDecoration: "none" }} to='/in/chat'>
                    <img src={chat} className="More" />
                </Link>
            </a>
        </div>
    )
}

export default RecomItem;