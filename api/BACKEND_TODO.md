# Backend TODO за ТЗ

Цей файл - робочий чекліст для backend-частини E-Pharmacy. Відмічай пункти по черзі: `[ ]` -> `[x]`.

## 0. Поточний стан

- [x] Створено окрему папку `api`
- [x] Налаштовано `package.json` для backend
- [x] Додано Express server
- [x] Додано `express.json()`
- [x] Додано CORS
- [x] Додано логування через `pino-http`
- [x] Додано `.env.example`
- [x] Додано helper для env-змінних
- [x] Додано підключення до MongoDB через Mongoose
- [x] Додано базову структуру `routes/controllers/services`
- [x] Додано `ctrlWrapper` для async controllers
- [x] Додано 404 для невідомих роутів
- [x] Додано global error handler
- [x] Додано `Product` model
- [x] Додано `GET /api/shop/:shopId/product`
- [x] Додано `GET /api/shop/:shopId/product/:productId`
- [x] Додано 400 для невалідного `productId`
- [x] Додано 404 для випадку, коли продукт не знайдено

## 1. Довести базову API-архітектуру до чистого стану

- [x] Виправити ESLint-помилку з `next` у global error handler
- [x] Створити `utils/create-http-error.js`
- [x] Замінити ручне створення помилок на `createHttpError(status, message)`
- [x] Перевірити, що всі error responses повертаються у JSON
- [x] Перевірити всі базові статуси:
  - [x] `200 OK`
  - [x] `201 Created`
  - [x] `400 Bad Request`
  - [ ] `401 Unauthorized`
  - [ ] `403 Forbidden`
  - [x] `404 Not Found`
  - [ ] `409 Conflict`
  - [x] `500 Internal Server Error`
- [x] Перевірити, що `npm run lint` проходить без помилок

## 2. Валідація вхідних даних

- [ ] Вибрати бібліотеку для валідації: `zod` або `joi`
- [ ] Додати middleware `validateBody`
- [ ] Додати middleware `validateParams`
- [ ] Додати middleware `validateQuery`
- [ ] Валідувати `shopId`
- [ ] Валідувати `productId`
- [ ] Валідувати body при створенні продукту
- [ ] Валідувати body при редагуванні продукту
- [ ] Валідувати body при реєстрації користувача
- [ ] Валідувати body при логіні користувача
- [ ] Повертати `400 Bad Request` при помилках валідації

## 3. Моделі бази даних

### User

- [ ] Створити `User` model
- [ ] Додати поле `name`
- [ ] Додати поле `email`
- [ ] Додати поле `phone`
- [ ] Додати поле `password`
- [ ] Додати унікальність для `email`
- [ ] Зберігати тільки hash пароля
- [ ] Не повертати password/hash у відповідях API

### Shop

- [ ] Створити `Shop` model
- [ ] Додати назву магазину
- [ ] Додати ім'я власника
- [ ] Додати email магазину/власника
- [ ] Додати logo/avatar магазину, якщо потрібно за фронтом
- [ ] Додати зв'язок з власником магазину через `owner`

### Product

- [x] Створити `Product` model
- [ ] Додати `shopId` або інший зв'язок продукту з магазином
- [ ] Перевести `price` з `String` у `Number`
- [ ] Перевести `stock` з `String` у `Number`
- [ ] Додати `min: 0` для `price`
- [ ] Додати `min: 0` для `stock`
- [ ] Вирішити, чи потрібне кастомне поле `id`, якщо вже є MongoDB `_id`
- [ ] Перевірити enum для `category`
- [ ] Перевірити enum для `suppliers`

## 4. Auth: реєстрація, логін, токен

### POST `/api/user/register`

- [ ] Створити `routes/user.js`
- [ ] Створити `controllers/user.js`
- [ ] Створити `services/user.js`
- [ ] Додати endpoint `POST /api/user/register`
- [ ] Перевіряти формат email
- [ ] Перевіряти унікальність email у базі
- [ ] Перевіряти password за правилами безпеки
- [ ] Перевіряти name
- [ ] Перевіряти phone
- [ ] Хешувати password через `bcrypt`
- [ ] Створювати користувача в базі
- [ ] Повертати `201 Created`
- [ ] Повертати `409 Conflict`, якщо email вже існує

### POST `/api/user/login`

- [ ] Додати endpoint `POST /api/user/login`
- [ ] Перевіряти email/password
- [ ] Шукати користувача за email
- [ ] Порівнювати password з hash через `bcrypt.compare`
- [ ] Генерувати JWT access token
- [ ] Додати `JWT_SECRET` в `.env.example`
- [ ] Повертати token клієнту
- [ ] Повертати `401 Unauthorized`, якщо email або password неправильні

### Auth middleware

- [ ] Створити middleware `authenticate`
- [ ] Зчитувати `Authorization: Bearer <token>`
- [ ] Перевіряти JWT signature
- [ ] Діставати user id з token
- [ ] Знаходити користувача в базі
- [ ] Додавати `req.user`
- [ ] Повертати `401 Unauthorized`, якщо token відсутній
- [ ] Повертати `401 Unauthorized`, якщо token невалідний

### GET `/api/user/logout`

- [ ] Додати приватний endpoint `GET /api/user/logout`
- [ ] Визначити стратегію logout: stateless JWT або token blacklist/session
- [ ] Повернути успішну відповідь клієнту

### GET `/api/user/user-info`

- [ ] Додати приватний endpoint `GET /api/user/user-info`
- [ ] Повернути name користувача
- [ ] Повернути email користувача
- [ ] Не повертати password/hash/token secrets

## 5. Shop endpoints

### POST `/api/shop/create`

- [ ] Додати `routes/shop.js`
- [ ] Додати `controllers/shop.js`
- [ ] Додати `services/shop.js`
- [ ] Захистити endpoint через `authenticate`
- [ ] Валідувати body
- [ ] Створити магазин у базі
- [ ] Прив'язати магазин до `req.user`
- [ ] Повернути `201 Created`

### GET `/api/shop/:shopId`

- [ ] Захистити endpoint через `authenticate`
- [ ] Валідувати `shopId`
- [ ] Знайти магазин за id
- [ ] Перевірити, що користувач має доступ до магазину
- [ ] Повернути `404`, якщо магазин не знайдено
- [ ] Повернути дані магазину

### PUT `/api/shop/:shopId/update`

- [ ] Захистити endpoint через `authenticate`
- [ ] Валідувати `shopId`
- [ ] Валідувати body
- [ ] Перевірити права користувача на редагування
- [ ] Оновити магазин
- [ ] Повернути оновлений магазин

## 6. Product endpoints

### GET `/api/shop/:shopId/product`

- [x] Endpoint створено
- [ ] Захистити endpoint через `authenticate`
- [ ] Валідувати `shopId`
- [ ] Перевірити, що магазин існує
- [ ] Фільтрувати продукти по `shopId`
- [ ] Додати пагінацію `page`/`limit`
- [ ] Додати фільтр по category, якщо потрібно фронту
- [ ] Додати пошук по name, якщо потрібно фронту
- [ ] Повернути список продуктів

### POST `/api/shop/:shopId/product/add`

- [ ] Додати endpoint
- [ ] Захистити endpoint через `authenticate`
- [ ] Валідувати `shopId`
- [ ] Валідувати body продукту
- [ ] Створити продукт у базі
- [ ] Прив'язати продукт до магазину
- [ ] Повернути `201 Created`

### GET `/api/shop/:shopId/product/:productId`

- [x] Endpoint створено
- [x] Валідація невалідного `productId` -> `400`
- [x] Неіснуючий продукт -> `404`
- [ ] Захистити endpoint через `authenticate`
- [ ] Валідувати `shopId`
- [ ] Перевірити, що продукт належить потрібному магазину
- [ ] Повернути деталі продукту

### PUT `/api/shop/:shopId/product/:productId/edit`

- [ ] Додати endpoint
- [ ] Захистити endpoint через `authenticate`
- [ ] Валідувати `shopId`
- [ ] Валідувати `productId`
- [ ] Валідувати body
- [ ] Перевірити, що продукт належить потрібному магазину
- [ ] Оновити продукт
- [ ] Повернути оновлений продукт

### DELETE `/api/shop/:shopId/product/:productId/delete`

- [ ] Додати endpoint
- [ ] Захистити endpoint через `authenticate`
- [ ] Валідувати `shopId`
- [ ] Валідувати `productId`
- [ ] Перевірити, що продукт належить потрібному магазину
- [ ] Видалити продукт
- [ ] Повернути `204 No Content` або JSON з повідомленням

## 7. Statistics endpoints

### GET `/api/statistics`

- [ ] Додати `routes/statistics.js`
- [ ] Додати `controllers/statistics.js`
- [ ] Додати `services/statistics.js`
- [ ] Захистити endpoint через `authenticate`
- [ ] Визначити, які саме дані потрібні фронту
- [ ] Повернути ключові показники магазину
- [ ] Повернути останніх клієнтів, якщо є така колекція
- [ ] Повернути доходи/витрати, якщо є така модель даних

### GET `/api/statistics/:clientId/goods`

- [ ] Додати endpoint
- [ ] Захистити endpoint через `authenticate`
- [ ] Валідувати `clientId`
- [ ] Визначити модель клієнтів/покупок
- [ ] Повернути покупки конкретного клієнта

## 8. Безпека

- [ ] Додати `helmet`
- [ ] Обмежити CORS до домену фронтенду
- [ ] Додати rate limit для auth endpoints
- [ ] Переконатися, що `.env` не потрапляє в git
- [ ] Не показувати stack trace клієнту
- [ ] Не показувати внутрішні повідомлення помилок для `500`
- [ ] Перевірити, що password/hash не повертається в response

## 9. Перевірка через Postman

- [ ] Створити Postman collection для API
- [ ] Перевірити `GET /api`
- [ ] Перевірити 404 для неправильного route
- [ ] Перевірити `GET /api/shop/:shopId/product`
- [ ] Перевірити `GET /api/shop/:shopId/product/:productId`
- [ ] Перевірити 400 для неправильного `productId`
- [ ] Перевірити 404 для неіснуючого продукту
- [ ] Перевірити register
- [ ] Перевірити login
- [ ] Перевірити приватні endpoints без token -> `401`
- [ ] Перевірити приватні endpoints з token -> success

## 10. Мінімальні тести

- [ ] Додати test runner: `vitest` або `jest`
- [ ] Додати `supertest`
- [ ] Створити окрему test database
- [ ] Написати тест для 404 route
- [ ] Написати тест для invalid product id -> 400
- [ ] Написати тест для missing product -> 404
- [ ] Написати тест для register success
- [ ] Написати тест для duplicate email -> 409
- [ ] Написати тест для login success
- [ ] Написати тест для private route without token -> 401

## 11. Deploy

- [ ] Підготувати production env-змінні
- [ ] Перевірити `start` script
- [ ] Перевірити, що app слухає `process.env.PORT`
- [ ] Створити MongoDB Atlas database для production
- [ ] Задеплоїти backend на Render або аналог
- [ ] Додати production backend URL у frontend env
- [ ] Перевірити API після deploy через Postman

## Рекомендований порядок роботи

1. Довести error handling і lint до чистого стану.
2. Додати `createHttpError`.
3. Додати валідацію через `zod` або `joi`.
4. Доробити Product CRUD.
5. Додати User model.
6. Додати register/login/JWT.
7. Додати `authenticate` middleware.
8. Захистити приватні routes.
9. Додати Shop CRUD.
10. Додати Statistics endpoints.
11. Додати мінімальні API-тести.
12. Задеплоїти backend.
