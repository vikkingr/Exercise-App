import React, { Component } from 'react';
import axios from 'axios';



export default class CreateUsers extends Component {
    constructor(props){
        super(props);

        // Binding methods to this.

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Create Properties that correspond to the fields of the MongoDB document

        this.state= {
            username: ''
        }
    }


    // Updating username

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);


        // Sending HTTP FROM front end TO backend
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));


        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}
                            />
                    </div>
                    <div className="from-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}