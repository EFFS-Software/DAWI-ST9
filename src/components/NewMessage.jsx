import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewMessage() {
  const navigate =  useNavigate();
  const [form, setForm] = useState({
    nombre_usuario : "", 
    imagen : "", 
    caption : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name==="imagen") {
      const img = e.target.files[0];
      setForm({ ...form, [name]: img });
      return;
    }
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/api/publicacion";
    const datosFormulario = new FormData();
    datosFormulario.append("nombre_usuario", form.nombre_usuario);
    datosFormulario.append("caption", form.caption);
    datosFormulario.append("imagen" , form.imagen);

    await axios.post(url, datosFormulario);
    navigate('/muro')
  }

  return (
    <>
      <div className='contenedor'>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className='mb-3'> Crear Post </legend>
            <div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="nombre_usuario" name="nombre_usuario" placeholder="Usuario" onChange={handleChange} />
                <label htmlFor="nombre_usuario">Usuario de la Cuenta</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="caption" name="caption" placeholder="Mensaje" maxLength="20" onChange={handleChange} />
                <label htmlFor="caption">Mensaje</label>
              </div>

              <div className="form-floating mb-3">
                <input type="file" className="form-control" id="imagen" name="imagen" onChange={handleChange} />
                <label className="form-label mt-4">Imagen</label>
              </div>
            </div>

            <div className='mt-5'>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </fieldset>
        </form>

      </div>
    </>  
  )
}