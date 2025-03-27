
    export type RemoteKeys = 'users/Header' | 'users/CreateUserForm' | 'users/UserCard' | 'users/UsersList';
    type PackageType<T> = T extends 'users/UsersList' ? typeof import('users/UsersList') :T extends 'users/UserCard' ? typeof import('users/UserCard') :T extends 'users/CreateUserForm' ? typeof import('users/CreateUserForm') :T extends 'users/Header' ? typeof import('users/Header') :any;