"use strict";

const changeType = () => {
	const input = document.querySelector('[type="text"]');

	input.addEventListener('focus', () => {

		let today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0');
		const yyyy = today.getFullYear();

		today = yyyy + '-' + mm + '-' + dd; // 2022-10-28

		input.setAttribute('type', 'date');
		input.setAttribute('min', today);
	})
}

const form = () => {
	const item = document.querySelector('form'),
		inputs = document.querySelectorAll('input'),
		select = document.querySelector('select'),
		descr = document.querySelector('.description'),
		btn = document.querySelector('[type="submit"]');


	descr.classList.add('animate__animated');
	descr.style.display = 'none';

	const showResult = () => {
		descr.classList.remove('animate__fadeOutDown');
		descr.classList.add('animate__fadeInUp');
		descr.style.display = 'block';
	}

	const hideResult = () => {
		descr.classList.remove('animate__fadeInUp')
		descr.classList.add('animate__fadeOutDown');
		//descr.style.display = 'none';
	}

	const clearInputs = () => {
		inputs[0].type = 'text';

		inputs.forEach(input => {
			input.value = '';
		})

		select.value = select.options[0].value;

		hideResult();
		changeType();
	}

	const isValid = () => {
		if (inputs[0].value == '' || inputs[1].value == '' || select.value == '') {
			return (false);
		}
		return (true);
	}

	item.addEventListener('submit', (e) => {
		e.preventDefault();

		if (isValid()) {
			let days = calculate(select.value, inputs[1].value);
			const result = new Date(inputs[0].value);
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			
			checkBussinessDay(result, days);
			
			document.querySelector('span').textContent = result.toLocaleDateString("en-GB", options)
			showResult();
			
			setTimeout(() => {
				clearInputs();
			}, 10000);
			
		} else {
			document.querySelector('.modal-btn').click();
		}
	});
}

const calculate = (type, counter) => {
	if (type == 'Cotton') {
		if (counter < 50)
			return (2);
		else
			return (3);
	} else if (type == 'Linen') {
		if (counter < 50)
			return (4);
		else
			return (5);
	}
}

const checkBussinessDay = (date, days) => {
	while (days > 0) {
		date.setDate(date.getDate() + 1);
		
		const weekday = date.getDay();
		if (weekday == 6 || weekday == 0) {
			continue ;
		}
		days--;
	}
}

const icon = document.getElementById('tooltip')
const tooltip = new bootstrap.Tooltip(icon)

changeType();
form();