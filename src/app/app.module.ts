import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HomeComponent } from './Home/home.component';
import { PostingComponent } from './Posts/posting.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostingComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'server-side-rendering' }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
