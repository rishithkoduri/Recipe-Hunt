async function fetchData() {
    document.getElementById('loader').style.display = 'flex';

    let name = document.getElementById('search_box').value.trim().toLowerCase();
    let err = document.getElementById('err-msg');
    if(name===""){
        err.style.visibility = 'visible';
        err.textContent = "Please enter dish name!🍔🍕";
        return;
    }
    let success = false;
    let disp = document.getElementById('disp');
    try{
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        console.log(data);
        if(data.meals[0].idMeal!==""){
            success = true;
        }
        if(success){
            document.getElementById('loader').style.display = 'none';
            err.style.visibility = 'hidden';
            err.textContent = "";
            disp.style.display = 'block';
            let dish = document.getElementById('dish');
            dish.textContent = ""
            dish.innerHTML = `<pre><h1>  ${name.toUpperCase()}</h1></pre>`;
            document.getElementById('search_box').value = "";
            let area = document.getElementById('area');
            let category = document.getElementById('category');
            let tab = document.getElementById('ingredients');
            area.textContent = "";
            area.textContent += `Area: ${data.meals[0].strArea}`;
            category.textContent = "";
            category.textContent = `Category: ${data.meals[0].strCategory}`;
            let tableH = `<table>
                <tr>
                    <th>Ingredient</th>
                    <th>Quantity</th>
                </tr>`;
            for(let i=1; i<=20; i++){
                const ingredient = data.meals[0][`strIngredient${i}`];
                const measure = data.meals[0][`strMeasure${i}`];
                if(ingredient && ingredient.trim()!==""){
                    tableH += `
                    <tr>
                        <td>${ingredient}</td>
                        <td>${measure}</td>
                    </tr>`;
                }
            }
            tableH += '</table>';
            tab.innerHTML = tableH;
            let instructions = document.getElementById('inst');
            instructions.textContent = `Instructions to cook: ${data.meals[0].strInstructions}`
            instructions.style.color = 'red';
            instructions.style.fontSize = '1.5rem';
            instructions.style.fontWeight = 'bolder';
            let link = document.getElementById('link');
            link.innerHTML = `<a href="${data.meals[0].strYoutube}" target="main">Click here to watch video▶️</a>`;
            link.style.color = "brown";
            link.style.fontSize = "20px";
            link.style.fontWeight = 'bold';
            link.style.textDecoration = 'none';
            let image = document.getElementById('image');
            image.innerHTML = `
            <img 
              src="${data.meals[0].strMealThumb}" 
              alt="${data.meals[0].strMeal}" 
              style="max-width:50%; border-radius:10px;display:flex; justify-content:center;"
            >
          `;
          image.style.display = 'flex';
          image.style.justifyContent = 'center';
          

        } else {
            document.getElementById('display').innerHTML = "Recipe not found..."
        }
    }
    catch(err){
        console.error(err);
    }
}








