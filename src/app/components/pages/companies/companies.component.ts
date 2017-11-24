import { Component, OnInit } from '@angular/core';
import { ApiConnectorService } from '../../../services/api-connector.service';

@Component({
  selector: 'app-companies',
  templateUrl: '../../../templates/companies.component.html',
  styleUrls: ['../../../assets/css/app.component.css', '../../../assets/css/companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(private api: ApiConnectorService ) { }

  loading = true;
  listaEmpresas = [];
  nombre = '';
  fiscal = '';
  id = 0;
  editMode = false;
  selectedCompany = {id: 0, nombre: '', fiscal: ''};

  ngOnInit() {
    this.loadCompaniesList();
  }

  private loadCompaniesList() {
    this.loading = true;
    this.api.getUrl('/companies', (data) => {
      this.loading = false;
      this.listaEmpresas = data.data;
    }, (err) => {
      this.loading = false;
      console.log(err);
    });
  }

  private manageCompany() {
    if (!this.editMode) {
      this.loading = true;
      const datos = {name: this.nombre, fiscal: this.fiscal};
      this.api.postUrl('/companies/create', datos, (data) => {
        this.resetData();
        this.loadCompaniesList();
      }, (error) => {
        console.log('Error: ' + JSON.stringify(error));
      });
    } else {
      this.loading = true;
      const datos = { id: this.id, name: this.nombre, fiscal: this.fiscal };
      this.api.postUrl('/companies/edit', datos, (data) => {
        this.resetData();
        this.loadCompaniesList();
      }, (error) => {
        console.log('Error: ' + JSON.stringify(error));
      });
    }
  }

  private resetData() {
    this.nombre = '';
    this.fiscal = '';
    this.id = 0;
    this.editMode = false;
  }

  private editCompany(id, name, fiscal) {
    this.id = id;
    this.nombre = name;
    this.fiscal = fiscal;
    this.editMode = true;
  }

  private deleteCompany(id) {
    this.loading = true;
    const datos = { id: id };
    this.api.postUrl('/companies/delete/', datos, (response) => {
      this.loadCompaniesList();
    }, (error) => {
      console.log(error);
    });
  }

}
