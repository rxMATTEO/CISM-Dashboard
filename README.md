# Cism dashboard

This is dashboard for cism test case

## Description 

Необходимо реализовать страницу документов с поиском и предпросмотром, используя Vue 3 (Composition API)

Эта страница будет частью большого приложения, поэтому написанный код должен быть модульным и удобным в сопровождении в будущем.

Готовый проект выложите на github/gitlab

### Макет

[https://figma.com/file/xtAnJSWrI8khixoMeLzN3R/CISM-Frontend-Test-App-(Copy)?type=design&node-id=702-1284&mode=design&t=5LOrYhAKBEDt740D-0](https://figma.com/file/xtAnJSWrI8khixoMeLzN3R/CISM-Frontend-Test-App-(Copy)?type=design&node-id=702-1284&mode=design&t=5LOrYhAKBEDt740D-0)

### Шрифты

В проекте используется шрифт Montserrat - [https://fonts.google.com/specimen/Montserrat](https://fonts.google.com/specimen/Montserrat?query=mont)

**Обязательно**:

- Используйте менеджер состояний для хранения данных форм (Pinia)
- Необходимо вынести URL API в переменные окружения (env)

**Плюсом будет**:

- Использовать TypeScript
- Во время всех запросов нужно сигнализировать пользователю через прелоадер, что происходит запрос
- Если вы знакомы с инструментами изоляции стилей компонентов, примените их в ваших компонентах
- Упакуйте проект в docker
- Настройте проект к production-сборке
- При ревью проекта будут учитываться все мелочи, начиная от подхода к написанию кода, заканчивая адаптивом

### Экран "Dashboard"

В инпуте поиска документа необходимо реализовать запрос к API для получения необходимых документов.

В случае если результат вернул ошибку (параметры запроса неверные, либо ошибка сервера), необходимо отобразить эту ошибку пользователю

После успешно выполненного запроса, необходимо отобразить полученные документы в интерфейсе

При нажатии на документ в списке, он должен открыться справа для просмотра информации о нем

Кнопка “Скачать” должна скачивать выбранный документ (создавать .txt файл с содержимом текста документа)

Кнопка “Удалить” должна быть активной, в случае если у документа есть изображение. Если нет — disabled

### Документация API

[http://68.183.212.124:3000/](http://68.183.212.124:3000/user/docs)

> Пример запроса: http://68.183.212.124:3000/user/docs
>

## Start developing

`npm run dev`

## Build production

`npm run build`

## Run preview of build

`npm run preview`