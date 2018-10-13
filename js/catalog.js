'use strict';

(function () {
  var LITTLE_AMOUNT = 5;

  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = catalogCards.querySelector('.catalog__load');
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
    catalogCards.classList.remove('catalog__cards--load');
    catalogLoad.classList.add(window.util.HIDDEN_CLASSNAME);
  };

  var createCard = function (goodObject) {
    var newCatalogCard = cardTemplate.cloneNode(true);

    var amount = goodObject.amount;
    newCatalogCard.classList.remove('card--in--stock');
    var availabilityClass = 'card--in-stock';
    if (amount === 0) {
      availabilityClass = 'card--soon';
      newCatalogCard.querySelector('.card__btn').disabled = true;
    } else if ((amount >= 1) && (amount <= LITTLE_AMOUNT)) {
      availabilityClass = 'card--little';
    }
    newCatalogCard.classList.add(availabilityClass);

    newCatalogCard.querySelector('.card__title').textContent = goodObject.name;
    newCatalogCard.querySelector('.card__img').src = 'img/cards/' + goodObject.picture;
    newCatalogCard.querySelector('.card__img').alt = goodObject.name;

    var price = newCatalogCard.querySelector('.card__price');
    price.firstChild.textContent = goodObject.price;

    newCatalogCard.querySelector('.card__weight').textContent = '/ ' + goodObject.weight + ' Г';

    var rating = newCatalogCard.querySelector('.stars__rating');
    rating.classList.remove('stars__rating--five');
    var ratingValue = goodObject.rating.value;
    rating.textContent = ratingValue + ' ' + window.util.numDecline(ratingValue, 'звезда', 'звёзд', 'звезды');
    rating.classList.add(ratingValueToClassName[ratingValue]);

    newCatalogCard.querySelector('.star__count').textContent = goodObject.rating.number;

    var sugarText = (goodObject.nutritionFacts.sugar) ? 'Содержит сахар. ' : 'Без сахара. ';

    newCatalogCard.querySelector('.card__characteristic').textContent = sugarText + goodObject.nutritionFacts.energy + ' ккал';
    newCatalogCard.querySelector('.card__composition-list').textContent = goodObject.nutritionFacts.contents;

    if (goodObject.favorite) {
      newCatalogCard.querySelector('.card__btn-favorite').classList.add('card__btn-favorite--selected');
    }

    return newCatalogCard;
  };

  var clearCatalog = function () {
    catalogCards.innerHTML = '';
    catalogCards.appendChild(catalogLoad);
  };

  var renderCatalog = function (goods) {
    clearCatalog();
    var fragment = document.createDocumentFragment();
    goods.forEach(function (item) {
      var goodElement = createCard(item);
      fragment.appendChild(goodElement);
    });
    catalogCards.appendChild(fragment);
  };

  var showEmptyFilters = function () {
    clearCatalog();
    catalogCards.appendChild(emptyFilters);
  };

  var addGoodInCart = function (title) {
    var indexOfGood = window.util.getIndexByTitle(window.data.goods, title);
    var indexOfGoodInCart = window.util.getIndexByTitle(window.data.goodsInCart, title);
    if (indexOfGoodInCart === -1) {
      window.cart.addGood(window.data.goods[indexOfGood]);
    } else {      window.cart.increaseAmountOfGood(window.data.goodsInCart[indexOfGoodInCart]);
    }
  };

  var toggleCardFavorite = function (card) {
    card.querySelector('.card__btn-favorite').classList.toggle('card__btn-favorite--selected');

    var title = card.querySelector('.card__title').textContent;
    var goodObjectIndex = window.util.getIndexByTitle(window.data.goods, title);
    window.data.goods[goodObjectIndex].favorite = !window.data.goods[goodObjectIndex].favorite;

    window.filters.updateFavoriteLabel(window.data.goods);
  };

  var processCatalogEvent = function (eventString, target) {
    while (target !== catalogCards) {
      if (target.classList.contains('catalog__card')) {
        if (eventString === 'favorite') {
          toggleCardFavorite(target);
        }
        if (eventString === 'add_in_cart') {
          var title = target.querySelector('.card__title').textContent;
          addGoodInCart(title);
          break;
        }
        if (eventString === 'show_composition') {
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
    }
    if (target.classList.contains('card__btn') && !target.disabled) {
      // добавление товара в корзину
      processCatalogEvent('add_in_cart', target);
    }
    if (target.classList.contains('card__btn-composition')) {
      // закрывает / раскрывает состав карточки
      processCatalogEvent('show_composition', target);
    }
  };

  catalogCards.addEventListener('click', onCatalogCardsClick);

  window.catalog = {
    render: renderCatalog,
    hideLoadMessage: hideCatalogLoad,
    showEmptyFilters: showEmptyFilters
  };

})();
