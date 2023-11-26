import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  //   title: 'Home page',
  // },

  {
    path: 'about-us',
    component: AboutUsComponent,
    title: 'About Us page',
  },
];

export default routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
