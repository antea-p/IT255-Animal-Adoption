import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // component: HomeComponent
    title: 'Home page',
  },
  {
    path: 'detail/:id',
    // component: AnimalDetailsComponent
    title: 'Details page',
  },
  {
    path: 'about-us',
    // component: AboutUsComponent
    title: 'About Us page',
  },
];

export default routes;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
