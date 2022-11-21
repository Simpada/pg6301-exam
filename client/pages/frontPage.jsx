import {Link} from "react-router-dom";
import React from "react";

export function FrontPage() {
    return <div>
        <h1>The API and Web-design Restaurant</h1>
        <ul>
            <li><Link to={"/menu"}>View Menu</Link></li>
            <li><Link to={"/menu/add"}>Add an Item to The Menu</Link></li>
        </ul>
    </div>
}