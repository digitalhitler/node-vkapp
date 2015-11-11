# node-vkapp

Node.js module for usage VK.com API like "standalone" application

## Warning!
Currently in development. You're wrong if you really want to use it. Turn off your computer, stand up and go for a walk.

## Default client data
Out-of-box module pretends like official VK app for iPhone. This means that we don't have any limitations in API methods
(like post to wall, retrieving URLs of audio & video files etc.)

## Дальше на русском
Основные ништяки:
* Никаких коллбэков, только промисы.
* Запросы к ВК обрабатываются по принципу очереди, ибо кол-во запросов к API в секунду искуственно ограничивается ВК.
* Обработка ошибок без Exception-ов - свой класс VkClientError, который всю эту бороду должен хавать.