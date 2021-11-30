import React from 'react';
import axios from 'axios';
import './youtube.css';

class Youtube extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ids: [],
            buttonDisabled: true,
            id: "",
            category: ""
        }
    }

    componentWillMount(){
        this.getVideoList();
    }

    captureID=(event)=>{
        console.log(event.target.value)
        this.setState({
            id: event.target.value
        })
        if(event.target.value.length > 0){
            this.setState({buttonDisabled: false})
        } else {
            this.setState({buttonDisabled: true})
        }
    }

    captureCategory=(event)=>{
        console.log(event.target.value)
        this.setState({
            category: event.target.value
        })
    }

    getVideoList(){
        axios.get('http://localhost:8080/ids')
            .then(response=>{
                console.log("Response: ", response);
                console.log(response.data);
                this.setState({
                    ids: response.data
                })
            })
            .catch(error=>{
                console.log("Error: ", error);
            })
    }

    renderList=()=>{
        return this.state.ids.map((id)=>{
            return (
                <li>{id.id} &nbsp;&nbsp; {id.category}</li>
            );
        });
    }

    postNewID=()=>{
        let newID = {
            "id": this.state.id,
            "catgory": this.state.category
           }
        console.log("[New ID] ", newID);   
        axios.post('http://localhost:8080/ids', newID)
                .then(response=>{
                    console.log(response);
                    this.setState({
                        successid: response.data[0].id,
                        id: "",
                        category: ""
                    });

                })
                .catch(error=>{
                    console.log(error);
                })
    }

    render() {
        return (
        <div>
            <label style={{color: 'blue'}}>Video ID: </label>&nbsp;
            <input type="text" onChange={this.captureID} value={this.state.id} style={{borderColor: 'blue'}}></input>&nbsp;
            <button type="button" style={{color: 'blue', backgroundColor: 'transparent', borderColor: 'blue'}} onClick={this.postNewID} disabled={this.state.buttonDisabled}>Add</button>

            <br/><br/>
            <label style={{color: 'blue'}}>Category: </label>
            <select onChange={this.captureCategory} value={this.state.category} style={{borderColor: 'blue', color: 'blue', fontSize: 15}}>
                <option value=""></option>
                <option value="programming">programming</option>
                <option value="games">games</option>
                <option value="travel">travel</option>
                <option value="lifestyle">lifestyle</option>
            </select>

            <br/><br/>
            <ol style={{color: 'blue', paddingLeft: 200}}>
                {this.renderList()}
            </ol>
        </div>
        );
    }
}
 
export default Youtube;