import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {}

  verLista(lista: Lista){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista( lista: Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista){
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name:"Titulo",
          type: 'text',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelar")
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: ( data) => {
            if(data.Titulo.length === 0){
              return
            }
            console.log(data)
            lista.titulo = data.Titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }

      ]
    });

    alert.present();
  }

}
