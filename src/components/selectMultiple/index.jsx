import React, { useEffect, useRef, useState } from 'react'

const Item = ({name, handleClick, id, oneElement, language, openItem}) => {
  const [isChecked, setIsChecked] = useState(openItem);
  const liRef = useRef(null)

  const handleItemClick = () => {
    
    setIsChecked(!isChecked);

  };

  useEffect(() => {

    handleClick()

  },[isChecked])
  return (
    <li ref={liRef} className={`item ${isChecked ? 'checked' : ''}`} id={name} onClick={handleItemClick} >
        <span className="checkbox">
            <i className="fa-solid fa-check check-icon"></i>
        </span>
        <span className="item-text">{name.length > 6 ? `${name.slice(0, 6)}...` : name}</span>
    </li>
  )
}

const SelectInputMultiple = ({languages, update, name, values, id, title, oneElement = false}) => {
  
  const [openFirst, setOpenFirst] = useState(false)
  
  const selectRef = useRef(null)
  
  const [languagens, setLanguages] = useState()
  
  const handleClick = () => {
    
    setOpenFirst(prev => !prev)
  
  }

  const handleGetValue = (language = '') => {

    if (!language) {

      const elements = document.getElementById(id).querySelectorAll('.checked');

      let itens = []

      elements.forEach((element) => {

        itens.push(element.id)

      });

      update(name, itens)

      if (elements.length > 3) {

        const newLayout = itens.slice(0, 3)

        setLanguages(`${newLayout.join(", ")}...`)

      } else {
  
        setLanguages(itens.join(", "))

      }
    } else {
      update(name, language)
    }

    if (oneElement) {
        setOpenFirst(false)
    }
  }
  useEffect(() => {

    const handleClickOutside = (e) => {

      if (selectRef.current && !selectRef.current.contains(e.target)) {

      setOpenFirst(false);

    }

  }

  if (openFirst) {
      document.addEventListener('click', handleClickOutside)
  } else {
      document.removeEventListener('click', handleClickOutside)
  }

  return () => {
      document.removeEventListener('click', handleClickOutside)
  }
  },[openFirst])
  return (
    <div className="select-input" ref={selectRef}>
        <div  className={`select select-btn ${openFirst && 'open'}`} onClick={handleClick}>
            <span className="btn-text">{languagens || title}</span>
        </div>
        <ul className="list-items" id={id}>
            {languages.map((item, index) => (
                <Item key={index} name={item.label} id={id} oneElement={oneElement} handleClick={handleGetValue} openItem={false} />
                
            ))}
        </ul>
    </div>  
  )
}

export default SelectInputMultiple