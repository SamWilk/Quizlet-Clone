CREATE DATABASE quizletClone;

CREATE TABLE studySet(
    id SERIAL PRIMARY KEY NOT NULL,
    setName VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);