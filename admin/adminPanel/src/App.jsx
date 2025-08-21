import Navbar from './component/Navbar/navbar'
import { Route, Routes } from 'react-router-dom'
import AddProducts from './component/AddProducts/AddProducts'
import ListProd from './component/ListProduct/listProd'
const App = () => {
  return (
    <div className='Admin'>
      <Navbar/>
      <div className="main">
      <Routes>
        <Route path ='/addProduct' element={<AddProducts/>}/>
        <Route path='/AllProducts' element={<ListProd/>} />
      </Routes>
      </div>
    </div>
  )
}

export default App
