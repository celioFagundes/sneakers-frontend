import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const Search = ({ showInput, handleShowInput }) => {
  return (
    <div className='relative flex items-center'>
      <input
        className={`
                text-black appearance-none 
                 top-28 
                ${showInput ? 'right-5' : '-right-full'}
                fixed md:static
                transition-all
                w-11/12 md:w-max
                md:bg-gray-200 bg-white
                md:mr-3 px-2 py-3 md:py-1 
                rounded-sm border-2 md:border-transparent 
                border-gray-600 focus:outline-none`}
        placeholder='search...'
      />
      <AiOutlineSearch
        size={24}
        className='md:absolute md:top-2 md:right-5 hover:cursor-pointer'
        onClick={handleShowInput}
      />
    </div>
  )
}

export default Search
