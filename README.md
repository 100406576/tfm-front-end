# TfmFrontEnd

[![Angular - Tests](https://github.com/100406576/tfm-front-end/actions/workflows/angular-test-sonar.yml/badge.svg)](https://github.com/100406576/tfm-front-end/actions/workflows/angular-test-sonar.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=100406576%3Atfm-front-end&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=100406576%3Atfm-front-end)

Este proyecto ha sido generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

## Requisitos

- Node.js
- npm

## Instalación

Primero, clona el repositorio:

```bash
git clone https://github.com/100406576/tfm-front-end.git
cd tfm-back-end
```

Luego, instala las dependencias:

```bash
npm install
```

## Configuración
Para que el proyecto funcione correctamente, especialmente las funcionalidades relacionadas con Google Maps, es necesario configurar adecuadamente el archivo `src/environments/environment.ts`. Este archivo contiene las configuraciones específicas del entorno que se utilizan en el proyecto, incluyendo la clave API de Google necesaria para los servicios de Google Maps.

### Configuración de la Clave API de Google
En el archivo `src/environments/environment.ts`, encontrarás una propiedad llamada googleApiKey. Debes reemplazar 'YOUR_GOOGLE_API_KEY' con tu clave API de Google personal

### Uso del Proxy para Desarrollo Local
Para evitar problemas de CORS (Cross-Origin Resource Sharing) al realizar solicitudes a la API de Google Maps desde el entorno de desarrollo local, se utiliza un archivo de configuración de proxy. Esto permite que las solicitudes a Google Maps parezcan originarse desde el mismo dominio que el servidor de desarrollo, evitando así los errores de CORS.

El archivo `proxy.conf.json` se utiliza para configurar el proxy. Aquí está la configuración actual utilizada para redirigir las solicitudes a Google Maps:
```json
{
  "/maps": {
    "target": "https://maps.google.com",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/maps": "/maps"
    }
  }
}
```
## Scripts

- `npm start`: Este comando inicia el servidor de desarrollo local y automáticamente aplica la configuración del proxy definida en el archivo `proxy.conf.json`.



