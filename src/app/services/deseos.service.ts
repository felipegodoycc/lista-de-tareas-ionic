import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor(private storage: Storage) {
    
    this.cargarStorage();

  }

  crearLista( titulo: string){
    const nlista = new Lista(titulo)
    this.listas.push(nlista);
    this.guardarStorage();
    return nlista.id;
  }

  borrarLista( lista: Lista){
    this.listas = this.listas.filter( listaData => listaData.id != lista.id)
    this.guardarStorage();
  }

  getLista( id: string | number ){
    id = Number(id);

    return this.listas.find( listaData => listaData.id === id);
  }

  guardarStorage(){
    this.storage.set('data', JSON.stringify(this.listas));
  }

  cargarStorage(){
    this.storage.get('data')
      .then( data => {
        if(data) this.listas = JSON.parse(data)
      })
      .catch( err => {
        console.log(err);
      })
  }

}
