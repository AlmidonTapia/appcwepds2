import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { PaisService } from '../api/pais.service';

@Component({
  selector: 'app-pais',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {
  frmPaisInsert: UntypedFormGroup;
  listPaises: any[] = [];
  searchQuery: string = '';
  searchControl: FormControl;


  ngOnInit() {
    this.paisService.getAll().subscribe({
      next: (response: any) => {
        this.listPaises = response.response.listPais;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.searchControl.valueChanges.subscribe(value => {
      this.searchQuery = value;
    });
  }
   

  get nombrePaisFb() {
    return this.frmPaisInsert.controls['Pais'];
  }
  constructor(
    private paisService: PaisService,
    private formBuilder: FormBuilder
  ){
    
    this.frmPaisInsert = this.formBuilder.group({
      Pais: ['', [Validators.required]],
      search: ['']

    });
    this.searchControl = this.frmPaisInsert.get('search') as FormControl;
  }
  public save(): void {
    if (!this.frmPaisInsert.valid) {
      this.frmPaisInsert.markAllAsTouched();
      this.frmPaisInsert.markAsDirty();

      return;
    }

    let formData = new FormData();

    formData.append('Name', this.nombrePaisFb.value);

    this.paisService.insert(formData).subscribe({
      next: (response: any) => {
        console.log(response);      },
      error: (error: any) => {
        console.log(error);
        this.loadData();
      }
    });
  }

  delete(idPais: string): void {
    this.paisService.delete(idPais).subscribe({
      next: (response: any) => {
        this.listPaises = this.listPaises.filter(x => x.idPais !== idPais);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  get filteredPaises() {
    const searchQuery = this.searchControl.value.toLowerCase();
    return this.listPaises.filter(pais =>
      pais.Name.toLowerCase().includes(searchQuery)
    );
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  loadData(): void {
    this.paisService.getAll().subscribe({
      next: (response: any) => {
        this.listPaises = response.response.listPais;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
