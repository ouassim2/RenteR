import { useEffect, useReducer, useRef } from "react"
import styled from "styled-components"
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const slides = [
  {
    title: "Mechanic Tools",
    toolCategorie: "mechanictool",
    image:
      "https://media.istockphoto.com/id/1284285153/photo/auto-mechanic-working-on-car-engine-in-mechanics-garage-repair-service-authentic-close-up-shot.jpg?b=1&s=170667a&w=0&k=20&c=hTcQR45ysPuDMBhdiYMmhrLasEZoeVPLKIWJQOAIf1Y=",
  },
  {
    title: "Construction Tools",
    toolCategorie: "constructiontool",
    image:
      "https://constructeurtravaux.fr/wp-content/uploads/2019/05/construction-maison-1.jpg",
  },
  {
    title: "Electrician Tools",
    toolCategorie: "electriciantool",
    image:
      "https://www.hoffmannbros.com/wp-content/uploads/2022/07/Electrical-Services-Hoffmann-Brothers.jpg",
  },
  {
    title: "Garden Tools",
    toolCategorie: "gardentool",
    image:
      "https://www.cnet.com/a/img/resize/cea01bb01a6e560a38cd1d5ecbe1c39173a85638/hub/2021/03/24/4077bd78-be3c-4a52-b81d-f51189cf4e5c/ryobi-mower-1.jpg?auto=webp&fit=crop&height=675&width=1200",
  },
  {
    title: "Winter Tools",
    toolCategorie: "wintertool",
    image:
      "https://www.thespruce.com/thmb/jVIiSCyThCmOIgcq6qXuQLNaVco=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ariens_28in-Snow-Blower_02-65520a5673cd4d5099903bac523d90b3.jpg",
  },
  {
    title: "Plumbing Tools",
    toolCategorie: "plumbingtool",
    image:
      "https://suburbanplumbingoc.com/wp-content/uploads/2020/06/How-Your-Home-Plumbing-System-Works.jpg",
  },
]


const initialState = {
  slideIndex: 1,
}

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slides.length,
    }
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
    }
  }
}

const Slide = ({ slide, offset }) => {
  const navigate = useNavigate()

  const useTilt = (active) => {
    const ref = useRef(null)
  
    useEffect(() => {
      if (!ref.current || !active) {
        return
      }
  
      const state = {
        rect: undefined,
        mouseX: undefined,
        mouseY: undefined,
      }
  
      let el = ref.current
  
      const handleMouseMove = (e) => {
        if (!el) {
          return
        }
        if (!state.rect) {
          state.rect = el.getBoundingClientRect()
        }
        state.mouseX = e.clientX
        state.mouseY = e.clientY
        const px = (state.mouseX - state.rect.left) / state.rect.width
        const py = (state.mouseY - state.rect.top) / state.rect.height
  
        el.style.setProperty("--px", px)
        el.style.setProperty("--py", py)
      }
  
      el.addEventListener("mousemove", handleMouseMove)
  
      return () => {
        el.removeEventListener("mousemove", handleMouseMove)
      }
    }, [active])
  
    return ref
  }


  const active = offset === 0 ? true : null
  const ref = useTilt(active)

  return (
      <div 
        ref={ref}
        className="slide"
        data-active={active}
        style={{
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
        }}
      >
        <div 
          className="slideBackground"
          style={{
            backgroundImage: `url('${slide.image}')`,
          }}
        />
        <div onClick={()=>(navigate(`/rent-tool/profession/${slide.toolCategorie}`))}
          className="slideContent"
          style={{
            backgroundImage: `url('${slide.image}')`,
          }}
        >
          <div className="slideContentInner">
            <h2 className="slideTitle">{slide.title}</h2>
            {/* <h3 className="slideSubtitle">{slide.subtitle}</h3>
            <p className="slideDescription">{slide.description}</p> */}
          </div>
        </div>
    </div>
  )
}

const Carousel = () => {

  const [state, dispatch] = useReducer(slidesReducer, initialState)

  return (
    <Wrapper>
      <h1>Rent by profession</h1>

        <Slides >

          <PrevButton onClick={() => dispatch({ type: "PREV" })}> <MdKeyboardArrowLeft/> </PrevButton>

          {[...slides, ...slides, ...slides].map((slide, index) => {
            //
            let offset = slides.length + (state.slideIndex - index)
            return <Slide  slide={slide} offset={offset} key={index} />
          })}
          <NextButton onClick={() => dispatch({ type: "NEXT" })}> <MdKeyboardArrowRight/> </NextButton>
        </Slides>

    </Wrapper>
  )
}


const PrevButton = styled.button`
margin-top: 100px;
margin-left: 880px;
cursor: pointer;
    background: transparent;
    color: white;
    font-size: 5em;
    border: none;
    position: absolute;
    transition: opacity 0.3s;
    opacity: 0.7;
    z-index: 5;

    &:hover {
      opacity: 1;
    }

    &:focus {
      outline: none;
    }

    &:first-child {
      left: -50%;
    }
    &:last-child {
      right: -50%;
    }
`
const NextButton = styled.button`
margin-top: 100px;
margin-right: 880px;
cursor: pointer;
    background: transparent;
    color: white;
    font-size: 5em;
    border: none;
    position: absolute;
    transition: opacity 0.3s;
    opacity: 0.7;
    z-index: 5;
    &:hover {
      opacity: 1;
    }

    &:focus {
      outline: none;
    }

    &:first-child {
      left: -50%;
    }
    &:last-child {
      right: -50%;
    }
`
const Slides = styled.div`
display: grid;
overflow: hidden;

.slide {
    grid-area: 2 / 2;
cursor: pointer;
  }

`;

const Wrapper = styled.div`

 h1{
  z-index: 10;
 }
 // size and opacity of each slide
.slideContent {

  color: white;
  margin-top: 30px;
  width: 15vw;
  height: 20vw;
  border-radius: 5px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transition: transform 0.5s ease-in-out;
  opacity: 0.7;

  display: grid;
  align-content: center;

  transform-style: preserve-3d;

  // translate x for the width off the total of the slides
  // rotateY for the y rotation of each card (on itself)

  transform: perspective(1000px) translateX(calc(100% * var(--offset))) 
    rotateY(calc(-65deg * var(--dir)));
}

// creates the 3d dimension (the z axe basically) for the font
.slideContentInner {
  
  transform-style: preserve-3d;
  // creates the 3d dimension (the z axe basicly)
  transform: translateZ(2rem);
  transition: opacity 0.3s linear;
  text-shadow: 0 0.1rem 1rem #000;
  opacity: 0;

  .slideSubtitle,
  .slideTitle {
    font-size: 2rem;
    font-weight: normal;
    letter-spacing: 0.2ch;
    text-transform: uppercase;
    margin: 0;
  }

  .slideSubtitle::before {
    content: "— ";
    
  }

  .slideDescription {
    margin: 0;
    font-size: 0.8rem;
    letter-spacing: 0.2ch;
  }
}

// to remove or add background (bghome)
.slideBackground {
  
  margin-top: 50px;
  position: fixed;
  top: 0;
  left: -10%;
  right: -10%;
  bottom: 0;
  background-size: cover;
  background-position: center center;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s linear, transform 0.3s ease-in-out;
  pointer-events: none;

  transform: translateX(calc(10% * var(--dir)));
}

// makes the image look at your cursor has the active slide
.slide[data-active] {
  
  z-index: 2;
  pointer-events: auto;

  .slideBackground {
    opacity: 0.2;
    transform: none;
  }

  .slideContentInner {
    opacity: 1;
  }

  .slideContent {
    
    --x: calc(var(--px) - 0.5);
    --y: calc(var(--py) - 0.5);
    opacity: 1;

    transform: perspective(1000px);

    &:hover {
      transition: none;
      // makes the image look at your cursor
      // the x to the right not working perfectly
      transform: perspective(1000px) rotateY(calc(var(--x) * 45deg))
        rotateX(calc(var(--y) * -45deg));
    }
  }
}

`;
export default Carousel;
