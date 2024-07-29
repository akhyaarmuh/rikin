# Units API Spec

## Create Unit

Endpoint : POST /api/units

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "name": "pcs"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "name": "pcs",
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
    "name": "Kategori hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "name": "Kategori hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "Satuan ini sudah ada",
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

## Get All Unit

Endpoint : GET /api/units

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
      "name": "pcs",
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "Kotak",
      "created_at": "2024-04-20T01:10:53.000Z",
      "updated_at": "2024-04-20T01:10:53.000Z"
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "Keping",
      "created_at": "2024-04-20T01:11:05.000Z",
      "updated_at": "2024-04-20T01:11:05.000Z"
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "Botol",
      "created_at": "2024-04-20T01:11:16.000Z",
      "updated_at": "2024-04-20T01:11:16.000Z"
    }
  ],
  "rows": 4,
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

# Update Unit By Id

Endpoint : PATCH /api/units/:id

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "name": "Box"
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "name": "Satuan hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "name": "Satuan hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body Failed (400) :

```json
{
  "message": "Satuan ini sudah ada | Duplicate field",
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

# Delete Unit By Id

Endpoint : DELETE /api/units/:id

Cookies:

- Authorization = Bearer [AccessToken]

Response Body (Success) :

```json
{
  "data": {
    "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "name": "pcs",
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
