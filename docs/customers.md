# Customers API Spec

## Create Customer

Endpoint : POST /api/customers

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "full_name": "Muhammad Akhyar",
  "address": "Amuntai"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "full_name": "Muhammad Akhyar",
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
    "full_name": "Nama lengkap hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "full_name": "Nama lengkap hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "Pelanggan Muhammad Akhyar dengan alamat ini sudah ada",
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

## Get All Customer

Endpoint : GET /api/customers

queries:

- full_name = string (optional)
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
      "full_name": "Muhammad AKhyar",
      "address": "Amuntai",
      "created_at": "2024-04-20T00:37:46.000Z",
      "updated_at": "2024-04-20T00:37:46.000Z"
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "full_name": "Nuur Azizah",
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

# Update Customer By Id

Endpoint : PATCH /api/customers/:id

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "full_name": "Muhammad Hilmi",
  "address": "Amuntai"
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "full_name": "Nama lengkap hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "full_name": "Nama lengkap hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body Failed (400) :

```json
{
  "message": "Pelanggan dengan nama dan alamat ini sudah ada",
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

# Delete Customer By Id

Endpoint : DELETE /api/customers/:id

Cookies:

- Authorization = Bearer [AccessToken]

Response Body (Success) :

```json
{
  "data": {
    "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "full_name": "Liana Fitriani",
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
