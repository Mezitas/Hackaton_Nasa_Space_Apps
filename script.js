let cuentoData = null;
  let paginaActual = 1;

  async function cargarCuento() {
    try {
      const respuesta = await fetch("cuento.json");
      cuentoData = await respuesta.json();
      renderPagina(paginaActual);
    } catch (error) {
      console.error("Error cargando el JSON:", error);
    }
  }

  function renderPagina(id) {
    const contenedor = document.getElementById("cuento");
    contenedor.innerHTML = "";

    const pagina = cuentoData.paginas.find(p => p.id === id);
    if (!pagina) return;

    const div = document.createElement("div");
    div.className = "pagina active";

    // Texto
    const texto = document.createElement("div");
    texto.className = "texto";
    texto.textContent = pagina.texto;
    div.appendChild(texto);
    

    //fondo
    const fondoContainer = document.createElement("div");
    fondoContainer.className = "fondo";
    
    pagina.fondo.forEach(imgData => {
      const imgf = document.createElement("img");
      imgf.src = imgData.src;
      imgf.style.left = imgData.x + "px";
      imgf.style.top = imgData.y + "px";
      fondoContainer.appendChild(imgf);
    });
    div.appendChild(fondoContainer);
    // Imágenes
    const imgContainer = document.createElement("div");
    imgContainer.className = "imagenes";
    
    pagina.imagenes.forEach(imgData => {
      const img = document.createElement("img");
      img.src = imgData.src;
      img.style.left = imgData.x + "px";
      img.style.top = imgData.y + "px";
      img.width = 100;
      img.height = 100;
      if (imgData.movible) {
        hacerMovible(img);
      }
      imgContainer.appendChild(img);
    });
    div.appendChild(imgContainer);
    
    //Centro
    const centro = document.createElement("div");
    centro.className = "centro";
    div.appendChild(fondoContainer);
    div.appendChild(imgContainer);

    // Opciones
    const opciones = document.createElement("div");
    opciones.className = "opciones";
    pagina.opciones.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt.texto;
      btn.onclick = () => {
        if (opt.next) {
          paginaActual = opt.next;
          renderPagina(paginaActual);
        } else {
          alert("Fin del cuento 🎉");
        }
      };
      opciones.appendChild(btn);
    });
    div.appendChild(opciones);

    contenedor.appendChild(div);
  }

  function hacerMovible(elemento) {
    let offsetX, offsetY, isDown = false;

    elemento.addEventListener("mousedown", (e) => {
      isDown = true;
      offsetX = e.offsetX + 40;
      offsetY = e.offsetY + 40;
    });

    document.addEventListener("mouseup", () => {
      isDown = false;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      elemento.style.left = (e.pageX - offsetX - elemento.parentElement.offsetLeft) + "px";
      elemento.style.top = (e.pageY - offsetY - elemento.parentElement.offsetTop) + "px";
    });
  }

  // Cargar el JSON al iniciar
  window.onload = cargarCuento;