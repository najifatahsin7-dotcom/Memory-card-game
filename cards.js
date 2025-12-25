//Game cards

export const categories = {
    marvel: ["Ironman.jpg", "Thor.jpg", "Hulk.jpg", "Spiderman.jpg", "BlackWidow.jpg", "Hawkeye.jpg", "CaptainAmerica.jpg", "BlackPanther.jpg", "Wanda.jpg", "Vision.jpg", "WinterSoldier.jpg", "DoctorStrange.jpg", "Loki.jpg", "Thanos.jpg", "Falcon.jpg"],
    food: ["Burger.jpg", "Pizza.jpg", "Cake.jpg", "Donut.jpg", "Tacos.jpg", "Fries.jpg", "Cupcake.jpg", "Icecream.jpg", "Pasta.jpg", "Sandwich.jpg", "Steak.jpg", "Macaroon.jpg", "Corndog.jpg", "Ramen.jpg", "Pancake.jpg"],
    flowers: ["RedRose.jpg", "Tulip.jpg", "Sunflower.jpg", "Daisy.jpg", "Orchid.jpg", "PinkRose.jpg", "Lavender.jpg", "Peonies.jpg", "Daffodil.jpg", "BlueRose.jpg", "Carnation.jpg", "Poppy.jpg", "Iris.jpg", "Jasmine.jpg", "CherryBlossoms.jpg"],
    f1: ["LewisHam.jpg", "MaxVer.jpg", "GeorgeRus.jpg", "CharlesLec.jpg", "SebVet.jpg", "NicoRos.jpg", "FernandoAlo.jpg", "ValtteriBot.jpg", "ChecoPer.jpg", "LandoNor.jpg", "OscarPia.jpg", "MichaelSch.jpg", "DanielRic.jpg", "CarlosSai.jpg", "AlexAlb.jpg"],
    band: ["1d.jpg", "Bts.jpg", "LittleMix.jpg", "Blackpink.jpg", "Twice.jpg", "Seventeen.jpg", "Txt.jpg", "Got7.jpg", "Bangtan.jpg", "BtsLogo.jpg", "Katseye.jpg", "Mamamoo.jpg", "SpiceGirls.jpg", "Enhypen.jpg", "5sos.jpg"], 
  };
  
  export function generateCards(category, pairs) {
    const selected = categories[category].slice(0, pairs);
    return [...selected, ...selected].sort(() => Math.random() - 0.5);
  }

  function flipHandler(card){
    card.classList.toggle("flipped");
  }
  
  export function createCard(imgPath, flipHandler) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = imgPath;
  
    const front = document.createElement("div");
    front.classList.add("front");
  
    front.innerHTML = `<img src="/images/Card.jpg" alt="card-back">`;
  
    const back = document.createElement("div");
    back.classList.add("back");
  
    const image = document.createElement("img");
    image.src = `/images/${imgPath}`;
    image.alt = imgPath;
    back.appendChild(image);
  
    // Add both sides to the card
    card.appendChild(front);
    card.appendChild(back);
  
    // Clicking flips the card
    card.addEventListener("click", () => flipHandler(card));
  
    return card;
  }
  