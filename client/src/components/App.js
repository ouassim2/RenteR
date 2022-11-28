import styled from "styled-components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home"
import GlobalStyles from "../GlobalStyles";
import Navbar from "./Navbar";
import UserProfile from "./UserProfile"
import Newtool from "./Newtool";
import ToolDetails from "./ToolDetails";
import RentMe from "./RentMe";

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
              <Route path="/rent-tool/:id" element={<RentMe/>} />

            </Routes>

        </Router>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default App
