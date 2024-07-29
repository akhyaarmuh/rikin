# Employe API Spec

## Create Employe

Endpoint : POST /api/employe

Headers:

- Authorization = `Bearer [accessToken]`

Request Body :

```json
{
  "full_name": "Muhammad Akhyar",
  "email": "akhyaarmuh@gmail.com",
  "password": "123456789Aa",
  "role": "admin"
}
```

Response Body (Success) :

```json
{
  "data": {
    "message?": "Email verifikasi sudah terkirim"
  }
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "Email sudah terdaftar",
    "data": null,
    "error": "Object Error"
  }
}
```

Response Body (Failed) 500 :

```json
{
  "data": {
    "message": "Server error || message from server",
    "data": null,
    "error": "Object Error"
  }
}
```

## Get All Employe

Endpoint : GET /api/employe

queries:

- full_name = string (optional)
- limit = number (optional)
- page = number (optional)

Cookies:

- refresh-token = [refreshToken]

Response Body (Success) :

```json
{
  "data": [
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "full_name": "Muhamnmad Akhyar",
      "email": "akhyaar@gmailcom",
      "role": "cashier",
      "status": true,
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    }
  ],
  "rows": 1,
  "page": 1,
  "pages": 1,
  "limit": 20
}
```

Response Body (Failed) 500 :

```json
{
  "data": {
    "message": "Server error || message from server",
    "data": null,
    "error": "Object Error"
  }
}
```

# Update Employe By Id

Endpoint : PATCH /api/employe/:id

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "role": "admin",
  "status": false
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "role": "Kategori hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "role": "Kategori hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body (Failed) 500 :

```json
{
  "data": {
    "message": "Server error || message from server",
    "data": null,
    "error": "Object Error"
  }
}
```

# Delete Employe By Id

Endpoint : DELETE /api/employe/:id

Cookies:

- Authorization = Bearer [AccessToken]

Response Body (Success) :

```json
{
  "data": {
    "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "full_name": "Muhammad Akhyar",
    "email": "akhyar@gmail.com",
    "role": "admin",
    "status": false,
    "created_at": "2024-04-20T01:41:18.000Z",
    "updated_at": "2024-04-20T09:41:54.000Z"
  }
}
```

Response Body (Failed) 500 :

```json
{
  "data": {
    "message": "Server error || message from server",
    "data": null,
    "error": "Object Error"
  }
}
```
