import { ImSpinner10 } from "react-icons/im";
import styled from "styled-components";

// component that creates & displays the loading page image
// passing fontSize from other components to be accessed in child component and then we pass it again to childred of children <Spinner/> and finally we use it as styling variable in styled component ( i guess thats how you pass props to styled component lol)
const LoadingSpinner = ({ fontSize }) => {

  return <Spinner fontSize={fontSize}></Spinner>;
  
};

const Spinner = styled(ImSpinner10)`
  animation-name: spinner;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  font-size: fontSize;
  font-weight: 100;
  color: white;
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export default LoadingSpinner;
