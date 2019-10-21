import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { ErrorHandlerService } from './error-handler.service';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Mensaje{
  id:string;
  usuario:string;
  fecha:string;
  mensaje:string;
}
@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private auth:AngularFireAuth,
    private fireStore:AngularFirestore,
    private errorHand:ErrorHandlerService) { }

  public UploadMessage(message:string, curso:string){
    this.fireStore.collection(curso).add({
      usuario: this.auth.auth.currentUser.email,
      fecha: (new Date()).getTime(),
      mensaje: message
    }).then(()=>{
      //this.errorHand.mostrarErrorSolo('Mensaje enviado');
    }).catch((err)=>{
      this.errorHand.mostrarError(err);
    });
  }
  public GetMessages(curso:string){
    return this.fireStore.collection(curso).snapshotChanges().pipe(map((mensajes)=>{
      return mensajes.map((a)=>{
        const data = a.payload.doc.data() as Mensaje;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }
}

