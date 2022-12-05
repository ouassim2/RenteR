import styled from "styled-components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home"
import GlobalStyles from "../GlobalStyles";
import Navbar from "./Navbar";
import UserProfile from "./UserProfile"
import Newtool from "./Newtool";
import ToolDetails from "./ToolDetails";
import RentMe from "./RentMe";
import RentByProfession from "./RentByProfession";
import EditProfile from './EditProfile';
import RentByBrand from "./RentByBrand";

const App = () => {

  return (
    <Wrapper>
        <Router>
          <GlobalStyles/>
          <Navbar/>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tool/details/:id" element={<ToolDetails />} />
              <Route path="/profile/:username" element={<UserProfile/>} />
              <Route path="/new-tool" element={<Newtool/>} />
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
