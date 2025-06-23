
---

### 📄 .env.example (tu peux faire 2 fichiers : un pour `backend/`, un pour `frontend/`)

---

### 📄 technical_decisions.md

Un exemple rapide de structure :

```md
# Technical Decisions

## 1. Stack technique

- Backend : NestJS, MongoDB, Swagger
- Frontend : React.js (JSX), Axios, Tailwind CSS
- Authentification : JWT (access + refresh tokens)
- Media : images + 3D support via URL

## 2. Architecture

- Architecture RESTful
- Séparation des modules par entité : auth, products, stock, media
- Découpage en dossiers : services, contrôleurs, DTOs, schémas

## 3. Sécurité

- Protection des routes via JWT (`@UseGuards(AuthGuard('jwt'))`)
- Hashage des mots de passe avec bcrypt
- Swagger avec `@ApiBearerAuth()` pour les routes protégées

## 4. Tests / Documentation

- Swagger généré automatiquement (`/api`)
- Postman Collection complète : `postman_collection.json`
- Validation via `class-validator` et `ValidationPipe`
