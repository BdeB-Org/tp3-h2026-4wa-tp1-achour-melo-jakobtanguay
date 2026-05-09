/*Fait par Léane*/
requireAuth();

const tbody = document.getElementById('tbodyListe');
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

        data.forEach(jeux => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${jeux.id}</td>
                <td>${escapeHtml(jeux.nom)}</td>
                <td>
                    <a class="btn-link" href="/editJeux.html?id=${jeux.id}">Modifier</a>
                    <button class="danger" onclick="supprimerJeu(${jeux.id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerJeu(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce jeu ?')) return;

    try {
        const res = await apiFetch('/api/jeuxvideo/' + id, { method: 'DELETE' });
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
