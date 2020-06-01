import React from 'react';
import './Home.css';
import './Profile.css';
import { Link } from 'react-router-dom';

class Profile extends React.Component{
    constructor(){
        super();
        this.state = {
            plat1: true,
            plat2: false,
            plat3: false,
            plat4: false,
            gen1: "",
            gen2: "",
            gen3: "",
            mind: "",
            maxd: "",
            newu: "",
            mins: "",
            maxs: ""
        }
        this.modifyUserP = this.modifyUserP.bind(this);
    }

    async componentDidMount(){
        await this.setState({
            plat1: this.props.platf[0],
            plat2: this.props.platf[1],
            plat3: this.props.platf[2],
            plat4: this.props.platf[3],
            gen1: this.props.genre[0],
            gen2: this.props.genre[1],
            gen3: this.props.genre[2],
            mind: this.props.mind,
            maxd: this.props.maxd,
            newu: this.props.user,
            mins: this.props.mins,
            maxs: this.props.maxs
        })
    }
    plat1Change = e => {
        this.setState({ plat1: e.target.checked});

        this.props.changePlatf(this.state.plat1, this.state.plat2, this.state.plat3, this.state.plat4);
    }
    plat2Change = e => {
        this.setState({ plat2: e.target.checked});

    this.props.changePlatf(this.state.plat1, this.state.plat2, this.state.plat3, this.state.plat4);
    }
    plat3Change = e => {
        this.setState({ plat3: e.target.checked});

    this.props.changePlatf(this.state.plat1, this.state.plat2, this.state.plat3, this.state.plat4);
    }
    plat4Change = e => {
        this.setState({ plat4: e.target.checked});

    this.props.changePlatf(this.state.plat1, this.state.plat2, this.state.plat3, this.state.plat4);
    }
    gen1Change = e => {
        this.setState({ gen1: e.target.value});

        this.props.changeGen(this.state.gen1, this.state.gen2, this.state.gen3);
    }
    gen2Change = e => {
        this.setState({ gen2: e.target.value});

        this.props.changeGen(this.state.gen1, this.state.gen2, this.state.gen3);
    }
    gen3Change = e => {
        this.setState({ gen3: e.target.value});

    this.props.changeGen(this.state.gen1, this.state.gen2, this.state.gen3);
    }
    changeUser = e => {
        this.setState({ newu: e.target.value});
    }
    changeMind = e => {
        this.setState({ mind: e.target.value});
    }
    changeMaxd = e => {
        this.setState({ maxd: e.target.value});
    }
    changeMins = e => {
        this.setState({ mins: e.target.value});
    }
    changeMaxs = e => {
        this.setState({ maxs: e.target.value});
    }
    modifyUserP(){
        this.props.userMod(this.state.maxd, this.state.mind, this.state.maxs, this.state.mins, this.state.plat1, this.state.plat2, this.state.plat3, this.state.plat4, this.state.gen1, this.state.gen2, this.state.gen3, this.state.newu);
    }
    render(){

        return (
            <div>
                <div className="ContainerT">
                    <h1 className="Title1"> Profile </h1>
                </div>
                <div style={{ overflowY: "scroll", marginTop: "20px", height: "680px" }}>
                <div className="ContainerH">
                    <h2 className="Title2"> Preferences </h2>
                </div>

                <div className="ContainerP" style={{ display: "inline-flex"}}>
                    <h2 className="Title3" style={{marginRight: "10px"}}> Genre </h2>
                    <label for="gens1" className="Title5"> #1</label>
                    <select id="gens1" className="Selectm" onChange={this.gen1Change} value={this.state.gen1}>
                        <option value="None"> None </option>
                        <option value="Action"> Action </option>
                        <option value="Adventure"> Adventure </option>
                        <option value="Biography"> Biography </option>
                        <option value="Comedy"> Comedy </option>
                        <option value="Crime"> Crime </option>
                        <option value="Documentary"> Documentary </option>
                        <option value="Drama"> Drama </option>
                        <option value="Fantasy"> Fantasy </option>
                        <option value="Horror"> Horror </option>
                        <option value="Romance"> Romance </option>
                        <option value="Sci-Fi"> Sci-Fi </option>
                        <option value="Thriller"> Thriller </option>
                        <option value="War"> War </option>
                    </select>
                    <label for="gens2" className="Title5"> #2</label>
                    <select id="gens2" className="Selectm" onChange={this.gen2Change} value={this.state.gen2}>
                        <option value="None"> None </option>
                        <option value="Action"> Action </option>
                        <option value="Adventure"> Adventure </option>
                        <option value="Biography"> Biography </option>
                        <option value="Comedy"> Comedy </option>
                        <option value="Crime"> Crime </option>
                        <option value="Documentary"> Documentary </option>
                        <option value="Drama"> Drama </option>
                        <option value="Fantasy"> Fantasy </option>
                        <option value="Horror"> Horror </option>
                        <option value="Romance"> Romance </option>
                        <option value="Sci-Fi"> Sci-Fi </option>
                        <option value="Thriller"> Thriller </option>
                        <option value="War"> War </option>
                    </select>
                    <label for="gens3" className="Title5"> #3</label>
                    <select id="gens3" className="Selectm" onChange={this.gen3Change} value={this.state.gen3}>
                        <option value="None"> None </option>
                        <option value="Action"> Action </option>
                        <option value="Adventure"> Adventure </option>
                        <option value="Biography"> Biography </option>
                        <option value="Comedy"> Comedy </option>
                        <option value="Crime"> Crime </option>
                        <option value="Documentary"> Documentary </option>
                        <option value="Drama"> Drama </option>
                        <option value="Fantasy"> Fantasy </option>
                        <option value="Horror"> Horror </option>
                        <option value="Romance"> Romance </option>
                        <option value="Sci-Fi"> Sci-Fi </option>
                        <option value="Thriller"> Thriller </option>
                        <option value="War"> War </option>
                    </select>
                    
                </div>
                <div className="ContainerP" style={{ display: "inline-flex" }}>
                    <h2 className="Title3" style={{marginRight: "20px"}}> Platform </h2>
                    
                    <input id="netflix" type="checkbox" checked={this.state.plat1}  onChange={this.plat1Change} />
                    <label for="netflix" className="Title5"> Netflix</label>
                    <input id="hulu" type="checkbox" checked={this.state.plat2}  onChange={this.plat2Change} />
                    <label for="hulu" className="Title5"> Hulu</label>
                    <input id="disney" type="checkbox" checked={this.state.plat3}  onChange={this.plat3Change} />
                    <label for="disney" className="Title5"> Disney+</label>
                    <input id="amazon" type="checkbox" checked={this.state.plat4}  onChange={this.plat4Change} />
                    <label for="amazon" className="Title5"> Amazon Prime</label>
                </div>
                <div className="ContainerP" style={{ display: "inline-flex" }}>
                    <h2 className="Title3"> Movie Length (min)</h2>
                    <input className="Inputu" placeholder={"Min " + this.props.mind} value={this.state.mind} onChange={this.changeMind}/>
                    <input className="Inputu" placeholder={"Max " + this.props.maxd} value={this.state.maxd} onChange={this.changeMaxd}/>
                </div>
                <div className="ContainerP" style={{ display: "inline-flex" }}>
                    <h2 className="Title3"> Series Length (min)</h2>
                    <input className="Inputu" placeholder={"Min " + this.props.mins} value={this.state.mins} onChange={this.changeMins}/>
                    <input className="Inputu" placeholder={"Max " + this.props.maxs} value={this.state.maxs} onChange={this.changeMaxs}/>
                </div>
 

                <div className="ContainerH">
                    <h2 className="Title2"> User </h2>
                </div>

                <div className="ContainerU" style={{ display: "inline-flex" }}>
                    <h2 className="Title3"> Username </h2>
                    <input className="Inputus" placeholder={this.props.user} value={this.state.newu} onChange={this.changeUser}/>
                </div>

                    <div className="ContainerU" style={{ display: "inline-flex" }}>
                        <h2 className="Title3"> Password </h2>
                    <input className="Inputus" placeholder="*******" />
                </div>

                
                <button className="ContainerH" onClick={this.modifyUserP}>
                    <h2 className="Title2"> Apply Changes </h2>
                </button>

                <a onClick={this.props.resetRec}>
                <Link style={{ color: "black", textDecoration: "none" }} to='/'>
                    <div className="ContainerH">
                        <h2 className="Title2"> Sign Out </h2>
                    </div>
                </Link>
                </a>
                </div>

            </div>
        );
    }
}

export default Profile;