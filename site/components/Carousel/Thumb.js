import Image from 'next/image'
export const Thumb = ({ selected, onClick, imgSrc , productName }) => (
  <div
    className={`embla__slide embla__slide--thumb ${
      selected ? 'is-selected' : ''
    }`}
  >
    <button
      onClick={onClick}
      className='embla__slide__inner embla__slide__inner--thumb'
      type='button'
      name='Selecione a imagem do produto'
    >
      <Image
        className='embla__slide__thumbnail'
        src={imgSrc}
        alt={productName}
        layout='fill'
        
        
      />
    </button>
  </div>
)
