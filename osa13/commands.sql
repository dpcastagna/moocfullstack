CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes numeric DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Testaaja', 'http://testaus.fi', 'Kaikki testauksesta', 0);
insert into blogs (author, url, title, likes) values ('Mestaaja', 'http://mestaus.fi', 'Kaikki mestauksesta', 0);