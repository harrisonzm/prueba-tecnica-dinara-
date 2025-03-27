import React from 'react';
import { User } from '../utils/user.types';
interface UserCardProps {
    user?: User;
    idUser?: string;
    onChange?: () => void;
}
export declare const UserCard: React.FC<UserCardProps>;
export default UserCard;
