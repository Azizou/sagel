import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

/**
 * Generated class for the ExpenseCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expense-create',
  templateUrl: 'expense-create.html',
})
export class ExpenseCreatePage {

  isReadyToSave: boolean;

  sale: any;
  form:  FormGroup;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      description: [''],
      reference: ['', Validators.required],
      date: ['', Validators.required],
      unit_price: ['', Validators.required],
      quantity: ['', Validators.required],
      total_cost: ['', Validators.required],
      amount_paid: ['', Validators.required],
      amount_remaining: ['', Validators.required],
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { alert(this.form);return; }
    console.log(this.form.value);
    this.viewCtrl.dismiss(this.form.value);
  }

}
