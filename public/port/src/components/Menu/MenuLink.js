import React from 'react';
import ReactGA from 'react-ga';



const MenuLink = props => {

  const onMenuLinkClick = () => {
    ReactGA.event({
      category: 'MenuLink Clicked',
      action: `id # ${props.project.id} -> clicked`
    });
  }


  return (
    <li className="menuName"><a onClick={onMenuLinkClick} className="hyperLink" href={props.project.link}>{props.project.title}</a></li>
  );
}

export default MenuLink;
