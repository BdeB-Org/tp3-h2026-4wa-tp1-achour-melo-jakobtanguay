/*Fait par Léane*/
requireAuth();

const tbody = document.getElementById('tbodyListeUtilisateurs');
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

async function chargerUtilisateurs() {
    try {
        const res = await apiFetch('/api/utilisateurs');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(utilisateur => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${utilisateur.id}</td>
                <td>${escapeHtml(utilisateur.nom)}</td>
                <td>
                    <a class="btn-link" href="/edit.html?id=${utilisateur.id}">Modifier</a>
                    <button class="danger" onclick="supprimerUtilisateur(${utilisateur.id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerUtilisateur(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;

    try {
        const res = await apiFetch('/api/utilisateurs/' + id, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerUtilisateurs();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerUtilisateurs();

