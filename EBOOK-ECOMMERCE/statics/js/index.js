jQuery(function ($) {
  $().ready(function () {
    jQuery(function ($) {
      $(document).ready(function () {
        loadData();
      });
      $("#btn_local").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        cartToLocalStorage();
      });
    });
    function loadData() {
      $.ajax({
        type: "GET",
        url: "http://localhost/ebook-ecommerce/statics/js/test.json",
        dataType: "json",
        success: function (data) {
          const items = data.data;
          const res = $("#cards");
          for (let info of items) {
            res.append(`
					    <div class="card col-md-4 mb-3 border-0 d-flex">
              <img class="card-img-top" src="${info.img}" />
              <div class="card-body text-center">
                <h4 class="card-title" >
                  ${info.titulos}
                </h4>
                <p class="card-text">${info.descripcion}</p>
                <p class="card-text" >${info.precio}</p>
                <form id="cardToLocal" >
                  <input type="hidden" name="img" id="card_img" value="${info.img}"/>
                  <input type="hidden" name="titulo" id="card_title" value="${info.titulos}" />
                  <input type="hidden" name="precio" id="card_precio" value="${info.precio}" />
                  <input type="hidden" name="id" id="addToCart" value="${info.id}" />
                  </form> 
                  <a type="submit" class="btn btn-primary" id="btn_local" >
                    Agregar al carrito
                  </a>
              </div>
            </div>
				`);
          }
        },
        error: function () {
          console.log("error.");
        },
      });
    }
    function cartToLocalStorage() {
      const id = $("#addToCart").val();
      console.log(id);
      const titulo = $("#card_title").val();
      console.log(titulo);
      const precio = $("#card_price").val();
      console.log(precio);
      const img = $("#card_img").val();
      console.log(img);
      const datosLocal = localStorage.getItem("datos");
      const objeto =
        datosLocal == null ? { datos: [] } : JSON.parse(datosLocal);
      objeto.datos.push({ id: id, titulo: titulo, precio: precio, img: img });
      localStorage.setItem("datos", JSON.stringify(objeto));
      console.log(localStorage.getItem("datos"));
    }
  });
});
