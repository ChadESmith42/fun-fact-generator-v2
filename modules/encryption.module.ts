import * as bcrypt from 'bcryptjs';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { config } from 'dotenv';
config();

const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR ? parseInt(process.env.SALT_WORK_FACTOR) : 10;

export function encryptPassword(password: string): string {
    const salt = genSaltSync(SALT_WORK_FACTOR);
    return hashSync(password, salt);
}

export function comparePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
}
