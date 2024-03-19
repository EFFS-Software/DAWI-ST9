import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from 'moment';


export default function MessageWall() {
  const [dataMuro, setDataMuro] = useState([]);
  const navigate = useNavigate();
  const [contadorDeBorrar, setContadorDeBorrar] = useState(0);

  const getDatos = async () => {
    try {
      const url = `http://localhost:4000/api/publicacion`;
      const response = await axios.get(url);
      const datos = response.data;
      setDataMuro(datos);
    } catch (error) {
      if (error.response) {
        // El servidor devolvió un error
      } else if (error.request) {
        // El error ocurrió durante la solicitud
        console.error('Error de red durante la solicitud');
      } else {
        // Error desconocido
        console.error('Error desconocido', error);
      }
    }
  }

  const borraPublicacion = async (idPost)=>{
    const url = `http://localhost:4000/api/publicacion/${idPost}`;
    const response = await axios.delete(url);
    const datos = response.data;
    console.log(datos);
    setContadorDeBorrar( contadorDeBorrar+ 1 );
    console.log(contadorDeBorrar);
  }

  const editarPublicacion = (idPublcacion)=>{
    navigate(`/editarPost/${idPublcacion}`);
  }

  const crearPostHandler = ()=>{
    navigate('/crearPost');
  }

  // siempre se ejecuta cada vez que se renderiza el componente
  useEffect(() => {
    getDatos();
  }, [contadorDeBorrar]);

  return (
    <>
      <div  className="container">

        <button onClick={crearPostHandler}  className="btn btn-primary  w-100" type="button" >Crear Post</button>

        {
          dataMuro.map((item) => (
            <div key={item.id} className="card text-white bg-secondary mx-auto mt-3 mb-3 w-50" style={{width : '80%' }} >

              <div className="card-header">
                <label> {item.nombre_usuario} </label>      
                <button  onClick={ ()=> borraPublicacion(item.id) }  className="btn btn-danger mx-2" >Borrar</button> 
                <button onClick={ ()=> editarPublicacion(item.id) }  className="btn btn-warning mx-2" >Editar</button> 
              </div>

              <div className="card-body">
                <img src={`data:${item.mime_type};base64,${item.imagen}`}  style={{width:'100%'}} />
              </div>

              <div className="card-fotter">
                <p> <strong>{ moment(item.fecha_post).format('DD-MM-yyyy HH:mm:ss') }</strong> {item.caption}</p>
              </div>
              
            </div>
          ))
        }
      </div>
    </>
  )
}