import * as jwt from "jsonwebtoken";
import { pool } from "../db/pg";
import { EditUser } from "../models/edit-user.model";
import { JwtPayload } from "../models/jwt-payload.model";
import { LoginResponse } from "../models/login-response.model";
import { Login } from "../models/login.model";
import {
    RegisterUser,
    RegisterUserResponse,
} from "../models/register-user.model";
import { UserByIdResponse } from "../models/user-by-id-response.model";
import { comparePassword } from "./encryption.module";

const oneHour = 1000 * 60 * 60;
const JWT_TIMEOUT = process.env.JWT_TIMEOUT ? parseInt(process.env.JWT_TIMEOUT) : oneHour;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
const JWT_ISSUER = process.env.JWT_ISSUER;
const SERVER_SECRET = process.env.SERVER_SECRET;

/**
 * Logs in a user with the provided credentials.
 * @param {Login} credentials - The login credentials of the user.
 * @returns {Promise<LoginResponse>} - The login response containing the user token, user information, and error message (if any).
 */
export async function login(credentials: Login): Promise<LoginResponse> {
    console.log('login');
  const queryString: string = `
        SELECT id, username, password, firstname as "firstName", lastname as "lastName", dob, email, registrationDate
        FROM "users"
        WHERE username = $1;
    `;
  try {
    const { rows } = await pool.query(queryString, [credentials.username]);
    console.info(comparePassword(credentials.password, rows[0].password));
    if (comparePassword(credentials.password, rows[0].password)) {
        console.info('Password matches');
      const { password, ...user } = rows[0];
      console.info('user', user);
      const tokenConfig = {
        expiresIn: Math.floor(Date.now() / 1000) + JWT_TIMEOUT!,
        audience: JWT_AUDIENCE,
        issuer: JWT_ISSUER,
        subject: `${user.id}`,
      };
      console.log('server secret', SERVER_SECRET);
      const token = jwt.sign(user, SERVER_SECRET, tokenConfig);
      console.info('token', token);
      return { token, user, error: "" } as LoginResponse;
    } else {
      return {
        user: null,
        error: "Cannot login at this time. Try again later.",
      } as LoginResponse;
    }
  } catch (error) {
    console.error(error);
    return { user: null, error: "Unable to login." } as LoginResponse;
  }
}

/**
 * Register a new user
 * @param {RegisterUser} user User object needed to create a new account.
 * @returns Object created by registration.
 */
export async function createNewUser(
  user: RegisterUser
): Promise<RegisterUserResponse> {
  const client = await pool.connect();
  const userQuery: string = `
    INSERT INTO "users" (username, password, firstname, lastname, dob, email, registrationdate)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
  `;
  const values = [
    user.username.toLowerCase(),
    user.password,
    user.firstName,
    user.lastName,
    user.dob,
    user.email,
    user.registrationDate,
  ];

  try {
    await client.query("BEGIN");

    const { rows } = await pool.query(userQuery, values);
    const userId: number = rows[0].id;
    const roleQuery: string = `
        INSERT INTO user_roles (user_id, role)
        VALUES ($1, $2)
        RETURNING *;
    `;
    await client.query(roleQuery, [userId, "{user}"]);
    await client.query("COMMIT");
    return rows.length === 1
      ? { user: rows[0], error: null }
      : { user: null, error: "Unable to register at this time." };
  } catch (error: any) {
    if (error.constraint === "users_username_key") {
      return {
        user: null,
        error: "Username not available. Please choose another username.",
      };
    }
    console.error("Problem creating new user", error);
    return { user: null, error: "Unable to register at this time." };
  }
}


/**
 * Get a user by their ID.
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Promise<UserByIdResponse>} - The user response containing the user information and error message (if any).
 */
export async function getUser(userId: number): Promise<UserByIdResponse> {
  const queryText = `
    SELECT users.username, users.firstName, users.lastName, users.dob, users.email, users.createdDate
    FROM "users"
    WHERE users.id = $1 AND users.active = true;
  `;

  try {
    const { rows } = await pool.query(queryText, [userId]);
    if (rows && rows[0]) {
      return { user: rows[0], error: null } as UserByIdResponse;
    } else {
      return { user: null, error: "User not found." } as UserByIdResponse;
    }
  } catch (error) {
    console.error(error);
    return { user: null, error: "User not found." };
  }
}

/**
 * Edit a user by their ID.
 * @param {EditUser} user - The user object with the updated information.
 * @param {number} userId - The ID of the user to edit.
 * @param {string} token - The user token to verify the user.
 * @returns {Promise<UserByIdResponse>} - The user response containing the user information and error message (if any).
 */
export async function editUser(
  user: EditUser,
  userId: number,
  token: string
): Promise<UserByIdResponse> {
  return jwt.verify(
    token,
    process.env.SERVER_SECRET,
    async (err: any, data: JwtPayload) => {
      if (err) {
        return { user: null, error: "Cannot edit user." } as UserByIdResponse;
      }
      if (
        userId !== user.id ||
        userId !== data.id ||
        userId !== parseInt(data.sub)
      ) {
        return { user: null, error: "Cannot edit user" } as UserByIdResponse;
      }

      try {
        const queryText = `
                UPDATE "users"
                SET email = $2,
                WHERE id = $1
                RETURNING *;
            `;
        const { rows } = await pool.query(queryText, [data.id, user.email]);
        if (rows && rows[0]) {
          const { password, ...user } = rows[0];
          return { user: user, error: null } as UserByIdResponse;
        } else {
          return {
            user: null,
            error: "User not found.",
          } as UserByIdResponse;
        }
      } catch (error) {
        console.error(error);
        return { user: null, error: "User not found." } as UserByIdResponse;
      }
    }
  );
}

/**
 * Check if a username is available.
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - True if the username is available, false otherwise.
 */
export async function checkUsername(username: string): Promise<boolean> {
  const queryString: string = `
        SELECT id
        FROM "users"
        WHERE username = $1;
    `;
  try {
    const { rows } = await pool.query(queryString, [username]);
    return rows.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}