import { NgModule } from '@angular/core';
// ...existing code...
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    // ...existing code...
  ],
  imports: [
    // ...existing code...
  ],
  providers: [AuthService],
  bootstrap: []
})
export class AppModule { }
