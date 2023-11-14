import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/main';
import DemoPage from './pages/demo';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Main />} />
          <Route path="/demo" element={<DemoPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
