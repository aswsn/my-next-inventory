// app/actions/auth-actions.ts
"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

// Server Action: Login
export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // จำลองการตรวจสอบ (ในโปรเจกต์จริงต้องตรวจสอบกับ Database)
  if (email === "admin@example.com" && password === "password") {
    // สร้าง Session Cookie
    const cookieStore = await cookies()
    cookieStore.set("session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 วัน
    })

    // Redirect ไปหน้า Dashboard
    redirect("/dashboard")
  }

  // ถ้า Login ไม่สำเร็จ
  return { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }
}

// Server Action: Logout
export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}

// ตรวจสอบ Session
export async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get("session")?.value
}