let clothesArray = [];
let savedOutfitsArray = [];
let currentOutfit = null;
const addModal = document.getElementById("addClothesModal");
const form = document.getElementById("addForm");
const addButton = document.getElementById("addButton");
const cancelButton = document.getElementById("cancelButton");
const submitButton = document.getElementById("submitButton");

function saveData(){
    localStorage.setItem('clothes', JSON.stringify(clothesArray));
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfitsArray));
}

function loadData(){
    const savedClothes = localStorage.getItem('clothes');

    if(savedClothes){
        clothesArray = JSON.parse(savedClothes);
    }

    const savedOutfits = localStorage.getItem('savedOutfits');
    if(savedOutfits){
        savedOutfitsArray = JSON.parse(savedOutfits);
    }
}

function getRandomItem(array){
    if (array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)];
}

function showSection(sectionName){
    document.getElementById("wardrobe").style.display = "none";
    document.getElementById("generator").style.display = "none";
    document.getElementById("saved").style.display = "none";

    document.getElementById(sectionName).style.display = "block";

    if( sectionName === "wardrobe") {
        document.getElementById("addButton").classList.add("active");
    }else if( sectionName === "generator") {
        document.getElementById("generateButton").classList.add("active");
    }
}

function deleteClothes(ItemID) {
    if (confirm("Delete this item?")) {
        const id = clothesArray.findIndex((item) => item.id === ItemID);
        clothesArray.splice(id, 1);
        saveData();
        renderWardrobe();
    }
}

function openModal() {
    document.getElementById("addClothesModal").style.display = "block";
}

function closeModal() {
    document.getElementById("addClothesModal").style.display = "none";
    document.getElementById("addForm").reset();
}

function changeStyleButton(){
    document.querySelector(".style-filter").style.display = "flex";
    document.getElementById("generatedOutfit").innerHTML = '';
    document.getElementById("changeStyle").style.display = "none";
    document.getElementById("saveOutfitButton").style.display = "none";
}

function saveOutfit(){
    if(!currentOutfit){
        return;
    }
    const OutfitToBeSaved = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        outfit: currentOutfit
    }
    savedOutfitsArray.push(OutfitToBeSaved);
    saveData();
    alert("Outfit saved");
    renderSavedOutfits();
}

function renderSavedOutfits() {
    const container = document.getElementById("savedOutfits");
    container.innerHTML = '';

    if (savedOutfitsArray.length === 0) {
        container.innerHTML = '<p style="color: #457B9D;">No saved outfits yet</p>';
        return;
    }

    savedOutfitsArray.forEach(savedOutfit => {
        const card = document.createElement("div");
        card.className = "savedOutfitCard";

        let html = `
            <h2>Outfit #${savedOutfit.id}</h2>
            <p class="date">Saved: ${savedOutfit.date}</p>
            <div class="savedOutfitItems">
        `;

        if (savedOutfit.outfit.head) {
            html += `
                <div class="generatedCard">
                    <div class="colorBox" style="background-color: ${savedOutfit.outfit.head.color}"></div>
                    <div>
                        <p class="category-label">Head</p>
                        <h3>${savedOutfit.outfit.head.name}</h3>
                    </div>
                </div>
            `;
        }

        if (savedOutfit.outfit.upperBody) {
            html += `
                <div class="generatedCard">
                    <div class="colorBox" style="background-color: ${savedOutfit.outfit.upperBody.color}"></div>
                    <div>
                        <p class="category-label">Upper Body</p>
                        <h3>${savedOutfit.outfit.upperBody.name}</h3>
                    </div>
                </div>
            `;
        }

        if (savedOutfit.outfit.lowerBody) {
            html += `
                <div class="generatedCard">
                    <div class="colorBox" style="background-color: ${savedOutfit.outfit.lowerBody.color}"></div>
                    <div>
                        <p class="category-label">Lower Body</p>
                        <h3>${savedOutfit.outfit.lowerBody.name}</h3>
                    </div>
                </div>
            `;
        }

        if (savedOutfit.outfit.shoes) {
            html += `
                <div class="generatedCard">
                    <div class="colorBox" style="background-color: ${savedOutfit.outfit.shoes.color}"></div>
                    <div>
                        <p class="category-label">Shoes</p>
                        <h3>${savedOutfit.outfit.shoes.name}</h3>
                    </div>
                </div>
            `;
        }

        if (savedOutfit.outfit.dress) {
            html += `
                <div class="generatedCard">
                    <div class="colorBox" style="background-color: ${savedOutfit.outfit.dress.color}"></div>
                    <div>
                        <p class="category-label">Dress</p>
                        <h3>${savedOutfit.outfit.dress.name}</h3>
                    </div>
                </div>
            `;
        }

        if (savedOutfit.outfit.accessories) {
            html += `
                <div class="generatedCard">
                    <div class="colorBox" style="background-color: ${savedOutfit.outfit.accessories.color}"></div>
                    <div>
                        <p class="category-label">Accessories</p>
                        <h3>${savedOutfit.outfit.accessories.name}</h3>
                    </div>
                </div>
            `;
        }

        html += `
            </div>
            <button class="deleteSavedButton" onclick="deleteSavedOutfit(${savedOutfit.id})">🗑️ Delete Outfit</button>
        `;

        card.innerHTML = html;
        container.appendChild(card);
    });
}

function deleteSavedOutfit(outfitId) {
    if (confirm("Delete this saved outfit?")) {
        const index = savedOutfitsArray.findIndex(outfit => outfit.id === outfitId);
        savedOutfitsArray.splice(index, 1);
        saveData();
        renderSavedOutfits();
    }
}

document.getElementById("addForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("clothesName").value;
    const type = document.getElementById("clothesType").value;
    const color = document.getElementById("clothesColor").value;
    const styles = Array.from(document.querySelectorAll('input[name="styles"]:checked')).map(cb => cb.value);

    const newItem = {
        id: Date.now(),
        name: name,
        type: type,
        color: color,
        styles: styles,
    }

    clothesArray.push(newItem);
    saveData();
    renderWardrobe();
    closeModal();
});

function renderWardrobe() {
    const clothesList = document.getElementById("clothesList");
    clothesList.innerHTML = '';
    if (clothesArray.length === 0) {
        clothesList.innerHTML = "<p> No clothes yet. Add your first item </p>";
        return;
    }

    clothesArray.forEach(item => {
        const card = document.createElement("div");
        card.className = "clothesCard";
        let type = item.type;
        switch (type) {
            case "head":
                type = "Head";
                break;
            case "upperBody":
                type = "Upper Body";
                break;
            case "lowerBody":
                type = "Lower Body";
                break;
            case "dress":
                type = "Dress";
                break;
            case "shoes":
                type = "Shoes";
                break;
            case "accessories":
                type = "Accessories";
                break;
        }

        card.innerHTML = `
            <div class="colorBox" style="background-color: ${item.color}"></div>
            <div class="clothesInfo">
                <h3> ${item.name} </h3>
                <p> ${type} </p>
                <div class="tags">
                    ${item.styles.map(style => `<span class="tag">${style}</span>`).join('')}
                </div>
            </div>
            <button class="deleteClothesButton" onclick="deleteClothes(${item.id})"> 🗑️ </button>
        `;

        clothesList.appendChild(card);
    });
}

function createOutfitCard(clothes,type){
    if (!clothes){
        return;
    }
    const generatedOutfit = document.getElementById("generatedOutfit");
    const card = document.createElement("div");
    card.className = "generatedCard";

    card.innerHTML = `
        <div class="colorBox" style="background-color: ${clothes.color}"></div>
        <div class="generatedOutfitCardInfo">
            <p class="category-label">${type}</p>
            <h3> ${clothes.name} </h3>
        </div>
    `;

    generatedOutfit.appendChild(card);
}

function renderOutfit(){
    document.getElementById("generatedOutfit").innerHTML = '';
    document.querySelector(".style-filter").style.display = "none";

    if(currentOutfit){
        createOutfitCard(currentOutfit.head, "head");
        createOutfitCard(currentOutfit.upperBody, "upper");
        createOutfitCard(currentOutfit.lowerBody, "lower");
        createOutfitCard(currentOutfit.shoes, "shoes");
        createOutfitCard(currentOutfit.dress, "dress");
        createOutfitCard(currentOutfit.accessories, "accessories");
    }
    else{
        return;
    }

    document.getElementById("saveOutfitButton").style.display = "block";
    document.getElementById("changeStyle").style.display = "block";
}

function generateOutfit(){
    const selectedStyles = document.querySelector('input[name="styleFilter"]:checked').value;

    let filtered;
    if(selectedStyles === "any"){
        filtered = clothesArray;
    }else{
        filtered = clothesArray.filter(item => item.styles.includes(selectedStyles));
    }

    const head = filtered.filter(item => item.type === "head");
    const upperBody = filtered.filter(item => item.type === "upperBody");
    const lowerBody = filtered.filter(item => item.type === "lowerBody");
    const shoes = filtered.filter(item => item.type === "shoes");
    const dress = filtered.filter(item => item.type === "dress");
    const accessories = filtered.filter(item => item.type === "accessories");

    currentOutfit = {
        head: getRandomItem(head),
        upperBody: getRandomItem(upperBody),
        lowerBody: getRandomItem(lowerBody),
        shoes: getRandomItem(shoes),
        dress: getRandomItem(dress),
        accessories: getRandomItem(accessories),
    };

    renderOutfit();
}

document.getElementById("wardrobeButton").addEventListener("click", () => {
    showSection("wardrobe");
});

document.getElementById("generatorButton").addEventListener("click", () => {
    showSection("generator");
});

document.getElementById("savedButton").addEventListener("click", () => {
    showSection("saved");
});

document.getElementById("addButton").addEventListener("click", openModal);
document.getElementById("cancelButton").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", closeModal);
document.getElementById("generateButton").addEventListener("click", generateOutfit);
document.getElementById("changeStyle").addEventListener("click", changeStyleButton);
document.getElementById("savedButton").addEventListener("click", () => {
    saveOutfit();
    showSection("saved");
    renderSavedOutfits();
});

loadData();
renderWardrobe();
showSection("wardrobe");