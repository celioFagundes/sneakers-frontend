import React from 'react'
const shoesSizes = [
  '4',
  '4.5',
  '5',
  '5.5',
  '6',
  '6.5',
  '7',
  '7.5',
  '8',
  '8.5',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
  '11.5',
  '12',
  '13',
  '14',
  '15',
]
const SizeSelection = ({ sizeSelected, variations, setSizeSelected }) => {
  const sizeIsAvailable = size => {
    const availableSizes = variations.map(item => item.size)
    return availableSizes.indexOf(size) >= 0
  }
  return (
    <div className=' mt-2 items-center '>
      <div className='flex flex-col my-2'>
        <span className='  uppercase font-medium text-md text-gray-900'>
          Select size
        </span>
        <div className='relative'>
          {shoesSizes.map(size => (
            <button
              key={size}
              onClick={() => sizeIsAvailable(size) && setSizeSelected(size)}
              style = {{
                backgroundColor : sizeSelected === size && '#000'
              }}
              className={`
          
              border-2 border-gray-100 
              transition-all
              p-1 w-20  
             font-normal text-md 
              ${
                sizeIsAvailable(size) 
                ? 'bg-lightBlack text-white hover:bg-gray-200'
                : 'bg-white'
              } 
            ${sizeSelected === size &&  'text-gray-50 border-orange-500 rounded'}
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SizeSelection
