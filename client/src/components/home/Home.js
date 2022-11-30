import  styled  from 'styled-components';
import {  useContext  } from "react"
import { ToolContext } from '../ToolContext';
import HomeAllTools from './HomeAllTools';
import Carousel from './Carousel';
import HomeToolBrands from './HomeToolBrands';

const Home = () => {
  //Todo why does this component not rerendering when i click on home but before 
  // with no context / just state and fetch it was rerendering ?
  const {homeToolList} = useContext(ToolContext)


  return (
    <Wrapper>
      <Carousel/>

     {!homeToolList ? <h1>Loading...</h1>:
      <>
      <HomeToolBrands/>
      <HomeAllTools/>
      </>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
h1{
  text-align: center;
}
`

export default Home
