import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, createUsersStore, UserStore } from './store/users';
import { Observable } from 'rval';
import { trackChanges } from './store/time';

@Component({
    selector: 'app-users-list',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
    store: UserStore;
    users: User[];
    selectedUsers: Observable<User[]>;

    ngOnInit() {
        this.store = createUsersStore();
        trackChanges(this.store);

        this.users = this.store.users();
        this.selectedUsers = this.store.selectedUsers;
    }

    toggleUser(id: number) {
        this.store.toggleUser(id);
    }
}

