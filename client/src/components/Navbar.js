import { NavLink } from "react-router-dom"
import styled from "styled-components"
import SearchBar from "./SearchBar"
import Navprofile from "./Navprofile"
import {FaTools} from "react-icons/fa"

const Navbar = () => {
  return (
    <Wrapper>
      <nav>
        <ul>
          <LeftColumn>
            <LinkItem to="/"> <div><FaTools size="23px"/></div> <p><span>R</span>ent<span>R</span></p> </LinkItem>
            <LinkItem to="/"><li>Home</li></LinkItem>
            {/* <LinkItem to="About"><li>About</li></LinkItem>
            <LinkItem to="Services"><li>Services</li></LinkItem>
            <LinkItem to="Contact"><li>Contact</li></LinkItem> */}
          </LeftColumn>

          <RightColumn>
            <SearchBar />
                <Navprofile />
          </RightColumn>
        </ul>
      </nav>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: black;
  height: 50px;
  z-index: 10;

  
  
  nav {
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  `
const LinkItem = styled(NavLink)`
  text-decoration: none;
  color: white;
  padding-right: 20px;
  padding-left: 15px;
  
  &.active {
    li {
      color: darkgray;
    }
  }
  
  :hover {
    color: darkgray;
    transition: 0.3s ease-in-out;
  }

  p{
    font-size: 1em; 
    span{   
      color: goldenrod;
      /* font-weight: 500; */
      :hover {
      color: darkgoldenrod;
      transition: 0.3s ease-in-out;
      }
    }
  }
  div{
    margin-top: 2px;
    margin-left: 10px;
  }
`

// const Logo = styled.img`
//   margin-left: 20px;
//   width: 40px;
//   color: white;
// `
// const CartLogo = styled.img`
//   width: 55px;
//   height: 50px;
//   cursor: pointer;
//   margin-right: 15px;
//   &:active {
//     transform: scale(0.8);
//   }
// `;

const RightColumn = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  
  li {
    /* margin-right: 35px; */
  }
`
const LeftColumn = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;

  /* height: 50px; */
`

export default Navbar
