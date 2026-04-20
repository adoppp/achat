# Achat architecture

1. [File system]()
2. [Routing](#routing)
3. [User & Data Flow](#user--data-flow)
4. [STATE LAYER](#state-layer)
5. [Service Layer](#service-layer)
6. [Two types of persistence](#two-types-of-persistence)
7. [Architecture system](#architecture-system)
8. [Critical constraints](#critical-constraints-important-for-correctness)
9. [Simple workflow](#simple-workflow)
10. [DB](#db)


## File system

```c#
----/src
    ----/assets
        ----/img
        ----/svg
    ----/components
        // shared
    ----/constants
    ----/firebase
        // config
    ----/hooks
    ----/layouts
    ----/pages
    ----/routing
        // config
        ----/routes
            // restricted, private routes etc.
    ----/services
    ----/store
        ----/authSlice
        ----/chatsSlice
        ----/messagesSlice
        ----/uiSlice
    ----/styles
    ----/types
    ----/ui
        // ui components (for example: button, input etc.)
    ----/utils
```

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

1. *Chats list (user logged in):*
    - App start
    - Auth check
    - subscribe(chats where userId)
    - store.chats updated
    - UI renders sorted by lastActivity

Notes:
- lastActivity = primary sorting key
- chat list is global subscription (App Shell level)

2. *Open chat (user logged in):*
    - click chat
    - check cache (store.messages[chatId])
    - if empty → attach Firestore subscription
    - subscribe messages(chatId)
    - subscribe reads(chatId)

3. *Send message (user logged in):*
    - user types message
    - optimistic update (store)
    - write Firestore message
    - update chat.lastMessage
    - update chat.lastActivity

3. *Read receipts (user logged in):*
    - open chat
    - update reads/{userId}
    - UI recalculates "read/unread"

## STATE LAYER

Redux is used as runtime cache (RAM layer).

```
auth:
  user

chats:
  items[]
  activeChatId

messages:
  byChatId{
    [chatId]: messages[]
  }

ui:
  loadingStates
  typingIndicators
```

Cache rules:
- Chats:
    - always cached globally
    - updated via onSnapshot
- Messages:
    - cached per chatId
    - lifecycle-bound (enter/leave chat)

## Service Layer
**Responsibilities:**
- subscriptions
- queries
- writes
- normalization

**Example responsibilities:**
```ts
subscribeChats()
subscribeMessages()
sendMessage()
updateLastActivity()
updateReadState()
```

## Two types of persistence
1. Redux (RAM cache)
    - lost on reload
2. Firestore IndexedDB cache
    - survives reload
    - offline support

```
Firestore SDK
IndexedDB (browser)
sync on reconnect
```
**Offline / Reconnect behavior (NEW)**
- *offline:*
  - UI -> Redux cache -> IndexedDB fallback

- *online:*
  - IndexedDB -> Firestore sync -> onSnapshot -> Redux update

## Architecture system
```Mermaid
flowchart TD
    UI[UI / React Components] --> RG[Route Guards]
    RG --> AS[App Shell]

    AS --> STORE[State Layer - Redux RAM Cache]
    AS --> SVC[Service Layer]

    SVC --> FB[Firebase SDK]

    FB --> IDB[IndexedDB Offline Cache]

    FB --> USERS[Users Collection]
    FB --> CHATS[Chats Collection]
    FB --> MSG[Messages Subcollection]
    FB --> READS[Read Receipts]
```

## Critical constraints (important for correctness)
1. Forbidden patterns:
    - Firebase calls inside components directly
    - no cache layer
    - per-message read updates
    - uncontrolled subscriptions
2. Required patterns:
    - single source of truth = Firestore
    - Redux = UI cache only
    - subscriptions = lifecycle-bound
    - read state = cursor-based

## Simple workflow 
```Mermaid
flowchart TD
    UI[React UI]

    UI -->|read| STORE[Redux State]
    UI -->|actions| SVC[Service Layer]

    SVC --> FB[Firebase]

    FB --> SVC
    SVC --> STORE
    STORE --> UI
```

## DB

```
Firestore (main data)
 ├── users
 ├── chats
    └── messages (subcollection)
    └── reads (subcollection)

RTDB (реaltime signals)
 ├── typing
 └── presence
```

*users*
```ts
users/{userId} {
    username: "daniil",
    phone: "121213"
    createdAt: timestamp,
    lastSeen: timestamp
}
```
role:
- профиль
- lastSeen (No realtime)

*chats*
```ts
chats/{chatId} {
    members: ["user1", "user2"],
    lastMessage: {
        text: "hello",
        userId: "user1",
        createdAt: timestamp
    },
    lastActivity: timestamp,
    createdAt: timestamp,
    type: "private" // or group
}
```

indexes:
- members array-contains
- lastActivity desc

*messages (subcollection)*
```ts
chats/{chatId}/messages/{messageId} {
    text: "hello",
    senderId: "user1",
    type: "text" // "audio"
    createdAt: timestamp,
    edited: true,
    editedAt: timestamp
}
```

rules:
- only append (dont reduct too oft)
- sort by createdAt

*reads (subcollection)*
```ts
chats/{chatId}/reads/{userId} {
    lastReadAt: timestamp
}
```

*typing*
```ts
typing/{chatId} {
    user1: true,
    user2: false
}
```

details:
- oft updates
- ephemeral (temp data)

*presence*
```ts
presence/{userId} {
    state: "online", // offline
    lastChanged: timestamp
}
```

*relations*

```
users ↔ chats (members array)
chats → messages (subcollection)
chats → reads (subcollection)
```