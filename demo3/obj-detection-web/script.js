 {
	let modelHasLoaded = false;
	let model = undefined;

	const init = () => {
		const $loading = document.querySelector(`.modelLoading`);
		
		cocoSsd.load().then((loadedModel) => {
			model = loadedModel;
			modelHasLoaded = true;
			$loading.innerHTML = `YES!`;
			$loading.style.color = `green`;
		})
		
		const $img = document.querySelector(`.box__img`);
		$img.addEventListener("click", (event) => {
			handelClick(event)
		});

		const $file = document.getElementById('file')
    $file.addEventListener(`change`, () => {
			previewImage() 
		});
	}

	const previewImage = () => {
		const file = document.getElementById("file").files;
		if (file.length > 0) {
			const fileReader = new FileReader();

			fileReader.onload = (event) => {
				document.querySelector(`.box__img`).src = event.target.result;
				document.querySelectorAll('.innerSquare').forEach(e => e.remove());
				document.querySelectorAll('.text').forEach(e => e.remove());
				document.querySelector('.nothing').textContent = '';
			}

			fileReader.readAsDataURL(file[0]);
		}
	}
	
	const handelClick = event => {
		if (!modelHasLoaded) {
			return;
		}
	
		model.detect(event.target).then((predictions) => {
			for (let x = 0; x < predictions.length; x++) {
				const p = document.createElement(`p`);
				p.classList.add(`text`);
				p.innerText =`${	predictions[x].class} - with ${Math.round(parseFloat(predictions[x].score) * 100)}% confidence`;
				p.style = `margin-left: ${predictions[x].bbox[0]}px; margin-top: ${(predictions[x].bbox[1] - 10)}px; width: ${(predictions[x].bbox[2] - 10)}px; top: 0; left: 0;`;
	
				const innerSquare = document.createElement(`div`);
				innerSquare.classList.add(`innerSquare`);
				innerSquare.style = `left: ${predictions[x].bbox[0]}px; top: ${predictions[x].bbox[1]}px; width: ${predictions[x].bbox[2]}px; height: ${predictions[x].bbox[3]}px;`;
	
				event.target.parentNode.appendChild(innerSquare);
				event.target.parentNode.appendChild(p);
			}

			if (predictions.length === 0) {
				const $nothing = document.querySelector(`.nothing`)
				$nothing.textContent = `There is no object detected`
				$nothing.style.color = `#EF9E00`;
			}
		});
	}

	init();
}