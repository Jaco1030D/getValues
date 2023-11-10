import React from 'react'

const LanguageValue = ({label, value, setValue, index}) => {
  return (
    <div className='value-per-word'>
        <p>{label || 'Valor por palavras:'}</p>
        <input type="number" value={value} onChange={(e) => setValue(index, e.target.value)} />
    </div>
  )
}

export default LanguageValue