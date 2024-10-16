const btn = document.querySelector(".more")
const wrapper = document.querySelector(".wrapper")
const category = document.querySelector(".category")
const loading = document.querySelector(".loading")

const LINKJSON = "https://dummyjson.com"

let limitCount = 4
let offset = 1

async function getData(endpoint, count) {
    const response = await fetch(`${LINKJSON}/${endpoint}?limit=${limitCount * count}`)
    response
        .json()
        .then(res => createProduct(res))
        .catch(err => console.log(err))
        .finally(() => {
            loading.style.display = "none"
        })
}

getData("products", offset)
function createProduct(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove()
    }
    data.products.forEach((product) => {
        const card = document.createElement("div")
        card.dataset.id = product.id
        card.className = "card"
        card.innerHTML = `
         <img data-id=${product.id} src=${product.images[0]} class="img__item" alt="">
         <div>
           <h3>${product.title}</h3>
           <div>
              <strong>${product.price}</strong>
              <button>Buy now</button>
           </div>
         </div>
        `
        wrapper.appendChild(card)
    });
}

wrapper.addEventListener("click", (e) => {
    if(e.target.className === "img__item"){
        let id = e.target.closest(".card").dataset.id
        open(`/pages/product.html?id=${id}`, "_self")
    }
})

btn.addEventListener("click", () => {
    offset++
    getData("products", offset)
})

async function getCategory(endpoint) {
    const response = await fetch(`${LINKJSON}/${endpoint}`)
    response
        .json()
        .then(res => createCategory(res))
}

getCategory("products/category-list")
function createCategory(data) {
    data.forEach((item) => {
        const liEl = document.createElement("li")
        const dataEl = document.createElement("data")
        liEl.className = "category_item"
        dataEl.innerHTML = item
        dataEl.setAttribute("value", `/category/${item}`)
        dataEl.addEventListener("click", (e) => {
            getData(`products${e.target.value}`, offset)
        })
        liEl.appendChild(dataEl)
        category.appendChild(liEl)
    })
}