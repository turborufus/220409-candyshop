'use strict';

(function () {
  var cartElements = document.querySelector('.goods__cards');
  var cardEmpty = document.querySelector('.goods__card-empty');

  var cardInCartTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');


  var getCartNumerics = function () {
    var numDataObject = {
      orderedAmount: 0,
      price: 0
    };

    for (var i = 0; i < window.data.goodsInCart.length; i++) {
      numDataObject.orderedAmount += window.data.goodsInCart[i].orderedAmount;
      numDataObject.price += window.data.goodsInCart[i].orderedAmount * window.data.goodsInCart[i].price;
    }

    return numDataObject;
  };

  var changeMainBasketHeader = function () {
    var mainBasketHeader = document.querySelector('.main-header__basket');

    var numDataObject = getCartNumerics();

    if (numDataObject.orderedAmount > 0) {
      mainBasketHeader.textContent = 'В корзине ' + numDataObject.orderedAmount + window.util.numDecline(numDataObject.orderedAmount, ' товар', ' товара', ' товаров') + ' на сумму ' + numDataObject.price + ' ₽';
    } else {
      mainBasketHeader.textContent = 'В корзине ничего нет';
    }
  };

  // создание карточки в корзине
  var createCardInCart = function (goodObject) {
    var cartElement = cardInCartTemplate.cloneNode(true);
    cartElement.querySelector('.card-order__title').textContent = goodObject.name;

    cartElement.querySelector('.card-order__img').src = goodObject.picture;
    cartElement.querySelector('.card-order__img').alt = goodObject.name;

    cartElement.querySelector('.card-order__price').textContent = goodObject.price + ' ₽';

    cartElement.querySelector('.card-order__count').value = goodObject.orderedAmount;

    return cartElement;
  };


  var renderCart = function () {
    cartElements.innerHTML = '';
    cartElements.appendChild(cardEmpty);
    cardEmpty.classList.add('visually-hidden');

    if (window.data.goodsInCart.length === 0) {
      cardEmpty.classList.remove('visually-hidden');
      cartElements.classList.add('goods__cards--empty');

      window.order.setBuyingFormDisabled(true);
    } else {
      var fragmentOfElements = document.createDocumentFragment();
      for (var i = 0; i < window.data.goodsInCart.length; i++) {
        var newCartElement = createCardInCart(window.data.goodsInCart[i]);
        fragmentOfElements.appendChild(newCartElement);
      }
      cartElements.appendChild(fragmentOfElements);

      window.order.setBuyingFormDisabled(false);
    }

    changeMainBasketHeader();
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

  var processCartEvent = function (eventName, target) {
    while (target !== cartElements) {
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

  cartElements.addEventListener('click', onCartCardsClick);

  if (cartElements.classList.contains('goods__cards--empty')) {
    window.order.setBuyingFormDisabled(true);
  }

  window.cart = {
    render: renderCart,
    increaseAmountOfGood: increaseAmountOfGood,
    decreaseAmountOfGood: decreaseAmountOfGood
  };
})();
