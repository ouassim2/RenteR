import { NavLink } from "react-router-dom"
import styled from "styled-components"
import SearchBar from "./SearchBar"
import logo from "../assets/logo.png"
import Miniprofile from "./Miniprofile"

const Navbar = () => {
  return (
    <Wrapper>
      <nav>
        <ul>
          <LeftColumn>
            <LinkItem to="/">
              {" "}
              <Logo src={logo} alt="Health watch" />{" "}
            </LinkItem>
            <LinkItem to="/">
              {" "}
              <li>Home</li>{" "}
            </LinkItem>
            <LinkItem to="About">
              {" "}
              <li>About</li>{" "}
            </LinkItem>
            <LinkItem to="Services">
              {" "}
              <li>Services</li>{" "}
            </LinkItem>
            <LinkItem to="Contact">
              {" "}
              <li>Contact</li>{" "}
            </LinkItem>
          </LeftColumn>

          <RightColumn>
            <SearchBar />
                <Miniprofile />
          </RightColumn>
        </ul>
      </nav>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: black;
  height: 50px;
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
  padding-left: 10px;

  &.active {
    li {
      color: darkgray;
    }
  }

  :hover {
    color: darkgray;
    transition: 0.3s ease-in-out;
  }
`

const Logo = styled.img`
  margin-left: 20px;
  width: 40px;
`
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
  display: flex;
  align-items: center;
  li {
    margin-right: 35px;
  }
`
const LeftColumn = styled.div`
  display: flex;
  align-items: center;
  /* height: 50px; */
`

export default Navbar
