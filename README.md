# e-commerce

Aplicación de ejemplo para comercio electrónico con backend en Django y frontend en React.

## Requisitos

- Python 3.10+
- Node.js 18+
- npm
- pip

## Backend

### Variables de entorno
- `SECRET_KEY`: clave secreta para Django. Obligatoria en producción.
- `DEBUG`: `1` para modo desarrollo, `0` para producción.

### Pasos de desarrollo
1. `cd backend`
2. `python -m venv venv`
3. `source venv/bin/activate`  *(Windows: `venv\\Scripts\\activate`)*
4. `pip install -r requirements.txt`
5. `python manage.py migrate`
6. `python manage.py runserver`

### Comandos útiles
- `python manage.py test`

## Frontend

### Variables de entorno
- Crear un archivo `.env` en `frontend/` y definir variables `REACT_APP_*`, por ejemplo `REACT_APP_API_URL` para la URL del backend.

### Pasos de desarrollo
1. `cd frontend`
2. `npm install`
3. `npm start`

### Comandos útiles
- `npm test`

## Pruebas

### Backend
1. `cd backend`
2. `python manage.py test`

### Frontend
1. `cd frontend`
2. `npm test`

