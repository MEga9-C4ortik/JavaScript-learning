function showSection( sectionName) {
    const addButton = document.getElementById("addButton");

    if (sectionName === "wardrobe") {
        addButton.style.display = "block";
    } else {
        addButton.style.display = "none";
    }
}
