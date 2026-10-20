const products = [
  { id: 1, title: 'Ноутбук 15"',       category: 'Компьютеры', price: 85000 },
  { id: 2, title: 'Монитор 27"',       category: 'Компьютеры', price: 28000 },
  { id: 3, title: 'Клавиатура',        category: 'Аксессуары', price: 6500 },
  { id: 4, title: 'Мышь беспроводная', category: 'Аксессуары', price: 2500 },
  { id: 5, title: 'Айфон',             category: 'Компьютеры', price: 84000 },
  { id: 6, title: 'Айпад',             category: 'Аксессуары', price: 120000 },
  { id: 7, title: 'МакБук',            category: 'Аксессуары', price: 150000 }
];

const catalog = document.getElementById('catalog');

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

// Ловим клики по каталогу
catalog.addEventListener('click', function(event) {
  // Если кликнули по кнопке
  if (event.target.tagName === 'BUTTON') {
    // Берем ID товара
    const id = Number(event.target.getAttribute('data-id'));
    // Ищем товар
    const product = products.find(p => p.id === id);
    
    // Выводим в консоль
    if (product) {
      console.log('Добавлен товар:', product.title);
    }
  }
});