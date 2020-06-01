import React from 'react';
import './Home.css';
import RecomItem from './RecomItem';
import { Link } from 'react-router-dom';

class Home extends React.Component{
    constructor(){
        super();
        this.state= {
            titles: [],
            movieData: [],
            ins: false,
            selecte: 0
        }
        this.changeSelecte = this.changeSelecte.bind(this);
    }
    async componentDidUpdate(prevProps, prevState){
        console.log(this.props.recomms)
        if(this.props.recomms[0] != this.state.titles[0] && this.state.titles.length == 9){
            console.log("cmbio")
            await this.setState({titles: []})
        }
        if(this.props.recomms.length == 9 && this.state.titles.length == 0 && this.state.ins == false){   
            console.log(this.state.titles)
            await this.setState({ins: true})
            var i;
            if(this.state.titles.length == 0){
                for (i = 0; i<this.props.recomms.length; i++){
                    await this.setState({
                        titles: this.state.titles.concat([this.props.recomms[i]])
                    })
                }
                this.setMovies();
                await this.setState({ins: false})
            }
        }

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
    }
    changeSelecte(sel){
        this.props.selectedMovie(sel);
    }
    render(){
        const movieList = this.state.movieData.map(item => <RecomItem key={item.id} item={item} selecte={this.state.selecte} changeSelecte={this.changeSelecte} />)

        return (
            <div>

                <div className="ContainerT">
                    <h1 className="Title1"> Recommendations </h1>
                </div>
                <div style={{ overflowY: "scroll", marginTop: "20px"}}>
                <div className="ContainerH">
                    <h2 className="Title2"> For You </h2>
                </div>
                <div className="Grids">
                    
                    {movieList}
                    
                </div>
                </div>
            </div>
        );
    }
}

export default Home;