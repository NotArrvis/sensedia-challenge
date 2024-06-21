package services

import (
	"context"
	"time"
    "math/big"
	"crypto/rand"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
    ID        string 	`json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
	Weekdays  string    `json:"weekdays"`
	Cities    string    `json:"cities"`
    Password  string    `json:"-"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
	
}
type UserPayload struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Weekdays string `json:"weekdays"`
	Cities   string `json:"cities"`
}
type UsersList struct {
	Users []User `json:"users"`
}

func (u *User) GetAllUsers() ([]*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `SELECT id, name, email, weekdays, cities, created_at, updated_at FROM users`
	rows, err := db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	var users []*User
	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID,
			&user.Name,
			&user.Email,
			&user.Weekdays,
			&user.Cities,
			&user.CreatedAt,
			&user.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, &user)
	}
	return users, nil
}

func (u *User) GetUserByID(id string) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `SELECT id, name, email, weekdays, cities, created_at, updated_at FROM users WHERE id = $1`
	row := db.QueryRowContext(ctx, query, id)
	err := row.Scan(
		&u.ID,
		&u.Name,
		&u.Email,
		&u.Weekdays,
		&u.Cities,
		&u.CreatedAt,
		&u.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func generateRandomPassword(length int) (string, error) {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var result string
    for i := 0; i < length; i++ {
        num, err := rand.Int(rand.Reader, big.NewInt(int64(len(letters))))
        if err != nil {
            return "", err
        }
        result += string(letters[num.Int64()])
    }
    return result, nil
}

func (u *User) CreateUser(user User) (*User, error) {
    ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
    defer cancel()

    randomPassword, err := generateRandomPassword(12)
    if err != nil {
        return nil, err
    }
    user.Password = randomPassword

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        return nil, err
    }

    query := `INSERT INTO users (id, name, email, weekdays, cities, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, name, email, weekdays, cities, created_at, updated_at`
err = db.QueryRowContext(ctx, query, user.ID, user.Name, user.Email, user.Weekdays, user.Cities, hashedPassword, time.Now(), time.Now()).Scan(&user.ID, &user.Name, &user.Email, &user.Weekdays, &user.Cities, &user.CreatedAt, &user.UpdatedAt)
    if err != nil {
        return nil, err
    }
    user.Password = "" // Clear the password before returning
    return &user, nil
}

func (u *User) UpdateUser(id string, body User) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `UPDATE users SET name = $1, email = $2, updated_at = $3 WHERE id = $4`
	_, err := db.ExecContext(ctx, query, body.Name, body.Email, body.Weekdays, body.Cities, time.Now(), id)
	if err != nil {
		return  nil, err
	}
	return &body,nil
}

func (u *User) DeleteUser(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()
	query := `DELETE FROM users WHERE id = $1`
	_, err := db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}
	return nil
}