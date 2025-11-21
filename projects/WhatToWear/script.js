let clothesArray = [];
let savedOutfitsArray = [];
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
    console.log("Добавлено:", newItem);
    console.log("Весь массив:", clothesArray);
    closeModal();
});

function renderWardrobe() {
    const clothesList = document.getElementById("clothesList");
    clothesList.innerHTML = '';
    if (clothesList.length === 0) {
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
        </div>
        <button class="deleteClothesButton" onclick="deleteClothes(${item.id})"> 🗑️ </button>
        `;

        clothesList.appendChild(card);
    });
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

document.getElementById("addButton").addEventListener("click", () => openModal());
document.getElementById("cancelButton").addEventListener("click", () => closeModal());
document.getElementById("modalOverlay").addEventListener("click", () => closeModal());

loadData();
renderWardrobe();
showSection("wardrobe");