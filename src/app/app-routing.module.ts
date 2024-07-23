import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { MainContentComponent } from './components/main-content/main-content.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] }, 
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: MainContentComponent, canActivate: [AuthGuard] },
  { path: 'main-content', component: MainContentComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
