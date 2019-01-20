import { val, drv } from 'rval';

const initialUsers: User[] = [{
    id: 1,
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'
},
{
    id: 2,
    first_name: 'George2',
    last_name: 'Bluth2',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'
}];

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    selected?: boolean;
}

export interface UserStore {
    users: () => User[];
    toggleUser: (id: number) => number;
    selectedUsers: () => User[];
}

export function createUsersStore(): UserStore {
    const users = val(initialUsers);

    function toggleUser(id: number): number {
        users([...users().map(user => id === user.id ? { ...user, selected: !user.selected } : user)]);
        return id;
    }

    const selectedUsers = drv(() => users().filter(v => v.selected === true));

    return {
        users,
        toggleUser,
        selectedUsers
    };
}
