
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs';
import { JwtService} from '../jwt.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // h1Style: boolean = false;
  prods: Object;
  prod: Object;
  submitted = false;
  delmes: Object;
  numItems = 10;

  constructor(private data: DataService, private jwt: JwtService, public router: Router) { }

  status = [ 'Ενεργά', 'Όλα', 'Ανενεργά' ];
  sort = ['id φθίνον', 'id αύξον', 'όνομα αύξον', 'όνομα φθίνον'];
  getsort = 'id|DESC';
  getstatus = 'ACTIVE';


  ngOnInit() {
    this.data.getProducts(this.getsort, this.getstatus ).subscribe(data => {
        this.prods = data;
        console.log(this.prods);
      }
    );

  }

  onStatusSelect(event) {
    console.log(event.target.value);
    const temp = event.target.value;
    if (temp === 'Ενεργά') {
      this.getstatus = 'ACTIVE';
    } else if (temp === 'Όλα') {
      this.getstatus = 'ALL';
    } else {
      this.getstatus = 'WITHDRAWN';
    }
    this.data.getProducts(this.getsort, this.getstatus ).subscribe(data => {
        this.prods = data;
        console.log(this.prods);
      }
    );
  }

  onSortSelect(event) {
    console.log(event.target.value);
    const temp = event.target.value;
    if (temp === 'id φθίνον') {
      this.getsort = 'id|DESC';
    } else if (temp === 'id αύξον') {
      this.getsort = 'id|ASC';
    } else if (temp === 'όνομα αύξον') {
      this.getsort = 'name|ASC';
    } else {
      this.getsort = 'name|DESC';
    }
    this.data.getProducts(this.getsort, this.getstatus ).subscribe(data => {
        this.prods = data;
        console.log(this.prods);
      }
    );
  }

  ShowClick(id) {
    console.log('clicked');
    /*this.data.getProduct(id).subscribe(data => {
        this.prod = data;
        console.log(this.prod);
      }
    );*/
  }


  DeleteClick(id) {
    console.log('clicked');
    if( !this.jwt.LoggedIn() ) { // if not logged in, throw away
      alert('Πρέπει να συνδεθείς πρώτα');
      this.router.navigate(['/login']);
      return;
    }
    if (confirm("Είσαι σίγουρος ότι θέλεις να διαγράψεις αυτό το προϊόν;")) {
    this.data.deleteProduct(id).subscribe(data => {
        this.delmes = data;
        console.log(this.delmes);
      },
      error => { if (error.status > 300 ) {
        return Observable.throw(new Error(error.status));
      }}
    );
    alert('Η εγγραφή διεγράφη επιτυχώς');
    this.data.getProducts(this.getsort, this.getstatus ).subscribe(data => {
        this.prods = data;
        console.log(this.prods);
      }
    ); window.location.reload(); }
  }


  onSubmit() {
    this.submitted = true;
    this.data.getProducts('id|ASC', 'ALL' ).subscribe(data => {
        this.prods = data;
        console.log(this.prods);
      }
    );
  }

}
