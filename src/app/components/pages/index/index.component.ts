import { Component, OnInit } from '@angular/core';
// Servicios
import { ApiConnectorService } from '../../../services/api-connector.service';

@Component({
  selector: 'app-index',
  templateUrl: '../../../templates/index.component.html',
  styleUrls: ['../../../assets/css/app.component.css', '../../../assets/css/index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private apiHandler: ApiConnectorService) { }

  listaEmpresas = [];

  ngOnInit() {
  }
}
