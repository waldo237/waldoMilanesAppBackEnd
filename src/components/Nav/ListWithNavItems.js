
import React from 'react';
import PropsType, { object } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

  const ListWithNavItems = ({item, openInnerList})=> {
    if (item && item.children) {
      return (
        <div
          id="with-children"
          className="nav-item-with-children"
        >
          <span
            className="nav-item-with-children-span"
            onClick={openInnerList}
            onKeyDown={openInnerList}
          >
            {item.title}
            <FontAwesomeIcon className=" drop-icon" icon={faChevronDown} />
          </span>
          {!item.icon 
          ? (
            <ul className="inner-nav-item-list">
              {item.children.map((child) => (
                <NavLink
                  activeClassName="active-route"
                  exact
                  to={child.link}
                  key={child.title}
                >
                  <button type="button" className="btn spacious">
                    {!item.icon ? (
                      <FontAwesomeIcon className="fa-lg" icon={child.icon} />
                    ) : null}{" "}
                    {child.title}
                  </button>
                </NavLink>
              ))}
            </ul>
          ) : null}
        </div>
      );
    }
    return (item)
    ? (
      <NavLink activeClassName="active-route" exact to={item.link}>
        <button type="button" className="btn spacious">
          {item.title}
        </button>
      </NavLink>
    )
    :null;
  }

  ListWithNavItems.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    item: PropsType.object,
    openInnerList: PropsType.func.isRequired
  }
  ListWithNavItems.defaultProps = {
      item: null
  }
  export default ListWithNavItems;