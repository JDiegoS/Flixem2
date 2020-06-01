import React from 'react';
import './Home.css';
import search from './Images/search.png';
import RecomItem from './RecomItem';
import more from './Images/more.png';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            submitted: false,
            titles: [],
            movieData: [],
            inpi: ""
        }
        this.getMovies = this.getMovies.bind(this);
        this.changeSelecte = this.changeSelecte.bind(this);
    }

    async setInpi(newi){
        await this.setState({inpi: newi})
    }
    async getMovies(){
        await this.setState({
            movieData: [],
            titles: []
        })
        var body = {
            input: this.state.inpi
        }
        const response = await fetch("http://localhost:5000/allps/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const userData = await response.json();
        var i;
        for (i = 0; i<userData.length; i++){
            await this.setState({
                titles: this.state.titles.concat(userData[i].id)
            })
        }
        this.setMovies();
    }
    async setMovies(){
        var i;
        for (i = 0; i<this.state.titles.length; i++){
            if(this.props.platf[0] == true){
                const response = await fetch("http://localhost:5000/allpt/" + this.state.titles[i] , {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const userData = await response.json();
                const response2 = await fetch("http://localhost:5000/allpi/" + this.state.titles[i] , {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    });
                const movieI = await response2.json();
                if(movieI.length > 0 && userData.length > 0){
                    await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.titles[i],
                            poster: movieI[0].image,
                            title: userData[0].title,
                            cast: "Cast: " + userData[0].cast,
                            description: "Synopsis: " + userData[0].description
                        })
                    })
                }
                else if(movieI.length == 0 && userData.length > 0){
                    await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.titles[i],
                            poster: 'N/A',
                            title: userData[0].title,
                            cast: "Cast: " + userData[0].cast,
                            description: "Synopsis: " + userData[0].description
                        })
                    })
                }
                else if (userData.length == 0 && movieI.length == 0){
                    const response = await fetch("http://localhost:5000/allp/" + this.state.titles[i] , {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                    });
                    const userData = await response.json();
                    var genrest = userData[0].genre.replace(/,/g, ", ");
                    await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.titles[i],
                            poster: "N/A",
                            title: userData[0].title,
                            cast: "Year: " + userData[0].year,
                            description: "Director: " + userData[0].directors,
                            genre: "Genre: " + genrest
                        })
                    })
                }
                else if (userData.length == 0 && movieI.length > 0){
                    const response = await fetch("http://localhost:5000/allp/" + this.state.titles[i] , {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                    });
                    const userData = await response.json();
                    var genrest = userData[0].genre.replace(/,/g, ", ");
                    await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.titles[i],
                            poster: movieI[0].image,
                            title: userData[0].title,
                            cast: "Year: " + userData[0].year,
                            description: "Director: " + userData[0].directors,
                            genre: "Genre: " + genrest
                        })
                    })
                }
                
            }
            else if (this.props.platf[2] == true){
                const response = await fetch("http://localhost:5000/allpd/" + this.state.titles[i] , {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const userData = await response.json();

                const response2 = await fetch("http://localhost:5000/allpi/" + this.state.titles[i] , {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    });
                const movieI = await response2.json();
                if(movieI.length > 0 && userData.length > 0){
                    await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.titles[i],
                            poster: movieI[0].image,
                            title: userData[0].title,
                            cast: "Cast: " + userData[0].cast,
                            description: "Synopsis: " + userData[0].description
                        })
                    })
                }
                else if (movieI.length == 0 && userData.length > 0) {
                    await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.titles[i],
                            poster: "N/A",
                            title: userData[0].title,
                            cast: "Cast: " + userData[0].cast,
                            description: "Synopsis: " + userData[0].description
                        })
                    })
                }
                else if (userData.length == 0 && movieI.length == 0){
                    const response = await fetch("http://localhost:5000/allp/" + this.state.titles[i] , {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                    });
                    const userData = await response.json();
                    var genrest = userData[0].genre.replace(/,/g, ", ");
                    await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.titles[i],
                            poster: "N/A",
                            title: userData[0].title,
                            cast: "Year: " + userData[0].year,
                            description: "Director: " + userData[0].directors,
                            genre: "Genre: " + genrest
                        })
                    })
                }
                else if (userData.length == 0 && movieI.length > 0){
                    const response = await fetch("http://localhost:5000/allp/" + this.state.titles[i] , {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                    });
                    const userData = await response.json();
                    var genrest = userData[0].genre.replace(/,/g, ", ");
                    await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.titles[i],
                            poster: movieI[0].image,
                            title: userData[0].title,
                            cast: "Year: " + userData[0].year,
                            description: "Director: " + userData[0].directors,
                            genre: "Genre: " + genrest
                        })
                    })
                }
            }
            else{
                const response = await fetch("http://localhost:5000/allp/" + this.state.titles[i] , {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const userData = await response.json();

                const response2 = await fetch("http://localhost:5000/allpi/" + this.state.titles[i] , {
                        method: "GET",
                        headers: { "Content-Type": "application/json" }
                    });
                const movieI = await response2.json();
                if(movieI.length > 0 && userData.length > 0){
                    await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.titles[i],
                            poster: movieI[0].image,
                            title: userData[0].title,
                            cast: "Year: " + userData[0].year,
                            description: "Director: " + userData[0].directors,
                            genre: "Genre: " + userData[0].genre
                        })
                    })
                }
                else {
                    await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.titles[i],
                            poster: "N/A",
                            title: userData[0].title,
                            cast: "Year: " + userData[0].year,
                            description: "Director: " + userData[0].directors,
                            genre: "Genre: " + userData[0].genre
                        })
                    })
                }
            }       

        }
        this.changeSub();
    }
    async changeSub(){
        await this.setState({submitted: true});
    }
    changeSelecte(sel){
        this.props.selectedMovie(sel);
    }
    render(){
        
        let movieList;
        if(this.state.submitted == true){
            movieList = this.state.movieData.map(item => <RecomItem key={item.id} item={item} selecte={this.state.selecte} changeSelecte={this.changeSelecte} />)
        }
        else{
            movieList = <a style={{color: "white"}}></a>
        }
        
        return (
            <div>
                
                <div className="ContainerT">
                    <h1 className="Title1"> Search </h1>
                </div>
                <div style={{ paddingLeft: "100px" }}>
                    <input className="SearchI" onChange={e => this.setInpi(e.target.value)} placeholder="Search movies, series, genres..." />
                    <img src={search} onClick={this.getMovies} style={{ verticalAlign: "middle", height: "45px", paddingBottom: "10px" }} />
                </div>
                <div style={{ overflowY: "scroll", marginTop: "20px"}}>

                    <div className="Grids">
                        
                        {movieList}
                        
                    </div>
                </div>

            </div>
        );
    }
}


export default Search;