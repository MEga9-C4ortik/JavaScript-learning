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
    if (array.length == 0) return null;
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

        card.innerHTML = `
            <div class="colorBox" style="background-color: ${item.color}"></div>
            <div class="clothesInfo">
                <h3> ${item.name} </h3>
                <p> ${item.type} </p>
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
            <h3> ${clothes.name} </h3>
        </div>
    `;

    generatedOutfit.appendChild(card);
}

function renderOutfit(){
    document.getElementById("generatedOutfit").innerHTML = '';

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
    document.getElementById("saveOutfitButton").style.display = "block";
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
loadData();
renderWardrobe();
showSection("wardrobe");