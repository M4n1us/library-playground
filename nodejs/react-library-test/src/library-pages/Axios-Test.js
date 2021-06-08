import * as React from "react";
import axios from "axios";

export default class AxiosTest extends React.Component {
    render(){
        let config = {
            headers: {
            }
        }
        axios.get('http://localhost:3001/endpoint', config).then(response => {
            //Success
            console.log(response)
        }).catch(error => {
            //Error
            console.log(error.toJSON())
        })
        return(
            <h2>Axios</h2>
        )
    }
}