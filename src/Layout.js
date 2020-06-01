import React, {useState} from 'react';
import { BrowserRouter as Router,  Route } from 'react-router-dom';
import './Layout.css';
import logo from './Images/logo.png';
import Home from './Home';
import Login from './Login';
import Search from './Search';
import Chat from './Chat';
import Profile from './Profile';
import Movie from './Movie';
import Menu from './Menu';
import CreateU from './CreateU';


export default class Layout extends React.Component {

    constructor() {
        super();
        this.state = {
            page: "Home",
            user: "",
            passwo: "",
            genre: ["None", "None", "None"],
            platf: [false, false, false, false],
            maxd: 0,
            mind: 0,
            maxs: 0,
            mins: 0,
            recomms: [],
            loading: true,
            selected: 1
        };
        this.userChange = this.userChange.bind(this);
        this.changePlatf = this.changePlatf.bind(this);
        this.changeGen = this.changeGen.bind(this);
        this.userModify = this.userModify.bind(this);
        this.changeLoa = this.changeLoa.bind(this);
        this.selectedMovie = this.selectedMovie.bind(this);
        this.resetRec = this.resetRec.bind(this);
    }

    userChange(newUser){
        this.setState({user: newUser});
        this.getUser();
    }
    async userModify(maxd, mind, maxs, mins, p1, p2, p3, p4, g1, g2, g3, newu){
        await this.setState({
            maxd: maxd,
            mind: mind,
            maxs: maxs,
            mins: mins,
            platf: [p1, p2, p3, p4],
            genre: [g1, g2, g3]
        });
        try{
            if (this.state.user != ""){
                var body = {
                    username: this.state.user,
                    minS: this.state.mins,
                    maxS: this.state.maxs,
                    minDuration: this.state.mind,
                    maxDuration: this.state.maxd,
                    newusername: newu
                };
                const response = await fetch("http://localhost:5000/users", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                    });
                const userData = await response.json();
                await this.setState({user: newu});
                
            }
            
        } catch (err){
        }

        try{
            const response = await fetch("http://localhost:5000/prefplat/" + this.state.user, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
                });
            const userData = await response.json();
            var i;
            for (i = 0; i<this.state.platf.length; i++)
            {
                if (this.state.platf[i] == true){
                    if(i == 0){
                        var body = {
                            username: this.state.user,
                            platform: "Netflix"
                            };
                    }
                    else  if(i == 1){
                        var body = {
                            username: this.state.user,
                            platform: "Hulu"
                            };
                    }
                    else if(i == 2){
                        var body = {
                            username: this.state.user,
                            platform: "Disney"
                            };
                    } 
                    else if(i == 3){
                        var body = {
                            username: this.state.user,
                            platform: "Amazon"
                            };
                    }
                
                    
                    const response = await fetch("http://localhost:5000/prefplat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                        });
                    const userData = await response.json();
                }
        }
            
        } catch (err){
        }

        try{
            const response = await fetch("http://localhost:5000/prefgenre/" + this.state.user, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
                });
            const userData = await response.json();
            var i;
            for (i = 0; i<this.state.genre.length; i++)
            {
                if (this.state.genre[i] != "" && this.state.genre[i] != "None"){
                    var body = {
                        username: this.state.user,
                        genre: this.state.genre[i]
                        };
                
                    const response = await fetch("http://localhost:5000/prefgenre", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                        });
                    const userData = await response.json();
                }
        }
             
        } catch (err){
        }
        await this.setState({ recomms: []});
        this.getUser();
        alert("Settings saved succesfully");

    }
    async changePlatf(p1, p2, p3, p4){
        await this.setState({
            platf: [p1, p2, p3, p4]
        });
    }
    async changeGen(p1, p2, p3){
        await this.setState({
            genre: [p1, p2, p3]
        });
    }
    getUser = async e =>{
        //e.preventDefault();
        try{
            if (this.state.user != ""){
                var body = {
                    username: this.state.user
                };
                const response = await fetch("http://localhost:5000/users/j", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                    });
                const userData = await response.json();
                if (userData.length > 0){
                    await this.setState({
                        maxd: userData[0].maxduration,
                        mind: userData[0].minduration,
                        maxs: userData[0].maxseason,
                        mins: userData[0].minseason
                    })

                }
            }
            
        } catch (err){
        }

        try{
            if (this.state.user != ""){

                const response = await fetch("http://localhost:5000/prefgenre/" + this.state.user, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                    });
                const userData = await response.json();
                if (userData.length > 0){
                    await this.setState({
                        genre: [userData[0].genre, "", ""]
                    })
                    if(userData.length == 2)
                    await this.setState({
                        genre: [userData[0].genre, userData[1].genre, ""]
                    }) 
                    else if(userData.length == 3)
                    await this.setState({
                        genre: [userData[0].genre, userData[1].genre, userData[2].genre]
                    })

                }
            }
            
        }
        catch (err){
    }
        try{
            if (this.state.user != ""){

                const response = await fetch("http://localhost:5000/prefplat/" + this.state.user, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                    });
                const userData = await response.json();
                if (userData.length > 0){
                    if(userData[0].platform == "Netflix")
                    {
                        await this.setState({
                        platf: [true, this.state.platf[1], this.state.platf[2], this.state.platf[3]]
                        })
                    }
                    else if(userData[0].platform == "Hulu")
                    {
                        await this.setState({
                        platf: [this.state.platf[0], true, this.state.platf[2], this.state.platf[3]]
                        })
                    }
                    else if(userData[0].platform == "Disney")
                    {
                        await this.setState({
                        platf: [ this.state.platf[0], this.state.platf[1], true,  this.state.platf[3]]
                        })
                    }
                    else if(userData[0].platform == "Amazon")
                    {
                        await this.setState({
                        platf: [this.state.platf[0], this.state.platf[1], this.state.platf[2], true]
                        })
                    }
                    if(userData.length == 2)
                    {
                        if(userData[1].platform == "Netflix")
                        {
                            await this.setState({
                            platf: [true, this.state.platf[1], this.state.platf[2], this.state.platf[3]]
                            })
                        }
                        else if(userData[1].platform == "Hulu")
                        {
                            await this.setState({
                            platf: [this.state.platf[0], true, this.state.platf[2], this.state.platf[3]]
                            })
                        }
                        else if(userData[1].platform == "Disney")
                        {
                            await this.setState({
                            platf: [ this.state.platf[0], this.state.platf[1], true,  this.state.platf[3]]
                            })
                        }
                        else if(userData[1].platform == "Amazon")
                        {
                            await this.setState({
                            platf: [this.state.platf[0], this.state.platf[1], this.state.platf[2], true]
                            })
                        }
                    }
                    else if(userData.length == 3)
                    {
                        if(userData[2].platform == "Netflix")
                        {
                            await this.setState({
                            platf: [true, this.state.platf[1], this.state.platf[2], this.state.platf[3]]
                            })
                        }
                        else if(userData[2].platform == "Hulu")
                        {
                            await this.setState({
                            platf: [this.state.platf[0], true, this.state.platf[2], this.state.platf[3]]
                            })
                        }
                        else if(userData[2].platform == "Disney")
                        {
                            await this.setState({
                            platf: [ this.state.platf[0], this.state.platf[1], true,  this.state.platf[3]]
                            })
                        }
                        else if(userData[2].platform == "Amazon")
                        {
                            await this.setState({
                            platf: [this.state.platf[0], this.state.platf[1], this.state.platf[2], true]
                            })
                        }
                    }
                    else if(userData.length == 4)
                    {
                        if(userData[3].platform == "Netflix")
                        {
                            await this.setState({
                            platf: [true, this.state.platf[1], this.state.platf[2], this.state.platf[3]]
                            })
                        }
                        else if(userData[3].platform == "Hulu")
                        {
                            await this.setState({
                            platf: [this.state.platf[0], true, this.state.platf[2], this.state.platf[3]]
                            })
                        }
                        else if(userData[3].platform == "Disney")
                        {
                            await this.setState({
                            platf: [ this.state.platf[0], this.state.platf[1], true,  this.state.platf[3]]
                            })
                        }
                        else if(userData[3].platform == "Amazon")
                        {
                            await this.setState({
                            platf: [this.state.platf[0], this.state.platf[1], this.state.platf[2], true]
                            })
                        }
                    }

                }
            }
        
        } catch (err){
        }
        this.getMovies();
    }

    async getMovies(){
        await this.setState({recomms: []});
        if(this.state.platf[3] == true){
            var primec = 1;
        }
        else{
            var primec = 3;
        }
        if(this.state.platf[2] == true){
            var disneyc = 1;
        }
        else{
            var disneyc = 3;
        }
        if(this.state.platf[1] == true){
            var huluc = 1;
        }
        else{
            var huluc = 3;
        }
        if(this.state.platf[0] == true){
            var netc = 1;
        }
        else{
            var netc = 3;
        }
        if(this.state.genre[0] == "None"){
            var gen1 = "";
        }
        else{
            var gen1 = this.state.genre[0];
        }
        if(this.state.genre[1] == "None"){
            var gen2 = "";
        }
        else{
            var gen2 = this.state.genre[2];
        }
        if(this.state.genre[2] == "None"){
            var gen3 = "";
        }
        else{
            var gen3 = this.state.genre[2];
        }
        var body = {
            primev: primec,
            netflix: netc,
            hulu: huluc,
            disneyp: disneyc,
            genre: gen1,
            genre2: gen2,
            genre3: gen3,
            minDuration: this.state.mind,
            maxDuration: this.state.maxd

        }
        const response = await fetch("http://localhost:5000/allp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        var userData = await response.json();
        if (userData.length < 6){
            const response2 = await fetch("http://localhost:5000/allp2", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)  
            });
            var userData = await response2.json();
        }
        var i;
        for (i = 0; i<userData.length; i++){
            await this.setState({
                recomms: this.state.recomms.concat([userData[i].id])
            })
        }
        await this.setState({ loading: false});
    }
    async resetRec(){
        await this.setState({recomms: []});
    }
    async pageChange(pagen){
        this.setState({
            page: pagen
        })
    }
    async changeLoa(sea){
        if (this.state.loading == true){
            await this.setState({loading: false})
        }else{
            await this.setState({loading: true})
        }
    }
    async selectedMovie(sel){
        await this.setState({selected: sel});
    }
    
    
    render() {
        return (
            <Router>

                <body className="App-header" style={{width: "100%"}}>
                    <div>
                        
                        <img src={logo} className="Logo" />
                        

                        <div>

                            <Route path="/in/" render={(props) => <Menu {...props} changeLoa={this.changeLoa} page={this.state.page} pageChange={this.pageChange}/>} />
                            <div style={{ marginLeft: "17%" }}>

                                <Route path="/" exact render={(props) => <Login {...props} user={this.state.user} userChange={this.userChange}/>} />
                                <Route path="/new" exact render={(props) => <CreateU {...props} user={this.state.user} userChange={this.userChange}/>} />
 
                                <Route path="/in/home"  render={(props) => <Home {...props} recomms={this.state.recomms} loading={this.state.loading} platf={this.state.platf} selectedMovie={this.selectedMovie} getMovies={this.getMovies}/>} />
                                <Route path="/in/search" render={(props) => <Search {...props} user={this.state.user} userChange={this.userChange} platf={this.state.platf} selectedMovie={this.selectedMovie} getMovies={this.getMovies}/>} />
                                <Route path="/in/chat" render={(props) => <Chat {...props} selected={this.state.selected} user={this.state.user} userChange={this.userChange}/>} />
                                <Route path="/in/profile" render={(props) => <Profile {...props} resetRec={this.resetRec} user={this.state.user} maxd={this.state.maxd} mind={this.state.mind} maxs={this.state.maxs} mins={this.state.mins} platf={this.state.platf} changePlatf={this.changePlatf} genre={this.state.genre} changeGen={this.changeGen} userMod={this.userModify}/>} />
                                <Route path="/in/movie" render={(props) => <Movie {...props} selectedMovie={this.selectedMovie} selected={this.state.selected}  platf={this.state.platf} userChange={this.userChange}/>} />
                            </div>
                        </div>

                    
                    </div>
                </body>
            </Router>

        );
    };
        

}