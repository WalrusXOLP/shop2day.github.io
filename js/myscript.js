let goodsLeftContainer = document.querySelectorAll('.goods-left');
let goodsSoldContainer = document.querySelectorAll('.goods-sold');

let LSData = localStorage.getItem('cs12_goods_left');
let goodsLeft = (LSData) ? parseInt(LSData) : 24;
let goodsSold = 30000 - goodsLeft;




//Popups
const popups = document.querySelectorAll('.popups');

let popCount = document.querySelector('.pop-count') // кол-во товара осталось
let popName = document.querySelector('.pop-name') // Имя покупателя 
let popCity = document.querySelector('.pop-city') // город
let closeBtn = document.querySelectorAll('.cls-pop')


// Плавная прокрутка
function scrollTo(elemClass) {
    let top = $(elemClass).offset().top - 50;
    $('body,html').animate({ scrollTop: top }, 1000);
}

// Уменьшение продуктов
function reduceGoods() {
    let delay = 10000 + Math.round(Math.random() * 15000);
    let goodsLeftString = (goodsLeft < 10) ? '0' + String(goodsLeft) : String(goodsLeft);
    let goodsSoldString = String(goodsSold);

    goodsLeftContainer.forEach(item => {
        item.innerHTML = '';
        for (let letter in goodsLeftString) {
            let first = (goodsLeftString[letter] == 9) ? '0' : parseInt(goodsLeftString[letter]) + 1;
            if (goodsLeftString[parseInt(letter) + 1] && goodsLeftString[parseInt(letter) + 1] == 9) {
                item.innerHTML += `<div><ul><li class="goup-1">${first}</li><li class="goup-2">${goodsLeftString[letter]}</li></ul></div> `;
            } else if (!goodsLeftString[parseInt(letter) + 1]) {
                item.innerHTML += `<div><ul><li class="goup-1">${first}</li><li class="goup-2">${goodsLeftString[letter]}</li></ul></div> `;
            } else {
                item.innerHTML += `<div><ul><li class="goup-0">${goodsLeftString[letter]}</li></ul></div> `;
            }

        }
        item.innerHTML += '<span> buc.</span>';
        startPop()


    });

    goodsSoldContainer.forEach(item => {
        item.innerHTML = '';
        for (let letter in goodsSoldString) {
            let first = (goodsSoldString[letter] == 9) ? '0' : parseInt(goodsSoldString[letter]) - 1;
            if (goodsSoldString[parseInt(letter) + 1] && goodsSoldString[parseInt(letter) + 1] == 0) {
                item.innerHTML += `<div><ul><li class="goup-1">${first}</li><li class="goup-2">${goodsSoldString[letter]}</li></ul></div> `;
            } else if (!goodsSoldString[parseInt(letter) + 1]) {
                item.innerHTML += `<div><ul><li class="goup-1">${first}</li><li class="goup-2">${goodsSoldString[letter]}</li></ul></div> `;
            } else {
                item.innerHTML += `<div><ul><li class="goup-0">${goodsSoldString[letter]}</li></ul></div> `;
            }
        }
        popCount.textContent = 30001 - goodsSoldString  //кол-во товара осталось

    });

    if (goodsLeft > 2) {
        goodsLeft--;
        goodsSold++;
        localStorage.setItem('cs12_goods_left', goodsLeft);
        setTimeout(() => { reduceGoods(), startPop() }, delay);
    }

}



// Проверка скролла
function checkScroll() {
    let initHeight = window.pageYOffset + initCount.getBoundingClientRect().top - document.documentElement.clientHeight + 100;
    if (window.pageYOffset > initHeight) {
        reduceGoods();

        window.removeEventListener('scroll', checkScroll);
    } else {

        popups.forEach(element => {
            element.style.display = 'none'
        })
    }
}


window.addEventListener('scroll', checkScroll);

checkScroll();

document.addEventListener('click', e => {
    const { target } = e;
    if (target.getAttribute("href") == '#toform' || target.tagName == 'A') {
        e.preventDefault();
        scrollTo('.best-form');
    }
})



function startPop() {
    //pop

    popups.forEach(element => {
        element.style.display = 'block'
        element.classList.add('scale-in-center')

        setTimeout(() => {
            element.classList.remove('scale-in-center')
            element.classList.add('slide-out-top')
        }, 3000);

        setTimeout(() => {
            element.style.display = 'none'
            element.classList.remove('slide-out-top')
        }, 4000)
    });

    //массивы имен и городов
    let cityArr = ["București", "Cluj-Napoca", "Craiova", "Timișoara", "Iași", "Constanța", "Galați", "Brașov", "Ploiești", "Brăila", "Oradea", "Bacău", "Arad", "Pitești", "Sibiu", "Târgu Mureș", "Baia Mare", "Buzău", "Satu Mare", "Botoșani", "Râmnicu Vâlcea", "Suceava", "Piatra Neamț", "Drobeta-Turnu Severin"]
    let nameArr = ["Gheorghe", "Maria", "Ion", "Elena", "Ioan", "Ana", "Vasile", "Ioana", "Constantin", "Mariana", "Dumitru", "Floarea", "Nicolae", "Ileana", "Alexandru", "Viorica", "Andrei", "Ana-Maria", "Alexandru", "Maria", "Ştefan", "Andreea", "David", "Alexandra", "Mihai", "Ioana", "Ionuţ", "Elena", "Florin", "Maria", "Alexandra", "Daniel", "Denisa", "Gabriel", "Bianca", "Maria", "Matei", "Georgiana"]

    function cityRandom(array) {
        let randomValue = Math.floor(Math.random() * Math.floor(24));
        return array[randomValue]
    }

    function nameRandom(array) {
        let randomValue = Math.floor(Math.random() * Math.floor(21));
        return array[randomValue]
    }

    popCity.textContent = cityRandom(cityArr)
    popName.textContent = nameRandom(nameArr)


    //


    closeBtn.forEach(element => {
        element.addEventListener('click', () => {
            popups.forEach(element => {
                element.style.display = 'none'
            })
        })
    })
};