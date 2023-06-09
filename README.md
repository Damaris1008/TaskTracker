# TaskTracker
TaskTracker es una aplicación de organización de tareas en distintos tableros, fácil de usar y altamente efectiva para ayudarte a mantener tus objetivos organizados. 
Con ella, puedes crear múltiples tableros para separar tus tareas en diferentes categorías, como "Por Hacer", "En Curso" y "Terminado". Además, puedes agregar 
descripciones, prioridad y estado para cada tarea para ayudarte a mantenerte en el camino.
        
Para respaldar el sistema de tableros y tareas de TaskTracker, se utiliza MongoDB como base de datos, para asegurarnos de que la información de las tareas esté segura y 
fácilmente accesible en todo momento. También se utiliza Node.js para crear una experiencia de usuario altamente intuitiva y rápida, lo que significa que no tendrás que 
preocuparte por perder el tiempo mientras navegas por la aplicación.

TaskTracker es la herramienta perfecta para cualquier persona que desee mantener sus tareas organizadas, ya sea que estés estudiando para un examen, administrando un 
proyecto o simplemente tratando de mantener su vida diaria organizada. ¡Únete a TaskTracker hoy y comienza a mantener tus tareas bajo control!

# Documentación del Proyecto

## ENLACE DE DESPLIEGUE

https://tasktracker-7g86.onrender.com

## API
### User API
| URL                    | Descripción                         | Operación | Parámetros |
| --------------------   | ----------------------------------- |---------- | ----------|
| /api/users/signin      | Iniciar sesión          |POST| String email, String password |
| /api/users/signup  | Registrar un nuevo usuario | POST| String name, String email, String password, String confirm_password |
| /api/users/logout  |Cerrar sesión | GET |  |

### Card API
| URL                    | Descripción                         |  Operación | Parámetros |
| --------------------   | ----------------------------------- |---------- |----------|
| /api/cards | Obtener todas las tareas | GET|  |
| /api/cards/add   | Añadir una nueva tarea        |POST| String title, String description (opcional), String status, String priority |
| /api/cards/edit/{id}  |Editar una tarea por su id |PUT| String title, String description (opcional), String status, String priority |
| /api/cards/delete/{id}  | Eliminar una tarea por su id |DELETE| |


	
## APLICACIÓN
### User
| URL                    | Descripción                         | Operación | Parámetros |
| --------------------   | ----------------------------------- |---------- | ----------|
| /users/signin      | Iniciar sesión          |POST|  String email, String password |
| /users/signup  | Registrar un nuevo usuario | POST|  String name, String email, String password, String confirm_password |
| /users/logout  |Cerrar sesión | GET| |

### Card
| URL                    | Descripción                         |  Operación |Parámetros |
| --------------------   | ----------------------------------- |---------- |----------|
| /cards | Obtener todas las tareas | GET| |
| /cards/add   | Añadir una nueva tarea        |POST|  String title, String description (opcional), String status, String priority |
| /cards/edit/{id}  |Editar una tarea por su id |PUT| String title, String description (opcional), String status, String priority |
| /cards/delete/{id}  | Eliminar una tarea por su id |DELETE| |
