import React from 'react';


const MenuLink = props => {
  return (
    <li className="menuName"><a className="hyperLink" href={props.project.link}>{props.project.title}</a></li>
  );
}

export default MenuLink;
