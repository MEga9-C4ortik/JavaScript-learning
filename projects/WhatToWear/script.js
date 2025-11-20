let clothesArray = [];
let savedOutfitsArray = [];

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

loadData();
showSection("wardrobe");