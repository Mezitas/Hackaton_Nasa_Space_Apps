const cuentoData = {
      "paginas": [
        {
          "id": 1,
          "texto": "Había una vez un bosque lleno de magia.",
          "imagenes": [
            { "src": "https://via.placeholder.com/600x300/90ee90/000?text=Bosque", "x": 0, "y": 0 },
            { "src": "https://via.placeholder.com/100x150/f00/fff?text=Hada", "x": 200, "y": 100, "movible": true }
          ],
          "opciones": [
            { "texto": "Seguir adelante", "next": 2 },
            { "texto": "Explorar el bosque", "next": 3 }
          ]
        },
        {
          "id": 2,
          "texto": "El hada te guió hasta un río brillante.",
          "imagenes": [
            { "src": "https://via.placeholder.com/600x300/87ceeb/000?text=Río", "x": 0, "y": 0 }
          ],
          "opciones": [
            { "texto": "Fin", "next": null }
          ]
        },
        {
          "id": 3,
          "texto": "Encontraste un árbol parlante.",
          "imagenes": [
            { "src": "https://via.placeholder.com/600x300/8b4513/fff?text=Árbol", "x": 0, "y": 0 }
          ],
          "opciones": [
            { "texto": "Fin", "next": null }
          ]
        }
      ]
    };

    let paginaActual = 1;

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
        offsetX = e.offsetX;
        offsetY = e.offsetY;
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

    // Render inicial al cargar
    window.onload = () => renderPagina(paginaActual);