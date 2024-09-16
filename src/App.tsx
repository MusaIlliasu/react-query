import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <>

      {/* Toastify */}
      <ToastContainer position="top-center" autoClose={4000} pauseOnHover={true} />
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;