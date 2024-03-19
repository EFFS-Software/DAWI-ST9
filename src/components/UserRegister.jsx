import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const navigate =  useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const [dataForm, setDataForm] = useState({
    nombre_usuario: "", 
    correo_electronico: "", 
    contrasena: "", 
    nombre: "", 
    apellido: "", 
    activo: true, 
    id_rol: 1
  });

  const handlerChange = (e)=>{
    const {name, value} = e.target;
    setDataForm({ ...dataForm, [name]: value });
  }

  const handlerConfirmPassword = (e) => {
    if(e.target.value != dataForm.contrasena) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (!isVisible){
      const url = 'http://localhost:4000/api/usuarioCrud';
      await axios.post(url, dataForm);
      navigate('/');
    }
  }

  return (
    <>
      <div className='contenedor'>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className='mb-3'> Registro de Usuario </legend>
            <div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="nombre_usuario" name="nombre_usuario" placeholder="Usuario" onChange={handlerChange} />
                <label htmlFor="nombre_usuario">Usuario de la Cuenta</label>
              </div>

              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="correo_electronico" name="correo_electronico" placeholder="Mensaje" onChange={handlerChange} />
                <label htmlFor="correo_electronico">Correo</label>
              </div>

              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="contrasena" name="contrasena" placeholder="contrasena" autoComplete="off" onChange={handlerChange} />
                <label htmlFor="contrasena">Password</label>
              </div>

              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="confirmar_contrasena" name="confirmar_contrasena" placeholder="contrasena" autoComplete="off" onChange={handlerConfirmPassword} />
                <label htmlFor="confirmar_contrasena">Confirmar Password</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre Usuario" onChange={handlerChange} />
                <label htmlFor="nombre">Nombre del Usuario</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="apellido" name="apellido" placeholder="Apellido Usuario" onChange={handlerChange} />
                <label htmlFor="apellido">Apellido del Usuario</label>
              </div>
            </div>

            <div className='mt-5'>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </fieldset>
        </form>
      </div>
      {isVisible && (
        <div className='contenedor mt-4'>
          <div className="alert alert-dismissible alert-danger">
            <strong>Atención!</strong> Contraseña y confirmar contraseña son diferentes.
          </div>
        </div>
      )}
    </>
  )
}