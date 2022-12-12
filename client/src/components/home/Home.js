import  styled  from 'styled-components';
import HomeAllTools from './HomeAllTools';
import Carousel from './Carousel';
import HomeToolBrands from './HomeToolBrands';

const Home = () => {

  return (
    <Wrapper>
      <Carousel/>
      <HomeToolBrands/>
      <HomeAllTools/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
h1{
  text-align: center;
}
`

export default Home
