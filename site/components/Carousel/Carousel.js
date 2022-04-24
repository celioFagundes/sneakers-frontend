import { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './Thumb'
import Image from 'next/image'

const Carousel = ({ slides , productName}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    selectedClass: '',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    index => {
      if (!embla || !emblaThumbs) return
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index)
    },
    [embla, emblaThumbs],
  )

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return
    setSelectedIndex(embla.selectedScrollSnap())
    emblaThumbs.scrollTo(embla.selectedScrollSnap())
  }, [embla, emblaThumbs, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  useEffect(() =>{
    embla&& embla.reInit()
  },[slides])
  return (
    <>
      <div className='embla '>
        <div className='embla__viewport ' ref={mainViewportRef}>
          <div className='embla__container '>
            {slides ? (
              slides.map((item, index) => (
                <div className='embla__slide' key={index}>
                  <div className='embla__slide__inner'>      
                    <Image
                      className='embla__slide__img'
                      src={item}
                      alt= {productName}
                      layout ='fill'
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
                      alt= {productName}
                      layout ='fill'
                      priority      
                    />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {slides && slides.length > 1 &&       
      <div className='embla embla--thumb '>
        <div className='embla__viewport' ref={thumbViewportRef}>
          <div className='embla__container embla__container--thumb'>
            
              {slides.map((item, index) => (
                <Thumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  imgSrc={item}
                  key={index}
                  productName = {productName}
                />
              ))}
          </div>
        </div>
      </div>}
    </>
  )
}

export default Carousel
