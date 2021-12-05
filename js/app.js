// {
//     "id": "5f518efa98bcd44b49c38ed13c6384e1620ae058",
//     "make": "Plymouth",
//     "model": "Acclaim",
//     "year": 1995,
//     "img": "http://dummyimage.com/201x235.jpg/cc0000/ffffff",
//     "color": "Mauv",
//     "vin": "WVWED7AJ5DW516514",
//     "country": "Ukraine",
//     "rating": 4,
//     "price": 2976,
//     "views": 55,
//     "seller": "Estel Cudbertson",
//     "vin_check": false,
//     "top": false,
//     "createdAt": 1602383973000,
//     "phone": "+380 (981) 769-7448",
//     "fuel": "Propane",
//     "engine_volume": 2.7,
//     "transmission": "AT",
//     "mileage": 299777,
//     "consume": {
//       "road": 4.9,
//       "city": 13.4,
//       "mixed": 8.7
//     }
//   },

const dom = {
  feed: document.getElementById('feed'),
};
let CARS = [];
getCars();

async function getCars() {
  const data = await fetch('/data/cars.json').then((r) => r.json());
  CARS = data;
  render(createCardListHTML(CARS), dom.feed);
}

function render(htmlStr, domElem, insertTo) {
  if (insertTo) {
    domElem.insertAdjacentHTML(insertTo, htmlStr);
  } else {
    domElem.innerHTML = htmlStr;
  }
}

function createCardListHTML(cardsArray) {
  return cardsArray.map((cardData) => createCardHTML(cardData)).join('');
}

function createStars(rating) {
  //3
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (rating > i) {
      stars += '<i class="fas fa-star"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

// function createVinCheck(vin_check = !false) {
//     return '<div class="absolute vin-cod"><i class="fas fa-car"></i> Перевіреный VIN-код</div>'
// }

function createVinCheck(vin_check) {
  return vin_check ? '<div class="label label_vin"><i class="fas fa-car"></i> Перевіреный VIN-код</div>' : '';
}
function createTopCheck(top) {
  return top ? '<div class="label label_top">TOP</div>' : '';
}

// function checkTransmission(transmission) {
//     return transmission ?? 'Не вказано';
// }

//

function createCardHTML(cardData) {
  return `<div class="card mb-3">
    <div class="row g-0">
        <div class="col-4">
            <img loading="lazy" src="${cardData.img}" class="card-img img-fluid rounded-start" alt="${cardData.make} ${
    cardData.model
  } ${cardData.engine_volume}L (${cardData.year})">
            <div class="card__labels">
                ${createVinCheck(cardData.vin_check)}
                ${createTopCheck(cardData.top)}
            </div>
        </div>
        <div class="col-8">
            <div class="card-body">
                <h2 class="card-title">${cardData.make} ${cardData.model} ${cardData.engine_volume}L (${
    cardData.year
  })</h2>
                <div class="card-rating text-warning">${createStars(cardData.rating)}</div>
                <h3 class="card-price">${cardData.price}$</h3>
                <a href="tel:${cardData.phone}" class="btn btn-success"><i class="fas fa-phone-alt me-2"></i> Call to ${
    cardData.seller
  }</a>

                <div class="row">
                
                    <dl  class=" col-4 description-list">
                    <dt><i class="fas fa-tachometer-alt"></i></dt>
                    <dd>${cardData.mileage} km</dd>
                    <dt><i class="fas fa-gas-pump"></i></dt>
                    <dd>${cardData.fuel}, ${cardData.engine_volume} L</dd>
                    </dl>
            
                    <dl class=" col-6 description-list">
                    <dt><i class="fas fa-map-marker-alt"></i></dt>
                    <dd>${cardData.country}</dd>
                    <dt><i class="fas fa-cogs"></i></dt>
                    <dd> ${cardData.transmission ?? 'Не вказано'} </dd>
                    </dl>
              
                </div>

                <div class= "col-4 createdAt">${cardData.createdAt}</div>

            </div>

        </div>
    </div>
</div>`;
}