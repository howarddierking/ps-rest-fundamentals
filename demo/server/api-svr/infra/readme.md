To setup the base infrastructure

```
aws cloudformation deploy --stack-name ps-rest-fun --template-file template.yaml --profile ps-rest-fun
```

To seed the database with startup data

```
aws dynamodb batch-write-item --profile ps-rest-fun --request-items file://seed-data.json
```
