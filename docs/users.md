# USERS API Spec

# Update User By Id

Endpoint : PATCH /api/users/:id

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "full_name": "Nuur Azizah"
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "full_name": "Kategori hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "full_name": "Kategori hanya boleh terdiri dari huruf dan angka"
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

# Update User Password By Id

Endpoint : PATCH /api/users/:id/reset-password

Cookies:

- Authorization = Bearer [AccessToken]

Response Body (Success) :

```json
{
  "data": {
    "password": "Rahasia123",
    "newPassword": "RahasiaSekali123"
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
