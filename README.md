# LibraryApi

Iniciar los containers docker

Correr los siguientes comandos en la carpeta raíz del proyecto:

```
docker-compose build
docker-compose up
```

Descripción

```
Se presenta un sistema de administracion de una biblioteca, con un administrador definido por defecto y la posible creacion de usuarios, es decir bibliotecario y socios; cada uno tiene una cierta cantidad de actividades disponibles para realizar

Socio: 
pedir prestamo de libro en el caso de que no tenga prestamos vencidos
devolver prestamo

Bibiotecario: 
crear un libro
eliminar un libro en el caso de que no se encuentre en un prestamo
modificar cantidad del libro, solo podrá ser modificada si el nuevo valor es mayor o igual a la cantidad de libros prestados, si no hay prestamos del mismo se podrá modificar con libertad el nuevo valor

```

A tener en cuenta

-- En el caso del Biblbiotecario se encuentra por defecto la cuenta
--Usuario: Librarian
--Contraseña: Librarian