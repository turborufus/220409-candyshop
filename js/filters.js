'use strict';

(function () {
  var idToType = {
    'filter-icecream': 'Мороженое',
    'filter-soda': 'Газировка',
    'filter-gum': 'Жевательная резинка',
    'filter-marmalade': 'Мармелад',
    'filter-marshmallows': 'Зефир'
  };

  var catalogFilterForm = document.querySelector('.catalog__sidebar').querySelector('form');
  

  var update = function (goods) {
    var filteredGoods = goods.slice();

    var typeFilters = catalogFilterForm.querySelectorAll('input[name=food-type][type=checkbox]:checked');
    var propertyFilters = catalogFilterForm.querySelectorAll('input[name=food-property][type=checkbox]:checked');
    var markFilters = catalogFilterForm.querySelectorAll('input[name=mark][type=checkbox]:checked');
    var minPriceValue = catalogFilterForm.querySelector('.range__price--min').textContent;
    var maxPriceValue = catalogFilterForm.querySelector('.range__price--max').textContent;
    var sortFilter = catalogFilterForm.querySelector('input[type=radio]:checked');
    
    var filterByType = function (types) {
      return filteredGoods.filter(function (goodObject) {
        return types.some(function (type) {
          return idToType[type] === goodObject.kind;
        })
      });
    };
    
    var filterByProperty = function (propertyId) {
      return filteredGoods.filter(function (goodObject) {
        var propertyFilterValues = {
          'filter-sugar-free': goodObject.nutritionFacts.sugar === false,
          'filter-vegetarian': goodObject.nutritionFacts.vegetarian === true,
          'filter-gluten-free': goodObject.nutritionFacts.gluten === false
        };
        
        return propertyFilterValues[propertyId];
      });
    };
    
    var filterByPrice = function (min, max) {
      return filteredGoods.filter(function (goodObject) {
        return (goodObject.price >= min && goodObject.price <= max);
      });
    };
    
    var filterByMark = function (mark) {
      return filteredGoods.filter(function (goodObject) {
        var markFilterValues = {
          'filter-favorite': goodObject.favorite,
          'filter-availability': goodObject.amount > 0
        };
        
        return markFilterValues[mark];
      });
    }
    
    var sortFileredGoods = function (sortType) {
      return filteredGoods.sort(function (goodA, goodB) {
        var sortComparatorValues = {
          'filter-popular': 0,
          'filter-expensive': goodB.price - goodA.price,
          'filter-cheep': goodA.price - goodB.price,
          'filter-rating': goodB.rating.value != goodA.rating.value ? (goodB.rating.value - goodA.rating.value) : (goodB.rating.number - goodA.rating.number) 
        };
        return sortComparatorValues[sortType];
      });       
    };
    
    if (markFilters != null && markFilters.length != 0) {
      if (markFilters.length > 1) { // выбраны оба условия
        filteredGoods = [];
      } else {
        markFilters.forEach(function (item) {
          filteredGoods = filterByMark(item.id);
        });
      }
    } else {
        if (typeFilters != null && typeFilters.length != 0) {
        var checkedTypes = [];
        typeFilters.forEach(function (item) {
          checkedTypes.push(item.id);
        });
        filteredGoods = filterByType(checkedTypes);
        console.log('byType: ')
        console.log(filteredGoods);
      }
      if (propertyFilters != null && propertyFilters.length != 0) {
        propertyFilters.forEach(function (item) {
          filteredGoods = filterByProperty(item.id);
          console.log('byProperty: ')
          console.log(filteredGoods);
        });
      }

      filteredGoods = filterByPrice(minPriceValue, maxPriceValue);
      console.log('byPrice: ')
      console.log(filteredGoods);
    }
    
    if (sortFilter != null) {
      filteredGoods = sortFileredGoods(sortFilter.id);
      console.log('SORT: ');
      console.log(filteredGoods);
    }
    
    if (filteredGoods.length > 0) {
      window.catalog.render(filteredGoods);
    } else {
      window.catalog.showEmptyFilters();
    }
    
  };

  window.filters = {
    update: update
  };

})();
