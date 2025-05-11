# fullstack_task_raunak


the client folder contains a react browser client
each client connects to the mqtt broker and subscribes to topic '/add'

the server folder contains a nodejs ts server 
the server connects to the mqtt broker and subscribes to topic '/add'

when any client from a browser adds a new todo,
the client sends a message to the broker 

all client subscribers get the message and refresh the notes list
server subscriber gets the message and updates the redis cache and performs a flush to mongodb if required

the server also responds to /fetchAllTasks route and retrieves all the tasks that have been added to the topic '/add'



from client
```
cd client
```
```
npm install
```

```
npm run dev
```


from server
```
cd server
```
```
npm install
```

```
npm run start
```

