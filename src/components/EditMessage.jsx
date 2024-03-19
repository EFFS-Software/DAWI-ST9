import { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function editMessage() {
  const navigate =  useNavigate();
  const {idPost} = useParams();
  const [data , setData] = useState({
    caption : ""
  });

  const handleChange = (event)=>{
    const { name , value } = event.target
    setData({...data,  [name]:value });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const url = `http://localhost:4000/api/publicacion/${idPost}`;
    await axios.put(url,data);
    navigate('/muro')
  }

  return (
    <>
      <div className='contenedor'>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className='mb-3'> Editar Post </legend>
            <div>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="caption" name="caption" placeholder="Mensaje" maxLength="20" onChange={handleChange} />
                <label htmlFor="caption">Mensaje</label>
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