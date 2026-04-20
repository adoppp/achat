# Achat architecture

1. [Routing](#routing)
2. [User & Data Flow](#user--data-flow)

## Routing
```
/auth
  /login
  /register

/app
  /chats
  /chat/:chatId
  /settings
  /profile/:userId
```

**Access logic:**
| Route | Access |
|-------|--------|
| /auth/* | without auth |
| /app/* | with auth | 

**Routes protection**
- user isn't logged in -> redirect /auth/login
- user is logged in -> /app/chats

## User & Data Flow

1. *Chats list(user logged in):*
    - App start
    - subscribe(chats where userId)
    - render chat list (sorted by lastActivity)

2. *Open chat(user logged in):*
    - click chat
    - route /chat/:chatId
    - subscribe messages(chatId)
    - subscribe reads(chatId)