const listCarrito = document.getElementById("listCarrito");
const totalCart = document.getElementById("total");
const message = document.getElementById("message");
const cartTable = document.getElementById("cartTable");
const conversor = document.getElementById("customSwitch");

let carrito = {};
let total = 0;

if (localStorage.getItem("cart")) {
  message.classList.add("d-none");
  carrito = JSON.parse(localStorage.getItem("cart"));

  for (const property in carrito) {
    listCarrito.innerHTML += `<tr>
    <td><img src="${carrito[property].img}" alt="img" width="50px" /></td>
    <td>${carrito[property].titulo}</td>
    <td name="moneda" >$</td>
    <td name="precio" >${carrito[property].precio}</td>
    <td><i style="cursor: pointer" class="fas fa-times-circle" id="deleteCart" data-id="${carrito[property].id}"></i></td>
    </tr>`;
    total += parseInt(carrito[property].precio);
  }

  totalCart.innerHTML = "$" + total;
} else {
  cartTable.classList.add("d-none");
  message.innerHTML =
    "El carrito está vacio, agregue productos para continuar con la compra...";
}

cartTable.addEventListener("click", (e) => {
  swal({
    title: "Seguro que deseas eliminarlo del carrito?",
    text: "",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      if (e.target.classList.contains("fas")) {
        const id = e.target.getAttribute("data-id");
        e.target.parentElement.parentElement.classList.add("d-none");

        total = total - carrito[id].precio;

        totalCart.innerHTML = "$" + total;

        const carritoFilter = delete carrito[id];

        localStorage.setItem("cart", JSON.stringify(carrito));

        if (total == 0) {
          localStorage.removeItem("cart");
          cartTable.classList.add("d-none");
          message.classList.add("d-block");
          message.innerHTML =
            "El carrito está vacio, agregue productos para continuar con la compra...";
        }
      }
    }
  });

  e.stopPropagation();
});
conversor.addEventListener("click", (e) => {
  conversionDivisas(e);
});
