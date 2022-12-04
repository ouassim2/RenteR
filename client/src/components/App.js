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

const App = () => {

  return (
    <Wrapper>
        <Router>
          <GlobalStyles/>
          <Navbar/>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tool/details/:id" element={<ToolDetails />} />
              <Route path="/profil/:username" element={<UserProfile/>} />
              <Route path="/new-tool" element={<Newtool/>} />
              <Route path="/edit-profil" element={<EditProfile/>} />
              <Route path="/rent-tool/:id" element={<RentMe/>} />
              <Route path="/rent-tool/profession/:id" element={<RentByProfession/>} />

            </Routes>

        </Router>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default App
