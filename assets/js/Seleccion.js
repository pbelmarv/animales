import Animales from './Animales.js';

document.getElementById("animal").addEventListener('change', async() => {
    const { animales } = await Animales.getData();
    const an = document.getElementById("animal").value;
    const imagenAnimal = animales.find((a) => a.name == an);
    const imgAnimal = `../assets/imgs/${imagenAnimal.imagen}`;

    document.getElementById("preview").style.backgroundImage = `url(${imgAnimal})`;
    // console.log(imgAnimal);
})