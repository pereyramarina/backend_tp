
# ITS Backend 2° AÑO - Proyecto Final

## INTEGRANTE DEL PROYECTO: Pereyra Mercedes Marina Ayelen

## Pasos para hacer funcionar la aplicación

1. **Clonar el repositorio**  
   Ejecutá el siguiente comando en tu terminal para clonar el repositorio en tu máquina local:  
   ```bash
   git clone https://github.com/pereyramarina/backend_tp.git
   ```

2. **Instalar las dependencias**  
   Ingresá al directorio del proyecto y ejecuta:  
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**  
   Creá un archivo `.env` en la raíz del proyecto basándote en el archivo `.env_template`.  
   Formato del `.env` esperado:  
   ```plaintext
   db_dialect://db_user:db_pass@db_host:db_port/db_name
   ```
   Asegurate de reemplazar los valores con la configuración de tu base de datos.

4. **Migrar la base de datos**  
   Aplicá la última versión de las migraciones con el siguiente comando:  
   ```bash
   npx prisma migrate dev --name <NOMBRE_MIGRACION>
   ```
   Reemplazá `<NOMBRE_MIGRACION>` con un nombre significativo para la migración.

5. **Iniciar la aplicación**  
   Ejecutá el siguiente comando para iniciar la aplicación en modo desarrollo:  
   ```bash
   npm run start:dev
   ```

6. **Acceder a la documentación**  
   Una vez que la aplicación esté en ejecución, abrí tu navegador y accede a:  
   ```
   http://localhost:3000/api
   ```
   Aca vas a encontrar la documentación interactiva generada con **Swagger**, que describe todas las rutas disponibles.

---

## Uso de la aplicación

### 1. Crear un usuario
Segui las instrucciones de la documentación Swagger para enviar una solicitud POST y crear un usuario.

### 2. Hacer login
Utilizá el endpoint correspondiente para autenticarte con las credenciales del usuario creado.

### 3. Usar las peticiones HTTP
Con el token de autenticación, podes realizar las operaciones disponibles según el rol asignado a tu usuario.
