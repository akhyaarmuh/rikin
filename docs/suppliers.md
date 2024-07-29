# Suppliers API Spec

## Create Supplier

Endpoint : POST /api/suppliers

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "name": "D.I.Y",
  "address": "Amuntai"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "name": "D.I.Y",
    "address": "Amuntai",
    "created_at": "2024-04-20T00:37:46.000Z",
    "updated_at": "2024-04-20T00:37:46.000Z"
  }
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "name": "Nama agen hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "name": "Nama agen hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "Agen D.I.Y dengan alamat ini sudah ada",
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

## Get All Supplier

Endpoint : GET /api/suppliers

queries:

- name = string (optional)
- limit = number
- page = number (optional)

Cookies:

- refresh-token = [refreshToken]

Response Body (Success) :

```json
{
  "data": [
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "D.I.Y",
      "address": "Amuntai",
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "Barokah",
      "address": "Barabai",
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    }
  ],
  "rows": 2,
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

# Update Supplier By Id

Endpoint : PATCH /api/suppliers/:id

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "name": "Mr. DIY",
  "address": "Amuntai"
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "name": "Nama agen hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "name": "Nama agen hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body Failed (400) :

```json
{
  "message": "Agen dengan nama dan alamat ini sudah ada",
  "data": null,
  "error": "Object Error"
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

# Delete Supplier By Id

Endpoint : DELETE /api/suppliers/:id

Cookies:

- Authorization = Bearer [AccessToken]

Response Body (Success) :

```json
{
  "data": {
    "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "name": "Mr. DIY",
    "address": "Amuntai",
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
