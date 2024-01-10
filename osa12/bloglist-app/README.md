Backend needs .env file with:  
MONGODB_URI=mongodb+srv://-----------------  
PORT=3003  
SECRET=-----------------  
  
  

sudo docker-compose up  

sudo docker build -t bloglist-back-prod .  

sudo docker build -t bloglist-front-prod .  

## Fullstack dev run command:  
sudo docker compose -f docker-compose.dev.yml up  
## Backend dev build command:  
sudo docker build -f ./dev.Dockerfile -t bloglist-back-dev .  
## Frontend dev build command:  
sudo docker build -f ./dev.Dockerfile -t bloglist-front-dev .  