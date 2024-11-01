import { Routes } from '@angular/router';
import { VendasComponent } from './pages/vendas/vendas.component';
import { HomeComponent } from './pages/home/home.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';

export const routes: Routes = [
    {path: 'produtos', component: HomeComponent},
    {path: 'vendas', component: VendasComponent},
    {path: 'carrinho', component: CarrinhoComponent},
    { path: '**', redirectTo: '/produtos' } 
];
