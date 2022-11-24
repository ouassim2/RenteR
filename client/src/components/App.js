import styled from "styled-components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./Navbar"
import Home from "./Home"
import GlobalStyles from "../GlobalStyles";
import Navbar from "./Navbar";
import UserProfile from "./UserProfile"
const App = () => {


  return (
    <Wrapper>
        <Router>
          <GlobalStyles/>
          <Navbar/>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profil" element={<UserProfile/>} />


            </Routes>

        </Router>
    </Wrapper>
  )
}

const Wrapper = styled.div``

export default App
