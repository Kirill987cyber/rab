const products = [
  { id: 1, title: 'Ноутбук 15"',       category: 'Компьютеры', price: 85000 },
  { id: 2, title: 'Монитор 27"',       category: 'Компьютеры', price: 28000 },
  { id: 3, title: 'Клавиатура',        category: 'Аксессуары', price: 6500 },
  { id: 4, title: 'Мышь беспроводная', category: 'Аксессуары', price: 2500 },
  { id: 5, title: 'Айфон',             category: 'Телефоны', price: 84000 },
  { id: 6, title: 'Айпад',             category: 'Планшеты', price: 120000 },
  { id: 7, title: 'МакБук',            category: 'Ноутбуки', price: 150000 },
  { id: 8, title: 'Принтер',           category: 'Оргтехника', price: 15000 },
  { id: 9, title: 'Флешка 64GB',       category: 'Аксессуары', price: 1500 }
];

const catalog = document.getElementById('catalog');
const cart = [];
const clearBtn = document.getElementById('clear-cart-btn');
const cartCount = document.getElementById('cart-count');
const cartSum = document.getElementById('cart-sum');

function renderProducts() {
  catalog.innerHTML = products.map(p => `
    <div class="card">
      <div class="category">${p.category}</div>
      <h3>${p.title}</h3>
      <div class="price">${p.price.toLocaleString('ru-RU')} ₽</div>
      <button class="add-to-cart" data-id="${p.id}">В корзину</button>
    </div>
  `).join('');
}

renderProducts();

function renderCart() {
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  cartSum.textContent = total.toLocaleString('ru-RU');
}

catalog.addEventListener('click', function(event) {
  if (event.target.classList.contains('add-to-cart')) {
    const id = Number(event.target.dataset.id);
    const product = products.find(p => p.id === id);
    
    if (product) {
      console.log('Добавлен товар:', product.title); 
      
      cart.push(product);
      renderCart(); 
    }
  }
});

clearBtn.addEventListener('click', () => {
  cart.length = 0; 
  renderCart();   
  console.log('Корзина очищена');
});