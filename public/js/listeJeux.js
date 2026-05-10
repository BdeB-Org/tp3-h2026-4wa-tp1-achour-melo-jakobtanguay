/*Fait par Léane*/
requireAuth();

/*Conteneur où les données de la table sont affichées*/
const tbody = document.getElementById('tbodyListe');
const message = document.getElementById('message');

/*Message d'erreur*/
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

/*Fonction pour afficher le tableau de la table sur les jeux vidéo*/
async function chargerJeux() {
    try {
        const res = await apiFetch('/api/jeuxvideo');
        const data = await res.json();

        tbody.innerHTML = '';
        /*Affichage de l'id et du titre du jeu*/
        data.forEach(jeux => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${jeux.jeu_id}</td>
                <td>${escapeHtml(jeux.titre)}</td>
                <td>
                    <a class="btn-link" href="/editJeux.html?id=${jeux.jeu_id}">Modifier</a>
                    <button class="danger" onclick="supprimerJeu(${jeux.jeu_id})">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        showMessage(err.message, true);
    }
}

/*Fonctione pour supprimer un jeu vidéo de la base de données*/
async function supprimerJeu(id) {
    if (!confirm('Voulez-vous vraiment supprimer ce jeu ?')) return;

    /*Suppression d'un jeu avec la méthode DELETE*/
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
