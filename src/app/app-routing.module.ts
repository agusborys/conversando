import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './paginas/login/login.module#LoginPageModule' },
  { path: 'inicio', loadChildren: './paginas/inicio/inicio.module#InicioPageModule' },
  { path: 'pps-4a', loadChildren: './paginas/chat/chat.module#ChatPageModule' },
  { path: 'pps-4b', loadChildren: './paginas/chat2/chat2.module#Chat2PageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
