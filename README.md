## Description

A simple server with Auth and files Store functionality.

The server is based on [Nest](https://github.com/nestjs/nest) framework TypeScript.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Andriy Bek](https://github.com/BekAndriy)

## License

Nest is [MIT licensed](LICENSE).

## Endpoints

### Login user.

User `test@email.com` is hardcoded in the code

```
curl -i -X POST \
   -H "Content-Type:application/json" \
   -d \
'{"email": "test@email.com", "password": "Pa$$W0rd!"}' \
 'http://localhost:4040/api/user/auth/login'
```

Response:

```
{
    "access_token": "eyJhbGciOiJ...."
}
```

### Get User Profile

```
curl -i -X GET \
   -H "Authorization:Bearer eyJhbGciOiJ...." \
 'http://localhost:4040/api/user/profile'
```

Response:

```
{
    "id": "7ca8c5bd-1b42-41bf-8670-2b9bffea1c39"
}
```

### Save JSON to Store

@param {path} - path to the file in the store. eg. list/workspaces
@param {file name} - file name without format.

```
curl -i -X POST \
   -H "Authorization:Bearer eyJhbGciOiJ...." \
   -H "Content-Type:application/json" \
   -d \
'{"key":"value"}' \
 'http://localhost:4040/api/store/<path>/<file name>'
```

Response:

```
true
```

### Load List of Files in Folder

```
curl -i -X GET \
   -H "Authorization:Bearer eyJhbGciOiJ...." \
 'http://localhost:4040/api/store/<path>'
```

Response:

```
[
    {
        "name": "file-name",
        "modifiedAt": "2023-11-22T14:36:54.694Z"
    }
]

```

### Load File Data

```
curl -i -X GET \
   -H "Authorization:Bearer eyJhbGciOiJ...." \
 'http://localhost:4040/api/store/<path>/<file name>.json'
```

Response:

```
{"key":"value"}
```

### Delete File

```
curl -i -X DELETE \
   -H "Authorization:Bearer eyJhbGciOiJ...." \
 'http://localhost:4040/api/store/<path>/<file name>.json'
```

Response:

```
true
```
