To run this API on port 3000 run this command:

`npm run serve`

To run the tests for this API:

`npm run test`

To use the API:

`curl http://localhost:3000/concepts?term={some term}&edgeLimit={some number}&nodeDepth={some number}`

edgeLimit = Optional parameter, must have a value of less than 100
term = The concept term you are searching for.
nodeDepth = How many recursions to go back

Examples:

`curl --location --request GET 'localhost:3000/concepts?term=supreme court&nodeDepth=1`

Will return:

```
{
    "court": {
        "appeals court": {
            "supreme court": {}
        }
    }
}
```

`curl --location --request GET 'localhost:3000/concepts?term=ai&nodeDepth=1'`

Will return:

```
{
    "artificial intelligence": {
        "ai": {}
    },
    "deformable thing": {
        "semisolid": {
            "ai": {}
        }
    },
    "container independent shape": {
        "semisolid": {
            "ai": {}
        }
    },
    "non fluidlike substance": {
        "semisolid": {
            "ai": {}
        }
    },
    "a term": {
        "ai": {}
    },
    "author": {
        "writer": {
            "ai": {}
        }
    },
    "worker": {
        "writer": {
            "ai": {}
        }
    },
    "literate thing": {
        "writer": {
            "ai": {}
        }
    },
    "person": {
        "writer": {
            "ai": {}
        }
    },
    "artist": {
        "writer": {
            "ai": {}
        }
    },
    "communicator": {
        "writer": {
            "ai": {}
        }
    },
    "eloquence": {
        "writer": {
            "ai": {}
        }
    },
    "literate person": {
        "writer": {
            "ai": {}
        }
    },
    "musical artist": {
        "ai": {}
    }
}
```