const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

let carrito = {};

if (localStorage.getItem("cart")) {
  carrito = JSON.parse(localStorage.getItem("cart"));
}

//console.log(carrito)

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

items.addEventListener("click", (e) => {
  addCarrito(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("statics/js/test.json");
    const data = await res.json();
    //console.log(data)
    pintarCard(data);
  } catch (error) {
    console.log(error);
  }
};

const pintarCard = (data) => {
  data.forEach((producto) => {
    templateCard.querySelector("h5").textContent = producto.titulos;
    templateCard.querySelector("p").textContent = producto.precio;
    templateCard.querySelector("img").setAttribute("src", producto.img);
    templateCard.querySelector(".btn").dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });

  items.appendChild(fragment);
};

const addCarrito = (e) => {
  // console.log(e.target.classList.contains('btn'))

  if (e.target.classList.contains("btn")) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};

const setCarrito = (objeto) => {
  const producto = {
    id: objeto.querySelector(".btn").dataset.id,
    titulo: objeto.querySelector("h5").textContent,
    precio: objeto.querySelector("p").textContent,
    img: objeto.querySelector("img").getAttribute("src"),
    cantidad: 1,
  };

  if (carrito.hasOwnProperty(producto.id)) {
    return swal(
      "El ebook ya se encuentra en el carrito",
      "No es posible agregar dos productos iguales",
      "error"
    );
    //producto.cantidad = carrito[producto.id].cantidad + 1
  }

  carrito[producto.id] = { ...producto };
  swal("Producto añadido al carrito", "", "success");
  localStorage.setItem("cart", JSON.stringify(carrito));
};


