const AWS = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const { v4: uuidv4 } = require('uuid');

// Declarar una instancia de express
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Habilitar CORS para todos los métodos
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Inicializar el cliente de DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "piriapp-projects";

// Obtener todos los proyectos del usuario actual
app.get('/projects', function(req, res) {
  // Obtener el ID de usuario del contexto de autenticación
  const userId = req.apiGateway.event.requestContext.identity.cognitoIdentityId;
  
  const params = {
    TableName: tableName,
    IndexName: "UserProjects",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId
    }
  };
  
  dynamodb.query(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err, message: "Error al obtener los proyectos" });
    } else {
      // Ordenar por fecha de actualización (más reciente primero)
      const sortedItems = data.Items.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      
      // Limitar a 2 proyectos por usuario
      const limitedItems = sortedItems.slice(0, 2);
      
      res.json(limitedItems);
    }
  });
});

// Obtener un proyecto específico
app.get('/projects/:id', function(req, res) {
  const userId = req.apiGateway.event.requestContext.identity.cognitoIdentityId;
  const projectId = req.params.id;
  
  const params = {
    TableName: tableName,
    Key: {
      id: projectId,
      userId: userId
    }
  };
  
  dynamodb.get(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err, message: "Error al obtener el proyecto" });
    } else if (!data.Item) {
      res.status(404).json({ message: "Proyecto no encontrado" });
    } else {
      res.json(data.Item);
    }
  });
});

// Crear un nuevo proyecto
app.post('/projects', function(req, res) {
  const userId = req.apiGateway.event.requestContext.identity.cognitoIdentityId;
  const timestamp = new Date().toISOString();
  
  // Verificar primero cuántos proyectos tiene el usuario
  const queryParams = {
    TableName: tableName,
    IndexName: "UserProjects",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId
    }
  };
  
  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.status(500).json({ error: err, message: "Error al verificar los proyectos existentes" });
    } else {
      // Si el usuario ya tiene 2 proyectos, no permitir crear más
      if (data.Items.length >= 2) {
        res.status(403).json({ 
          message: "Has alcanzado el límite de 2 proyectos. Por favor, elimina uno existente antes de crear uno nuevo." 
        });
        return;
      }
      
      // Si no ha alcanzado el límite, crear el nuevo proyecto
      const newProject = {
        id: req.body.id || uuidv4(),
        userId: userId,
        name: req.body.name,
        description: req.body.description,
        customization: req.body.customization,
        createdAt: req.body.createdAt || timestamp,
        updatedAt: timestamp
      };
      
      const params = {
        TableName: tableName,
        Item: newProject
      };
      
      dynamodb.put(params, (putErr) => {
        if (putErr) {
          res.status(500).json({ error: putErr, message: "Error al crear el proyecto" });
        } else {
          res.json(newProject);
        }
      });
    }
  });
});

// Actualizar un proyecto existente
app.put('/projects/:id', function(req, res) {
  const userId = req.apiGateway.event.requestContext.identity.cognitoIdentityId;
  const projectId = req.params.id;
  const timestamp = new Date().toISOString();
  
  // Verificar primero que el proyecto pertenece al usuario
  const getParams = {
    TableName: tableName,
    Key: {
      id: projectId,
      userId: userId
    }
  };
  
  dynamodb.get(getParams, (err, data) => {
    if (err) {
      res.status(500).json({ error: err, message: "Error al verificar el proyecto" });
    } else if (!data.Item) {
      res.status(404).json({ message: "Proyecto no encontrado o no tienes permiso para editarlo" });
    } else {
      // El proyecto existe y pertenece al usuario, proceder con la actualización
      const updateParams = {
        TableName: tableName,
        Key: {
          id: projectId,
          userId: userId
        },
        UpdateExpression: "set #name = :name, description = :description, customization = :customization, updatedAt = :updatedAt",
        ExpressionAttributeNames: {
          "#name": "name" // 'name' es una palabra reservada en DynamoDB
        },
        ExpressionAttributeValues: {
          ":name": req.body.name || data.Item.name,
          ":description": req.body.description || data.Item.description,
          ":customization": req.body.customization || data.Item.customization,
          ":updatedAt": timestamp
        },
        ReturnValues: "ALL_NEW"
      };
      
      dynamodb.update(updateParams, (updateErr, updateData) => {
        if (updateErr) {
          res.status(500).json({ error: updateErr, message: "Error al actualizar el proyecto" });
        } else {
          res.json(updateData.Attributes);
        }
      });
    }
  });
});

// Eliminar un proyecto
app.delete('/projects/:id', function(req, res) {
  const userId = req.apiGateway.event.requestContext.identity.cognitoIdentityId;
  const projectId = req.params.id;
  
  const params = {
    TableName: tableName,
    Key: {
      id: projectId,
      userId: userId
    }
  };
  
  dynamodb.delete(params, (err) => {
    if (err) {
      res.status(500).json({ error: err, message: "Error al eliminar el proyecto" });
    } else {
      res.json({ message: "Proyecto eliminado correctamente" });
    }
  });
});

// Exportar la app
module.exports = app;
