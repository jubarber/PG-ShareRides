import React, { useState } from 'react'

export default function FormRegistro() {
    const [input, setInput] = useState({
        nombre:"",
        dni:"",
        contraseña:"",
        contraseña2:""
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    /* function handleSubmit(e){
        e.preventDefault();

    } */
    return (
        <div>
            <h1>Registrarse</h1>

            <form action="">
                {/* grupo nombre y apellido */}
                <div>
                    <label htmlFor="nombre">Nombre y apellido: </label>
                    <input 
                        type="text"
                        name='nombre'
                        id='nombre'
                        value={input.nombre}
                        placeholder="Nombre y Apellido"
                        onChange={handleChange}
                        />
                </div>
                {/* grupo dni*/}
                <div>
                    <label htmlFor="dni">DNI: </label>
                    <input 
                        type="number"
                        name='dni'
                        id='dni'
                        value={input.dni}
                        placeholder="numero de documento"
                        onChange={handleChange}
                        />
                </div>
                {/* grupo  contraseña */}
                <div>
                    <label htmlFor="contraseña">Contraseña: </label>
                    <input 
                        type="password"
                        name='contraseña'
                        id='contraseña'
                        value={input.contraseña}
                        placeholder="ingresar contraseña"
                        onChange={handleChange}
                        />
                </div>
                {/* grupo confirmar contraseña*/}
                <div>
                    <label htmlFor="contraseña2">Confirmar Contraseña: </label>
                    <input 
                        type="password"
                        name='contraseña2'
                        id='contraseña2'
                        value={input.confirmConstraseña} 
                        placeholder="confirmar contraseña"
                        onChange={handleChange}
                        />
                </div>
                {/* grupo terminos y condiciones */}
                <div>
                    <label>
                        <input type="checkbox" />
                    </label>
                </div>
                <button>Registrarme</button>         
            </form>
        </div>
    )
}
