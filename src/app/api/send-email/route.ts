import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
    try {
        const result = await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            html,
        });
        return result;
    } catch (error) {
        throw error;
    }
}

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Check if environment variables are set
        if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            return NextResponse.json(
                { 
                    success: true, 
                    message: 'Email received (demo mode - no actual email sent)',
                    demo: true
                },
                { status: 200 }
            );
        }

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Send contact form email
        await sendEmail({
            to: 'karisamoses392@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px 12px 0 0;">
                            <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Message Received</h1>
                            <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Portfolio Contact Form</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <div style="background-color: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                                <h3 style="margin: 0 0 20px; color: #1e293b; font-size: 20px; font-weight: 600;">Contact Information</h3>
                                <div style="space-y: 15px;">
                                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                        <div style="width: 40px; height: 40px; background: #667eea; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </div>
                                        <div>
                                            <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                                            <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500;">${name}</p>
                                        </div>
                                    </div>
                                    
                                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                        <div style="width: 40px; height: 40px; background: #10b981; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </div>
                                        <div>
                                            <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</p>
                                            <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 500;">${email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 25px;">
                                <h3 style="margin: 0 0 15px; color: #1e293b; font-size: 20px; font-weight: 600;">Message</h3>
                                <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #764ba2;">
                                    <p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                </div>
                            </div>
                            
                            <!-- Quick Reply Button -->
                            <div style="text-align: center;">
                                <a href="mailto:${email}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; transition: transform 0.2s;">
                                    Reply to Message
                                </a>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; background-color: #f8fafc; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">
                                This message was sent from your portfolio contact form
                            </p>
                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                                ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `
        });

        // Send confirmation email to user
        await sendEmail({
            to: email,
            subject: 'Message Confirmation - Thank You for Contacting Me',
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Me</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px 12px 0 0;">
                            <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Message Received!</h1>
                            <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Thank you for reaching out</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px; color: #1e293b; font-size: 16px; line-height: 1.6;">
                                Hi <strong>${name}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 25px; color: #475569; font-size: 15px; line-height: 1.6;">
                                Thank you for contacting me through my portfolio! I've received your message and I'm excited to connect with you. I typically respond within 24-48 hours, but I'll do my best to get back to you as soon as possible.
                            </p>
                            
                            <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <h3 style="margin: 0 0 10px; color: #059669; font-size: 16px; font-weight: 600;">Your Message:</h3>
                                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin-top: 10px;">
                                    <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                </div>
                            </div>
                            
                            <!-- Social Links -->
                            <div style="margin: 30px 0;">
                                <h3 style="margin: 0 0 15px; color: #1e293b; font-size: 18px; font-weight: 600; text-align: center;">Connect With Me</h3>
                                <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                                    <a href="https://github.com/mosesmkrs" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #1e293b; font-size: 14px; font-weight: 500; transition: all 0.2s;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        GitHub
                                    </a>
                                    
                                    <a href="https://linkedin.com/in/moses-karisa-11526127a" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #1e293b; font-size: 14px; font-weight: 500; transition: all 0.2s;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077b5">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                        </svg>
                                        LinkedIn
                                    </a>
                                    
                                    <a href="https://t.me/mosesmkrs" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; text-decoration: none; color: #1e293b; font-size: 14px; font-weight: 500; transition: all 0.2s;">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0088cc">
                                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                        </svg>
                                        Telegram
                                    </a>
                                </div>
                            </div>
                            
                            <!-- Response Time Info -->
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 25px 0;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 40px; height: 40px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 style="margin: 0 0 5px; color: #92400e; font-size: 14px; font-weight: 600;">Response Time</h4>
                                        <p style="margin: 0; color: #78350f; font-size: 13px; line-height: 1.5;">
                                            I typically respond within 24-48 hours. For urgent matters, feel free to reach out via Telegram for faster response.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 30px 40px; text-align: center; background-color: #f8fafc; border-radius: 0 0 12px 12px; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 15px; color: #1e293b; font-size: 16px; font-weight: 600;">Best regards,</p>
                            <p style="margin: 0 0 8px; color: #1e293b; font-size: 18px; font-weight: 600;">Moses Karisa</p>
                            <p style="margin: 0; color: #64748b; font-size: 13px;">
                                Software Engineer | Full Stack Developer 
                            </p>
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                                <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                                    This is an automated confirmation. I'll personally respond to your message soon.
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `
        });

        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}