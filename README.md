# 🏥 API Clínica Modular — Proyecto Final de Arquitectura de Software

![Logo de la clínica](https://szkqkgwaskukogbyzicv.supabase.co/storage/v1/object/sign/clinica/logo%20api%20clinica.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82Y2YyYWZmYy0wMzkyLTQ4MjAtODAwNS1kNWRiYTk3N2RmZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbGluaWNhL2xvZ28gYXBpIGNsaW5pY2EucG5nIiwiaWF0IjoxNzU5NzY2MzUwLCJleHAiOjE3OTEzMDIzNTB9.UomtrOzcN5gouUTEWvXOLL26kcKNursAVSKx2iGDgV8)

## 🧠 Descripción General

Este proyecto corresponde al desarrollo de una **API modular para la gestión de una clínica**, creada como entrega final
para la asignatura **Arquitectura de Software**. Se implementa un enfoque **SOA (Service-Oriented Architecture)** con
servicios independientes que interactúan entre sí mediante **endpoints RESTful**.  
El sistema incluye autenticación JWT, persistencia en base de datos (PostgreSQL mediante Supabase) y despliegue en Vercel.

---

## 🧩 Patrón Arquitectónico Aplicado: SOA (Service-Oriented Architecture)

Se eligió **SOA** con comunicación mediante **REST API**, ya que permite dividir el sistema en módulos independientes
(pacientes, laboratorio, farmacia y facturación).  
Cada módulo expone sus servicios mediante endpoints, lo que favorece el bajo acoplamiento y la escalabilidad del sistema.  
El API Gateway central (`index.js`) coordina las peticiones y la autenticación.

---

## 📁 Estructura del Proyecto

```bash
clinica-api/
├─ index.js
├─ .env
├─ package.json
├─ db/
│   └─ pool.js
├─ middleware/
│   └─ auth.js
├─ routes/
│   ├─ pacientes.js
│   ├─ laboratorio.js
│   ├─ farmacia.js
│   └─ facturacion.js
```

---

## 🗄️ Estructura de la Base de Datos (Supabase - PostgreSQL)

Tablas principales:

- **usuarios**: Maneja las credenciales y roles.
- **pacientes**: Información general del paciente.
- **laboratorio_ordenes** y **laboratorio_resultados**: Control de exámenes médicos.
- **medicamentos** y **dispensaciones**: Gestión de stock y entregas.
- **cuentas** y **pagos**: Facturación y cobros.

### 🧱 Modelo ER (MER)

![Modelo ER](https://szkqkgwaskukogbyzicv.supabase.co/storage/v1/object/sign/clinica/bd.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82Y2YyYWZmYy0wMzkyLTQ4MjAtODAwNS1kNWRiYTk3N2RmZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbGluaWNhL2JkLnBuZyIsImlhdCI6MTc1OTc2NjEyMSwiZXhwIjoxNzkxMzAyMTIxfQ.50cS50j7cORdLGAMJRAaYiFrHfpsoUGWMv83Kk5BE2g)

---

## 🌐 Endpoints Principales


### **Estado del servicio**

- `GET /api/health`

### **Autenticación**

- `POST /api/auth/login` — Inicia sesión y devuelve token JWT.

### **Pacientes**

- `GET /api/pacientes` — Lista todos los pacientes.
- `POST /api/pacientes` — Crea un nuevo paciente.
- `GET /api/pacientes/:id` — Consulta un paciente por ID.

### **Laboratorio**

- `POST /api/laboratorio/ordenes` — Registra orden de examen.
- `POST /api/laboratorio/resultados` — Guarda resultados de exámenes.
- `GET /api/laboratorio/ordenes` — Lista las órdenes registradas.

### **Farmacia**

- `POST /api/farmacia/medicamentos` — Crea un medicamento.
- `GET /api/farmacia/medicamentos` — Lista medicamentos.
- `POST /api/farmacia/dispensaciones` — Registra dispensación a paciente.

### **Facturación**

- `POST /api/facturacion/cuentas` — Crea cuenta médica.
- `GET /api/facturacion/cuentas` — Lista cuentas.
- `POST /api/facturacion/pagos` — Registra pago.

---

## 🎥 Guía para el Video de Presentación

El video debe contener los siguientes puntos:

1. **Explicación del problema:** Administración modular de servicios clínicos.
2. **Patrón arquitectónico:** SOA con REST.
3. **Descripción de servicios:** Explicar brevemente qué hace cada módulo.
4. **Demostración práctica:** Mostrar un endpoint funcionando en Postman (login + creación o consulta).
5. **Interacción entre servicios:** Ejemplo: crear paciente y generar orden de laboratorio.
6. **Seguridad básica:** Mostrar login con JWT y envío del token en headers.
7. **Registro de servicios:** Explicar brevemente cómo Express actúa como punto central de registro.
8. **Participación de integrantes:** Cada uno debe aparecer explicando una parte.

---

## ☁️ Despliegue

El sistema esta desplegado en **Vercel** de forma gratuita.


https://api-clinica-modular.vercel.app/

---

## 💻 Tecnologías Utilizadas

- **Node.js + Express** — Backend y manejo de endpoints.
- **Supabase (PostgreSQL)** — Base de datos en la nube.
- **JWT (jsonwebtoken)** — Autenticación de usuarios.
- **bcryptjs** — Cifrado de contraseñas.
- **Vercel** — Despliegue gratuito del backend.
- **Postman** — Pruebas de endpoints REST.

---

## 👥 Integrantes del Proyecto

| Nombre                        |
| ----------------------------- |
| Miguel Augusto Rojas Henrndez |
| Diego Mauricio Ortiz Urriago  |
| Julian Giovanny Rey Mora      |
| Luis Eduardo Rojano Jiménez   |

---

## Universidad - Politécnico Grancolombiano

© 2025 — Proyecto Académico Universidad — Arquitectura de Software.
