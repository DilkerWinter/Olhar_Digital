import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ProdutoCardComponent } from './components/produto-card/produto-card.component';
import { Produto } from '../../models/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProdutoCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  produtos: Produto[] = [
    new Produto(1, "Óculos de Sol Masculino", "Rayban", 5499.00, 15, "https://shadyrays.com/cdn/shop/files/homepage-polarized-sunglasses-desk.png?v=11797174737246570511"),
    new Produto(2, "Tênis Esportivo", "Nike Air Max", 3999.00, 20, "https://images.tcdn.com.br/img/img_prod/1210095/tenis_tesla_coil_black_reflect_579_1_c051096c6605385af7481c1f757b18e8_20240222144828.jpg"),
    new Produto(3, "Camiseta Polo", "Tommy Hilfiger", 299.99, 50, "https://img.irroba.com.br/fit-in/600x600/filters:format(webp):fill(fff):quality(80)/chierega/catalog/import_products_images/65258e8a94a4f.jpg"),
    new Produto(4, "Relógio de Pulso", "Casio", 1299.00, 10, "https://m.media-amazon.com/images/I/61ZLJuiEK-L._AC_SX679_.jpg"),
    new Produto(5, "Fone de Ouvido Bluetooth", "Sony", 799.00, 30, "https://down-br.img.susercontent.com/file/7e80e85c33872e236f8c09fb0389540c.webp"),
    new Produto(6, "Mochila Backpack", "Adidas", 499.00, 25, "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/abe3a78ccfe34bacb6d0ad5600ee3f3a_9366/Mochila_Adicolor_Preto_H35596_01_standard.jpg"),
    new Produto(7, "Smartwatch", "Samsung Galaxy", 1899.00, 5, "https://img.odcdn.com.br/wp-content/uploads/2024/07/shutterstock_2337826061.jpg"),
    new Produto(8, "Jaqueta de Couro", "AllSaints", 2499.00, 12, "https://cdnv2.moovin.com.br/courosdovalleh/imagens/produtos/original/jaqueta-couro-legitimo-00798-c8581fe834e6473815129f77bc1c2f80.jpg"),
  ];
}
