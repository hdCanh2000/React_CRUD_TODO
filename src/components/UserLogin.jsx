import React from "react";
import PropTypes from "prop-types";
import './index.css';

UserList.propTypes = {
  userList: PropTypes.array,
  selectedId: PropTypes.number,
  onUserClick: PropTypes.func,
};

UserList.defaultProps = {
  userList: [],
  selectedId: null,
  onUserClick: null,
};

function UserList(props) {
  const { userList, selectedId, onUserClick } = props;

  const handleClick = (user) => {
    if(onUserClick) {
        onUserClick(user);
    }
  };

  return (
    <ul>
      {userList.map((user) => (
          <li
          key={user.id}
          className={user.id === selectedId ? 'selectedId' : ''}
          onClick={() => handleClick(user)}
          style={{listStyle: "none" }}
          >
          <h3>{user.title}</h3>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
