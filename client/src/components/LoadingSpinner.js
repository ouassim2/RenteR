import { ImSpinner10 } from "react-icons/im";
import styled from "styled-components";

// component that creates & displays the loading page image
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
