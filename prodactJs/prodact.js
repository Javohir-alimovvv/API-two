const content = document.querySelector(".content");
const BASE_URL = "https://dummyjson.com";

async function getDate() {
    let query = new URLSearchParams(window.location.search)
    let id = query.get("id")
    const response = await fetch(`${BASE_URL}/products/${id}`)
    response
        .json()
        .then(res => createContent(res))
}

getDate();

function createContent(data) {
    content.innerHTML = `
        <div class="content_left">
            <img src=${data.images[0]} alt="">
        </div>
        <div class="content_right">
            <h2>${data.title}</h2>
            <h3>${data.price}</h3>
            <p>${data.description}</p>
            <button>BUY NOW</button>
        </div>
`
}