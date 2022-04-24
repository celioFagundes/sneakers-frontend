import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

const CarouselSingle = ({ slides, productName }) => {
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
      <div className='embla-single '>
        <div className='embla__viewport-single' ref={mainViewportRef}>
          <div className='embla__container-single '>
            {slides ? (
              slides.map((item, index) => (
                <div className='embla__slide-single' key={index}>
                  <div className='embla__slide__inner-single'>
                    <Image
                      className='embla__slide__img-single'
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
              <div className='embla__slide-single'>
                <div className='embla__slide__inner-single'>
                  <Image
                    className='embla__slide__img-single'
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

export default CarouselSingle
