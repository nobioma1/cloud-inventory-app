# cloud_devopsec_inventory

### Setting up application for development

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
- Add "Allowed Callback URLs". e.g. "http://localhost:5173/callback"
- Add "Allowed Logout URLs". e.g. "http://localhost:4040"
- Add "Allowed Web Origins". e.g. "http://localhost:4040"
- Add to environment variables:

```bash
  VITE_AUTH0_DOMAIN=
  VITE_AUTH0_CLIENT_ID=
```


