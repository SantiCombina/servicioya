# Informe de Pruebas – Módulo de Perfil de Usuario
## 1. Propósito
Este documento describe las pruebas funcionales realizadas sobre el módulo de edición de perfil de usuario.  
El objetivo es verificar la validez de las validaciones de campos, el manejo de imágenes, la persistencia de datos y la respuesta del sistema ante entradas inválidas o escenarios límite.

## 2. Alcance
Las pruebas se enfocan exclusivamente en:
- Validación de campos del formulario de perfil.
- Subida, eliminación y validación de imágenes.
- Persistencia correctamente controlada en la base de datos.
- Mensajes de error y comportamiento esperado del sistema.
No se evalúan aspectos de rendimiento, seguridad ni UX.

## 3. Casos de Prueba
### 3.1 Resumen de Casos
| Caso de prueba | Acción | Resultado esperado |
|----------------|--------|--------------------|
| **Validación nombre obligatorio** | Dejar el campo "Nombre completo" vacío y guardar | Debe mostrar un error indicando que el nombre es obligatorio |
| **Validación formato teléfono** | Ingresar un teléfono con caracteres no numéricos | El sistema rechaza el valor y muestra mensaje de error |
| **Guardado de datos válidos** | Ingresar datos válidos y guardar | El perfil se actualiza correctamente en la base de datos |
| **Subida de imagen supera límite de tamaño** | Subir imagen > 5MB | El sistema rechaza la imagen y muestra un error |
| **Eliminación de imagen de perfil** | Pulsar "Eliminar imagen de perfil" | La imagen se elimina y la vista se actualiza |
| **Validación de DNI** | Ingresar DNI con formato incorrecto | Se muestra mensaje de error y se bloquea el guardado |
| **Cambio de ciudad/localidad** | Seleccionar nueva ubicación | Se actualiza correctamente el campo ciudad |
| **Guardado con campo dirección vacío** | Dejar vacío "dirección" y guardar | El perfil se guarda correctamente (campo opcional) |
| **Detección de datos duplicados** | Intentar guardar un DNI ya registrado | Se informa duplicado y se bloquea guardado |
| **Subida de imagen con formato permitido** | Subir JPG/PNG dentro del límite | La imagen se carga y el perfil se actualiza |
| **Cancelar edición** | Modificar un dato y pulsar "Cancelar" | El sistema descarta cambios y mantiene datos originales |

## 4. Resultados Detallados
### Caso de prueba 1 – Validación nombre obligatorio
- **Acción:** Dejar el campo "Nombre completo" vacío y guardar.  
- **Resultado esperado:** Debe mostrarse un error indicando que el nombre es obligatorio.  
- **Resultado obtenido:** Ocurrió lo esperado.  

### Caso de prueba 2 – Validación formato teléfono
- **Acción:** Ingresar un teléfono con caracteres no numéricos.  
- **Resultado esperado:** Debe rechazarse el valor y mostrarse un mensaje de error.  
- **Resultado obtenido:** Ocurrió lo esperado.  

### Caso de prueba 3 – Guardado de datos válidos
- **Acción:** Ingresar todos los datos válidos y guardar.  
- **Resultado esperado:** El perfil se actualiza correctamente en la base de datos.  
- **Resultado obtenido:** Ocurrió lo esperado.  

### Caso de prueba 4 – Subida de imagen que supera el límite de tamaño
- **Acción:** Subir una imagen mayor a 5MB.  
- **Resultado esperado:** El sistema debe rechazar la imagen y mostrar un mensaje de error.  
- **Resultado obtenido:** Ocurrió lo esperado.  

### Caso de prueba 5 – Eliminación de imagen de perfil
- **Acción:** Pulsar el botón "Eliminar" en la imagen de perfil.  
- **Resultado esperado:** La imagen debe eliminarse y la visualización actualizarse.  
- **Resultado obtenido:** Ocurrió lo esperado.  

### Caso de prueba 6 – Validación de DNI
- **Acción:** Ingresar un DNI con formato incorrecto.  
- **Resultado esperado:** Debe mostrarse un mensaje de error y no permitir guardar cambios.  
- **Resultado obtenido:** Ocurrió lo esperado.  

### Caso de prueba 7 – Cambio de ciudad/localidad
- **Acción:** Seleccionar una nueva ubicación en el campo ciudad.  
- **Resultado esperado:** El perfil debe actualizar correctamente la nueva ubicación.  
- **Resultado obtenido:** Ocurrió lo esperado.  

### Caso de prueba 8 – Guardado con campo dirección vacío
- **Acción:** Dejar vacío el campo dirección y guardar.  
- **Resultado esperado:** El sistema debe permitir el guardado, ya que el campo es opcional.  
- **Resultado obtenido:** Ocurrió lo esperado.  

### Caso de prueba 9 – Detección y aviso de datos duplicados
- **Acción:** Intentar guardar un DNI ya registrado por otro usuario.  
- **Resultado esperado:** El sistema debe informar que los datos ya existen y bloquear el guardado.  
- **Resultado obtenido:** **No ocurrió lo esperado.** El sistema permitió guardar el perfil, generando dos usuarios con el mismo DNI.  
- **Severidad:** Alta (riesgo de inconsistencia de datos e identidad duplicada).  

### Caso de prueba 10 – Subida de imagen con formato permitido
- **Acción:** Subir una imagen JPG/PNG dentro del límite de tamaño.  
- **Resultado esperado:** La imagen debe cargarse correctamente y el perfil actualizarse.  
- **Resultado obtenido:** Ocurrió lo esperado.  

### Caso de prueba 11 – Cancelar edición
- **Acción:** Modificar un dato y pulsar “Cancelar”.  
- **Resultado esperado:** El sistema debe descartar los cambios y mantener los datos originales.  
- **Resultado obtenido:** Ocurrió lo esperado. 

## 5. Conclusiones
Diez de los once casos de prueba ejecutados arrojaron resultados alineados con lo esperado, lo que indica que la lógica de validación básica, el manejo opcional de campos y las operaciones de carga y eliminación de imágenes funcionan.
Sin embargo, se identificó un hallazgo crítico en el **Caso de Prueba 9 – Detección y aviso de datos duplicados**, donde el sistema permitió registrar un DNI duplicado. Este comportamiento compromete la integridad del modelo de datos y puede generar conflictos severos en funcionalidades que dependan de la unicidad del documento (autenticación, identificación de usuarios, trazabilidad, auditoría, etc.). 
Este problema debe considerarse de alta severidad y requiere corrección prioritaria.
En conjunto, el módulo demuestra estabilidad general, pero aún presenta un riesgo funcional significativo que debe atenderse antes de una liberación final.

## 6. Recomendaciones
1. **Corregir la lógica de validación de DNI duplicado**  
   Se recomienda revisar la verificación de unicidad tanto a nivel de frontend como de backend para garantizar que el sistema bloquee completamente los intentos de guardar un DNI existente.
2. **Agregar pruebas adicionales de integridad de datos**  
   Sería conveniente evaluar:
   - Validación de caracteres especiales en campos sensibles (nombre, dirección, ciudad).  
   - Comportamiento en caso de interrupciones de red durante el guardado.  
   - Consistencia de mensajes de error (texto, formato, ubicación).
3. **Incorporar mensajes de error uniformes**  
   A fin de mantener coherencia visual y semántica en la interfaz, se recomienda estandarizar el estilo y contenido de las alertas en todos los campos.
4. **Registrar evidencia visual para auditoría interna**  
   Aunque este informe omite las capturas, mantenerlas internamente es útil para trazabilidad histórica y verificación posterior.
5. **Verificar la integridad entre la base de datos y la interfaz**  
   Se recomienda probar casos en los que el backend rechace datos que el frontend permitió temporalmente, para detectar inconsistencias silenciosas.

Estas acciones permitirán reforzar la confiabilidad del módulo y reducir riesgos de inconsistencias en entornos de producción.
