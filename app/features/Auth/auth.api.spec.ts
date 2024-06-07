import { it, expect, describe, vi } from 'vitest'
import { login } from './auth.api'
import { db } from "~/db/__mocks__/db.server"
import bcrypt from "bcryptjs";

const credentials = {
  email: 'teste@test.com',
  password: '123456'
}

vi.mock("~/db/db.server")

describe("auth.api", () => {
  describe("login", () => {
    it('should return a user when login is successful', async () => {
      const user = {
        id: 1,
        name: 'Tester Testing',
        email: 'teste@test.com',
        password: await bcrypt.hash('123456',10),
        city: 'SP',
        state: 'SP'
      }
      db.user.findUnique.mockResolvedValue(user)

      expect(await login(credentials)).toStrictEqual(user)
    })

    it('should return an error when password for login is incorrect', async () => {
      const user = {
        id: 1,
        name: 'Tester Testing',
        email: 'teste@test.com',
        password: await bcrypt.hash('1231233212312',10),
        city: 'SP',
        state: 'SP'
      }
      db.user.findUnique.mockResolvedValue(user)

      expect(login(credentials)).rejects.toThrow("Invalid password")
    })

    it('should return an error when login is not successful', async () => {
      db.user.findUnique.mockResolvedValue(null)

      expect(login(credentials)).rejects.toThrow("User not found")
    })
  })
})
