/*
(i) Код попадает в итоговый файл,
только когда вызывается функция,
например fls Functions.spollers();
Или когда весь файл импортирован,
например, import " files / script.js";
Неиспользуемый (не вызываемый)
код в итоговый файл не попадает.

Если мы хотим добавить модуль
следует его раскомментировать
*/


let textElement = document.querySelector(".about__text");
let readMoreButton = document.querySelector(".about__more");

const ORIGINAL_HEIGHT = "original-height";
const MIN_HEIGHT = "min-height";
const HIDDEN_ATTR = "hidden-attr";

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
};

export let doInit = (target, min_height) => {
	target.setAttribute(ORIGINAL_HEIGHT, target.offsetHeight);
	target.setAttribute(MIN_HEIGHT, min_height);
	target.style.overflow = "hidden";
};

export let doHide = (target, hiddehElements = 1) => {
	// метод скрытия элемента
	target.setAttribute(HIDDEN_ATTR, "");

	let min_height = target.getAttribute(MIN_HEIGHT);
	target.style.height = min_height + "px";

	for (let hiddehElements; hiddehElements < target.children.length; item++) {
		target.children[hiddehElements].setAttribute("hidden", "true");
	}

	// window.setTimeout(() => {
	// 	// устанавливаем hidden детям
	// 	for (let item = 1; item < target.children.length; item++) {
	// 		target.children[item].setAttribute("hidden", "true");
	// 	}
	// }, 1000);
};

export let doShow = (target, fast = false) => {
	// метод показа элемента
	if (!target.hasAttribute(HIDDEN_ATTR)) {
		return;
	}
	target.removeAttribute(HIDDEN_ATTR);
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
export let loaded = () => {
	let currentItems = getCurrentTab().children[0];

	doClear(currentItems);

	let items = currentItems.children;
	let minSize = 0;
	const NUM_OF_IMAGES = 3;
	for (let i = 0; i < items.length && i < NUM_OF_IMAGES; i++) {
		minSize += items[i].clientHeight;
	}

	doInit(currentItems, minSize);
	if (window.innerWidth <= 599.98) {
		doHide(currentItems, 3);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	loaded();
});

tubsNavigation.addEventListener("click", (event) => {
	if (event.target.closest(".tabs-portfolio__button")) {
		setTimeout(() => {
			loaded();
		});
		// if (!viewMoreButton.hasAttribute("close"))
		// 	viewMoreButton.setAttribute("close", "");
		// viewMoreButton.innerHTML = "VIEW MORE";
	}
});

window.addEventListener("resize", () => {
	let currentItems = getCurrentTab().children[0];

	doClear(currentItems);

	let items = currentItems.children;
	let minSize = 0;
	const NUM_OF_IMAGES = 3;
	for (let i = 0; i < items.length && i < NUM_OF_IMAGES; i++) {
		minSize += items[i].clientHeight;
	}

	doInit(currentItems, minSize);

	if (window.innerWidth <= 767.98) {
		doHide(currentItems, 3);
	} else {
		doShow(currentItems);
	}
});

viewMoreButton.addEventListener("click", () => {
	let currentItems = getCurrentTab().children[0];

	if (currentItems.hasAttribute(HIDDEN_ATTR)) {
		doShow(currentItems);
	} else {
		doHide(currentItems, 3);
	}

	if (!currentItems.hasAttribute(HIDDEN_ATTR)) {
		viewMoreButton.innerHTML = "HIDE";
	} else {
		viewMoreButton.innerHTML = "VIEW MORE";
	}
	// if (viewMoreButton.hasAttribute("close")) {
	// 	viewMoreButton.removeAttribute("close");
	// 	viewMoreButton.innerHTML = "HIDE";
	// } else {
	// 	viewMoreButton.setAttribute("close", "");
	// 	viewMoreButton.innerHTML = "VIEW MORE";
	// }
});
// document.addEventListener("DOMContentLoaded", () => {
// 		if (window.innerWidth <= 599.98) {
// 		for (let tab = 0; tab < bodyTabs.length; tab++) {
// 			let bodyTabsItems = bodyTabs[tab].querySelector(".body-tabs__items");
// 			let items = bodyTabsItems.children;
// 			let minSize = 0;
// 			const NUM_OF_IMAGES = 3;
// 			for (let i = 0; i < items.length && i < NUM_OF_IMAGES; i++) {
// 				minSize += items[i].clientHeight;
// 				//minSize += Number(items[i].style.gridRowGap);
// 			}
// 			bodyTabsItems.setAttribute(MIN_HEIGHT, minSize);
// 			doHide(bodyTabsItems, minSize);
// 		}
// 	}
// });
// document.addEventListener("DOMContentLoaded", () => {
// 	if (window.innerWidth <= 479.98) {
// 		for (let item = 0; item < bodyTabs.length; item++) {
// 			if (!bodyTabs[item].hasAttribute("hidden")) {
// 				// Оболочка внутри Таба
// 				let bodyTabItem = bodyTabs[item].querySelector(".body-tabs__items");
// 				// Коллекция изображений
// 				let bodyTabImages = bodyTabItem.getElementsByClassName("body-tabs__item");
// 				for (let item = 3; item < bodyTabImages.length; item++) {
// 					bodyTabImages[item].setAttribute("hidden", "");
// 				}
// 			};
// 		}
// 	}
// });

// 
// console.log(bodyTabsItems);



// window.addEventListener("resize", () => {
// 	if (window.innerWidth <= 599.98) {
// 		for (let i = 0; i < bodyTabsItems.length; i++) {
// 			// Коллекция изображений
// 			let bodyTabImages = bodyTabsItems[i].getElementsByClassName("body-tabs__item");
// 			for (let item = 3; item < bodyTabImages.length; item++) {
// 				if (!bodyTabImages[item].hasAttribute("hidden")) {
// 					bodyTabImages[item].setAttribute("hidden", "");
// 				}
// 			}
// 		}
// 	} else {
// 		for (let i = 0; i < bodyTabsItems.length; i++) {
// 			// Коллекция изображений
// 			let bodyTabImages = bodyTabsItems[i].getElementsByClassName("body-tabs__item");
// 			for (let item = 3; item < bodyTabImages.length; item++) {
// 				bodyTabImages[item].removeAttribute("hidden");
// 			}
// 		}
// 	}
// })





// document.addEventListener("DOMContentLoaded", () => {
// 	if (window.innerWidth <= 767.98) {
// 		for (let item = 0; item < textChildren.length; item++) {
// 			console.log(textChildren[item].clientHeight);
// 			// textChildren[item].setAttribute("hidden", "");
// 		}
// 	}
// });
// window.addEventListener("resize", () => {
// 	if (window.innerWidth <= 767.98) {
// 		for (let item = 1; item < textChildren.length; item++) {
// 			if (!textChildren[item].hasAttribute("hidden")) {
// 				textChildren[item].setAttribute("hidden", "");
// 			}
// 		}
// 	} else {
// 		for (let item = 1; item < textChildren.length; item++) {
// 			textChildren[item].removeAttribute("hidden");
// 		}
// 	}
// });




// // эта ф-ция скрывает
// export let _slideUp = (target, duration = 500, showmore = 0) => {
// 	if (!target.classList.contains('_slide')) {
// 		target.classList.add('_slide');
// 		target.style.transitionProperty = 'height, margin, padding';
// 		target.style.transitionDuration = duration + 'ms';
// 		target.style.height = `${target.offsetHeight}px`;
// 		target.offsetHeight;
// 		target.style.overflow = 'hidden';
// 		target.style.height = showmore ? `${showmore}px` : `0px`;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		window.setTimeout(() => {
// 			target.hidden = !showmore ? true : false;
// 			!showmore ? target.style.removeProperty('height') : null;
// 			target.style.removeProperty('padding-top');
// 			target.style.removeProperty('padding-bottom');
// 			target.style.removeProperty('margin-top');
// 			target.style.removeProperty('margin-bottom');
// 			!showmore ? target.style.removeProperty('overflow') : null;
// 			target.style.removeProperty('transition-duration');
// 			target.style.removeProperty('transition-property');
// 			target.classList.remove('_slide');
// 			// Створюємо подію 
// 			document.dispatchEvent(new CustomEvent("slideUpDone", {
// 				detail: {
// 					target: target
// 				}
// 			}));
// 		}, duration);
// 	}
// }
// // эта ф-ция показывает
// export let _slideDown = (target, duration = 500, showmore = 0) => {
// 	if (!target.classList.contains('_slide')) {
// 		target.classList.add('_slide');
// 		target.hidden = target.hidden ? false : null;
// 		showmore ? target.style.removeProperty('height') : null;
// 		let height = target.offsetHeight;
// 		target.style.overflow = 'hidden';
// 		target.style.height = showmore ? `${showmore}px` : `0px`;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		target.offsetHeight;
// 		target.style.transitionProperty = "height, margin, padding";
// 		target.style.transitionDuration = duration + 'ms';
// 		target.style.height = height + 'px';
// 		target.style.removeProperty('padding-top');
// 		target.style.removeProperty('padding-bottom');
// 		target.style.removeProperty('margin-top');
// 		target.style.removeProperty('margin-bottom');
// 		window.setTimeout(() => {
// 			target.style.removeProperty('height');
// 			target.style.removeProperty('overflow');
// 			target.style.removeProperty('transition-duration');
// 			target.style.removeProperty('transition-property');
// 			target.classList.remove('_slide');
// 			// Створюємо подію
// 			document.dispatchEvent(new CustomEvent("slideDownDone", {
// 				detail: {
// 					target: target
// 				}
// 			}));
// 		}, duration);
// 	}
// }



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
flsFunctions.menuInit();
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
import './libs/popup.js'

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
/*
flsForms.formFieldsInit({
	viewPass: false,
	autoHeight: false
});
*/
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