import { Route, Routes } from 'react-router-dom'
import Home from '../components/userComponents/UserDash/Home'

export default function UserRoute (){
  return (
        <div>
            <Routes>
                    <Route path="/*" element={<Home />} />
            </Routes>
        </div>
    )
}

