//Fait par Isabelle JT//
requireAuth();

const form = document.getElementById('formEdit');
const status = document.getElementById('status');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function showMessage(text, isError = false) {
    status.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

async function chargerCritiques() {
    try {
        const res = await apiFetch('/api/critiques/' + id);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors du chargement');
        }

        document.getElementById('message').value = data.message;
        document.getElementById('note').value = data.note;
        document.getElementById('jeu_id').value = data.jeu_id;
        document.getElementById('utilisateur_id').value = data.utilisateur_id;
        document.getElementById('critique_id').value = data.critique_id;
        document.getElementById('date').value = data.date;
    } catch (err) {
        showMessage(err.message, true);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = document.getElementById('message').value.trim();
    const note = document.getElementById('note').value;
    const jeu_id = document.getElementById('jeu_id').value;
    const utilisateur_id = document.getElementById('utilisateur_id').value;
    const critique_id = document.getElementById('critique_id').value;
    const date = document.getElementById('date').value;

    try {
        const res = await apiFetch('/api/critiques/' + id, {
            method: 'PUT',
            body: JSON.stringify({ message, note, jeu_id, utilisateur_id, critique_id, date})
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la modification');
        }

        showMessage(data.message);
        setTimeout(() => {
            window.location.href = '/listeCritiques.html';
        }, 800);
    } catch (err) {
        showMessage(err.message, true);
    }
});

if (!id) {
    showMessage('ID critique manquant', true);
} else {
    chargerCritiques();
}
