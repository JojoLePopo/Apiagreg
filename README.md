# api_web_services

Instructions rapides

1. Créez un fichier `.env` à la racine du projet (le fichier est ignoré par Git).

2. Ajoutez la clé API Randommer dans `.env` :

RANDOMMER_API_KEY=your_api_key_here

3. Installer les dépendances si vous souhaitez utiliser `dotenv` :

```powershell
npm install dotenv
```

4. Lancer le script :

```powershell
node api_web_services/main.js
```

Remarques
- Le script accepte aussi la variable d'environnement `RANDOMMER_API_KEY` si vous ne voulez pas utiliser un fichier `.env`.
- Ne commitez jamais votre clé API dans le dépôt.
