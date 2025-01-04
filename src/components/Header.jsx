import React from "react";
import headimg from '../../public/images/logooo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Header(){
    return (
        <header className="container d-flex align-items-center justify-content-center">\
        <img src={headimg} alt="head" className="image-fluid bg-primary rounded shadow p-2" />
        </header>
    )
}