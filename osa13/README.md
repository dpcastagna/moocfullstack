# Docker psql commands
docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres  
tai käynnistä aiemmin käynnistetty container docker desktopista  
  
docker ps  
docker exec -it idtähändockerpsstätaigeneroitunimidockerdesktopista psql -U postgres postgres  
  
docker exec -it strange_pasteur psql -U postgres postgres  

# Node commands

start with nodemon: npm run dev  