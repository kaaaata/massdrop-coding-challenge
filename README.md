# Bootstrapping Instructions:  
1. Install dependencies: npm install  
2. Start server on 3001: npm run server  
3. Create Postgres database (need Postgres): createdb massdrop-catherine-han  
  
# API Usage Instructions:  
1. Add new job to queue: POST "/enqueue/:url" (curl -X POST http://localhost:3001/enqueue/<URL>)  
2. Check status of job: GET "/:id" (http://localhost:3001/<ID>)  
