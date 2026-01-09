# Workout Tracker API

Een RESTful API voor het beheren van workouts en oefeningen, gebouwd met Node.js, Express en MySQL.

## Inhoudsopgave

- [Overzicht](#overzicht)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installatie](#installatie)
- [Database Setup](#database-setup)
- [Gebruik](#gebruik)
- [API Endpoints](#api-endpoints)
- [Project Structuur](#project-structuur)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Bronvermelding](#bronvermelding)
- [Code Kwaliteit & Security](#code-kwaliteit--security)

## Overzicht

Deze API stelt gebruikers in staat om workouts en oefeningen te beheren. Je kunt nieuwe workouts toevoegen, bestaande workouts bijwerken, oefeningen aan workouts koppelen, zoeken en pagineren door resultaten.

## Features

- ✅ **CRUD operaties** voor workouts en exercises
- ✅ **Validatie middleware** voor input validatie
- ✅ **Paginatie** voor grote datasets
- ✅ **Zoekfunctionaliteit** voor workouts en exercises
- ✅ **Relaties** tussen workouts en exercises (ONE-TO-MANY)
- ✅ **Error handling** met duidelijke foutmeldingen
- ✅ **HTML API documentatie** op root endpoint
- ✅ **CORS** support
- ✅ **Environment variables** voor configuratie
- ✅ **Statistics Dashboard** met gedetailleerde trainingsstatistieken
- ✅ **Notes/Comments** voor workouts en exercises

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Environment:** dotenv
- **Dev Tools:** Nodemon

## Installatie

### 1. Clone de repository

```bash
git clone <repository-url>
cd Project2
```

### 2. Installeer dependencies

```bash
npm install
```

### 3. Configureer environment variables

Kopieer `.env.example` naar `.env`:

```bash
cp .env.example .env
```

Pas de waarden aan in `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=jouw_wachtwoord
DB_NAME=workouts_db
DB_PORT=3306
PORT=3000
```

## Database Setup

### 1. Maak de database aan

Open phpMyAdmin of MySQL Workbench en maak een nieuwe database aan:

```sql
CREATE DATABASE workouts_db;
```

### 2. Importeer het schema

Importeer het bestand `database/schema.sql` in phpMyAdmin of via de command line:

```bash
mysql -u root -p workouts_db < database/schema.sql
```

### 3. Voer de migrations uit

**BELANGRIJK:** Na het importeren van het schema, moet je de notes migration uitvoeren:

```bash
mysql -u root -p workouts_db < database/migrations_notes.sql
```

Dit voegt de `notes` kolommen toe aan de workouts en exercises tabellen.

### 4. Tabellen overzicht

De database bevat nu:
- **workouts** - Workouts met naam, datum, duur, type en notes
- **exercises** - Oefeningen met workout_id, naam, muscle_group, sets, reps, weight en notes
- Foreign key constraints met CASCADE DELETE
- Indexes voor betere performance (date, type, workout_id, muscle_group)
- Sample data voor testing

## Gebruik

### Development Mode

Start de server met hot-reloading:

```bash
npm run dev
```

### Production Mode

Start de server zonder hot-reloading:

```bash
npm start
```

De server draait standaard op `http://localhost:3000`

### API Documentatie

Bezoek `http://localhost:3000` in je browser voor de volledige HTML API documentatie.

## API Endpoints

### Workouts

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| `GET` | `/api/workouts` | Haal alle workouts op |
| `GET` | `/api/workouts?limit=10&offset=0` | Workouts met paginatie |
| `GET` | `/api/workouts/search?name=cardio` | Zoek workouts |
| `GET` | `/api/workouts/:id` | Haal specifieke workout op |
| `POST` | `/api/workouts` | Maak nieuwe workout aan |
| `PUT` | `/api/workouts/:id` | Update workout |
| `DELETE` | `/api/workouts/:id` | Verwijder workout |

### Exercises

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| `GET` | `/api/exercises` | Haal alle exercises op |
| `GET` | `/api/exercises?limit=10&offset=0` | Exercises met paginatie |
| `GET` | `/api/exercises/search?name=chest` | Zoek exercises |
| `GET` | `/api/exercises/workout/:workoutId` | Exercises van een workout |
| `GET` | `/api/exercises/:id` | Haal specifieke exercise op |
| `POST` | `/api/exercises` | Maak nieuwe exercise aan |
| `PUT` | `/api/exercises/:id` | Update exercise |
| `DELETE` | `/api/exercises/:id` | Verwijder exercise |

### Statistics

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| `GET` | `/api/statistics` | Haal alle statistieken op (workouts + exercises) |
| `GET` | `/api/statistics/workouts` | Haal alleen workout statistieken op |
| `GET` | `/api/statistics/exercises` | Haal alleen exercise statistieken op |

### Request/Response Voorbeelden

#### POST /api/workouts

**Request Body:**
```json
{
  "name": "Morning Cardio",
  "date": "2025-12-12",
  "duration": 30,
  "type": "cardio"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Workout created successfully",
  "data": {
    "id": 1,
    "name": "Morning Cardio",
    "date": "2025-12-12",
    "duration": 30,
    "type": "cardio"
  }
}
```

#### POST /api/exercises

**Request Body:**
```json
{
  "workout_id": 1,
  "name": "Bench Press",
  "muscle_group": "chest",
  "sets": 4,
  "reps": 8,
  "weight": 80.00
}
```

**Response:**
```json
{
  "success": true,
  "message": "Exercise created successfully",
  "data": {
    "id": 1,
    "workout_id": 1,
    "name": "Bench Press",
    "muscle_group": "chest",
    "sets": 4,
    "reps": 8,
    "weight": 80.00
  }
}
```

## Project Structuur

```
Project2/
│
├── database/
│   ├── schema.sql               # Database schema en sample data
│   └── migrations_notes.sql     # Migration voor notes kolommen
│
├── public/
│   └── index.html               # HTML API documentatie
│
├── src/
│   ├── config/
│   │   └── database.js              # Database connectie configuratie
│   │
│   ├── controllers/
│   │   ├── workoutController.js     # Workout business logic
│   │   ├── exerciseController.js    # Exercise business logic
│   │   └── statisticsController.js  # Statistics aggregation logic
│   │
│   ├── models/
│   │   ├── Workout.js               # Workout database queries
│   │   ├── Exercise.js              # Exercise database queries
│   │   └── Statistics.js            # Statistics queries
│   │
│   ├── routes/
│   │   ├── workoutRoutes.js         # Workout API routes
│   │   ├── exerciseRoutes.js        # Exercise API routes
│   │   └── statisticsRoutes.js      # Statistics API routes
│   │
│   └── middleware/
│       └── validation.js            # Input validatie middleware
│
├── .env                        # Environment variables (niet in git)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore bestand
├── package.json                # NPM dependencies en scripts
├── server.js                   # Main server file
└── README.md                   # Deze file
```

## Environment Variables

| Variabele | Beschrijving | Default |
|-----------|--------------|---------|
| `DB_HOST` | MySQL host address | `localhost` |
| `DB_USER` | MySQL gebruikersnaam | `root` |
| `DB_PASSWORD` | MySQL wachtwoord | `` |
| `DB_NAME` | Naam van de database | `workouts_db` |
| `DB_PORT` | MySQL poort | `3306` |
| `PORT` | Server poort | `3000` |
| `NODE_ENV` | Environment mode (development/production) | `development` |

## Validatie

De API valideert alle input met de volgende regels:

### Workout Validatie
- **name**: Required, string, minimaal 2 karakters
- **date**: Required, geldig datum formaat (YYYY-MM-DD)
- **duration**: Required, positief getal (minuten)
- **type**: Required, enum: `cardio`, `strength`, `flexibility`, `sports`, `mixed`

### Exercise Validatie
- **workout_id**: Required, positief getal
- **name**: Required, string, minimaal 2 karakters
- **muscle_group**: Required, enum: `chest`, `back`, `legs`, `shoulders`, `arms`, `core`, `full_body`
- **sets**: Required, positief getal
- **reps**: Required, positief getal
- **weight**: Optional, getal (kan null zijn)

## Error Handling

De API retourneert JSON errors met de volgende structuur:

**Validatie Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required",
    "Duration must be a positive number"
  ]
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Workout not found"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Error fetching workouts",
  "error": "Detailed error message"
}
```

## Testing

Test de API met tools zoals:
- **Postman** - Import de endpoints en test alle routes
- **Thunder Client** (VS Code extension)
- **cURL** - Command line testing

### cURL Voorbeelden

```bash
# Haal alle workouts op
curl http://localhost:3000/api/workouts

# Maak nieuwe workout aan
curl -X POST http://localhost:3000/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Evening Run",
    "date": "2025-12-12",
    "duration": 45,
    "type": "cardio"
  }'

# Zoek workouts
curl "http://localhost:3000/api/workouts/search?name=cardio"

# Paginatie
curl "http://localhost:3000/api/workouts?limit=5&offset=0"
```

## Bronvermelding

- [Express.js Documentation](https://expressjs.com/) - Web framework
- [MySQL2 NPM Package](https://www.npmjs.com/package/mysql2) - MySQL client
- [dotenv Documentation](https://www.npmjs.com/package/dotenv) - Environment variables
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices) - Code structuur
- [RESTful API Design](https://restfulapi.net/) - API design principles

## Code Kwaliteit & Security

### Code Kwaliteit ✅

Het project volgt goede coding practices:
- **Gelaagde architectuur** - Controllers, Models, Routes, Middleware zijn gescheiden
- **ES6 Modules** - Moderne import/export syntax
- **Async/await** - Proper asynchrone code handling
- **Error handling** - Try-catch blokken in alle controllers + global error handler
- **Input validatie** - Dedicated validation middleware voor alle inputs
- **SQL Injection bescherming** - Prepared statements overal gebruikt
- **Connection pooling** - Efficiënt database connection management
- **Graceful shutdown** - SIGTERM en SIGINT handlers voor clean shutdown

### Database Design ✅

- Foreign keys met CASCADE DELETE
- Indexes op vaak gebruikte kolommen (date, type, workout_id, muscle_group)
- ENUM types voor validation op database niveau
- Timestamps voor auditing (created_at, updated_at)

### Security Overwegingen ⚠️

**Let op:** Deze API is bedoeld voor educatieve doeleinden. Voor productie gebruik zijn de volgende beveiligingsmaatregelen nodig:

1. **Authenticatie & Autorisatie** - Momenteel ontbreekt gebruikersauthenticatie volledig
2. **CORS configuratie** - CORS is volledig open, alle origins zijn toegestaan
3. **Rate limiting** - Geen bescherming tegen brute force of DDoS aanvallen
4. **Input sanitization** - Basis validatie aanwezig, maar kan uitgebreid worden
5. **HTTPS** - Gebruik HTTPS in productie (niet in deze setup)
6. **Error messages** - Error details worden naar client gestuurd in development mode
7. **Environment secrets** - Zorg dat `.env` NOOIT in git staat (.gitignore is geconfigureerd)

### Aanbevelingen voor Productie

Voordat je deze API in productie gebruikt, overweeg het volgende toe te voegen:

- **Authentication** - JWT tokens of session-based auth
- **Authorization** - Role-based access control (RBAC)
- **Rate limiting** - Express-rate-limit package
- **Helmet.js** - Security headers
- **HTTPS** - SSL/TLS certificaten
- **Logging** - Winston of Bunyan voor structured logging
- **Monitoring** - Health check endpoints
- **Testing** - Unit tests, integration tests
- **API versioning** - /api/v1/workouts voor backwards compatibility
- **Request validation** - Joi of Yup voor uitgebreidere validatie
- **CORS whitelist** - Specifieke origins toestaan

## Licentie

Dit project is gemaakt voor educatieve doeleinden.

## Contact

Voor vragen of suggesties, neem contact op via [je email/GitHub].

---

**Gemaakt met Node.js, Express & MySQL**
