
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
let editingRecipeId = null;


const recipeForm = document.getElementById('recipeForm');
const titleInput = document.getElementById('title');
const ingredientsInput = document.getElementById('ingredients');
const instructionsInput = document.getElementById('instructions');
const cuisineTypeInput = document.getElementById('cuisineType');
const recipeList = document.getElementById('recipeList');

const searchTitle = document.getElementById('searchTitle');
const searchIngredients = document.getElementById('searchIngredients');
const filterCuisine = document.getElementById('filterCuisine');


recipeForm.addEventListener('submit', handleFormSubmit);
searchTitle.addEventListener('input', displayRecipes);
searchIngredients.addEventListener('input', displayRecipes);
filterCuisine.addEventListener('change', displayRecipes);


function handleFormSubmit(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const ingredients = ingredientsInput.value.trim();
  const instructions = instructionsInput.value.trim();
  const cuisine = cuisineTypeInput.value;

  
  if (!title || !ingredients || !cuisine) {
    alert("Title, ingredients, and cuisine type are required.");
    return;
  }

  const recipe = {
    id: editingRecipeId || Date.now(),
    title,
    ingredients,
    instructions,
    cuisine
  };

  if (editingRecipeId) {
    
    recipes = recipes.map(r => r.id === editingRecipeId ? recipe : r);
    editingRecipeId = null;
  } else {
  
    recipes.push(recipe);
  }

  saveRecipes();
  clearForm();
  displayRecipes();
}


function saveRecipes() {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}


function displayRecipes() {
  const titleSearch = searchTitle.value.toLowerCase();
  const ingredientsSearch = searchIngredients.value.toLowerCase();
  const cuisineFilter = filterCuisine.value;

  recipeList.innerHTML = '';

  recipes
    .filter(recipe => {
      const matchesTitle = recipe.title.toLowerCase().includes(titleSearch);
      const matchesIngredients = recipe.ingredients.toLowerCase().includes(ingredientsSearch);
      const matchesCuisine = cuisineFilter ? recipe.cuisine === cuisineFilter : true;

      return matchesTitle && matchesIngredients && matchesCuisine;
    })
    .forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';

      card.innerHTML = `
        <h3>${recipe.title}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions || 'No instructions provided.'}</p>
        <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
        <div class="recipe-actions">
          <button onclick="editRecipe(${recipe.id})">Edit</button>
          <button onclick="deleteRecipe(${recipe.id})">Delete</button>
        </div>
      `;

      recipeList.appendChild(card);
    });
}


function editRecipe(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  titleInput.value = recipe.title;
  ingredientsInput.value = recipe.ingredients;
  instructionsInput.value = recipe.instructions;
  cuisineTypeInput.value = recipe.cuisine;
  editingRecipeId = recipe.id;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


function deleteRecipe(id) {
  if (confirm("Are you sure you want to delete this recipe?")) {
    recipes = recipes.filter(r => r.id !== id);
    saveRecipes();
    displayRecipes();
  }
}


function clearForm() {
  titleInput.value = '';
  ingredientsInput.value = '';
  instructionsInput.value = '';
  cuisineTypeInput.value = '';
  editingRecipeId = null;
}


displayRecipes();
