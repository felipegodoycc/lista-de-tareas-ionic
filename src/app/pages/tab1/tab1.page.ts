import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private alertController: AlertController,
              private deseosService: DeseosService,
              private router: Router,
              public toastController: ToastController ) {
  }

  async agregarLista(){
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name:"Titulo",
          type: 'text',
          placeholder: "Nombre de la lista"
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Cancelar")
          }
        },
        {
          text: 'Crear',
          handler: ( data) => {
            if(data.Titulo.length === 0){
              return
            }
            console.log(data)
            const listaId = this.deseosService.crearLista(data.Titulo);
            // this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            this.presentToast();
          }
        }

      ]
    });

    alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Guardado con exito.',
      duration: 1000,
      color: "tertiary"
    });
    toast.present();
  }

}
