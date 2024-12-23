'use client';
import { Outlet, Link } from "react-router-dom";

export default function ResourceCalendar() {
    return(
        <ul>
        <li>  <Link to="/">Home</Link></li>
        <li><Link to="/News">News</Link></li>
      
      
      </ul>
    )


}