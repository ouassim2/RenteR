import styled from "styled-components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home"
import GlobalStyles from "../GlobalStyles";
import Navbar from "./Navbar";
import UserProfile from "./UserProfile"
import Newtool from "./Newtool";

const App = () => {

  return (
    <Wrapper>
        <Router>
          <GlobalStyles/>
          <Navbar/>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profil/:id" element={<UserProfile/>} />
              <Route path="/new-tool" element={<Newtool/>} />

            </Routes>

        </Router>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default App
