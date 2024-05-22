import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import ListaTemas from './components/temas/listatemas/ListaTemas'
import { AuthProvider } from './contexts/AuthContext'
import FormularioTema from './components/temas/formulariotema/FormularioTema'
import DeletarTema from './components/temas/deletartema/DeletarTema'

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <div className='min-h-[80vh]'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/temas" element={<ListaTemas />} />
            <Route path="/cadastrotema" element={<FormularioTema />} />
            <Route path="/editartema/:id" element={<FormularioTema />} />
            <Route path="/deletartema/:id" element={<DeletarTema />} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
