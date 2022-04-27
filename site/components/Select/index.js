import React from 'react'
const Select = ({
  placeholder = '',
  label,
  value,
  onChange,
  name = '',
  options = [],
}) => {
  return (
    <div
      className=' 
    flex items-center justify-start 
    relative
    
    
    mr-4 -sm my-2 py-1  
    border-y rounded-sm '
    >
      <select
        className='
         block w-full 
        placeholder-gray-700
        text-gray-800  text-sm uppercase font-medium
         rounded-sm py-2 px-4
         hover:cursor-pointer hover:bg-lightGray
         leading-tight focus:outline-none 
      '
        id={'id-' + name}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
      >
        <option value='' >
          All {label}
        </option>

        {options.map(opt => (
          <option id={opt.id} key={opt.id} value={opt.slug}>
            {opt.name || opt.slug}
          </option>
        ))}
      </select>
    </div>
  )
}
const SingleValues = ({
  placeholder = '',
  label = '',
  value,
  onChange,
  onBlur,
  name = '',
  helpText,
  oldValue = '',
  options = [],
  errorMessage,
}) => {
  return (
    <div className='mr-4 max-w-sm mb-2'>
      <label
        className='block uppercase tracking-wide text-primary text-xs font-bold mb-2'
        htmlFor={'id-' + name}
      >
        {label}
      </label>
      <select
        className='
        appearance-none block w-20 
        bg-darkBlack text-gray-200 
         rounded-sm py-1 px-4  leading-tight 
        focus:outline-none '
        id={'id-' + name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={oldValue !== '' ? oldValue : value}
      >
        {value === '' && (
          <option value='' hidden>
            Select
          </option>
        )}
        {options.map(opt => (
          <option id={opt} key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className='text-red-400 text-xs italic'>{errorMessage}</p>
      )}
      {helpText && <p className='text-gray-600 text-xs italic'>{helpText} </p>}
    </div>
  )
}
const SingleValuesHorizontal = ({
  placeholder = '',
  label = '',
  value,
  onChange,
  onBlur,
  name = '',
  helpText,
  oldValue = '',
  options = [],
  errorMessage,
}) => {
  return (
    <div className='flex items-center mr-4 max-w-sm'>
      <label
        className='block uppercase tracking-wide text-primary text-xs font-bold mr-3'
        htmlFor={'id-' + name}
      >
        {label}
      </label>
      <select
        className='
        appearance-none block w-fit
        bg-darkBlack text-gray-200 
         rounded-sm px-4  leading-tight py-1
        focus:outline-none '
        id={'id-' + name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={oldValue !== '' ? oldValue : value}
      >
        {value === '' && (
          <option value='' hidden>
            Select
          </option>
        )}
        {options.map(opt => (
          <option id={opt} key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className='text-red-400 text-xs italic'>{errorMessage}</p>
      )}
      {helpText && <p className='text-gray-600 text-xs italic'>{helpText} </p>}
    </div>
  )
}
Select.SingleValues = SingleValues
Select.SingleValuesHorizontal = SingleValuesHorizontal
export default Select
