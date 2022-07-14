import React from "react";

export const User = ({ user }: any) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.phone}</td>
    <td>{`${user.address.street}   ${user.address.suite} ${user.address.city}`}</td>
    <td>{user.website}</td>
  </tr>
);
