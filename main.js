import './style.css';

const form = document.querySelector('form');

const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay * 1000));

form.addEventListener('submit', async (e) => {
    enterLoadState();
    e.preventDefault();
    const data = new FormData(form);

    const response = await fetch('http://localhost:8080/dream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt'),
        }),
    });

    
    if (response.ok) {
        const { image } = await response.json();

        const result = document.querySelector('#result');
        result.innerHTML = `<img src="${image}" width="512" />`;
    } else {
        const err = await response.text();
        alert(err);
        console.error(err);
    }

    exitLoadState();
});

function enterLoadState() {
    const button = document.querySelector('button');
    button.disabled = true;
    button.innerHTML = 'Generating image... <span class="spinner">🌟</span>';

    const placeholder = document.querySelector('#overlay');
    placeholder.style.display = '';
    placeholder.innerHTML = '<video height="240"autoplay loop muted>Loading..<source src="media/dope_animation.mp4" type="video/mp4"></video>';
};

async function exitLoadState() {
    await sleep(3); // Buffer for seemless transition
    const button = document.querySelector('button');
    button.disabled = false;
    button.innerHTML = 'GENERATE';

    const placeholder = document.querySelector('#overlay');

    placeholder.style.display = 'none';
};

