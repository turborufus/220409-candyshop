'use strict';

(function () {
  var cartCards = document.querySelector('.goods__cards');
  var cardEmpty = document.querySelector('.goods__card-empty');
  var mainCartHeader = document.querySelector('.main-header__basket');
  var goodsTotal = document.querySelector('.goods__total');
  var goodsTotalCount = goodsTotal.querySelector('.goods__total-count');
  var goodsOrder = goodsTotal.querySelector('.goods__order-link');
  var cartCardTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

  var getCartNumerics = function () {
    var numDataObject = {
      orderedAmount: 0,
      price: 0
    };
    window.data.goodsInCart.forEach(function (good) {
      numDataObject.orderedAmount += good.orderedAmount;
      numDataObject.price += good.orderedAmount * good.price;
    });
    return numDataObject;
  };

  var changeMainCartHeader = function (numDataObject) {
    if (numDataObject.orderedAmount > 0) {
      mainCartHeader.textContent = 'В корзине ' + numDataObject.orderedAmount
        + window.util.numDecline(numDataObject.orderedAmount, ' товар', ' товара', ' товаров')
        + ' на сумму ' + numDataObject.price + ' ₽';
    } else {
      mainCartHeader.textContent = 'В корзине ничего нет';
    }
  };

  var changeGoodsTotalCount = function (numDataObject) {
    if (numDataObject.orderedAmount > 0) {
      goodsTotalCount.firstChild.textContent = 'Итого за ' + numDataObject.orderedAmount + window.util.numDecline(numDataObject.orderedAmount, ' товар:', ' товара:', ' товаров:');
      goodsTotal.querySelector('.goods__price').textContent = numDataObject.price + ' ₽';
    }
  };

  var createCardInCart = function (goodObject) {
    var cartCard = cartCardTemplate.cloneNode(true);
    cartCard.querySelector('.card-order__title').textContent = goodObject.name;
    cartCard.querySelector('.card-order__img').src = 'img/cards/' + goodObject.picture;
    cartCard.querySelector('.card-order__img').alt = goodObject.name;
    cartCard.querySelector('.card-order__price').textContent = goodObject.price + ' ₽';
    cartCard.querySelector('.card-order__count').value = goodObject.orderedAmount;
    return cartCard;
  };

  var cartIsEmpty = function () {
    return (window.data.goodsInCart.length === 0);
  };

  var showEmptyCard = function (show) {
    if (show) {
      cardEmpty.classList.remove(window.util.HIDDEN_CLASSNAME);
      cartCards.classList.add('goods__cards--empty');
    } else {
      cardEmpty.classList.add(window.util.HIDDEN_CLASSNAME);
      cartCards.classList.remove('goods__cards--empty');
    }
  };

  var showGoodsTotal = function (show) {
    var disabledClass = 'goods__order-link--disabled';
    if (show) {
      goodsTotal.classList.remove(window.util.HIDDEN_CLASSNAME);
      goodsOrder.classList.remove(disabledClass);
    } else {
      goodsTotal.classList.add(window.util.HIDDEN_CLASSNAME);
      goodsOrder.classList.add(disabledClass);
    }
  };

  var renderCart = function () {
    cartCards.innerHTML = '';
    cartCards.appendChild(cardEmpty);

    if (cartIsEmpty()) {
      showEmptyCard(true);
      window.order.activate(false);
    } else {
      showEmptyCard(false);
      var fragment = document.createDocumentFragment();

      window.data.goodsInCart.forEach(function (item) {
        var newCartCard = createCardInCart(item);
        fragment.appendChild(newCartCard);
      });

      cartCards.appendChild(fragment);
      cartCards.appendChild(goodsTotal);
      showGoodsTotal(true);
    }

    var cartNumerics = getCartNumerics();
    changeMainCartHeader(cartNumerics);
    changeGoodsTotalCount(cartNumerics);
  };

  var removeGoodFromCart = function (cartGood) {
    var indexGoodInCart = window.util.getIndexByTitle(window.data.goodsInCart, cartGood.name);
    var indexGood = window.util.getIndexByTitle(window.data.goods, cartGood.name);
    var catalogGood = window.data.goods[indexGood];

    catalogGood.amount += cartGood.orderedAmount;
    window.filters.update(window.data.goods);
    window.data.goodsInCart.splice(indexGoodInCart, 1);
    renderCart();
  };

  var increaseAmountOfGood = function (cartGood) {
    var indexGood = window.util.getIndexByTitle(window.data.goods, cartGood.name);
    var catalogGood = window.data.goods[indexGood];

    if (catalogGood.amount > 0) {
      cartGood.orderedAmount += 1;
      catalogGood.amount -= 1;
      window.filters.update(window.data.goods);
      renderCart();
    }
  };

  var decreaseAmountOfGood = function (cartGood) {
    var indexGood = window.util.getIndexByTitle(window.data.goods, cartGood.name);
    var catalogGood = window.data.goods[indexGood];

    if (cartGood.orderedAmount === 1) {
      removeGoodFromCart(cartGood);
    } else {
      cartGood.orderedAmount -= 1;
      catalogGood.amount += 1;
      window.filters.update(window.data.goods);
      renderCart();
    }
  };

  var addGoodInCart = function (catalogGood) {
    var addedGoodObject = {
      name: catalogGood.name,
      picture: catalogGood.picture,
      price: catalogGood.price,
      orderedAmount: 1
    };
    catalogGood.amount -= addedGoodObject.orderedAmount;
    window.filters.update(window.data.goods);
    window.data.goodsInCart.push(addedGoodObject);
    renderCart();
  };

  var processCartEvent = function (eventName, target) {
    while (target !== cartCards) {
      if (target.classList.contains('goods_card')) {
        var title = target.querySelector('.card-order__title').textContent;
        var goodInCartObject = window.data.goodsInCart[window.util.getIndexByTitle(window.data.goodsInCart, title)];

        if (eventName === 'increase') {
          increaseAmountOfGood(goodInCartObject);
          break;
        }
        if (eventName === 'decrease') {
          decreaseAmountOfGood(goodInCartObject);
          break;
        }
        if (eventName === 'remove') {
          removeGoodFromCart(goodInCartObject);
          break;
        }
      }
      target = target.parentNode;
    }
  };

  var onCartCardsClick = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.classList.contains('card-order__btn--increase')) {
      processCartEvent('increase', target);
    }
    if (target.classList.contains('card-order__btn--decrease')) {
      processCartEvent('decrease', target);
    }
    if (target.classList.contains('card-order__close')) {
      processCartEvent('remove', target);
    }
  };

  cartCards.addEventListener('click', onCartCardsClick);

  goodsOrder.addEventListener('click', function () {
    window.order.activate(true);
  });

  window.cart = {
    increaseAmountOfGood: increaseAmountOfGood,
    decreaseAmountOfGood: decreaseAmountOfGood,
    isEmpty: cartIsEmpty,
    addGood: addGoodInCart,
    removeGood: removeGoodFromCart
  };
})();
