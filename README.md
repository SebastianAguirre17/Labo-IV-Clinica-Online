# **CLÍNICA ONLINE**

Trabajo práctico obligatorio de Laboratorio de Computación IV.

En esta aplicación se evalúan todos los mecanismos y conocimientos adquiridos en la cursada de la materia, utilizando código abierto y la documentación Web como bibliografía.

[Sitio web desplegado en Heroku](https://sebastian-aguirre-clinica.herokuapp.com)

-----

### Herramientas - Frameworks y Librerías utilizadas

* Anguar  10
* Typescript
* Firebase
* Bootstrap
* Bootswatch
* Sweetalert2
* Animate.css
* Fontawesome

----

### Requerimientos de la Aplicación

* Debemos realizar un sistema según las necesidades y deseos del cliente, para eso tenemos unabreve descripción de lo que el cliente nos comenta acerca de su negocio.

* La clínica OnLine, especialista en salud, cuenta actualmente con consultorios (6 en la actualidad), dos laboratorios (físicos en la clínica), y una salade espera general. Está abierta al público de lunesa viernes en el horario de 8:00 a 19:00, y lossábados en el horario de 8:00 a 14:00.

* Trabajan en ella profesionales de diversas especialidades, que ocupan los consultorios acorde a su disponibilidad, y reciben en ellos pacientes con turno para consulta o tratamiento. Dichos turnos son pedidos por la web seleccionando el profesional o laespecialidad. La duración mínima de un turno es 30 minutos, pero los profesionales pueden cambiar la duración según su especialidad. 

* Un profesional puede tener más de una especialidad

**Perfiles de usuarios**

* **Profesional** Puede tener más de una especialidad y el registro lo hace el profesional, necesitando la aprobación de un administrador para empezar a atender en la clinica.

* **Paciente** Ingresa con dos imágenes de perfil y se verifica la dirección de email.

* **Administrador** Se carga solamente por otro administrador)además de poder agregar una nueva especialidad en el alta de profesional.

----
## Ingreso a la Web

**Pantalla Principal**
>Al ingresar, tendrá la opción de Iniciar sesión o bien registrarse como Profesional o Paciente.

>El registro como pacieinte implica la carga obligatoria de 2 imágenes.

![principal](https://firebasestorage.googleapis.com/v0/b/clinica-online-3b015.appspot.com/o/readme%2Flogin.gif?alt=media&token=56c99767-e7f7-45a4-887b-b6f63ed196a9)


### Primer Sprint - 22/08

* Registro y Login con Firebase

* Verificación de email para usuarios "Pacientes"

* Perfiles de usuarios con rutas autenticadas

* Manejos de imágenes por medio de drag & drop para  Pacientes

* Proyecto subido a Heroku

* Pantallas iniciales para cada perfil (En proceso)

----

### Segundo Sprint - 29/08

* Captcha de Google

* Readme

* Creación de nuevos usarios Admin

* Solicitud de turnos por parte de pacientes

* Listado de turnos pendientes

* Manejo de turnos por parte de profesionales

* Atención de pacientes

* Gestión de usuarios

![principal](https://firebasestorage.googleapis.com/v0/b/clinica-online-3b015.appspot.com/o/readme%2Fusers.gif?alt=media&token=18164e1d-c3d8-4790-96c4-329afe442917)

----

![principal](https://firebasestorage.googleapis.com/v0/b/clinica-online-3b015.appspot.com/o/readme%2Fturnos.gif?alt=media&token=59d0e518-eeba-4b21-9bcb-c1e10fda16db)