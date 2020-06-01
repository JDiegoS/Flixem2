import React from 'react';
import './Home.css';
import './Movie.css';

function MessageItem(props){

    var alig = "left";
    if(props.userc == props.item.user){
        alig = "right";
    }

    return(
        <p style={{ color: "#4c4947", wordWrap: "break-word", backgroundColor: "#efedef", paddingLeft: "15px", paddingTop: "10px", paddingBottom: "10px", textAlign: alig, borderRadius: "25px", marginLeft: "15px", width: "93%", marginBottom: "10px", paddingRight: "35px" }}>
                {props.item.user + ":"}
                <br></br>
                {props.item.message}
        </p>
    )
}

export default MessageItem;