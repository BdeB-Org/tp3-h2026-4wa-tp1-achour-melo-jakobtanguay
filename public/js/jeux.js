//Fait par Léane
requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyJeux');
const message = document.getElementById('message');

function showMessage(text, isError = false) {
    message.innerHTML = `<div class="message ${isError ? 'error' : ''}">${text}</div>`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

async function chargerJeux() {
    try {
        const res = await apiFetch('/api/jeuxvideo');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(jeu => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${jeu.jeu_id}</td>
                <td>${escapeHtml(jeu.titre)}</td>
                <td>
                    <a class="btn-link" href="/editJeux.html?id=${jeu.jeu_id}">Modifier</a>
                    <button class="danger" onclick="supprimerJeu(${jeu.jeu_id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

// Référence au bouton Ajouter
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log("Envoyé");

    const titre = document.getElementById('titre').value.trim();
    //const id = document.getElementById('jeu_id').value.trim();

    try {
        const res = await apiFetch('/api/jeuxvideo', {
            method: 'POST',
            body: JSON.stringify({ titre, /*jeu_id: id */})
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Jeu ajouté avec succès');
        chargerJeux();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerJeu(id) {
    if (!confirm('Voulez-vous supprimer ce jeu ?')) return;

    try {
        const res = await apiFetch('/api/jeuxvideo/' + id, {
            method: 'DELETE'
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerJeux();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerJeux();
