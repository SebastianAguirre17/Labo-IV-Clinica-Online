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

> La primer entrega, contó con la estructura básica del proyecto. Se crearon las páginas principales para el Login y el Registro.

> Se creó el repositorio correspondiente y deployado en Heroku.

> Para darle un plus a la entrega, se utlizó una directiva personalizada para el manejo de imágenes.

**Tareas principales realizadas**

* Registro y Login con Firebase

* Verificación de email para usuarios "Pacientes"

* Perfiles de usuarios con rutas autenticadas

* Manejos de imágenes por medio de drag & drop para  Pacientes

* Proyecto subido a Heroku

----

### Segundo Sprint - 29/08

> La segunda entrega requirió más trabajo. Se realizó un rediseño completo a lo planteado en la primer fecha.

> Se corrigieron los issues reportados, como agregar metadata a las imágenes subidas al storage de Firebase.

> Se trabajó en la lógicaca de cada componente, para darle funcionalidades distintas a cada perfil de usuario y que puedan cumplir con los requrimientos de la aplicación.

> Para aportar valor extra, se utilizaron diferentes animaciones para la transición entre pantallas y componentes, además de incluir validacione personalizadas para los formularios.

**Tareas principales realizadas**

* Se incorporó Captcha de Google para el registro de usuarios

* Confección del archivo Readme.md

* Funcionalidad de usuarios Admmin para creación de nuevos administradores y activación de profesionales.

* Listado de turnos de cada Paciente con su estado actual.

* Alta de turnos, siguiendo la restricciones solicitadas.

* Funcionalidad para que los profesionales agreguen nuevas especialidades.

* Atención de pacientes.

----
**Gestión de usuarios**
![principal](https://firebasestorage.googleapis.com/v0/b/clinica-online-3b015.appspot.com/o/readme%2Fadmin-prof.gif?alt=media&token=7a13a63c-1618-478f-9878-086cf59b523c)

----
**Sacar turnos**
![principal](https://firebasestorage.googleapis.com/v0/b/clinica-online-3b015.appspot.com/o/readme%2Fsacar-turno.gif?alt=media&token=bc3ca593-b4fa-45e4-af2b-e841c32a3c69)

----
**Aceptar o rechazar turnos**
![principal](https://firebasestorage.googleapis.com/v0/b/clinica-online-3b015.appspot.com/o/readme%2Fprof-turno.gif?alt=media&token=622d40eb-8a35-425a-9d06-17768cf03e0c)

----
**Cacelar turnos**
![principal](https://firebasestorage.googleapis.com/v0/b/clinica-online-3b015.appspot.com/o/readme%2Fcancelar.gif?alt=media&token=d3dcfd7b-f484-4ae3-85b7-78124dda0c0e)


----
**Descargar PDF**
![Principal](https://firebasestorage.googleapis.com/v0/b/clinica-online-3b015.appspot.com/o/readme%2Fadmin-prof.gif?alt=media&token=7a13a63c-1618-478f-9878-086cf59b523c)

----

### Tercer Sprint - 29/08

> En la tercer entrega,  se corrigen issues reportados.

> Se cambia modalidad de sacar turnos, haciéndolo de forma dinámica en la menor cantidad de clicks posibles.

**Tareas principales realizadas**

* Se agregaron nuevas animaciones

* Actualización del archivo Readme.md

* Función de agregar nuevas campos al paciente, como información de historia clínica.

* Generación de documentación en Pdf y Exel.
