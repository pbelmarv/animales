import Animales from "./clases/Animal.js";
import Animal from './Animales.js';

let informacion = [];

document.getElementById("btnRegistrar").addEventListener("click", async() => {
    // alert('Presionado');
    let animal = document.getElementById("animal");
    let edad = document.getElementById("edad");
    let comentarios = document.getElementById("comentarios");
    let previewElement = document.getElementById("preview");
    let imagenSrcBg = previewElement.style.backgroundImage;
    let imgSrc = imagenSrcBg.slice(5, imagenSrcBg.length - 2);

    const { animales } = await Animal.getData();

    const seleccionAnimal = animales.find((a) => a.name == animal.value);
    const sonidoAnimal = `${seleccionAnimal.sonido}`;

    let nuevoAnimal = new Animales(
        animal.value,
        edad.value,
        imgSrc,
        comentarios.value,
        sonidoAnimal
    )

    // Validar formulario
    if (animal.value && edad.value && comentarios.value) {
        document.getElementById("mensaje-error").innerHTML = "";
        informacion.push(nuevoAnimal);
        reloadTable();
        console.log(informacion);

        // Limpiamos el formulario
        animal.selectedIndex = 0;
        edad.selectedIndex = 0;
        imagenSrcBg = previewElement.style.backgroundImage = 'url(../assets/imgs/lion.svg)';
        comentarios.value = "";
    } else {
        document.getElementById("mensaje-error").innerHTML = "Faltan datos por llenar";
    }
})

function reloadTable() {
    const animalesTemplate = document.getElementById("Animales");
    animalesTemplate.innerHTML = "";

    for (const a of informacion) {
        animalesTemplate.innerHTML += `
            <div class="px-3 pb-2 col-3">
                <div class="card">
                    <a href="javascript:void(0);"  data-toggle="modal" data-target="#detalle-${a.Nombre}">
                        <img src="${a.Img}" class="card-img-top">
                    </a>
                    <div class="card-body">
                        <audio id="audioAnimal-${a.Nombre}">
                            <source src='../assets/sounds/${a.Sonido}' type='audio/mpeg' />
                        </audio>
                        <a href="#" id="audioControl-${a.Nombre}" onClick="reproducir('${a.Nombre}')"><i class="fa fa-play"></i></a>
                    </div>
                </div>
            </div>
            <div class="modal modal-sm fade" id="detalle-${a.Nombre}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${a.Nombre}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img src="${a.Img}" class="card-img-top">
                        <hr>
                        <p class="text-center">${a.Edad}</p>
                        <p class="lead text-center">Comentarios</p>
                        <p class="text-center">${a.Comentarios}</p>
                    </div>
                </div>
            </div>
            `;
    }
}