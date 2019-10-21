import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { SpinnerHandlerService } from 'src/app/servicios/spinner-handler.service';
import { timer } from 'rxjs/internal/observable/timer';
import { AuthService } from 'src/app/servicios/auth.service';
import { ErrorHandlerService } from 'src/app/servicios/error-handler.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  private spinner:any;
  constructor(
    private alertCtrl:AlertController,
    private spinnerHand:SpinnerHandlerService,
    private authService:AuthService,
    private navCtrl:NavController,
    private errorHand:ErrorHandlerService
  ) { }

  ngOnInit() {
  }
  pps_4a(){
    this.navCtrl.navigateForward('pps-4a');
  }
  pps_4b(){
    this.navCtrl.navigateForward('pps-4b');
  }

  //cerrar sesión
  public async LogOut() {
    const alert = await this.alertCtrl.create({
      cssClass: 'avisoAlert',
      header:'¿Desea cerrar sesión?',
      buttons:[{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
        }
      },
    {
      text:'Ok',
      handler: async () => {
        this.spinner = await this.spinnerHand.GetAllPageSpinner('Cerrando sesión.');
        this.spinner.present();

        timer(2000).subscribe(()=>{
          this.authService.LogOut().then(() => {
          this.navCtrl.navigateRoot('login', { replaceUrl: true });
          }).catch(error => {
            this.errorHand.mostrarError(error);
          }).finally(() => {
            //timer(2000).subscribe(()=>this.spinner.dismiss());
            
          });
        });
      }
    }]
    });
    await alert.present(); 
  }

}
