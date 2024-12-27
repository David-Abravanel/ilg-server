CREATE TABLE IF NOT EXISTS posts (
    id CHAR(36) PRIMARY KEY DEFAULT(UUID()),
    userId INT NOT NULL,                    
    title VARCHAR(255) NOT NULL,            
    body TEXT NOT NULL,                     
    comments TEXT                       
);
