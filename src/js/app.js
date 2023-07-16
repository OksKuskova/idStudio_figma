// Burger
const iconMenu = document.querySelector('.icon-menu');
function isMenuOpen() {
	return document.documentElement.classList.contains("menu-open");
}

if (iconMenu) {
	const menuBody = document.querySelector('.menu__body');
	iconMenu.addEventListener('click', function (e) {
		if (unlock) {
			if (isMenuOpen()) {
				menuClose();
			} else {
				menuOpen();
			}
		}
	});
}
function menuOpen() {
	document.documentElement.classList.add("menu-open");
	bodyLock();
}
function menuClose() {
	document.documentElement.classList.remove("menu-open");
	bodyUnLock();
}

// Popup
const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll('.lock-padding');
const body = document.querySelector('body');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const closeIcon = popupCloseIcon[index];
		closeIcon.addEventListener('click', function (e) {
			popupClose(closeIcon.closest('.popup'));
			e.preventDefault();
		})
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup-show');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		document.documentElement.classList.add("popup-open");
		curentPopup.classList.add('popup-show');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('popup-show');
		if (doUnlock) {
			bodyUnLock();
			document.documentElement.classList.remove("popup-open");
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	// const lockPaddingValue = '17px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.code === "Escape") {
		const popupActive = document.querySelector('.popup-show');
		popupClose(popupActive);
	}
});

//  Goto

const menuLinks = document.querySelectorAll('[data-goto]');

if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;

			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth',
			});
			e.preventDefault();
		}
	}
}

let textElement = document.querySelector(".about__text");
let readMoreButton = document.querySelector(".about__more");

const ORIGINAL_HEIGHT = "original-height";
const MIN_HEIGHT = "min-height";
const HIDDEN_ATTR = "hidden-attr";
const NUM_OF_IMAGES = 3;

// Show more для текстового блока About

document.addEventListener("DOMContentLoaded", () => {
	doClear(textElement);
	doInit(textElement, textElement.children[0].clientHeight);
	if (window.innerWidth <= 767.98) {
		doHide(textElement);
	}
});

window.addEventListener("resize", () => {
	doClear(textElement);
	doInit(textElement, textElement.children[0].clientHeight);

	if (window.innerWidth <= 767.98) {
		if (textElement.hasAttribute("forcibly-opened")) {
			return;
		}
		doHide(textElement);
	} else {
		doShow(textElement);
	}
});

readMoreButton.addEventListener("click", () => {
	if (textElement.hasAttribute(HIDDEN_ATTR)) {
		// есть аттрибут HIDDEN_ATTR, значит эдлемент скрыли перед этим
		// показываем
		doShow(textElement);
		textElement.setAttribute("forcibly-opened", "")
	} else {
		// просто элемент, без спец. аттрибута, не скрыт,
		// скрываем
		doHide(textElement);
		textElement.removeAttribute("forcibly-opened")
	}

	if (!textElement.hasAttribute(HIDDEN_ATTR)) {
		readMoreButton.innerHTML = "HIDE";
	} else {
		readMoreButton.innerHTML = "READ MORE";
	}
});

export let doClear = (target) => {
	target.style.transition = "";
	// убираем hidden у детей
	for (let item = 0; item < target.children.length; item++) {
		target.children[item].removeAttribute("hidden");
	};
	target.style.height = "auto";

	viewMoreButton.style.display = "none";
	viewMoreButton.innerHTML = "VIEW MORE";
};

export let doInit = (target, min_height) => {
	target.setAttribute(ORIGINAL_HEIGHT, target.offsetHeight);
	target.setAttribute(MIN_HEIGHT, min_height);
	target.style.overflow = "hidden";
};

export let doHide = (target, hiddenElements = 1) => {
	// метод скрытия элемента
	target.setAttribute(HIDDEN_ATTR, "");

	viewMoreButton.style.display = "block";

	let min_height = target.getAttribute(MIN_HEIGHT);
	target.style.height = min_height + "px";

	for (let item = hiddenElements; item < target.children.length; item++) {
		target.children[item].setAttribute("hidden", "true");
	}
};

export let doShow = (target, fast = false) => {
	// метод показа элемента
	if (!target.hasAttribute(HIDDEN_ATTR)) {
		return;
	}
	target.removeAttribute(HIDDEN_ATTR);

	viewMoreButton.style.display = "block";

	let origHeight = target.getAttribute(ORIGINAL_HEIGHT);
	target.style.transition = "height 0.6s ease 0s";
	target.style.height = origHeight + "px";

	// убираем hidden у детей
	for (let item = 0; item < target.children.length; item++) {
		target.children[item].removeAttribute("hidden");
	}
};

// Viem more для блока Portfolio

let bodyTabs = document.getElementsByClassName("body-tabs");
let viewMoreButton = document.querySelector(".tabs-portfolio__more");
let tubsNavigation = document.querySelector(".tabs-portfolio__navigation");

export let getCurrentTab = () => {
	for (let tab = 0; tab < bodyTabs.length; tab++) {
		if (!bodyTabs[tab].hasAttribute("hidden")) {
			return bodyTabs[tab];
		}
	}
}

export let doReset = () => {
	let currentItems = getCurrentTab().children[0];

	doClear(currentItems);

	let items = currentItems.children;
	let minSize = 0;

	for (let i = 0; i < items.length && i < NUM_OF_IMAGES; i++) {
		minSize += items[i].clientHeight;
		minSize += 15;
	}

	doInit(currentItems, minSize);

	if (items.length > NUM_OF_IMAGES) {
		if (window.innerWidth <= 600) {
			doHide(currentItems, NUM_OF_IMAGES);
		} else {
			doShow(currentItems);
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	doReset();
});

tubsNavigation.addEventListener("click", (event) => {
	if (event.target.closest(".tabs-portfolio__button")) {
		setTimeout(() => {
			doReset();
		});
	}
});

window.addEventListener("resize", () => {
	doReset();
});

viewMoreButton.addEventListener("click", () => {
	let currentItems = getCurrentTab().children[0];

	if (currentItems.hasAttribute(HIDDEN_ATTR)) {
		doShow(currentItems);
	} else {
		doHide(currentItems, NUM_OF_IMAGES);
	}

	if (!currentItems.hasAttribute(HIDDEN_ATTR)) {
		viewMoreButton.innerHTML = "HIDE";
	} else {
		viewMoreButton.innerHTML = "VIEW MORE";
	}
});







// Включить / выключить FLS (Full Logging System) (в роботе)
window['FLS'] = true;

// Подключение основного файла стилей
import "../scss/style.scss";

// ========================================================================================================================================================================================================================================================
// Функционал ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as flsFunctions from "./files/functions.js";

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
/* (i) необходимо для корректного отображения webp из css */
flsFunctions.isWebp();
/* Добавление класса touch для HTML если браузер мобильный */
// flsFunctions.addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
// flsFunctions.addLoadedClass();
/* Модуль для роботы с меню (Бургер) */
// flsFunctions.menuInit();
/* Вычисление плавающей панели на мобильных устройствах при 100vh */
// flsFunctions.fullVHfix();

/*
Модуль "Спойлеры"
Документация: https://template.fls.guru/template-docs/modul-spojlery.html
Сниппет (HTML): spollers
*/
// flsFunctions.spollers();

/*
Модуль "Табы"
Документация: https://template.fls.guru/template-docs/modul-taby.html
Сниппет (HTML): tabs
*/
flsFunctions.tabs();

/*
Модуль "Показать еще"
Документация: https://template.fls.guru/template-docs/modul-pokazat-eshhjo.html
Сниппет (HTML): showmore
*/
// flsFunctions.showMore();

/*
Модуль "Эффект волн"
Документация: https://template.fls.guru/template-docs/modul-ripple-effect.html
Сниппет (HTML):
*/
// flsFunctions.rippleEffect();

/*
Модуль "Кастомный курсор"
Документация:
Сниппет (HTML):
*/
// flsFunctions.customCursor(true);

/*
Модуль "Попапы"
Документация: https://template.fls.guru/template-docs/funkcional-popup.html
Сниппет (HTML): pl, pop
*/
// import './libs/popup.js'

/*
Модуль параллакса мышью
Документация: https://template.fls.guru/template-docs/modul-animacii-parallaks-obektov-pri-dvizhenii-myshi.html
*/
// import './libs/parallax-mouse.js'

// ========================================================================================================================================================================================================================================================
// Работа с формами ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as flsForms from "./files/forms/forms.js";

/* Работа с полями формы */
/* Документация: https://template.fls.guru/template-docs/rabota-s-formami.html */

flsForms.formFieldsInit({
	viewPass: false,
	autoHeight: false
});

/* Отправка формы */
/* Документация: https://template.fls.guru/template-docs/rabota-s-formami.html */
// flsForms.formSubmit();

/* Модуль форми "кількість" */
// flsForms.formQuantity();

/* Модуль звездного рейтинга */
// flsForms.formRating();

/* Модуль работы с select. */
import './libs/select.js'

/* Модуль роботы с календарем */
// import './files/forms/datepicker.js'

/* (У роботі) Модуль роботы с масками.*/
/*
Пподключение и настройка выполняется в файле js/files/forms/inputmask.js
Документация по работе в шаблоне:
Документация плагина: https://github.com/RobinHerbots/inputmask
Сниппет(HTML):
*/
// import "./files/forms/inputmask.js";

/* Модуль роботы с ползунком */
/*
Підключення та налаштування виконується у файлі js/files/forms/range.js
Документація по роботі у шаблоні:
Документація плагіна: https://refreshless.com/nouislider/
Сніппет (HTML): range
*/
// import "./files/forms/range.js";

/* Модуль роботи з підказками (tippy) */
/*
Підключення плагіна Tippy.js та налаштування виконується у файлі js/files/tippy.js
Документація по роботі у шаблоні:
Документація плагіна: https://atomiks.github.io/tippyjs/
Сніппет (HTML): tip (додає атрибут з підказкою для html тега)
*/
// import "./files/tippy.js";

// ========================================================================================================================================================================================================================================================
// Робота зі слайдером (Swiper) ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Налаштування підключення плагіна слайдера Swiper та нових слайдерів виконується у файлі js/files/sliders.js
Документація по роботі у шаблоні: https://template.fls.guru/template-docs/rabota-so-slajderom-swiper.html
Документація плагіна: https://swiperjs.com/
Сніппет(HTML): swiper
*/
import "./files/sliders.js";

// ========================================================================================================================================================================================================================================================
// Модулі роботи з прокручуванням сторінки ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================

/*
Зміна дизайну скроллбару
Документація по роботі у шаблоні: У HTML додаємо до блоку атрибут data-simplebar
Документація плагіна: https://github.com/Grsmto/simplebar/tree/master/packages/simplebar
Сніппет(HTML): 
*/
// import './files/scroll/simplebar.js';

// Ліниве (відкладене) завантаження картинок
// Документація по роботі у шаблоні: https://template.fls.guru/template-docs/modul-lenivaya-podgruzka-lazy-loading.html
// Документація плагіна: https://github.com/verlok/vanilla-lazyload
// Сніппет(HTML):
// import './files/scroll/lazyload.js';

// Спостерігач за об'єктами з атрибутом data-watch
// Документація: https://template.fls.guru/template-docs/modul-nabljudatel-za-poyavleniem-elementa-pri-skrolle.html
// Сніппет(HTML):
// import './libs/watcher.js'

// Модуль поекранної прокрутки
// Документація: https://template.fls.guru/template-docs/modul-poekrannoj-prokrutki-stranicy-fullpage.html
// Сніппет(HTML):
// import './libs/fullpage.js'

// Модуль паралаксу
// Документація: https://template.fls.guru/template-docs/paralaks-pri-skroli.html
// Сніппет(HTML):
// import './libs/parallax.js'

// Функції роботи скролом
import * as flsScroll from "./files/scroll/scroll.js";

// Плавна навігація по сторінці
// Документація: https://template.fls.guru/template-docs/modul-plavnoj-navigacii-po-stranice.html
// flsScroll.pageNavigation();

// Функціонал додавання класів до хедеру під час прокручування
// Документація: https://template.fls.guru/template-docs/modul-dobavleniya-klassov-k-shapke-pri-prokrutke-stranicy.html
// flsScroll.headerScroll();

// Модуль анімація цифрового лічильника
// Документація: https://template.fls.guru/template-docs/modul-animacii-cifrovogo-lichilnika.html
// Сніппет(HTML):
// flsScroll.digitsCounter();

// ========================================================================================================================================================================================================================================================
// Галерея ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Документація по роботі у шаблоні: 
Документація плагіна: https://www.lightgalleryjs.com/docs/
Сніппет(HTML):
*/
// import "./files/gallery.js";

// ========================================================================================================================================================================================================================================================
// Масонрі сітка ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Документація по роботі у шаблоні:
Документація плагіна: 
Сніппет(HTML):
*/
// import "./files/isotope.js";

// ========================================================================================================================================================================================================================================================
// Інші плагіни ============================================================================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================

/* Динамічний адаптив */
// Документація: https://template.fls.guru/template-docs/dinamicheskij-adaptiv.html
// import "./libs/dynamic_adapt.js";

/* Форматування чисел */
// import './libs/wNumb.min.js';

// ========================================================================================================================================================================================================================================================
// Інше ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/* Підключаємо файли зі своїм кодом */
import "./files/script.js";
//============================================================================================================================================================================================================================================