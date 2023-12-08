# Cloud DevOpsSec Inventory

## Overview

This repository contains the source code, deployment and infrastructure configuration for a React and Nest.js application. In this project, the infrastructure is provisioned on AWS using terraform and the delivery and integration of the application is automated using GitHub actions. Also, static code analysis is performed using SonarQube.

## Prerequisites

Tools used in the development of this application:

- [AWS](https://aws.amazon.com)
- [Auth0](https://auth0.com/docs/quickstarts)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Terraform](https://www.terraform.io/downloads.html)
- [Doppler CLI](https://docs.doppler.com/docs/enclave/installation)

## Local Development

To run the application locally, follow these steps:

1. Clone the repository
2. On Auth0, create an [Application](https://auth0.com/docs/quickstarts) and an [API](https://auth0.com/docs/quickstarts). Add the the keys to the environment variable of the client and backend application.

```env
# apps/api/.env
CLIENT_ORIGIN_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=<Auth0-api-issuer-base-url>
AUTH0_AUDIENCE=http://localhost:8000
```

```env
# apps/client/.env
VITE_API_URL=http://localhost:8000/api/v1
VITE_AUTH0_DOMAIN=<Auth0-application-domain-name>
VITE_AUTH0_CLIENT_ID=<Auth0-application-client-id>
VITE_AUTH0_CALLBACK_URL=http://localhost:3000/callback
VITE_API_AUTH0_AUDIENCE=http://localhost:8000
```

Alternatively, you can setup the doppler cli and configure a development and production environment

3. To start services:

```bash
docker compose up
```

## Provisioning Infrastructure Using Terraform

- Setup AWS Credentials
- Create an S3 bucket to store the terraform state and add the name of the bucket to the "infra/main" file (backend "s3").
- Initialize Terraform

```bash
terraform init
```

- Create a workspace (development or production)

```bash
 ENV=development make tf-create-workspace
```

- Using the environment, run:

```bash
TF_COMMAND=plan ENV=development make tf
```

- To apply changes, run:

```bash
TF_COMMAND=apply ENV=development make tf
```

- To destroy changes, run:

```bash
TF_COMMAND=destroy ENV=development make tf
```

#### Setup Auth0

##### API

- Create new Auth API "Applications > APIs > Create New API"
- Add to environment variables:

```bash
  AUTH0_ISSUER_BASE_URL=
  AUTH0_AUDIENCE=
```

##### CLIENT

- Create application - Application type: "Single Page Web Application"
- Add "Allowed Callback URLs". e.g. "http://localhost:3000/callback"
- Add "Allowed Logout URLs". e.g. "http://localhost:3000"
- Add "Allowed Web Origins". e.g. "http://localhost:3000"
- Add to environment variables:

```bash
  VITE_AUTH0_DOMAIN=
  VITE_AUTH0_CLIENT_ID=
```
