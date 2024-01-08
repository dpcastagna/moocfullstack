
sudo docker-compose up

sudo docker build -t todo-back-prod .  

sudo docker build -t todo-front-prod .  

## Fullstack dev run command:  
sudo docker compose -f docker-compose.dev.yml up  
## Backend dev build command:  
sudo docker build -f ./dev.Dockerfile -t todo-back-dev .  
## Frontend dev build command:  
sudo docker build -f ./dev.Dockerfile -t todo-front-dev .  