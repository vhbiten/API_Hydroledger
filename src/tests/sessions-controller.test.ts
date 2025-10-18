import request from "supertest"
import { app } from "@/app"
import { response } from "express";
import { prisma } from "@/database/prisma";

const testEmail = "test@example.com";

describe("SessionsController", () => {
    
    it("should authenticate a and get access token", async () => {
        await request(app).post("/users").send({
            name: "Test User",
            password: "password123",
            email: testEmail
        })

        const sessionResponse = await request(app).post("/sessions").send({
            email: testEmail,
            password: "password123"
        })

        expect(sessionResponse.status).toBe(200);
        expect(sessionResponse.body.token).toEqual(expect.any(String));
    });
});

afterAll(async () => {
    await prisma.user.deleteMany({
        where: { email: testEmail }
    })
    await prisma.$disconnect()
});