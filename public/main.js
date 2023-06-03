$(document).ready(function () {
  function searchRecipes(title, categories, ingInclude, ingExclude) {
    $.ajax({
      url: '/search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ 
        title: title,
        categories: categories,
        ingInclude: ingInclude,
        ingExclude: ingExclude
      }),
      success: function(matchedRecipes) {
        var recipeList = $('#recipeList');
        recipeList.empty();
  
        matchedRecipes.forEach(function(recipe) {
          var card = $('<div>').addClass('card');
          var link = $('<a>').attr('href', 'recipe/' + recipe.id);
          var image = $('<img>').addClass('card-img').attr('alt', 'photo of ' + recipe.title).attr('src', '/imgs/' + recipe.imagePath);
          var cardBody = $('<div>').addClass('card-body');
          var title = $('<p>').addClass('card-title').text(recipe.title);
  
          cardBody.append(title);
          link.append(image);
          card.append(link).append(cardBody);
          recipeList.append(card);
        });
      },
      error: function(error) {
        console.error(error);
        alert('An error occurred during the search');
      }
    });
  }  

  $('#searchForm').on('submit', function() {
    searchRecipes($('#query').val(), [], [], []);
  });
  $('#query').on('input', function() {
    var categories = $('#search-categories input[name="categories"]:checked').map(function() {
      return this.value;
    }).get();
    searchRecipes($('#query').val(), categories, $('#ingInclude').val(), $('#ingExclude').val());
  });
  $('#ingInclude').on('change', function() {
    var categories = $('#search-categories input[name="categories"]:checked').map(function() {
      return this.value;
    }).get();
    searchRecipes($('#query').val(), categories, $('#ingInclude').val(), $('#ingExclude').val());
  });
  $('#ingExclude').on('change', function() {
    var categories = $('#search-categories input[name="categories"]:checked').map(function() {
      return this.value;
    }).get();
    searchRecipes($('#query').val(), categories, $('#ingInclude').val(), $('#ingExclude').val());
  });
  $('#search-categories').on('change', function() {
    var categories = $('#search-categories input[name="categories"]:checked').map(function() {
      return this.value;
    }).get();
    searchRecipes($('#query').val(), categories, $('#ingInclude').val(), $('#ingExclude').val());
  });
});

// ======================================================================================

const searchIcon = $("#searchIcon");
const nav = $(".nav");

searchIcon.on("click", function () {
  nav.toggleClass("openSearch");
  nav.removeClass("openNav");
  if (nav.hasClass("openSearch")) {
    return searchIcon.removeClass("fa-magnifying-glass").addClass("fa-xmark");
  }
  searchIcon.removeClass("fa-xmark").addClass("fa-magnifying-glass");
});

$(".navOpenBtn").on("click", function () {
  nav.addClass("openNav");
  nav.removeClass("openSearch");
  searchIcon.removeClass("fa-xmark").addClass("fa-magnifying-glass");
});

$(".navCloseBtn").on("click", function () {
  nav.removeClass("openNav");
});

// ======================================================================================

var checks = document.querySelectorAll("input[type=checkbox]");

for (var i = 0; i < checks.length; i++) {
  if (checks[i].checked) {
    showChildrenChecks(checks[i]);
  }
}

for (var i = 0; i < checks.length; i++) {
  checks[i].addEventListener('change', function () {
    if (this.checked) {
      showChildrenChecks(this);
    } else {
      hideChildrenChecks(this)
    }
  });
}

function showChildrenChecks(elm) {
  var pN = elm.parentNode;
  var childChecks = pN.children;

  for (var i = 0; i < childChecks.length; i++) {
    if (hasClass(childChecks[i], 'child-check')) {
      childChecks[i].classList.add("active");
    }
  }
}

function hideChildrenChecks(elm) {
  var pN = elm.parentNode;
  var childChecks = pN.children;

  for (var i = 0; i < childChecks.length; i++) {
    if (hasClass(childChecks[i], 'child-check')) {
      childChecks[i].classList.remove("active");
    }
  }
}

function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

// ======================================================================================

$('#addIng').on('click', function (event) {
  event.preventDefault();
  var $ing = $('#ingredients').one();
  const ingredient = '<li><input type="text" name="ingredients" /></li><br />'
  $ing.append(ingredient);
});

$('#addDir').on('click', function (event) {
  event.preventDefault();
  var $dir = $('#directions').one();
  const direction = '<li><textarea name="directions"></textarea></li><br />'
  $dir.append(direction);
});

// ======================================================================================



