import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store'
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as customerActions from '../state/customer.actions';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';

@Injectable()

export class CustomerEffect {

    constructor(private actions$: Actions, private customerService: CustomerService) {
    }

    // @Effect()
    // loadCustomers$: Observable<Action> = this.actions$.pipe(
    //     ofType<customerActions.LoadCustomers>(
    //         customerActions.CustomerActionTypes.LOAD_CUSTOMERS
    //     ),
    //     mergeMap((actions: customerActions.LoadCustomers) =>
    //         this.customerService.getCustomers().pipe(
    //             map((customers: Customer[]) =>
    //                 new customerActions.LoadCustomersSuccess(customers)
    //             ),
    //             catchError(err => of(new customerActions.LoadCustomersFail(err)))
    //         )
    //     )
    // );

    @Effect()
    loadCustomers$: Observable<Action> = this.actions$.pipe(
      ofType<customerActions.LoadCustomers>(
        customerActions.CustomerActionTypes.LOAD_CUSTOMERS
      ),
      mergeMap((action: customerActions.LoadCustomers) =>
        this.customerService.getCustomers().pipe(
          map(
            (customers: Customer[]) =>
              new customerActions.LoadCustomersSuccess(customers)
          ),
          catchError(err => of(new customerActions.LoadCustomersFail(err)))
        )
      )
    );
}