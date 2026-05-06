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
        const res = await apiFetch('/api/jeux');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(jeu => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${jeu.id}</td>
                <td>${escapeHtml(jeu.nom)}</td>
                <td>
                    <a class="btn-link" href="/edit.html?id=${jeu.id}">Modifier</a>
                    <button class="danger" onclick="supprimerJeu(${jeu.id})">Supprimer</button>
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

    const nom = document.getElementById('nom').value.trim();
    const id = document.getElementById('ID').value.trim();
    // const programme = document.getElementById('motDePasse').value.trim();

    try {
        const res = await apiFetch('/api/jeux', {
            method: 'POST',
            body: JSON.stringify({ nom, id /*programme*/ })
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
        const res = await apiFetch('/api/jeux/' + id, {
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
