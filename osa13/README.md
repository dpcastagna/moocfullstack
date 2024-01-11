# Docker psql commands
docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres  
docker ps  
docker exec -it idtähändockerpsstä psql -U postgres postgres