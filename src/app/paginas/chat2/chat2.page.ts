import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ErrorHandlerService } from 'src/app/servicios/error-handler.service';
import { SpinnerHandlerService } from 'src/app/servicios/spinner-handler.service';
import { MensajesService, Mensaje } from 'src/app/servicios/mensajes.service';
import { NavController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat2',
  templateUrl: './chat2.page.html',
  styleUrls: ['./chat2.page.scss'],
})
export class Chat2Page implements OnInit {
  @ViewChild(IonContent,{static:false}) content:IonContent;
  private spinner:any=null;
  private yo:string;
  private chats : Array<Mensaje> = null;
  public mensajeEnviar : string;
  public contenido: HTMLIonContentElement;
  constructor(
    private authService:AuthService,
    private errorHand:ErrorHandlerService,
    private spinnerHand:SpinnerHandlerService,
    private mensajesService:MensajesService,
    private navCtrl:NavController
  ) { 
    this.chats = new Array<Mensaje>();
  }

  public async ngOnInit() {
    console.log(this.chats);
    this.yo = this.authService.GetUser();
    this.scrollToBottom();
  }

  ionViewDidEnter()
  {
    this.ActualizarChats();
    this.scrollToBottom();
  }
  
  public async ActualizarChats()
  {
    this.chats = [];
    this.spinner = await this.spinnerHand.GetAllPageSpinner('Cargando mensajes...');
    this.spinner.present();
    this.mensajesService.GetMessages('pps-4b').subscribe(async (data)=>{
      this.chats = data;
      this.OrderByDate();
      this.spinner.dismiss();
      this.scrollToBottom();
    });
  }
  EnviarMensaje(){
    if(this.mensajeEnviar.trim() == "")
    {
      this.errorHand.mostrarErrorSolo("Mensaje vacío!");
    }
    else{
      this.mensajesService.UploadMessage(this.mensajeEnviar,'pps-4b');
    }
    this.mensajeEnviar = "";
    this.scrollToBottom();
    
  }
  private OrderByDate() {
    this.chats= this.chats.sort((a,b)=>{
      if(a.fecha<b.fecha)
      {return 1;}
      if(a.fecha > b.fecha)
      {return -1;}
      return 0;
    });
    this.chats = this.chats.reverse();
  }
  public scrollToBottom()
  {
    this.content.scrollToBottom();
  }
  public async goBack(){
    this.spinner = await this.spinnerHand.GetAllPageSpinner('Cargando...');
    this.spinner.present();
    this.navCtrl.navigateForward('inicio');
  }

}
