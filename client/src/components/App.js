import styled from "styled-components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home"
import GlobalStyles from "../GlobalStyles";
import Navbar from "./navbar/Navbar";
import User from "./profile/User"
import EditProfile from './profile/EditProfile';
import NewTool from "./addDeleteTool/NewTool";
import ToolDetails from "./ToolDetails";
import RentMe from "./rent/RentMe";
import RentByProfession from "./rent/RentByProfession";
import RentByBrand from "./rent/RentByBrand";
import SearchedTools from "./navbar/SearchedTools"
import { ToastContainer } from "react-toastify";

const App = () => {

  return (
    <Wrapper>
        <Router>
          <GlobalStyles/>
          <ToastContainer position="top-center"/>  
          <Navbar/>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tool/details/:id" element={<ToolDetails />} />
              <Route path="/profile/:username" element={<User/>} />
              <Route path="/new-tool" element={<NewTool/>} />
              <Route path="/edit-profile" element={<EditProfile/>} />
              <Route path="/rent-tool/:id" element={<RentMe/>} />
              <Route path="/rent-tool/profession/:id" element={<RentByProfession/>} />
              <Route path="/rent-tool/brand/:id" element={<RentByBrand/>} />
              <Route path="/tool/search" element={<SearchedTools/>} />
            </Routes>

        </Router>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default App
