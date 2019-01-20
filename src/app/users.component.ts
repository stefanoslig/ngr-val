import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, createUsersStore, UserStore } from './store/users';
import { sub } from 'rval';
import { trackChanges } from './store/time';

@Component({
    selector: 'app-users-list',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class JokesListComponent implements OnInit, OnDestroy {
    store: UserStore;
    users: User[];
    selectedUsers: User[];

    ngOnInit() {
        this.store = createUsersStore();
        trackChanges(this.store);

        this.users = this.store.users();
        sub(this.store.selectedUsers, selected => this.selectedUsers = selected);
    }

    toggleUser(id: number) {
        this.store.toggleUser(id);
    }

    ngOnDestroy() {
        // unsubscribe
    }
}

