/* =================================
Slider
==================================*/

let items = document.querySelectorAll('.slide');
let sliderSection = document.querySelector('.slider');
let currentItem = 0;
let isEnabled = true;

function changeItemIndex(n) {
  currentItem = (n + items.length) % items.length;
}

function changeBgColor() {
  if (currentItem == 1) {
    sliderSection.classList.remove('slider_red');
    sliderSection.classList.add('slider_blue');
  }
  else
    if (currentItem == 0) {
      sliderSection.classList.remove('slider_blue');
      sliderSection.classList.add('slider_red');
    }
}

function showPrevItem() {
  items[currentItem].classList.remove('active');
  changeItemIndex(currentItem - 1);
  items[currentItem].classList.add('active');
  changeBgColor();
}

function showNextItem() {
  items[currentItem].classList.remove('active');
  changeItemIndex(currentItem + 1);
  items[currentItem].classList.add('active');
  changeBgColor();
}

document.querySelector('.arrow.arrow_left').addEventListener('click', function () {
  showPrevItem();
});

document.querySelector('.arrow.arrow_right').addEventListener('click', function () {
  showNextItem();
});

/* =================================
Header
==================================*/

const menu = document.querySelector('.menu');
const links = document.querySelectorAll('.menu__link');
menu.addEventListener('click', function () {
  links.forEach(el => el.classList.remove('link_active'));
  event.target.classList.add('link_active');

});

let header = document.querySelector('.header');
let headerHeight = document.querySelector('.header').offsetHeight;
let scrollOffset = window.scrollY;
checkScroll(scrollOffset);
window.addEventListener('scroll', function (e) {
  scrollOffset = window.scrollY;
  checkScroll(scrollOffset);
  document.querySelectorAll('section').forEach((el) => {
    let topSection = el.offsetTop - headerHeight,
      bottomSection = el.offsetTop + el.offsetHeight;
    if (topSection < scrollOffset && bottomSection > scrollOffset) {
      links.forEach((e) => {
        e.classList.remove('link_active');
        if (el.classList.contains(e.getAttribute('data-scroll')))
          e.classList.add('link_active');
      });
    }
  })
});

function checkScroll(scrollOffset) {
  if (scrollOffset >= headerHeight * 3)
    header.classList.add('fixed');
  else
    header.classList.remove('fixed');
}

document.querySelectorAll('.menu__link').forEach(el => el.addEventListener('click', (event) => {
  let blockID = el.getAttribute('data-scroll');
  let blockOffset = document.querySelector('.' + blockID).offsetTop;
  if (blockID == "home") {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  else {
    window.scrollTo({
      top: blockOffset - headerHeight / 2,
      left: 0,
      behavior: 'smooth'
    });
  }
}
));

/* =================================
Form
==================================*/

document.querySelector('.form').addEventListener('submit', (event) => {
  event.preventDefault();
})

document.querySelector('.button_submit').addEventListener('click', function () {
  document.querySelector('.overlay').classList.add('active');

  let subject = document.getElementById('subject').value.trim();
  let description = document.getElementById('description').value.trim();
  if (subject.length == 0)
    subject = "Без темы"
  else
    subject = "Тема: " + subject;

  if (description.length == 0)
    description = "Без описания"
  else
    description = "Описание: " + description;
  document.getElementById('modal__text').innerText = 'Письмо отправлено' + '\n\r' + subject + '\n\r' + description;

  document.querySelector('.modal').classList.add('active');
  document.body.style.overflow = 'hidden';
});

document.querySelector('.button_close').addEventListener('click', function () {
  document.querySelector('.overlay').classList.remove('active');
  document.querySelector('.modal').classList.remove('active');
  document.body.style.overflow = 'visible';
  document.getElementById('modal__text').innerText = '';
});

/* =================================
Portfolio
==================================*/

let portItems = document.querySelectorAll('.portfolio__items>.portfolio__item');
portItems.forEach(el => el.addEventListener('click', (event) => {
  document.querySelectorAll('.portfolio__img').forEach(e => e.classList.remove('active'));
  event.target.classList.add('active');
}
));

/* =================================
Phones
==================================*/

let currentStatusVert = 0;
let currentStatusHoriz = 0;
document.querySelector('.outlay__vert').addEventListener('click', () => {
  if (currentStatusVert % 2 == 0)
    document.querySelector('.screen__vert').classList.add('active')
  else
    document.querySelector('.screen__vert').classList.remove('active');
  currentStatusVert++
})

document.querySelector('.outlay__horiz').addEventListener('click', () => {
  if (currentStatusHoriz % 2 == 0)
    document.querySelector('.screen__horiz').classList.add('active')
  else
    document.querySelector('.screen__horiz').classList.remove('active');
  currentStatusHoriz++
})

/* =================================
Tabs
==================================*/

document.querySelectorAll('.tag').forEach(el => el.addEventListener('click', (event) => {
  document.querySelectorAll('.tag').forEach(e => e.classList.remove('active'));
  event.target.classList.add('active');
  sortImg();
}
));

let itemsNodeList = document.querySelectorAll('.portfolio__item');
let itemsArr = Array.prototype.slice.call(itemsNodeList);
function sortImg() {
  let itemsArrSorted = itemsArr.sort(() => Math.random() - 0.5);
  itemsNodeList.innerHTML = '';
  for (i = 0; i < itemsArrSorted.length; i++)
    document.querySelector('.portfolio__items').append(itemsArrSorted[i]);
}
