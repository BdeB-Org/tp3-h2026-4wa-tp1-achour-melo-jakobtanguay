//Page faite par Isabelle JT//
requireAuth();

const form = document.getElementById('formAjout');
const tbody = document.getElementById('tbodyCritiques');
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

                <td>${critique.critique_id}</td>
                <td>${escapeHtml(critique.date || '')}</td>
                <td>${escapeHtml(critique.utilisateur_id || '')}</td>
                <td>${escapeHtml(critique.jeu_id || '')}</td>
                <td>${escapeHtml(critique.message || '')}</td>
                <td>${escapeHtml(critique.note || '')}</td>
                <td>
                    <button class="danger" onclick="supprimerCritique('${critique.critique_id || critique_id || ''}')">Supprimer</button>
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

    const message = document.getElementById('message').value.trim();
    const note = document.getElementById('note').value.trim();
    const jeuId = document.getElementById('jeu_id').value.trim();
    const UtilisateurID = document.getElementById('utilisateur_id').value.trim();
    const date = new Date().toISOString();

    try {
        const res = await apiFetch('/api/critiques', {
            method: 'POST',
            body: JSON.stringify({ message, note, jeu_id: jeuId, utilisateur_id: UtilisateurID, date: date })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erreur lors de l\'ajout');
        }

        form.reset();
        showMessage('Critique ajoutée avec succès');
        chargerCritiques();
    } catch (err) {
        showMessage(err.message, true);
    }
});

async function supprimerCritique(id) {
    if (!confirm('Voulez-vous vraiment supprimer cette critique ?')) return;

    try {
        const res = await apiFetch('/api/critiques/' + id, {
            method: 'DELETE'
        });

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
