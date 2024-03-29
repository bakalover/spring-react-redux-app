Backend:<br><br>
Общее:
<ul>
  <li>Все данные передаются в формате JSON (внутри тела запроса) в обе стороны</li>
  <li>Некорректные данные, в том числе за счёт валидации, вернут Response code: 400</li>
  <li>Поддержание сессии происходит за счёт токенов: JWT </li>
  <li>Вместо "------" подставляются соответствующие данные на уровне frontend
  <li>Ссылки указываются относительно корневой, то есть от "localhost:xxxx"</li>
</ul>
<br>
Валидация:
<ul>
 <li>Все ключи JSON должны быть абсолютно идентичны указанным далее, в том числе по регистру</li>
 <li>Данные должны быть соответсвующих типов или их расширений</li>
 <li>"username", "owner" -> 3<=length<=30</li>
 <li>"y" -> -5<=val<=5</li>
</ul>
<br>
Аутентификация и авторизация:
<ul>
  <li>
    Urls: 
    <ul>
      <li> Method: POST "/auth/register" </li>
      <li> Method: POST "/auth/login"</li>
    </ul>
  </li>
  <li> На всё посылать : {"username":"------", "password":"------"} </li>
  <li> /register в случае успеха возращает имя добавленного пользователя, иначе: "Имя пользователя '------' занято."</li>
  <li> /login в случае успеха возвращает: {"username":"------", "token":"------"} (имя пользователя и его токен)</li>
  <li> Полученный токен необходимо добавлять в заголовок Authorization КАЖДОГО http запроса, чтобы получить доступ к основному api. <br> Формат заголовка: "Authorization:token:------"</li>
  <li> Иные запросы, не включающие токен, вернут response code: 401 - unauthorized (приоритет ошибки выше, чем у response code 400; необходимо заного пройти по /login и получить новый токен), также это возможно при истечении срока жизни токена ( по умолчанию - 1000 секунд, но можно регулировать)</li>
</ul>
<br>
Основное api:
<ul>
  <li>
    Urls:
    <ul>
      <li> Method: POST "/api/shots/add" - добавление</li> 
      <li> Method: GET "/api/shots/user" - получение по имени пользователя список его точек</li>
      <li> Method: GET "/api/shots/my" - получение только своих точек</li>
      <li> Method: GET "/api/shots/all" - получение абсолютно всех точек</li>
      <li> Method: GET "/api/users/all" - получение всех имён пользователей</li>
    </ul>
  </li>
  <li>
    Посылка:
    <ul>
      <li> На "/api/shots/add" : {"owner":"------", "x":"------", "y":"------", "r":"------", "status":"------"}</li>
      <li> На "/api/shots/user" : имя пользователя в теле запроса без кавычек</li>
      <li> На "/api/shots/my" : ничего (магия токенов - через него поймёт чьи точки возвращать)</li>
      <li> На "/api/shots/all": ничего </li>
      <li> На "/api/users/all": ничего </li>
    </ul>
   </li>
   <li>
    Получение:
    <ul>
      <li>"/api/shots/add": {"owner":"------", "x":"------", "y":"------", "r":"------", "status":"------"} (возвращает тоже, что и отправляется)</li>
      <li>Остальное: [{...},{...},...] (список json с объектами в том же формате, что и при посылке через /add)</li>
      <li>В случае получения всех имён пользователей список представляет собой обычный список строк:<br> ["------","------",...]</li>
    </ul>
   </li>
</ul>
<br>
Динамическое обновление:
<ul>
  <li>Использование STOMP protocol на основе WebSocket protocol</li>
</ul>
