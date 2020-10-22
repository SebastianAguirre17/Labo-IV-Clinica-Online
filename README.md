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

![principal](https://firebasestorage.googleapis.com/v0/b/clinica-online-3b015.appspot.com/o/readme%2Flogin.gif?alt=media&token=a4cf74b7-f35d-4586-b277-b42ef624e16b)


### Primer Sprint - 22/08

* Registro y Login con Firebase

* Verificación de email para usuarios "Pacientes"

* Perfiles de usuarios con rutas autenticadas

* Manejos de imágenes por medio de drag & drop para  Pacientes

* Proyecto subido a Heroku

* Pantallas iniciales para cada perfil (En proceso)
