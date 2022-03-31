import React from "react";
import {Link} from 'react-router-dom';
import "./CardViaje.css"
import { VscLocation } from "react-icons/vsc";
import {MdSmokeFree, MdMasks, MdPets} from "react-icons/md";
import {FaSuitcaseRolling} from "react-icons/fa"


export default function Card ({title, image, diets,spoonacularScore, dishTypes, createdInDB}){

    
    const handleClick=(e)=>{

    }
    return (
        <div className="container-card font-mono italic">   
        <div className="data-card">
            <div className="prueba">
                <i className="text-orange-600 text-xs text-left w-full flex flex-col-reverse w-4/12"><VscLocation className="icono text-purple-600"/>origen</i><i className="text-base w-full">CABA </i>               
            </div>
                <i className="text-right w-full text-sm	">Buenos Aires</i>            
            <div className="prueba">
                <i className="text-sky-400 text-xs text-left w-full flex flex-col-reverse w-4/12"><VscLocation className="icono text-purple-600"/>destino</i><i className="text-base w-full">Mar del Plata </i>               
            </div>
                <i className="text-right w-full text-sm	">Buenos Aires</i>
                <h5 className="text-center text-xs">
            14:00 hs <p className="text-right text-xs">28-12-2022</p>
          </h5>                        <div className="dos"><h5 className="text-left">x lugares libre</h5></div>        </div>     
        <div className="icon-card">
            <div className="iconos">
                <MdPets/>
                <MdSmokeFree />
                <FaSuitcaseRolling />
                <MdMasks />
            </div>
            <Link to={"/"} id="ver"><div><button className="ver-button">Ver</button></div></Link>
        </div> 
 
            
        </div>
    )
}