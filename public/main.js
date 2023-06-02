// ======================================================================================

const searchIcon = $("#searchIcon");
const nav = $(".nav");

searchIcon.on("click", function() {
  nav.toggleClass("openSearch");
  nav.removeClass("openNav");
  if (nav.hasClass("openSearch")) {
    return searchIcon.removeClass("fa-magnifying-glass").addClass("fa-xmark");
  }
  searchIcon.removeClass("fa-xmark").addClass("fa-magnifying-glass");
});

$(".navOpenBtn").on("click", function() {
  nav.addClass("openNav");
  nav.removeClass("openSearch");
  searchIcon.removeClass("fa-xmark").addClass("fa-magnifying-glass");
});

$(".navCloseBtn").on("click", function() {
  nav.removeClass("openNav");
});

// ======================================================================================

var checks = document.querySelectorAll("input[type=checkbox]");

for(var i = 0; i < checks.length; i++){
  if(checks[i].checked) {
    showChildrenChecks(checks[i]);
  } 
}

for(var i = 0; i < checks.length; i++){
  checks[i].addEventListener('change', function() {
    if(this.checked) {
      showChildrenChecks(this);
    } else {
      hideChildrenChecks(this)
    }
  });
}

function showChildrenChecks(elm) {
  var pN = elm.parentNode;
  var childChecks = pN.children;
   
  for(var i = 0; i < childChecks.length; i++){
    if(hasClass(childChecks[i], 'child-check')){
      childChecks[i].classList.add("active");      
    }
  }
}

function hideChildrenChecks(elm) {
  var pN = elm.parentNode;
  var childChecks = pN.children;
   
  for(var i = 0; i < childChecks.length; i++){
    if(hasClass(childChecks[i], 'child-check')){
      childChecks[i].classList.remove("active");      
    }
  }  
}

function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

// ======================================================================================

$('#addIng').on('click', function(event) {
  event.preventDefault();
  var $ing = $('#ingredients').one();
  const ingredient = '<li><input type="text" name="ingredients" /></li><br />'
  $ing.append(ingredient);
});

$('#addDir').on('click', function(event) {
  event.preventDefault();
  var $dir = $('#directions').one();
  const direction = '<li><textarea name="directions"></textarea></li><br />'
  $dir.append(direction);
});

// ======================================================================================

// $('#searchForm').addEventListener('submit', (event) => {
//   event.preventDefault();
//   const searchQuery = $('#query').value;

//   // Send an AJAX request to the server
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', '/search'); // send to server.js search script
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.onload = () => {
//     if (xhr.status === 200) {
//       const matchedRecipes = JSON.parse(xhr.responseText);
      
//       const recipeList = $("#recipeList");
//       recipeList.innerHTML = '';
//       matchedRecipes.forEach((recipe) => {
//         recipeList.innerHTML += `<li><a href="recipe/${recipe.id}">${recipe.title}</li>`;
//       });
//     }
//   };
//   xhr.send(JSON.stringify({ query: searchQuery }));
// });

