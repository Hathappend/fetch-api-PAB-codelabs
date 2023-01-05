const searchForm = document.querySelector('form');
const searchBtn = document.getElementById('btn-search');
const recipeList = document.querySelector('.search-result');
const byCategory = document.getElementById('by-category');
const noResult = document.getElementById('noResult');
const yourResult = document.getElementById('yourResult');


//Even Listener
if (searchBtn){
    searchBtn.addEventListener('click', getRecipeList);
}

//get Recipe list berdasarkan Pencarian
async function getRecipeList(){
    noResult.innerHTML = "";
    let searchInput = document.getElementById('input-search').value;
    const baseUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    if (data.meals == null){
        noResult.innerHTML = `
        <h2>Ooopss.. Not Find Anything. Try Again!</h2> <br>
        <img src="assets/vendor/img/apasih.png">
        `
    }else{
        yourResult.innerHTML = `
        <h1>Your Search Result : </h1> <br>
        `
        renderRecipeList(data.meals)
    }
    console.log(data);
}

//Render Recipe List to HTML
function renderRecipeList(results) {
    let getRecipe = '';
    results.map(result => {
        getRecipe += 
        `
        <div class="card" >
            <img class="card-img-top" src="${result.strMealThumb}">
            <div class="card-body">
                <h2 class="card-title">${result.strMeal}</h2>
                <table>
                    <tr>
                        <td colspan="3"><hr></td>
                    </tr>
                    <tr>
                        <td align="center"><p>${result.strArea}</p> </td>
                        <td>|</td>
                        <td align="center"><p>0 ingridiens </p></td>
                    </tr>
                    <tr>
                        <td colspan="3"><hr></td>
                    </tr>
                </table>
                <a href="detail.html?&id=${result.idMeal}" class="btn-detail" id="btnDetail">CHECK IT OUT</a>
                <h5 class="card-category">Category : <a href="category.html?&c=${result.strCategory}">${result.strCategory}</a></h5>
            </div>
        </div>
        
        `
        recipeList.innerHTML= getRecipe;
    })
}

/*Detail Recipe*/

const title = document.querySelector('title');
const recipeDetail = document.getElementById('detail-list');
const detailBtn = document.getElementById('btnDetail');
const queryIdSearch = window.location.search;
const urlParams = new URLSearchParams(queryIdSearch);
const idUrl = urlParams.get('id');

//get detail Recipe berdasarkan id
async function getDetailRecipe(){
    const detailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idUrl}`;
    const response = await fetch(detailUrl);
    const data = await response.json();
    renderDetailRecipe(data.meals)
    console.log(data); 

}

//tampil Detail Recipe
getDetailRecipe()

//Render Detail to HTML
function renderDetailRecipe(results) {
    let getDetail = '';
    results.map(result => {
        title.innerHTML = 
        `Recipe Finder | ${result.strMeal}`
        getDetail += 
        `
        <div class="food-detail-header">
            <div class="img-detail">
                <img src="${result.strMealThumb}" >
            </div>
            <div class="description-detail">
                <div class="recipe-title"><h2>${result.strMeal}</h2></div>
                <table width="10%">
                    <tr>
                        <td><div class="category"><span><a href="category.html?c=${result.strCategory}">${result.strCategory}</a></span></div></td>
                        <td><div class="category"><span>${result.strArea}</span></div></td>
                    </tr>
                </table>
                <div class="specification-recipe"><p>Source  : <a href="${result.strSource}">${result.strSource}</a></p></div> 
                <div class="specification-recipe"><p>Youtube : <a href="${result.strYoutube}">${result.strYoutube}</a></p></div> 
            </div>
        </div>
        <div class="food-detail-content">
            <div class="ingridients">
                <h2>Ingridients</h2>
                <table width="100%">
                    <tr>
                        <td><li>${result.strMeasure1} ${result.strIngredient1}</li></td>
                        <td><li>${result.strMeasure2} ${result.strIngredient2} </li></td>
                    </tr>
                    <tr>
                        <td><li>${result.strMeasure3} ${result.strIngredient3}</li></td>
                        <td><li>${result.strMeasure4} ${result.strIngredient4}</li></td>
                    </tr>
                    <tr>
                        <td><li>${result.strMeasure5} ${result.strIngredient5}</li></td>
                        <td><li>${result.strMeasure6} ${result.strIngredient6}</li></td>
                    </tr>
                    <tr>
                        <td><li>${result.strMeasure7} ${result.strIngredient7}</li></td>
                        <td><li>${result.strMeasure8} ${result.strIngredient8}</li></td>
                    </tr>
                    <tr>
                        <td><li>${result.strMeasure9} ${result.strIngredient9}</li></td>
                        <td><li>${result.strMeasure10} ${result.strIngredient10}</li></td>
                    </tr>
                    <tr>
                        <td><li>${result.strMeasure11} ${result.strIngredient11}</li></td>
                        <td><li>${result.strMeasure12} ${result.strIngredient12}</li></td>
                    </tr>
                    <tr>
                        <td><li>${result.strMeasure13} ${result.strIngredient13}</li></td>
                        <td><li>${result.strMeasure14} ${result.strIngredient14}</li></td>
                    </tr>
                    <tr>
                        <td><li>${result.strMeasure15} ${result.strIngredient15}</li></td>
                        <td><li>${result.strMeasure16} ${result.strIngredient16}</li></td>
                    </tr>
                    <tr>
                        <td><li>${result.strMeasure17} ${result.strIngredient17}</li></td>
                        <td><li>${result.strMeasure18} ${result.strIngredient18}</li></td>
                    </tr>
                    <tr>
                        <td><li>${result.strMeasure19} ${result.strIngredient19}</li></td>
                        <td><li>${result.strMeasure20} ${result.strIngredient20}</li></td>
                    </tr>
                </table>
            </div>
            <div class="nutrients">
                <h2>Instruction</h2>
                <p>${result.strInstructions}</p>
            </div>
        </div>
        
        `
        recipeDetail.innerHTML= getDetail;
    })
}

//Category
const headingCategory = document.getElementById('headingCategory')
const queryCategory = window.location.search;
const urlParamsCategory = new URLSearchParams(queryCategory);
const c = urlParamsCategory.get('c');

//get Category berdasarkan nama kategori
async function getCategory(){
    const detailUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`;
    const response = await fetch(detailUrl);
    const data = await response.json();
    renderDetailCategory(data.meals)
    console.log(data); 

}

//tampil category
getCategory()

//render category to HTML
function renderDetailCategory(results) {
    let getCategory = '';
    results.map(result => {
        title.innerHTML = 
        `Recipe Finder | ${c}`
        headingCategory.innerHTML = 
        `
        <h1>Filter By Category ${c} :</h1>

        `
        
        getCategory += 
        `
        <div class="card" >
            <img class="card-img-top" src="${result.strMealThumb}">
            <div class="card-body">
                <h2 class="card-title">${result.strMeal}</h2>
                <table>
                    <tr>
                        <td colspan="3"><hr></td>
                    </tr>
                    <tr>
                        <td align="center"><p>Area</p> </td>
                        <td>|</td>
                        <td align="center"><p>0 ingridiens </p></td>
                    </tr>
                    <tr>
                        <td colspan="3"><hr></td>
                    </tr>
                </table>
                <a href="detail.html?&id=${result.idMeal}" class="btn-detail" id="btnDetail">Check it Out</a>
                <h5 class="card-category">Category : <a href="category.html?&c=${c}">${c}</a></h5>
            </div>
        </div>
        
        `
        recipeList.innerHTML= getCategory;
    })
}







