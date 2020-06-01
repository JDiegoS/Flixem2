import React from 'react';
import './Home.css';
import './Movie.css';
import chat from './Images/chat.png';
import { Link } from 'react-router-dom';

function MovieItem(props){


    return(
        <div style={{ overflowY: "scroll", marginTop: "20px", height: "750px" }}>
            <div className="Containerm">
                <img src={props.item.poster} className="Imagem" />
                <h3 className="Descrip" style={{textAlign: "center", fontSize: "xx-large"}}> {props.item.title}</h3>
                <h3 className="Descrip"> {props.item.director}</h3>
                <h3 className="Descrip"> {props.item.cast} </h3>
                <h3 className="Descrip"> {props.item.year} </h3>
                <h3 className="Descrip"> {props.item.type} </h3>
                <h3 className="Descrip"> {props.item.description} </h3>
                <h3 className="Descrip"> {props.item.genre} </h3>
                <h3 className="Descrip"> {props.item.duration} </h3>
                <h3 className="Descrip"> {props.item.platforms} </h3>
                <h3 className="Descrip"> {props.item.rated} </h3>
                <h3 className="Descrip"> {props.item.language} </h3>
                <h3 className="Descrip"> {props.item.country} </h3>
                <h3 className="Descrip"> {props.item.rating} </h3>
                <a onClick={() => {props.changeSelecte(props.item.ids)}} >
                    <Link style={{ color: "black", textDecoration: "none" }} to='/in/chat'>
                        <img src={chat} className="More" />
                    </Link>
                </a>
            </div>
        </div>
    )
}

export default MovieItem;