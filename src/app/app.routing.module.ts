import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { PostingComponent } from './Posts/posting.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'postings/:id', component: PostingComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
