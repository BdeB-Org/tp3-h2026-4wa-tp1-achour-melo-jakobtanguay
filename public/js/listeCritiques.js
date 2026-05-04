requireAuth();

const tbody = document.getElementById('tbodyListeCritiques');
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

async function chargerCritiques() {
    try {
        const res = await apiFetch('/api/critiques');
        const data = await res.json();

        tbody.innerHTML = '';

        data.forEach(critique => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${critique.id}</td>
                <td>${escapeHtml(critique.date)}</td>
                <td>${escapeHtml(critique.utilisateur_id)}</td>
                <td>${escapeHtml(critique.jeu_id)}</td>
                <td>${escapeHtml(critique.message)}</td>
                <td>${escapeHtml(critique.note)}</td>
                <td>
                    <a class="btn-link" href="/edit.html?id=${critique.id}">Modifier</a>
                    <button class="danger" onclick="supprimerCritique(${critique.id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

async function supprimerCritique(id) {
    if (!confirm('Voulez-vous vraiment supprimer cette critique ?')) return;

    try {
        const res = await apiFetch('/api/critiques/' + id, { method: 'DELETE' });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de la suppression');
        }

        showMessage(data.message);
        chargerCritiques();
    } catch (err) {
        showMessage(err.message, true);
    }
}

chargerCritiques();
