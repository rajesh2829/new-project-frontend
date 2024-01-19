import React, { useEffect, useState } from "react";
import CompanyUserService from "../services/UserService";
import UserCard from "./UserCard";

const UserSelectList = (props) => {
  let { params, handleUserClick } = props;
  const [userOption, setUserOption] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUserName = (media_url, firstName, lastName) => {
    return (
      <div className="d-flex">
        <UserCard
          id="avatar"
          firstName={firstName}
          lastName={lastName}
          url={media_url}
        />
      </div>
    );
  };

  const getUsers = async () => {
    const roleData = await CompanyUserService.list(params);
    let user = roleData.data;
    if (user && user.length > 0) {
      const List = [];
      user.forEach((list) => {
        List.push({
          value: list.first_name + "" + list.last_name,
          id: list.id,
          label: getUserName(list?.media_url, list.first_name, list.last_name),
          first_name: list.first_name,
          last_name: list.last_name,
          userImage: list?.media_url,
        });
      });
      setUserOption(List);
    }
  };

  return (
    <>
      <div style={{ height: "500px", overflowY: "scroll" }}>
        {userOption &&
          userOption.map((user, index) => {
            return (
              <div
                key={index}
                className="user-item"
                onClick={() => handleUserClick(user)}>
                <p className="text-center p-2">
                  <div className="d-flex">
                    <span className="mt-2 mx-2">{user && user?.label}</span>
                  </div>
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default UserSelectList;
