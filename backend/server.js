// backend/server.js - VERSIÓN CORREGIDA
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configurar CORS para permitir tu frontend
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Endpoint de salud - para verificar que funciona
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend de descargas funcionando',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Función para extraer ID de Google Drive
function extractGoogleDriveId(url) {
  if (!url) return null;
  
  // Diferentes patrones de URL de Google Drive
  const patterns = [
    /\/d\/([^/]+)/,                     // /d/FILE_ID/
    /id=([^&]+)/,                       // id=FILE_ID
    /\/file\/d\/([^/]+)/,               // /file/d/FILE_ID/
    /\/open\?id=([^&]+)/,               // /open?id=FILE_ID
    /\/uc\?export=download&id=([^&]+)/, // /uc?export=download&id=FILE_ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  // Si no coincide con ningún patrón, asumir que la URL ya es un ID
  return url.length < 50 ? url : null;
}

// Endpoint principal de descarga
app.get('/api/download', async (req, res) => {
  console.log('📥 Nueva solicitud de descarga recibida');
  console.log('📋 Parámetros:', req.query);
  
  try {
    const { url, filename = 'archivo_descargado' } = req.query;
    
    if (!url) {
      console.log('❌ Error: URL no proporcionada');
      return res.status(400).json({ 
        error: 'Se requiere la URL del archivo',
        ejemplo: 'Use: /api/download?url=URL_GOOGLE_DRIVE&filename=nombre.pdf'
      });
    }
    
    console.log(`🔗 URL recibida: ${url}`);
    console.log(`📄 Nombre de archivo: ${filename}`);
    
    // Extraer el ID de Google Drive
    const fileId = extractGoogleDriveId(url);
    
    if (!fileId) {
      console.log('❌ Error: No se pudo extraer ID de Google Drive');
      return res.status(400).json({ 
        error: 'URL de Google Drive no válida',
        url_recibida: url,
        sugerencia: 'La URL debe ser de Google Drive (drive.google.com)'
      });
    }
    
    console.log(`✅ File ID extraído: ${fileId}`);
    
    // Crear URL de descarga directa
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    console.log(`⬇️  URL de descarga: ${downloadUrl}`);
    
    // Configurar headers para parecer un navegador
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': '*/*',
      'Accept-Language': 'es-ES,es;q=0.9',
      'Referer': 'https://drive.google.com/',
      'DNT': '1',
      'Connection': 'keep-alive'
    };
    
    // Configurar timeout y respuesta como stream
    const response = await axios({
      method: 'GET',
      url: downloadUrl,
      responseType: 'stream',
      headers: headers,
      timeout: 45000, // 45 segundos timeout
      maxRedirects: 5,
      maxContentLength: Infinity // Permitir archivos grandes
    });
    
    // Obtener información del archivo
    const contentType = response.headers['content-type'] || 'application/octet-stream';
    const contentLength = response.headers['content-length'];
    
    console.log(`📊 Tipo MIME: ${contentType}`);
    console.log(`📦 Tamaño: ${contentLength ? Math.round(contentLength / 1024) + ' KB' : 'Desconocido'}`);
    
    // Configurar headers de respuesta
    res.set({
      'Content-Type': contentType,
      'Content-Length': contentLength,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    console.log('🚀 Enviando archivo al cliente...');
    
    // Pipe del stream directamente al cliente
    response.data.pipe(res);
    
    // Manejar finalización
    response.data.on('end', () => {
      console.log('✅ Archivo enviado exitosamente');
    });
    
    // Manejar errores en el stream
    response.data.on('error', (error) => {
      console.error('❌ Error en el stream:', error.message);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error al transmitir el archivo' });
      }
    });
    
  } catch (error) {
    console.error('💥 Error en /api/download:', error.message);
    
    // Manejar diferentes tipos de errores
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ Timeout: La descarga tardó demasiado');
      res.status(408).json({ 
        error: 'Timeout: El servidor tardó demasiado en responder',
        sugerencia: 'Intenta con archivos más pequeños o verifica tu conexión'
      });
    } else if (error.response) {
      console.error(`📡 Google Drive respondió con error: ${error.response.status}`);
      console.error('📡 Headers de respuesta:', error.response.headers);
      
      res.status(error.response.status).json({ 
        error: `Google Drive respondió con error ${error.response.status}`,
        detalles: 'Puede que el archivo no sea público o haya sido eliminado'
      });
    } else if (error.request) {
      console.error('🌐 Error de red: No se recibió respuesta');
      res.status(503).json({ 
        error: 'Error de conexión con Google Drive',
        detalles: 'Verifica tu conexión a internet'
      });
    } else {
      console.error('⚡ Error inesperado:', error.message);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        detalles: error.message
      });
    }
  }
});

// Ruta de prueba simple
app.get('/api/test', (req, res) => {
  res.json({
    mensaje: 'Backend funcionando correctamente',
    fecha: new Date().toISOString(),
    endpoints: [
      'GET /api/health - Verificar estado',
      'GET /api/download - Descargar archivo',
      'GET /api/test - Esta ruta de prueba'
    ]
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    servicio: 'Backend de descarga Google Drive',
    descripcion: 'Servicio para descargar archivos de Google Drive evitando restricciones CORS',
    version: '1.0.0',
    autor: 'Sistema OISS',
    endpoints: {
      salud: 'GET /api/health',
      descarga: 'GET /api/download?url=URL&filename=NOMBRE_ARCHIVO',
      prueba: 'GET /api/test'
    },
    uso: 'Para descargar: /api/download?url=https://drive.google.com/file/d/ID_ARCHIVO/view&filename=mi_archivo.pdf'
  });
});

// ⚠️ CORRECCIÓN: Manejar rutas no encontradas CORRECTAMENTE
// Elimina esta línea problemática:
// app.use('*', (req, res) => {

// En su lugar, usa esto AL FINAL de todas tus rutas:
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    ruta: req.originalUrl,
    endpoints_disponibles: [
      '/api/health',
      '/api/download',
      '/api/test'
    ],
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 BACKEND INICIADO CORRECTAMENTE`);
  console.log('='.repeat(50));
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🌐 Entorno: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend permitido: ${process.env.CORS_ORIGIN}`);
  console.log('');
  console.log('📋 ENDPOINTS DISPONIBLES:');
  console.log(`   ✅ GET  http://localhost:${PORT}/api/health`);
  console.log(`   ⬇️  GET  http://localhost:${PORT}/api/download`);
  console.log(`   🔧 GET  http://localhost:${PORT}/api/test`);
  console.log('');
  console.log('🔍 Para probar, abre en tu navegador:');
  console.log(`   👉 http://localhost:${PORT}/api/health`);
  console.log('='.repeat(50));
});