# URL SHORTNER

## Setup locally and install dependencies

1. Clone the repository by running the command `git clone <repository_url>` on your terminal.
2. After successfully cloning the repository, navigate into the `indicina` folder, then run `npm install` to install all the dependencies
3. In your command line, type `npm start` to start the node server.

## Running Test

1. You can run test by typing `npm test` in your command line, make sure you are in the indicina directory

## Testing the Endpoints

### 1. Encoding the URL

&nbsp; This endpoint shorten the url given and return the shorten version

> ### Parameters

| Method | Endpoint| Body | Parameter | Content Type |
|-|-|-|-|-|
| `POST` | `/api/v1/shortner/encode` | `{url: 'https://indicina.com'}` | null | `application/json` |

> ### Code Sample

```bash
curl -X 'POST' \
  'http://localhost:3300/api/v1/shortner/encode' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
```


### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  "success": true,
  "message": "Encode URL successfully",
  "data": "localhost:3300/A"
}
```

### 2. Decoding the shorten URL

&nbsp; This endpoit decode the shorten URL given, and return the original URL

### Parameters

| Method | Endpoint| Body | Parameter | Content Type |
|-|-|-|-|-|
| `POST` | `/api/v1/shortner/decode` | `{id: 'A'}` | null | `application/json` |

### Code Sample

```bash
curl -X 'POST' \
  'http://localhost:3300/api/v1/shortner/decode' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
```

### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  "success": true,
  "message": "Decode URL successfully",
  "data": "https://masterd.com"
}
```

### 3. Get statistics

&nbsp; This endpoint get the statistics for the given url path.

### Parameters

| Method | Endpoint| Body | Parameter | Content Type |
|-|-|-|-|-|
| `POST` | `/api/v1/shortner/statistics/:id` | null | `{id: 'A'}` | `application/json` |

### Code Sample

```bash
curl -X 'GET' \
  'http://localhost:3300/api/v1/shortner/statistics/:id' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
```

### Sample Response

&nbsp;&nbsp; **Code: 200**

```bash
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "url_path": "A",
    "hits": 17
  }
}
```



