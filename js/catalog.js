'use strict';

(function () {
  var catalogElements = document.querySelector('.catalog__cards');
  var catalogLoad = catalogElements.querySelector('.catalog__load');
  var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');
  var emptyFilters = document.querySelector('#empty-filters').content.querySelector('.catalog__empty-filter');

  var ratingValueToClassName = {
    1: 'stars__rating--one',
    2: 'stars__rating--two',
    3: 'stars__rating--three',
    4: 'stars__rating--four',
    5: 'stars__rating--five'
  };

  var hideCatalogLoad = function () {
    catalogElements.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');
  };

  // создание карточки товара для Каталога
  var createCard = function (goodObject) {
    var goodElement = cardTemplate.cloneNode(true);

    var amount = goodObject.amount;
    goodElement.classList.remove('card--in--stock');
    var availabilityClass = 'card--in-stock';
    if (amount === 0) {
      availabilityClass = 'card--soon';
      goodElement.querySelector('.card__btn').disabled = true;
    } else if ((amount >= 1) && (amount <= 5)) {
      availabilityClass = 'card--little';
    }
    goodElement.classList.add(availabilityClass);

    goodElement.querySelector('.card__title').textContent = goodObject.name;
    goodElement.querySelector('.card__img').src = 'img/cards/' + goodObject.picture;
    goodElement.querySelector('.card__img').alt = goodObject.name;

    var price = goodElement.querySelector('.card__price');
    price.firstChild.textContent = goodObject.price;

    goodElement.querySelector('.card__weight').textContent = '/ ' + goodObject.weight + ' Г';

    var rating = goodElement.querySelector('.stars__rating');
    rating.classList.remove('stars__rating--five');
    var ratingValue = goodObject.rating.value;
    rating.textContent = ratingValue + ' ' + window.util.numDecline(ratingValue, 'звезда', 'звёзд', 'звезды');
    rating.classList.add(ratingValueToClassName[ratingValue]);

    goodElement.querySelector('.star__count').textContent = goodObject.rating.number;

    var sugarText = 'Без сахара. ';
    if (goodObject.nutritionFacts.sugar) {
      sugarText = 'Содержит сахар. ';
    }
    goodElement.querySelector('.card__characteristic').textContent = sugarText + goodObject.nutritionFacts.energy + ' ккал';
    goodElement.querySelector('.card__composition-list').textContent = goodObject.nutritionFacts.contents;

    if (goodObject.favorite) {
      goodElement.querySelector('.card__btn-favorite').classList.add('card__btn-favorite--selected');
    }

    return goodElement;
  };

  var clearCatalog = function () {
    catalogElements.innerHTML = '';
    catalogElements.appendChild(catalogLoad);
  };

  var renderCatalog = function (goods) {
    clearCatalog();
    var fragmentOfCards = document.createDocumentFragment();
    goods.forEach(function (item) {
      var goodElement = createCard(item);
      fragmentOfCards.appendChild(goodElement);
    });
    catalogElements.appendChild(fragmentOfCards);
  };

  var showEmptyFilters = function () {
    clearCatalog();
    catalogElements.appendChild(emptyFilters);
  };

  // обработчик добавления в корзину
  var addGoodInCart = function (title) {
    var indexOfGood = window.util.getIndexByTitle(window.data.goods, title);
    var indexOfGoodInCart = window.util.getIndexByTitle(window.data.goodsInCart, title);
    // товара в корзине нет
    if (indexOfGoodInCart === -1) {
      window.cart.addGood(window.data.goods[indexOfGood]);
    } else { // товар в корзине есть
      window.cart.increaseAmountOfGood(indexOfGoodInCart);
    }
  };

  // добавление/удаление в Избранное
  var toggleCardFavorite = function (cardElement) {
    cardElement.querySelector('.card__btn-favorite').classList.toggle('card__btn-favorite--selected');

    var title = cardElement.querySelector('.card__title').textContent;
    var goodObjectIndex = window.util.getIndexByTitle(window.data.goods, title);
    window.data.goods[goodObjectIndex].favorite = !window.data.goods[goodObjectIndex].favorite;

    window.filters.updateFavoriteLabel(window.data.goods);
  };

  var processCatalogEvent = function (eventString, target) {
    while (target !== catalogElements) {
      if (target.classList.contains('catalog__card')) {
        if (eventString === 'favorite') {
          toggleCardFavorite(target);
        } else if (eventString === 'add_in_cart') {
          var title = target.querySelector('.card__title').textContent;
          addGoodInCart(title);
          break;
        } else if (eventString === 'show_composition') {
          var composition = target.querySelector('.card__composition');
          composition.classList.toggle('card__composition--hidden');
        }
      }
      target = target.parentNode;
    }
  };

  var onCatalogCardsClick = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.classList.contains('card__btn-favorite')) {
      // добавление/удаление из Избранного
      processCatalogEvent('favorite', target);
    } else if (target.classList.contains('card__btn') && !target.disabled) {
      // добавление товара в корзину
      processCatalogEvent('add_in_cart', target);
    } else if (target.classList.contains('card__btn-composition')) {
      // закрывает / раскрывает состав карточки
      processCatalogEvent('show_composition', target);
    }
  };

  catalogElements.addEventListener('click', onCatalogCardsClick);

  window.catalog = {
    render: renderCatalog,
    hideLoadMessage: hideCatalogLoad,
    showEmptyFilters: showEmptyFilters
  };

})();
