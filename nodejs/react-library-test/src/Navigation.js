import React from "react";
import { Link } from "react-router-dom";


export default class Navigation extends React.Component {
    render(){
        return (
            <nav>
                <ul className="navbar-nav mr-auto">
                    <li>
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/axiosTest">
                            Axios
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/fileUpload">
                            FileUpload
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}