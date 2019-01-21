import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy, WrappedValue } from '@angular/core';
import { Disposer, sub, Observable } from 'rval';

@Pipe({ name: 'rsync' , pure: false })
export class RsyncPipe implements OnDestroy, PipeTransform {
    private _value: any = null;
    private _previousValue: any = null;
    private _subscription: Disposer = null;
    private _obj: Observable<any> = null;

    constructor(private _cd: ChangeDetectorRef) { }

    transform<T>(obj: Observable<T> | null): any {
        if (!this._obj) {
            if (obj) {
                this._subscribe(obj);
            }
            this._previousValue = this._value;
            return this._value;
        }

        if (this._obj !== obj) {
            this._subscription();
            this.transform(obj);
        }

        if ( this._previousValue === this._value) {
            return this._previousValue;
        }

        this._previousValue = this._value;
        return WrappedValue.wrap(this._value);
    }

    private _subscribe(obj: Observable<any>) {
        this._obj = obj;
        sub(obj, value => {
            if (obj === this._obj) {
                this._value = value;
                this._cd.markForCheck();
            }
        });
    }

    ngOnDestroy(): void {
        if (this._subscription) {
            this._subscription();
        }
    }

}
