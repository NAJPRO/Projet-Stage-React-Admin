import jsonServer from 'json-server';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

console.log('Starting JSON server...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(`${__dirname}/db.json`);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware pour ajouter les en-têtes CORS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Content-Type', 'application/json');  // Ajout de l'en-tête Content-Type
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    next();
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'PATCH') {
        console.log('Requête PATCH reçue:', req.body);
    }
    next();
});


server.use((req, res, next) => {
    const originalSend = res.send;
    res.send = (body) => {
        console.log('Réponse envoyée:', body);  // Affiche la réponse
        originalSend.call(res, body);
    };
    next();
});


// Middleware pour compter le total
server.use((req, res, next) => {
    if (req.method === 'GET' && req.url.startsWith('/users')) {
        console.log('Counting users...');
        const totalCount = router.db.get('users').size();
        res.set('X-Total-Count', totalCount);
    }
    if (req.method === 'GET' && req.url.startsWith('/posts')) {
        console.log('Counting posts...');
        const totalCount = router.db.get('posts').size();
        res.set('X-Total-Count', totalCount);
    }
    next();
});

server.use(router);

server.listen(3001, () => {
    console.log('JSON Server is running on http://localhost:3001');
});