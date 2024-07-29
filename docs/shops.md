# Shops API Spec

## CREATE SHOP

Endpoint : POST /api/shops

Headers:

- Authorization = `Bearer [accessToken]`

Request Body :

```json
{
  "name": "NW Store",
  "no_hp": "082354566666",
  "address": "Amuntai, Ds. Tigarun RT. 03 No. 03"
}
```

Response Body (Success) :

```json
{
  "data": {
    "name": "NW Store"
  }
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "Toko sudah ada",
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

## GET ALL SHOP

Endpoint : GET /api/shops

Cookies:

- refresh-token = `[refreshToken]`

queries:

- page = number (optional)
- limit = number (optional)

Response Body (Success) :

```json
{
  "data": [
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "NW Store",
      "no_hp": "082354566666",
      "address": "Amuntai",
      "expired_at": "date"
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "NW Store",
      "no_hp": "082354566666",
      "address": "Barabai",
      "expired_at": "date"
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "NW Store",
      "no_hp": "082354566666",
      "address": "Pamangkih",
      "expired_at": "date"
    }
  ],
  "rows": 3,
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

## UPDATE LICENSE KEY

Endpoint : PATCH /api/shops/:shop_id/activate-shop

Headers:

- Authorization = `Bearer [accessToken]`

Request Body :

```json
{
  "license_key": "zgs56dg4165s1g641e85t641gf.4ytg6s841g6s4g6"
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "License key is not valid | License key is used",
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
