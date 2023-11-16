const Item = ({ name, handleClick, id, oneElement, language, openItem, isSelected, handleItemClick }) => {
    return (
      <li className={`item ${isSelected ? 'checked' : ''}`} id={name} onClick={() => handleItemClick(name)}>
        <span className="checkbox">
          <i className="fa-solid fa-check check-icon"></i>
        </span>
        <span className="item-text">{name}</span>
      </li>
    );
  };

export default Item