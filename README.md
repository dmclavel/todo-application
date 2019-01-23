TODO API

How to Use:

Todo API Functionality

GET /todos
	-> Required: headers -> x-auth: <value>

POST /todos
	-> Required: headers -> x-auth: <value>, Content-Type: application/json
	-> Required: body -> JSON e.g. { text: "Some string for todo" }

GET /todos/:id
	-> Required: headers -> x-auth: <value>

DELETE /todos/:id
	-> Required: headers -> x-auth: <value>

PATCH /todos/:id
	-> Required: headers -> x-auth: <value>, Content-Type: application/json
	-> Required: body -> JSON e.g { completed: true || false }

POST /users (SIGN UP)
	-> Required: headers -> Content-Type: application/json
	-> Required: body -> JSON e.g. { email: <value>, password: <value> }

GET /users/me
	-> Required: headers -> x-auth: <value>

POST /users/login (LOG IN)
	-> Required: headers -> x-auth: <value>, Content-Type: application/json
	-> Required: body -> JSON e.g. { email: <value>, password: <value> }

DELETE /users/me/token (LOG OUT)
	-> Required: headers -> x-auth: <value>
