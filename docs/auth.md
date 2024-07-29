# Auth API Spec

## Sign-up

Endpoint : POST /api/auth/sign-up

Request Body :

```json
{
  "full_name": "Akhyaar Muhammad",
  "email": "akhyaarmuh@gmail.com",
  "password": "123456789Aa"
}
```

Response Body (Success) :

```json
{
  "data": {
    "full_name": "Akhyaar Muhammad",
    "email": "akhyaarmuh@gmail.com",
    "message?": "Email verifikasi sudah terkirim"
  }
}
```

Response Body (Failed) 422 :

```json
{
  "data": {
    "message": "Unprocessable Content",
    "data": {
      "full_name": "Nama lengkap hanya boleh huruf saja",
      "email": "Wajid diisi"
    },
    "error": "Object Error"
  }
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "Email sudah terdaftar | Akun owner sudah ada",
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

## Verify-email

Endpoint : GET /api/auth/verify-email/[token]

Response Body (Success) :

```json
{
  "message": "Verifikasi email berhasil!!!👏"
}
```

Response Body (Failed) 403 :

```json
{
  "message": "Verifikasi token tidak valid"
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

## Sign-in

Endpoint : POST /api/auth/sign-in

Request Body :

```json
{
  "email": "akhyaarmuh@gmail.com",
  "password": "123456789Aa",
  "shop_id?": "600485c9-1b25-11ef-8fce-1078d2db5daf"
}
```

Response Body (Success) :

```json
{
  "data": "[refreshToken]"
}
```

Response Body (Failed) 422 :

```json
{
  "data": {
    "message": "Unprocessable Content",
    "data": {
      "email": "Email tidak valid",
      "password": "Wajid diisi"
    },
    "error": "Object Error"
  }
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "Email atau katasandi salah",
    "data": null,
    "error": "Object Error"
  }
}
```

Response Body (Failed) 403 :

```json
{
  "data": {
    "message": "Akun anda terblokir, hubungi admin | License key has been expired",
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

## Refresh-token

Endpoint : GET /api/auth/refresh-token

Cookies:

- refresh-token = [refreshToken]

Response Body (Success) :

```json
{
  "data": "[accessToken]"
}
```

Response Body (Failed) 403 :

```json
{
  "data": {
    "message": "Akun anda terblokir",
    "data": null,
    "error": "Object Error"
  }
}
```

## Sign-out

Endpoint : DELETE /api/auth/sign-out

Cookies:

- Authorization = Bearer [AccessToken]

## Reset-password

Endpoint : PATCH /api/auth/reset-password

```json
{
  "email": "akhyaarmuh@gmail.com"
}
```

Response Body (Failed) 422 :

```json
{
  "data": {
    "message": "Unprocessable Content",
    "data": {
      "email": "Wajid diisi"
    },
    "error": "Object Error"
  }
}
```

Response Body (Failed) 400 :

```json
{
  "data": {
    "message": "Terjadi kesalahan, silakan hubungi admin",
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
