# Hotel

![Hotel preview](https://github.com/dopadev/hotel/raw/main/preview/hotel.png)

## Описание

Проект представляет собой систему для онлайн-бронирования номеров в отеле. Система состоит из двух основных частей: фронтенд и бэкенд. Фронтенд предоставляет пользователю интерфейс для выбора номеров, даты заезда и выезда, а также обработки информации о бронировании. Бэкенд обрабатывает запросы, взаимодействует с базой данных и выполняет логику авторизации и аутентификации пользователей, а также управления бронированиями.

## Технологии

### Backend

- Express.js
- Mongoose
- JWT
- bcrypt
- dotenv
- Validator

### Frontend

- React
- Redux
- Yup
- React Date Range
- Axios

## Настройка переменных окружения

Создайте в папке `Backend` файл `.env`:

`MONGODB_CONNECTION_STRING="mongodb+srv://..."`  
`JWT_SECRET="..."`

## Установка и запуск

1. Склонируйте репозиторий:

`git clone https://github.com/dopadev/hotel.git`

2. Перейдите в директорию проекта:

`cd ./hotel`

3. Установите все необходимые зависимости:

Выполнить в терминале 1:

`cd ./Backend`  
`npm install`  
`npm run dev`

Выполнить в терминале 2:

`cd ./Frontend`  
`npm install`  
`npm start`

## Примечания

- Убедитесь, что у Вас установлен Node.js и npm, и что у Вас есть база данных MongoDB Atlas
