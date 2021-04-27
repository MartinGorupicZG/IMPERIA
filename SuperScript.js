// ==UserScript==
// @name      SuperScript
// @namespace  Carlinjo
// @version    0.1
// @description Search for colonies
// @match      https://*.imperiaonline.org/imperia/game_v5/game/villagejs.php*
// @copyright  2021, You
// ==/UserScript==

const user = btoa(playerName);

if (user === 'SXZhbkdyb3puaTY5') {
	init();
} else {
	alert('Neovlašteni Korisnik');
}

function init() {
	const getServer = window.location.href;
	const server = getServer.slice(11, 14);
	let i = 0;
	let j = 1000;
	let link = '';
	const coloniesArr = [];
	var url = '';

	let searchProggressValue = 0;

	const createUI = () => {
		const wrap = document.createElement('div');
		wrap.classList.add('wrapper');
		wrap.style.width = '98vw';
		wrap.style.position = 'absolute';
		wrap.style.marginLeft = '0.5vw';
		wrap.style.top = '85vh';
		wrap.style.backgroundColor = 'white';
		document.body.appendChild(wrap);
		createHead();
		createSearch();
		createOptions();
		createWrap();
		setItems();
	};

	const createHead = () => {
		const element = document.createElement('div');
		element.style.width = '100%';
		element.style.display = 'flex';
		element.style.alignItems = 'center';
		element.style.justifyContent = 'center';
		element.style.fontSize = '1.6rem';
		element.style.marginBottom = '2rem';
		element.innerHTML = `<h2>Wellcome ${playerName}</h2>`;
		document.querySelector('.wrapper').appendChild(element);
	};

	const createSearch = () => {
		const element = document.createElement('div');
		element.style.width = '100%';
		element.style.display = 'flex';
		element.style.alignItems = 'center';
		element.style.justifyContent = 'space-between';
		element.style.fontSize = '1.6rem';
		element.style.paddingBottom = '2rem';
		element.style.paddingTop = '2rem';
		element.style.borderTop = '5px solid black';
		element.style.borderBottom = '5px solid black';
		element.innerHTML = `<div>
    <label for="aliance">Search for Aliance</label>
    <input type="text" id="aliance" name="aliance" size="20">
    </div>

    <div>
    <label for="player">Search for Player</label>
    <input type="text" id="player" name="player" size="20">
    </div>

    <div>
    <label for="scaning">Scaning progress:<span id='lscan'> 0 </span> %</label>
<progress id="scaning" value="0" max="100"></progress>
    </div>
    `;

		const c = element.children;
		let i;
		for (i = 0; i < c.length; i++) {
			c[i].style.display = 'flex';
			c[i].style.width = '100%';
			c[i].style.flexDirection = 'column';
			c[i].style.justifyContent = 'space-between';
			c[i].style.alignItems = 'center';
			c[i].style.height = '4rem';
		}
		document.querySelector('.wrapper').appendChild(element);
	};

	const createOptions = () => {
		const element = document.createElement('div');
		element.style.width = '100%';
		element.style.display = 'flex';
		element.style.alignItems = 'center';
		element.style.justifyContent = 'space-between';
		element.style.fontSize = '1.6rem';
		element.style.borderBottom = '2px solid blue';
		element.innerHTML = `
	<span>NAME</span>
	<span>ALIANCE</span>
	<span>DISTANCE</span>
	<span>LOCATION</span>
	<span>TYPE</span>
	`;

		const c = element.children;
		let i;
		for (i = 0; i < c.length; i++) {
			c[i].style.display = 'flex';
			c[i].style.width = '100%';
			c[i].style.justifyContent = 'center';
			c[i].style.alignItems = 'center';
			c[i].style.height = '4rem';
		}

		document.querySelector('.wrapper').appendChild(element);
	};

	const createWrap = () => {
		const element = document.createElement('div');
		element.style.width = '100%';
		element.style.paddingBottom = '5rem';
		element.style.backgroundColor = '#F5F5F5';
		element.classList.add('col-wrap');
		document.querySelector('.wrapper').appendChild(element);
	};
	const setItems = () => {
		document.querySelector('.col-wrap').innerHTML = '';
		coloniesArr.map((col) => {
			const element = document.createElement('div');
			element.style.width = '100%';
			element.style.display = 'flex';
			element.style.fontSize = '1.2rem';
			element.style.borderBottom = '2px solid black';
			element.innerHTML = `
		<span>${col.name}</span>
		<span>${col.aliance}</span>
		<span>${col.distance}</span>
		<span>X:${col.location.x} | Y:${col.location.y}</span>
		<span>${col.type}</span>
		`;
			const c = element.children;
			let i;
			for (i = 0; i < c.length; i++) {
				c[i].style.display = 'flex';
				c[i].style.width = '100%';
				c[i].style.justifyContent = 'center';
				c[i].style.alignItems = 'center';
				c[i].style.height = '3rem';
				c[i].style.borderRight = '1px solid black';
			}
			document.querySelector('.col-wrap').appendChild(element);
		});
	};

	createUI();

	const alianceSearch = document.getElementById('aliance');
	alianceSearch.addEventListener('keyup', () => {
		let colonyList;
		if (alianceSearch.value.length > 0) {
			colonyList = coloniesArr.filter((col) => {
				return col.aliance
					.toLowerCase()
					.includes(alianceSearch.value.toLowerCase());
			});

			document.querySelector('.col-wrap').innerHTML = '';

			colonyList.map((col) => {
				const element = document.createElement('div');
				element.style.width = '100%';
				element.style.display = 'flex';
				element.style.fontSize = '1.2rem';
				element.style.borderBottom = '2px solid black';
				element.innerHTML = `
		<span>${col.name}</span>
		<span>${col.aliance}</span>
		<span>${col.distance}</span>
		<span>X:${col.location.x} | Y:${col.location.y}</span>
		<span>${col.type}</span>
		`;
				const c = element.children;
				let i;
				for (i = 0; i < c.length; i++) {
					c[i].style.display = 'flex';
					c[i].style.width = '100%';
					c[i].style.justifyContent = 'center';
					c[i].style.alignItems = 'center';
					c[i].style.height = '3rem';
					c[i].style.borderRight = '1px solid black';
				}
				document.querySelector('.col-wrap').appendChild(element);
			});
		} else {
			document.querySelector('.col-wrap').innerHTML = '';
			setItems();
		}
	});

	const playerSearch = document.getElementById('player');
	playerSearch.addEventListener('keyup', () => {
		let colonyList;
		if (playerSearch.value.length > 0) {
			colonyList = coloniesArr.filter((col) => {
				return col.name
					.toLowerCase()
					.includes(playerSearch.value.toLowerCase());
			});

			document.querySelector('.col-wrap').innerHTML = '';

			colonyList.map((col) => {
				const element = document.createElement('div');
				element.style.width = '100%';
				element.style.display = 'flex';
				element.style.fontSize = '1.2rem';
				element.style.borderBottom = '2px solid black';
				element.innerHTML = `
		<span>${col.name}</span>
		<span>${col.aliance}</span>
		<span>${col.distance}</span>
		<span>X:${col.location.x} | Y:${col.location.y}</span>
		<span>${col.type}</span>
		`;
				const c = element.children;
				let i;
				for (i = 0; i < c.length; i++) {
					c[i].style.display = 'flex';
					c[i].style.width = '100%';
					c[i].style.justifyContent = 'center';
					c[i].style.alignItems = 'center';
					c[i].style.height = '3rem';
					c[i].style.borderRight = '1px solid black';
				}
				document.querySelector('.col-wrap').appendChild(element);
			});
		} else {
			document.querySelector('.col-wrap').innerHTML = '';
			setItems();
		}
	});

	const time = setInterval(function () {
		setItems();
		setProcent();
		link = '';
		let n = i;
		let m = j;
		for (n; n < m; n++) {
			link += `b=${n}&`;
		}

		i = i + 1000;
		j = j + 1000;

		createUrl(link);
		if (i === 40000 && j == 41000) {
			clearInterval(time);
		}
	}, 10000);
	function createUrl(url) {
		let tempUrl = `https://www${server}.imperiaonline.org/imperia/game_v5/game/json/dynamic_map_objects.php?${url}`;
		let setUrl = tempUrl.slice(0, -1);
		getData(setUrl);
	}

	var mapResponseDecodeKeys = {
		D: 6,
		I: 7,
		Y: 8,
		A: 9,
		N: 10,
	};

	function decodeMapResponse(response) {
		var k = 0;
		var p = 0;
		var decoded = '';
		var responseLength = response.length;
		while (k < responseLength - 1) {
			p = mapResponseDecodeKeys[response.substr(k, 1)];
			decoded += response.substr(k + 1, p);
			k += p + 1;
		}
		return JSON.parse(atob(decoded));
	}

	function getData(url) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				url: url,
				success: function (result) {
					try {
						resolve(JSON.parse(result));
					} catch (e) {
						try {
							var decodedResponse = decodeMapResponse(result);

							showData(decodedResponse);
							resolve(decodedResponse);
						} catch (er) {
							resolve({});
						}
					}
				},
				error: function () {
					resolve({});
				},
			});
		});
	}

	function showData(col) {
		var blocks = col['blocks'];

		for (var blockId = 0; blockId < blocks.length; blockId++) {
			var block = blocks[blockId]['data'];
			for (var i = 0; i < block.length; i++) {
				var x = Math.ceil(block[i].x / 4);
				var y = Math.ceil(block[i].y / 4);
				var colony = block[i].obs[0].ttp;
				var tooltip = block[i].obs[0].ttp[0];
				var tooltip1 = block[i].obs[0].ttp[1];
				var tooltip2 = block[i].obs[0].ttp[2];
				var tooltip3 = block[i].obs[0].ttp[3];
				var tooltip4 = block[i].obs[0].ttp[4];
				var tooltip5 = block[i].obs[0].ttp[5];
				var tooltip6 = block[i].obs[0].ttp[6];

				if (colony.length == 5) {
					const item = {
						name: tooltip1.vl,
						aliance: tooltip3.vl,
						distance: tooltip4.vl,
						location: { x, y },
						type: tooltip.vl,
					};
					coloniesArr.push(item);
				} else if (colony.length >= 5 && colony.length <= 8) {
					const item = {
						name: tooltip4.vl,
						aliance: tooltip6.vl,
						distance: tooltip3.vl,
						location: { x, y },
						type: tooltip.vl,
					};
					coloniesArr.push(item);
				}
			}
		}
	}

	setProcent = () => {
		searchProggressValue += 2.5;
		document.getElementById('lscan').innerText = searchProggressValue;
		document.getElementById('scaning').value = searchProggressValue;
	};
}

