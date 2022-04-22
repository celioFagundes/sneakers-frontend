import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './Thumb'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

const Carousel = ({ slides, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const options = { delay: 4000 } // Options
  const autoplayRoot = emblaRoot => emblaRoot.parentElement // Root node
  const autoplay = Autoplay(options, autoplayRoot)
 
  const [mainViewportRef, embla] = useEmblaCarousel({
    skipSnaps: false,
    slidesToScroll: 1,
    loop: true,
    draggable: true,
    
  },[Autoplay()])

  useEffect(() => {
    embla && embla.reInit()
  }, [slides])
  return (
    <>
      <div className='embla '>
        <div className='embla__viewport' ref={mainViewportRef}>
          <div className='embla__container '>
            {slides ? (
              slides.map((item, index) => (
                <div className='embla__slide' key={index}>
                  <div className='embla__slide__inner'>
                    <Image
                      className='embla__slide__img'
                      src={item}
                      alt={productName}
                      objectFit ='cover'
                      layout='fill'
                      priority
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className='embla__slide'>
                <div className='embla__slide__inner'>
                  <Image
                    className='embla__slide__img'
                    src='https://dummyimage.com/420x260'
                    alt={productName}
                    layout='fill'
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Carousel
