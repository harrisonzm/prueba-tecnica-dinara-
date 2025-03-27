import { useParams } from "react-router-dom";
import React, { ReactNode } from "react";

type UserIdProviderProps = {
  children: ReactNode;
};

export const GetIdFromPath: React.FC<UserIdProviderProps> = ({ children }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <>{React.Children.map(children, child =>
      React.isValidElement(child) ? React.cloneElement(child, { idUser: id }) : child
    )}</>
  );
};

export default GetIdFromPath;
