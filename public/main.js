// ======================================================================================

const nav = document.querySelector(".nav");
const searchIcon = document.querySelector("#searchIcon");
const navOpenBtn = document.querySelector(".navOpenBtn");
const navCloseBtn = document.querySelector(".navCloseBtn");

searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("fa-magnifying-glass", "fa-xmark");
  }
  searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
});

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("fa-xmark", "fa-magnifying-glass");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});


// ======================================================================================

$('#addIng').on('click', function(event) {
  event.preventDefault();
  var $ing = $('#ingredients').one();
  const ingredient = '<li><input type="text" name="ingredients" ></li><br />'
  $ing.append(ingredient);
});

$('#addDir').on('click', function(event) {
  event.preventDefault();
  var $dir = $('#directions').one();
  const direction = '<li><input type="text" name="directions" ></li><br />'
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

