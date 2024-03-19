import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { Login } from './components/Login'
import UserRegister from './components/UserRegister';
import MessageWall from './components/MessageWall';
import NewMessage from './components/NewMessage';
import EditMessage from './components/EditMessage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Login/>} />
          <Route path='/registro' element = {<UserRegister/>} />
          <Route path='/muro' element = {<MessageWall/>} />
          <Route path='/crearPost/' element = {<NewMessage/>} />
          <Route path='/editarPost/:idPost' element = {<EditMessage/>} />
          {/* <Route path='/crudUsuario' element = {<UsuarioCrud/>} /> */}
          {/* <Route path='/editarCrudUsuario/:nombre_usuario' element = {<EditUsuario/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App