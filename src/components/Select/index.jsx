import React, { useEffect, useRef, useState } from 'react';

const Item = ({ name, handleClick, id, oneElement, language, openItem, isSelected, handleItemClick }) => {
  return (
    <li className={`item ${isSelected ? 'checked' : ''}`} id={name} onClick={() => handleItemClick(name)}>
      <span className="checkbox">
        <i className="fa-solid fa-check check-icon"></i>
      </span>
      <span className="item-text">{name.length > 6 ? `${name.slice(0, 6)}...` : name}</span>
    </li>
  );
};

const SelectInput = ({ languages, update, name, values, id, title, oneElement = false }) => {
  const [openFirst, setOpenFirst] = useState(false);
  const selectRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = () => {
    setOpenFirst((prev) => !prev);
  };

  // const handleGetValue = (language = '') => {
  //   if (!language) {
  //     const checkedItem = selectedItem ? [selectedItem] : [];
  //     update(name, checkedItem);

  //     const newLayout = checkedItem.length > 3 ? checkedItem.slice(0, 3) : checkedItem;
  //     setLanguages(`${newLayout.join(', ')}...`);
  //   } else {
  //     update(name, language);
  //   }

  //   if (oneElement) {
  //     setOpenFirst(false);
  //   }
  // };

  const handleItemClick = (clickedItem) => {
    setSelectedItem(clickedItem === selectedItem ? null : clickedItem);
    update(name, clickedItem)
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpenFirst(false);
      }
    };

    if (openFirst) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openFirst]);

  return (
    <div className="select-input" ref={selectRef}>
      <div className={`select select-btn ${openFirst && 'open'}`} onClick={handleClick}>
        <span className="btn-text">{selectedItem || title}</span>
      </div>
      <ul className="list-items" id={id}>
        {languages.map((item, index) => (
          <Item
            key={index}
            name={item.label}
            id={id}
            oneElement={oneElement}
            language={item.value}
            isSelected={selectedItem === item.label}
            handleItemClick={handleItemClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default SelectInput;
