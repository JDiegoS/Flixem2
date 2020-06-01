import React from 'react';
import './Home.css';
import './Movie.css';
import breaking from './Images/breakingb.png';
import MovieItem from './MovieItem';

class Movie extends React.Component{
    constructor() {
        super();
        this.state = {
            movieData: [],
            id: 0
        }
        this.changeSelecte = this.changeSelecte.bind(this);
    }

    async componentDidMount(){
        
        await this.setState({
            id: this.props.selected
        })
        this.setMovie();
    }
    async setMovie(){

        if (this.state.movieData.length > 1){
            await this.setState({movieData: []})
        }
        const response = await fetch("http://localhost:5000/allpg/" + this.state.id , {
                method: "GET",
                headers: { "Content-Type": "application/json" }
        });
        const genData = await response.json();
        var platforms = "";
        var cont = 0;
        if (genData[0].netflix == 1){
            platforms = platforms.concat("Netflix");
            cont ++;
        }
        if (genData[0].hulu == 1){
            if (cont > 0){
                platforms = platforms.concat(", Hulu");
            }
            else{
                platforms = platforms.concat("Hulu");
                cont ++;
            }
            
        }
        if (genData[0].primev == 1){
            if (cont > 0){
                platforms = platforms.concat(", Prime Video");
            }
            else{
                platforms = platforms.concat("Prime Video");
                cont ++;
            }
        }
        if (genData[0].disneyp == 1){
            if (cont > 0){
                platforms = platforms.concat(", Disney+");
            }
            else{
                platforms = platforms.concat("Disney+");
            }
        }
        var duru = "";
        
        if(this.props.platf[0] == true){
            const response = await fetch("http://localhost:5000/allpt/" + this.state.id , {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const userData = await response.json();
            const response2 = await fetch("http://localhost:5000/allpi/" + this.state.id , {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
            const movieI = await response2.json();
            if(movieI.length > 0 && userData.length > 0){
                if(userData[0].duration < 12){
                    duru = userData[0].duration + " seasons"
                }
                else {
                    duru = userData[0].duration + " minutes"
                }
                await this.setState({
                    movieData: this.state.movieData.concat({
                        ids: this.state.id,
                        poster: movieI[0].image,
                        title: userData[0].title,
                        cast: "Cast: " + userData[0].cast,
                        description: "Synopsis: " + userData[0].description,
                        rated: "Rated: " + userData[0].rating,
                        genre: "Genres: " + userData[0].genre,
                        year: "Release Date: " + userData[0].year,
                        duration: "Duration: " + duru,
                        director: "Director: " + userData[0].director,
                        language: "Language: " + userData[0].language,
                        country: "Country: " + userData[0].country,
                        platforms: "Available On: " + platforms,
                        type: "Type: " + userData[0].type
                    })
                })
            }
            else if(movieI.length == 0 && userData.length > 0){
                if(userData[0].duration < 12){
                    duru = userData[0].duration + " seasons"
                }
                else {
                    duru = userData[0].duration + " minutes"
                }
                await this.setState({
                    
                    movieData: this.state.movieData.concat({
                        ids: this.state.id,
                        poster: "N/A",
                        title: userData[0].title,
                        cast: "Cast: " + userData[0].cast,
                        description: "Synopsis: " + userData[0].description,
                        rated: "Rated: " + userData[0].rating,
                        genre: "Genres: " + userData[0].genre,
                        year: "Release Date: " + userData[0].year,
                        duration: "Duration: " + duru,
                        director: "Director: " + userData[0].director,
                        language: "Language: " + userData[0].language,
                        country: "Country: " + userData[0].country,
                        platforms: "Available On: " + platforms,
                        type: "Type: " + userData[0].type
                    })
                })
            }
            else if (userData.length == 0 && movieI.length == 0){
                const response = await fetch("http://localhost:5000/allp/" + this.state.id , {
                method: "GET",
                headers: { "Content-Type": "application/json" }
                });
                const userData = await response.json();
                var genrest = userData[0].genre.replace(/,/g, ", ");
                if(userData[0].duration < 12){
                    duru = userData[0].duration + " seasons"
                }
                else {
                    duru = userData[0].duration + " minutes"
                }
                await this.setState({
                    movieData: this.state.movieData.concat({
                        ids: this.state.id,
                        poster: "N/A",
                        title: userData[0].title,
                        cast: "Cast: " + userData[0].cast,
                        description: "Synopsis: " + userData[0].description,
                        rated: "Rated: " + userData[0].rating,
                        genre: "Genres: " + genrest,
                        year: "Release Date: " + userData[0].year,
                        duration: "Duration: " + duru,
                        director: "Director: " + userData[0].director,
                        language: "Language: " + userData[0].language,
                        country: "Country: " + userData[0].country,
                        platforms: "Available On: " + platforms,
                        type: "Type: " + userData[0].type
                    })
                })
            }
            else if (userData.length == 0 && movieI.length > 0){
                const response = await fetch("http://localhost:5000/allp/" + this.state.id , {
                method: "GET",
                headers: { "Content-Type": "application/json" }
                });
                const userData = await response.json();
                var genrest = userData[0].genre.replace(/,/g, ", ");
                if(userData[0].duration < 12){
                    duru = userData[0].duration + " seasons"
                }
                else {
                    duru = userData[0].duration + " minutes"
                }
                await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.id,
                            poster: movieI[0].image,
                            title: userData[0].title,
                            director: "Director: " + userData[0].directors,
                            genre: "Genre: " + userData[0].genre,
                            year: "Release Date: " + userData[0].year,
                            duration: "Duration: " + duru,
                            director: "Director: " + userData[0].director,
                            language: "Language: " + userData[0].language,
                            country: "Country: " + userData[0].country,
                            platforms: "Available On: " + platforms,
                            rated: "Rated: " + userData[0].rated,
                            type: "Type: " + userData[0].type
    
                        })  
                })
            }
            
        }
        else if (this.props.platf[2] == true){
            const response = await fetch("http://localhost:5000/allpd/" + this.state.id , {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const userData = await response.json();

            const response2 = await fetch("http://localhost:5000/allpi/" + this.state.id , {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
            const movieI = await response2.json();
            if(movieI.length > 0 && userData.length > 0){
                if(userData[0].duration < 12){
                    duru = userData[0].duration + " seasons"
                }
                else {
                    duru = userData[0].duration + " minutes"
                }
                await this.setState({
                    movieData: this.state.movieData.concat({
                        ids: this.state.id,
                        poster: movieI[0].image,
                        title: userData[0].title,
                        cast: "Cast: " + userData[0].cast,
                        description: "Synopsis: " + userData[0].description,
                        rated: "Rated: " + userData[0].rated,
                        genre: "Genres: " + userData[0].genre,
                        year: "Release Date: " + userData[0].year,
                        duration: "Duration: " + duru,
                        director: "Director: " + userData[0].director,
                        language: "Language: " + userData[0].language,
                        country: "Country: " + userData[0].country,
                        platforms: "Available On: " + platforms,
                        rating: "Ratings: " + userData[0].rating + " out of " + userData[0].votes + " votes",
                        type: "Type: " + userData[0].type

                    })
                })
            }
            else if (movieI.length == 0 && userData.length > 0) {
                if(userData[0].duration < 12){
                    duru = userData[0].duration + " seasons"
                }
                else {
                    duru = userData[0].duration + " minutes"
                }
                await this.setState({
                    movieData: this.state.movieData.concat({
                        ids: this.state.id,
                        poster: 'N/A',
                        title: userData[0].title,
                        cast: "Cast: " + userData[0].cast,
                        description: "Synopsis: " + userData[0].description,
                        rated: "Rated: " + userData[0].rated,
                        genre: "Genres: " + userData[0].genre,
                        year: "Release Date: " + userData[0].year,
                        duration: "Duration: " + duru,
                        director: "Director: " + userData[0].director,
                        language: "Language: " + userData[0].language,
                        platforms: "Available On: " + platforms,
                        country: "Country: " + userData[0].country,
                        rating: "Ratings: " + userData[0].rating + " out of " + userData[0].votes + " votes",
                        type: "Type: " + userData[0].type
                    })
                })
            }
            else if (userData.length == 0 && movieI.length == 0){
                const response = await fetch("http://localhost:5000/allp/" + this.state.id , {
                method: "GET",
                headers: { "Content-Type": "application/json" }
                });
                const userData = await response.json();
                var genrest = userData[0].genre.replace(/,/g, ", ");
                if(userData[0].duration < 12){
                    duru = userData[0].duration + " seasons"
                }
                else {
                    duru = userData[0].duration + " minutes"
                }
                await this.setState({
                    movieData: this.state.movieData.concat({
                        ids: this.state.id,
                        poster: "N/A",
                        title: userData[0].title,
                        cast: "Cast: " + userData[0].cast,
                        description: "Synopsis: " + userData[0].description,
                        rated: "Rated: " + userData[0].rating,
                        genre: "Genres: " + genrest,
                        year: "Release Date: " + userData[0].year,
                        duration: "Duration: " + duru,
                        director: "Director: " + userData[0].director,
                        language: "Language: " + userData[0].language,
                        country: "Country: " + userData[0].country,
                        platforms: "Available On: " + platforms,
                        type: "Type: " + userData[0].type
                    })
                })
            }
            else if (userData.length == 0 && movieI.length > 0){
                const response = await fetch("http://localhost:5000/allp/" + this.state.id , {
                method: "GET",
                headers: { "Content-Type": "application/json" }
                });
                const userData = await response.json();
                var genrest = userData[0].genre.replace(/,/g, ", ");
                if(userData[0].duration < 12){
                    duru = userData[0].duration + " seasons"
                }
                else {
                    duru = userData[0].duration + " minutes"
                }
                await this.setState({
                        movieData: this.state.movieData.concat({
                            ids: this.state.id,
                            poster: movieI[0].image,
                            title: userData[0].title,
                            director: "Director: " + userData[0].directors,
                            genre: "Genre: " + userData[0].genre,
                            year: "Release Date: " + userData[0].year,
                            duration: "Duration: " + duru,
                            director: "Director: " + userData[0].director,
                            language: "Language: " + userData[0].language,
                            country: "Country: " + userData[0].country,
                            platforms: "Available On: " + platforms,
                            rated: "Rated: " + userData[0].rated,
                            type: "Type: " + userData[0].type
    
                        })  
                })
            }
        }
        else{
            const response = await fetch("http://localhost:5000/allp/" + this.state.id , {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const userData = await response.json();

            const response2 = await fetch("http://localhost:5000/allpi/" + this.state.id , {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
            const movieI = await response2.json();
            if(movieI.length > 0 && userData.length > 0){
                if(userData[0].duration < 12){
                    duru = userData[0].duration + " seasons"
                }
                else {
                    duru = userData[0].duration + " minutes"
                }
                await this.setState({
                    movieData: this.state.movieData.concat({
                        ids: this.state.id,
                        poster: movieI[0].image,
                        title: userData[0].title,
                        director: "Director: " + userData[0].directors,
                        genre: "Genre: " + userData[0].genre,
                        year: "Release Date: " + userData[0].year,
                        duration: "Duration: " + duru,
                        director: "Director: " + userData[0].director,
                        language: "Language: " + userData[0].language,
                        country: "Country: " + userData[0].country,
                        platforms: "Available On: " + platforms,
                        rated: "Rated: " + userData[0].rated,
                        type: "Type: " + userData[0].type

                    })
                })
            }
            else {
                if(userData[0].duration < 12){
                    duru = userData[0].duration + " seasons"
                }
                else {
                    duru = userData[0].duration + " minutes"
                }
                await this.setState({
                    movieData: this.state.movieData.concat({
                        ids: this.state.id,
                        poster: "N/A",
                        title: userData[0].title,
                        genre: "Genre: " + userData[0].genre,
                        year: "Release Date: " + userData[0].year,
                        duration: "Duration: " + duru,
                        director: "Director: " + userData[0].director,
                        language: "Language: " + userData[0].language,
                        country: "Country: " + userData[0].country,
                        platforms: "Available On: " + platforms,
                        rated: "Rated: " + userData[0].rated,
                        type: "Type: " + userData[0].type
                    })
                })
            }
        }       
    }
    changeSelecte(sel){
        this.props.selectedMovie(sel);
    }

    render(){
        const movieList = this.state.movieData.map(item => <MovieItem key={item.id} item={item} selecte={this.state.selecte} changeSelecte={this.changeSelecte} />)

        return (
            <div>
                {movieList}

            </div>
        );
    }
}

export default Movie;