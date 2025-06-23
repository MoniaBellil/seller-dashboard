#  Technical Decisions – Seller Dashboard Platform

---

##  Q1: Scalability & Performance

### /products/search
- **Indexation** des champs `name`, `tags`, `category` en base (MongoDB text index)
-  Utilisation de la pagination (`limit` + `skip`) pour ne pas charger tout d’un coup
-  Moteur de recherche full-text avec `MongoDB Atlas Search` ou `Elasticsearch` pour recherche rapide
-  Cache de requêtes fréquentes avec Redis ou un CDN (si lecture intensive)

### /products/trending
-  Calcul des produits "trending" basé sur les **vues + commandes récentes**
- Stockage des vues en cache Redis avec TTL (rapide et léger)
- Mise à jour du classement toutes les X minutes (cron job)
- Pré-calcul en batch des tendances dans une table secondaire pour éviter du calcul live

---

##  Q2: Security

###  Protection du refresh token
- Le `refreshToken` :
  -  n’est **jamais stocké en localStorage**, mais en **HttpOnly Cookie**
  - est signé avec une **clé différente** de l'access token
  - a une durée de vie plus longue mais est révoqué côté serveur lors du logout
- Une route `/auth/refresh` vérifie :
  - Token valide
  - Existence en base ou en cache
  - Rotation du token à chaque utilisation

### 🛡 Sécurité des uploads
-  Validation de la **taille et type MIME** (ex: `.jpg`, `.png`, `.glb`, etc.)
-  Scan antivirus (optionnel : via service type ClamAV)
-  Stockage sur un service **cloud sécurisé** (ex: Cloudinary) avec URL signée
-  Suppression automatique si l’image n’est pas rattachée à un produit après X minutes

---

##  Q3: Internationalization (i18n)

-  Le schéma produit utilise des champs multilingues :
  ```json
  {
    "name": {
      "en": "T-shirt",
      "fr": "T-shirt",
      "de": "T-Shirt"
    },
    "description": {
      "en": "...",
      "fr": "...",
      "de": "..."
    }
  }

