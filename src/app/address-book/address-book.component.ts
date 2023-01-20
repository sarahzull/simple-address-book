import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit  {
  addressForm: FormGroup;
  addressList: any = [];
  index = '';

  constructor(private formbuilder: FormBuilder) {
    this.addressForm = this.formbuilder.group({
      Name: [''],
      Phone: [''],
      Email: ['']
    })
  }

  ngOnInit(): void {
    let data = localStorage.getItem('addressList');
    this.addressList = JSON.parse(data || '');
    console.log('addressList', this.addressList);
  }

  submit() {
    console.log(this.addressForm.value)
    this.addressList.push(this.addressForm.value)
    localStorage.setItem('addressList', JSON.stringify(this.addressList));
    this.clear()
  }

  edit(i: any) {
    this.addressForm.patchValue({
      Name: this.addressList[i].Name,
      Phone: this.addressList[i].Phone,
      Email: this.addressList[i].Email,
    })
    this.index = i;
  }

  update() {
    this.addressList[this.index].Name = this.addressForm.value.Name;
    this.addressList[this.index].Phone = this.addressForm.value.Phone;
    this.addressList[this.index].Email = this.addressForm.value.Email;
    localStorage.setItem('addressList', JSON.stringify(this.addressList));
    this.clear()
  }

  clear() {
    this.addressForm.reset()
  }

  delete(i: any) {
    this.addressList.splice(i, 1);
    localStorage.setItem('addressList', JSON.stringify(this.addressList));
  }
}
