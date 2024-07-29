# Products API Spec

## Create Product

Endpoint : POST /api/products

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "name": "Head&Shoulders Anti Apek 70ml",
  "category_id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
  "description": "",
  "min_stock": 3, //minimal stok dalam satuan terkecil
  "unit_detail": [
    {
      "unit_id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "code": "123",
      "quantity": 1,
      "price": 15000,
      "sale_price": 14500
    }
  ],
  "stock_detail": [
    {
      "capital": 13500, // modal dalam harga satuan terbesar
      "stock": 12 // jumlah stok dalam satuan terbesar
    }
  ]
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "name": "Twisko 100gr",
    "category_id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "description": "",
    "min_stock": 60,
    "created_at": "2024-05-25T01:02:50.000Z",
    "updated_at": "2024-05-25T01:02:50.000Z"
  }
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "name": "Nama produk hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "name": "Nama produk hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "Produk ini sudah ada | Kode produk ini sudah digunakan",
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

## Get All Product

Endpoint : GET /api/products

queries:

- category_id = string (optional)
- name = string (optional)
- code = string (optional)
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
      "name": "Twisko 100gr",
      "description": null,
      "min_stock": 60,
      "category": {
        "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
        "name": "Snack"
      },
      "product_unit_details": [
        {
          "id": "f95eb748-1b52-11ef-8fce-1078d2db5daf",
          "code": "111",
          "quantity": 1,
          "unit": {
            "name": "pcs"
          },
          "price": [
            {
              "price": 1000,
              "sale_price": 0
            }
          ]
        },
        {
          "id": "f95eb748-1b52-11ef-8fce-1078d2db5daf",
          "code": "222",
          "quantity": 60,
          "unit": {
            "name": "Kotak"
          },
          "price": [
            {
              "price": 59000,
              "sale_price": 0
            }
          ]
        }
      ],
      "product_stock_details": [
        {
          "capital": 57000,
          "stock": 360
        }
      ]
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "Paramex",
      "description": "Bukan untuk migren",
      "min_stock": 50,
      "category": {
        "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
        "name": "Obat"
      },
      "product_unit_details": [
        {
          "id": "f95eb748-1b52-11ef-8fce-1078d2db5daf",
          "code": "654",
          "quantity": 1,
          "unit": {
            "name": "Keping"
          },
          "price": [
            {
              "price": 4000,
              "sale_price": 0
            }
          ]
        },
        {
          "id": "f95eb748-1b52-11ef-8fce-1078d2db5daf",
          "code": "321",
          "quantity": 50,
          "unit": {
            "name": "Kotak"
          },
          "price": [
            {
              "price": 152000,
              "sale_price": 0
            }
          ]
        }
      ],
      "product_stock_details": [
        {
          "capital": 150000,
          "stock": 300
        }
      ]
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "Hanasui Whitening Gold 20ml",
      "description": null,
      "min_stock": 2,
      "category": {
        "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
        "name": "Kosmetik"
      },
      "product_unit_details": [
        {
          "id": "f95eb748-1b52-11ef-8fce-1078d2db5daf",
          "code": "987",
          "quantity": 1,
          "unit": {
            "name": "Kotak"
          },
          "price": [
            {
              "price": 23000,
              "sale_price": 0
            }
          ]
        }
      ],
      "product_stock_details": [
        {
          "capital": 21000,
          "stock": 6
        }
      ]
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "Hanasui Anti Acne 20ml",
      "description": null,
      "min_stock": 2,
      "category": {
        "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
        "name": "Kosmetik"
      },
      "product_unit_details": [
        {
          "id": "f95eb748-1b52-11ef-8fce-1078d2db5daf",
          "code": "789",
          "quantity": 1,
          "unit": {
            "name": "Kotak"
          },
          "price": [
            {
              "price": 23000,
              "sale_price": 0
            }
          ]
        }
      ],
      "product_stock_details": [
        {
          "capital": 21000,
          "stock": 6
        }
      ]
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "Head&Shoulders Menthol 70ml",
      "description": null,
      "min_stock": 3,
      "category": {
        "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
        "name": "Shampoo"
      },
      "product_unit_details": [
        {
          "id": "f95eb748-1b52-11ef-8fce-1078d2db5daf",
          "code": "456",
          "quantity": 1,
          "unit": {
            "name": "Botol"
          },
          "price": [
            {
              "price": 15000,
              "sale_price": 14500
            }
          ]
        }
      ],
      "product_stock_details": [
        {
          "capital": 13500,
          "stock": 12
        }
      ]
    },
    {
      "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
      "name": "Head&Shoulders Anti Apek 70ml",
      "description": null,
      "min_stock": 3,
      "category": {
        "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
        "name": "Shampoo"
      },
      "product_unit_details": [
        {
          "id": "f95eb748-1b52-11ef-8fce-1078d2db5daf",
          "code": "123",
          "quantity": 1,
          "unit": {
            "name": "Botol"
          },
          "price": [
            {
              "price": 15000,
              "sale_price": 14500
            }
          ]
        }
      ],
      "product_stock_details": [
        {
          "capital": 13000,
          "stock": 12
        },
        {
          "capital": 13500,
          "stock": 12
        }
      ]
    }
  ],
  "rows": 6,
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

## Get All Product For Sale

Endpoint : GET /api/products

queries:

- name = string (optional)
- limit = number (optional)
- page = number (optional)

Cookies:

- refresh-token = [refreshToken]

```json
{
  "data": [
    {
      "id": 2,
      "code": "123",
      "quantity": 60,
      "product": {
        "id": 1,
        "name": "Paramex",
        "product_stock_details": [{ "stock": 20 }, { "stock": 35 }]
      },
      "unit": { "name": "Kotak" },
      "price": [{ "price": 120000, "sale_price": 118000 }]
    }
  ],
  "rows": 6,
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

## Get Product By Code

Endpoint : GET /api/products/:code/code

Cookies:

- refresh-token = [refreshToken]

Response Body (Success) :

```json
{
  "id": "d156ef18-22ff-11ef-9339-1078d2db5daf",
  "unit_detail_id": "d156ef18-22ff-11ef-9339-1078d2db5daf",
  "code": "222",
  "name": "Twisko 100gr",
  "unit_name": "Kotak",
  "prices": { "price": 59000, "sale_price": 0 },
  "stock": 6
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "Produk tidak ditemukan",
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

## Update Product By Id

Endpoint : PATCH /api/products/:id

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "name": "Head&Shoulders Anti Apek 70ml",
  "category_id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
  "description": "",
  "min_stock": 3 //minimal stok dalam satuan terkecil
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "name": "Nama produk hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "name": "Nama produk hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body Failed (400) :

```json
{
  "message": "Produk ini sudah ada | Duplicate field",
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

## Update Product Code By Id

Endpoint : PATCH /api/products/:product_unit_detail_id/code

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "code": "56416541651656"
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "code": "Kode produk hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "code": "Kode produk hanya boleh terdiri dari huruf dan angka"
    }
  }
}
```

Response Body Failed (400) :

```json
{
  "message": "Kode produk ini sudah digunakan | Duplicate field",
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

## Update Product Price By Id

Endpoint : PATCH /api/products/:product_unit_detail_id/price

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "price": 15000,
  "sale_price": 14000
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "code": "Kode produk hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "code": "Kode produk hanya boleh terdiri dari huruf dan angka"
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

## Update Product Stock By Id

Endpoint : PATCH /api/products/:product_id/stock

Cookies:

- Authorization = Bearer [AccessToken]

Request Body :

```json
{
  "stock_detail": [
    { "capital": 5000, "stock": 16 },
    { "capital": 4800, "stock": 8 }
  ]
}
```

Response Body Failed (422) :

```json
{
  "message": "Unprocessable Content",
  "data": {
    "capital": "Modal hanya boleh terdiri dari huruf dan angka"
  },
  "error": {
    "statusCode": 422,
    "data": {
      "capital": "Modal hanya boleh terdiri dari huruf dan angka"
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

## Delete Product By Id

Endpoint : DELETE /api/products/:id

Cookies:

- Authorization = Bearer [AccessToken]

Response Body (Success) :

```json
{
  "data": {
    "id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "name": "Twisko 100gr",
    "category_id": "600485c9-1b25-11ef-8fce-1078d2db5daf",
    "description": "",
    "min_stock": 60,
    "created_at": "2024-05-25T01:02:50.000Z",
    "updated_at": "2024-05-25T01:02:50.000Z"
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
