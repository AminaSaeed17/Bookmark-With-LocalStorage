
let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let submitBtn = document.getElementById("submit");
let updateBtn = document.getElementById("update");
let search = document.getElementById("search");
let currentIndex = 0;
let bookmarkArr = [];


if (localStorage.getItem("bookmarksContainer") != null) {
    bookmarkArr = JSON.parse(localStorage.getItem("bookmarksContainer"));
    displayData();
}

submitBtn.addEventListener('click', function () {
    addBookmark();
});

function addBookmark() {
    let bookmarks = {
    siteName: siteName.value,
    siteUrl: siteUrl.value,
    }
    bookmarkArr.push(bookmarks);
    localStorage.setItem("bookmarksContainer", JSON.stringify(bookmarkArr));
    console.log(bookmarkArr);
    clearInputs();
    displayData();
}

function clearInputs() {
    siteName.value = '';
    siteUrl.value = '';
}

function displayData() {
    let searchValue = search.value;
    let regex = new RegExp(searchValue, "gi");
    cartona = '';
    for (let i = 0; i < bookmarkArr.length; i++){
        if (
            bookmarkArr[i].siteName
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ) {
            cartona += `
            <tr>
            <td>${bookmarkArr[i].siteName.replace(
                regex,
                (match) => `<span class="bg-info">${match}</span>`
            )}</td>
            <td><button onclick="visitSite(${i})" class="btn bg-info text-white">visit</button></td>
            <td><button onclick="updateInfo(${i})" class="btn bg-warning">update</button></td>
            <td><button onclick="deleteData(${i})" class="btn bg-danger text-white" id="delete">delete</button></td>
            </tr>
        `;
        }
    }
    document.getElementById("bookmarkContainer").innerHTML = cartona;
}

function deleteData(i) {
    bookmarkArr.splice(i, 1);
    localStorage.setItem("bookmarksContainer", JSON.stringify(bookmarkArr));
    displayData();
}

function updateInfo(i) {
    currentIndex = i;
    siteName.value = bookmarkArr[i].siteName;
    siteUrl.value = bookmarkArr[i].siteUrl;
    
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}

updateBtn.addEventListener('click', function () {
    updateBookmark();
})

function updateBookmark() {
    let bookmarks = {
        siteName: siteName.value,
        siteUrl: siteUrl.value,
    };
    bookmarkArr.splice(currentIndex, 1, bookmarks);
    localStorage.setItem("bookmarksContainer", JSON.stringify(bookmarkArr));
    submitBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    displayData();
    clearInputs();
}

search.addEventListener("input", function () {
    displayData();
});


function visitSite(i) {
    window.open(bookmarkArr[i].siteUrl, "_blank");
}





