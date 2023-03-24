import styled from "styled-components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home"
import GlobalStyles from "../GlobalStyles";
import Navbar from "./navbar/Navbar";
import UserProfile from "./profile/UserProfile"
import EditProfile from './profile/EditProfile';
import NewTool from "./addDeleteTool/NewTool";
import ToolDetails from "./ToolDetails";
import RentMe from "./rent/RentMe";
import RentByProfession from "./rent/RentByProfession";
import RentByBrand from "./rent/RentByBrand";
import { ToastContainer } from "react-toastify";

const App = () => {

  return (
    <Wrapper>
        <Router>
          <GlobalStyles/>
          <ToastContainer />  
          <Navbar/>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tool/details/:id" element={<ToolDetails />} />
              <Route path="/profile/:username" element={<UserProfile/>} />
              <Route path="/new-tool" element={<NewTool/>} />
              <Route path="/edit-profile" element={<EditProfile/>} />
              <Route path="/rent-tool/:id" element={<RentMe/>} />
              <Route path="/rent-tool/profession/:id" element={<RentByProfession/>} />
              <Route path="/rent-tool/brand/:id" element={<RentByBrand/>} />
            </Routes>

        </Router>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default App
