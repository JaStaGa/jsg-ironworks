import { NextResponse } from "next/server"
import { z } from "zod"
import nodemailer from "nodemailer"

const S = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    message: z.string().optional(),
})

export async function POST(req: Request) {
    try {
        const form = await req.formData()
        const data = Object.fromEntries(form) as Record<string, string>
        const parsed = S.safeParse(data)
        if (!parsed.success) {
            return NextResponse.json({ ok: false, msg: "Invalid input" }, { status: 400 })
        }

        // Ethereal test account for demo
        const test = await nodemailer.createTestAccount()
        const transporter = nodemailer.createTransport({
            host: test.smtp.host,
            port: test.smtp.port,
            secure: test.smtp.secure,
            auth: { user: test.user, pass: test.pass },
        })

        const info = await transporter.sendMail({
            from: `"JSG Ironworks" <no-reply@ironworks.test>`,
            to: parsed.data.email,
            subject: "Thanks for reaching out",
            text: `Hi ${parsed.data.name}, we received your message:\n\n${parsed.data.message ?? ""}`,
            html: `<p>Hi ${parsed.data.name},</p><p>We received your message:</p><blockquote>${parsed.data.message ?? ""}</blockquote>`,
        })

        return NextResponse.json({
            ok: true,
            msg: "Submitted. This is a demo using Ethereal.",
            preview: nodemailer.getTestMessageUrl(info),
        })
    } catch (e) {
        return NextResponse.json({ ok: false, msg: "Server error" }, { status: 500 })
    }
}
