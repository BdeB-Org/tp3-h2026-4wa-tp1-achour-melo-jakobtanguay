requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyUtilisateurs');
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
                <td>${escapeHtml(utilisateur.programme)}</td>
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

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('nom').value.trim();
    const programme = document.getElementById('motDePasse').value.trim();

    try {
        const res = await apiFetch('/api/utilisateurs', {
            method: 'POST',
            body: JSON.stringify({ nom, programme })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Utilisateur ajouté avec succès');
        chargerUtilisateurs();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerUtilisateur(id) {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;

    try {
        const res = await apiFetch('/api/utilisateurs/' + id, {
            method: 'DELETE'
        });

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
