import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users.component';
import { NgrValCoreModule } from 'projects/ngr-val/core/src/public_api';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent
    ],
    imports: [
        BrowserModule,
        NgrValCoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
