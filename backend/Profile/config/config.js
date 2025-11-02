import dotenv from 'dotenv'

dotenv.config()
// PORT=3000

// PG_HOST=localhost
// PG_PORT=5432
// PG_USER=postgres
// PG_PASSWORD=sanket
// PG_DATABASE=profile_creation

export const port = process.env.PORT||3000
export const host = process.env.PG_HOST
export const pg_port  = process.env.PG_PORT
export const user = process.env.PG_USER
export const password = process.env.PG_PASSWORD
export const database = process.env.PG_DATABASE