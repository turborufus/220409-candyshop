'use strict';

(function () {

  var catalogFilterForm = document.querySelector('.catalog__sidebar').querySelector('form');
  var showAllButton = catalogFilterForm.querySelector('.catalog__submit');
  var availabilityFilter = catalogFilterForm.querySelector('#filter-availability');
  var favoriteFilter = catalogFilterForm.querySelector('#filter-favorite');

  var typeFilters = catalogFilterForm.querySelectorAll('input[name=food-type]');
  var propertyFilters = catalogFilterForm.querySelectorAll('input[name=food-property]');
  var markFilters = catalogFilterForm.querySelectorAll('input[name=mark]');

  var idToType = {
    'filter-icecream': 'Мороженое',
    'filter-soda': 'Газировка',
    'filter-gum': 'Жевательная резинка',
    'filter-marmalade': 'Мармелад',
    'filter-marshmallows': 'Зефир'
  };

  var filterByType = function (goods, types) {
    return goods.filter(function (goodObject) {
      return types.some(function (type) {
        return idToType[type] === goodObject.kind;
      });
    });
  };

  var filterByProperty = function (goods, propertyId) {
    return goods.filter(function (goodObject) {
      var propertyFilterValues = {
        'filter-sugar-free': goodObject.nutritionFacts.sugar === false,
        'filter-vegetarian': goodObject.nutritionFacts.vegetarian === true,
        'filter-gluten-free': goodObject.nutritionFacts.gluten === false
      };

      return propertyFilterValues[propertyId];
    });
  };

  var filterByPrice = function (goods, min, max) {
    return goods.filter(function (goodObject) {
      return (goodObject.price >= min && goodObject.price <= max);
    });
  };

  var filterByMark = function (goods, mark) {
    return goods.filter(function (goodObject) {
      var markFilterValues = {
        'filter-favorite': goodObject.favorite,
        'filter-availability': goodObject.amount > 0
      };

      return markFilterValues[mark];
    });
  };

  var updateItemCount = function (itemElement, count) {
    var siblingElement = itemElement.nextElementSibling;
    while ((!siblingElement.classList.contains('input-btn__item-count')) && (siblingElement !== null)) {
      siblingElement = siblingElement.nextElementSibling;
    }

    if (siblingElement !== null) {
      siblingElement.textContent = '(' + count + ')';
    }
  };

  var updateRangeCount = function (count) {
    catalogFilterForm.querySelector('.range__count').textContent = '(' + count + ')';
  };

  var updateFavoriteLabel = function (goods) {
    var filteredGoods = goods.slice();

    var favoriteItem = catalogFilterForm.querySelector('#filter-favorite');

    var itemCount = filterByMark(filteredGoods, favoriteItem.id).length;
    updateItemCount(favoriteItem, itemCount);
  };

  var initItemCountLabels = function (goods) {
    var filteredArray = goods.slice();

    typeFilters.forEach(function (item) {
      var itemCount = filteredArray.filter(function (obj) {
        return obj.kind === idToType[item.id];
      }).length;
      updateItemCount(item, itemCount);
    });
    propertyFilters.forEach(function (item) {
      var itemCount = filterByProperty(filteredArray, item.id).length;
      updateItemCount(item, itemCount);
    });

    var minPriceValue = catalogFilterForm.querySelector('.range__price--min').textContent;
    var maxPriceValue = catalogFilterForm.querySelector('.range__price--max').textContent;
    updateRangeCount(filterByPrice(filteredArray, minPriceValue, maxPriceValue).length);

    markFilters.forEach(function (item) {
      var itemCount = filterByMark(filteredArray, item.id).length;
      updateItemCount(item, itemCount);
    });
  };

  var update = function (goods) {
    var filteredGoods = goods.slice();

    var checkedTypeFilters = catalogFilterForm.querySelectorAll('input[name=food-type][type=checkbox]:checked');
    var checkedPropertyFilters = catalogFilterForm.querySelectorAll('input[name=food-property][type=checkbox]:checked');
    var checkedMarkFilters = catalogFilterForm.querySelectorAll('input[name=mark][type=checkbox]:checked');
    var minPriceValue = catalogFilterForm.querySelector('.range__price--min').textContent;
    var maxPriceValue = catalogFilterForm.querySelector('.range__price--max').textContent;
    var checkedSortFilter = catalogFilterForm.querySelector('input[type=radio]:checked');

    var sortFileredGoods = function (sortType) {
      return filteredGoods.sort(function (goodA, goodB) {
        var sortComparatorValues = {
          'filter-popular': 0,
          'filter-expensive': goodB.price - goodA.price,
          'filter-cheep': goodA.price - goodB.price,
          'filter-rating': goodB.rating.value !== goodA.rating.value ? (goodB.rating.value - goodA.rating.value) : (goodB.rating.number - goodA.rating.number)
        };
        return sortComparatorValues[sortType];
      });
    };

    if (checkedMarkFilters !== null && checkedMarkFilters.length !== 0) {
      if (checkedMarkFilters.length > 1) { // выбраны оба условия
        filteredGoods = [];
      } else {
        checkedMarkFilters.forEach(function (item) {
          filteredGoods = filterByMark(filteredGoods, item.id);
          updateItemCount(item, filteredGoods.length);
        });
      }
    } else {
      if (checkedTypeFilters !== null && checkedTypeFilters.length !== 0) {
        var checkedTypes = [];
        checkedTypeFilters.forEach(function (item) {
          checkedTypes.push(item.id);
        });
        filteredGoods = filterByType(filteredGoods, checkedTypes);
      }

      if (checkedPropertyFilters !== null && checkedPropertyFilters.length !== 0) {
        checkedPropertyFilters.forEach(function (item) {
          filteredGoods = filterByProperty(filteredGoods, item.id);
        });
      }

      filteredGoods = filterByPrice(filteredGoods, minPriceValue, maxPriceValue);
    }

    if (checkedSortFilter !== null) {
      filteredGoods = sortFileredGoods(checkedSortFilter.id);
    }

    if (filteredGoods.length > 0) {
      window.catalog.render(filteredGoods);
    } else {
      window.catalog.showEmptyFilters();
    }
  };

  var uncheckAllFilters = function () {
    typeFilters.forEach(function (item) {
      item.checked = false;
    });
    propertyFilters.forEach(function (item) {
      item.checked = false;
    });
    markFilters.forEach(function (item) {
      item.checked = false;
    });
  };

  catalogFilterForm.addEventListener('change', function () {
    window.util.debounce(update(window.data.goods));
  });

  showAllButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    uncheckAllFilters();
    window.catalog.render(window.data.goods);
  });

  availabilityFilter.addEventListener('click', function () {
    uncheckAllFilters();
    availabilityFilter.checked = true;
  });

  favoriteFilter.addEventListener('click', function () {
    uncheckAllFilters();
    favoriteFilter.checked = true;
  });

  var addCheckboxEventListener = function (checkbox) {
    checkbox.addEventListener('click', function () {
      if (markFilters.length !== 0) {
        markFilters.forEach(function (item) { // снимается фильтр Избранное / в наличии
          item.checked = false;
        });
      }
    });
  };

  typeFilters.forEach(function (item) {
    addCheckboxEventListener(item);
  });
  propertyFilters.forEach(function (item) {
    addCheckboxEventListener(item);
  });

  window.filters = {
    update: update,
    initItemCountLabels: initItemCountLabels,
    updateFavoriteLabel: updateFavoriteLabel
  };

})();
