'use strict';

(function () {
  var cartCards = document.querySelector('.goods__cards');
  var cardEmpty = document.querySelector('.goods__card-empty');
  var mainCartHeader = document.querySelector('.main-header__basket');
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

  var changeMainCartHeader = function () {
    var numDataObject = getCartNumerics();

    if (numDataObject.orderedAmount > 0) {
      mainCartHeader.textContent = 'В корзине ' + numDataObject.orderedAmount
        + window.util.numDecline(numDataObject.orderedAmount, ' товар', ' товара', ' товаров')
        + ' на сумму ' + numDataObject.price + ' ₽';
    } else {
      mainCartHeader.textContent = 'В корзине ничего нет';
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
      cardEmpty.classList.remove('visually-hidden');
      cartCards.classList.add('goods__cards--empty');
    } else {
      cardEmpty.classList.add('visually-hidden');
      cartCards.classList.remove('goods__cards--empty');
    }
  };

  var renderCart = function () {
    cartCards.innerHTML = '';
    cartCards.appendChild(cardEmpty);

    if (cartIsEmpty()) {
      showEmptyCard(true);
      window.order.setBuyingFormDisabled(true);
    } else {
      showEmptyCard(false);
      var fragment = document.createDocumentFragment();

      window.data.goodsInCart.forEach(function (item) {
        var newCartCard = createCardInCart(item);
        fragment.appendChild(newCartCard);
      });

      cartCards.appendChild(fragment);
      window.order.setBuyingFormDisabled(false);
    }

    changeMainCartHeader();
  };

  var removeGoodFromCart = function (goodObject) {
    var indexOfGood = window.util.getIndexByTitle(window.data.goodsInCart, goodObject.name);
    window.data.goodsInCart.splice(indexOfGood, 1);
    renderCart();
  };

  var increaseAmountOfGood = function (goodObject) {
    if (goodObject.orderedAmount < goodObject.amount) {
      goodObject.orderedAmount += 1;
      renderCart();
    }
  };

  var decreaseAmountOfGood = function (goodObject) {
    goodObject.orderedAmount -= 1;
    if (goodObject.orderedAmount <= 0) {
      removeGoodFromCart(goodObject);
    } else {
      renderCart();
    }
  };

  var addGoodInCart = function (goodObject) {
    var addedGoodObject = {
      name: goodObject.name,
      picture: goodObject.picture,
      amount: goodObject.amount,
      price: goodObject.price,
      orderedAmount: 1
    };
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
        } else if (eventName === 'decrease') {
          decreaseAmountOfGood(goodInCartObject);
          break;
        } else if (eventName === 'remove') {
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
    } else if (target.classList.contains('card-order__btn--decrease')) {
      processCartEvent('decrease', target);
    } else if (target.classList.contains('card-order__close')) {
      processCartEvent('remove', target);
    }
  };

  cartCards.addEventListener('click', onCartCardsClick);

  window.cart = {
    increaseAmountOfGood: increaseAmountOfGood,
    decreaseAmountOfGood: decreaseAmountOfGood,
    isEmpty: cartIsEmpty,
    addGood: addGoodInCart,
    removeGood: removeGoodFromCart
  };
})();
