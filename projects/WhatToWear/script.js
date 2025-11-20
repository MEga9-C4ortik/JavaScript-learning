let clothesArray = [];
let savedOutfitsArray = [];
const modal = document.getElementById("modal");
const form = document.getElementById("form");
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

document.getElementById("wardrobeButton").addEventListener("click", () => {
    showSection("wardrobe");
});

document.getElementById("generatorButton").addEventListener("click", () => {
    showSection("generator");
});

document.getElementById("savedButton").addEventListener("click", () => {
    showSection("saved");
});

function openModal(){
    document.getElementById("modal").style.display = "block";
}

function closeModal(){
    document.getElementById("modal").style.display = "none";
    document.getElementById("addForm").reset();
}

document.getElementById("addButton").addEventListener("click", () => openModal());
document.getElementById("cancelButton").addEventListener("click", () => closeModal());
document.getElementById("modalOverlay").addEventListener("click", () => closeModal());

loadData();
showSection("wardrobe");

