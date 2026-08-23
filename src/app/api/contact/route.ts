import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fs = require('fs');
    const path = require('path');
    
    let receivingEmail = 'desai.r.86@gmail.com';
    try {
      const data = fs.readFileSync(path.join(process.cwd(), 'src/lib/contact-info.json'), 'utf8');
      const contactInfo = JSON.parse(data);
      if (contactInfo.receiveEmails) {
        receivingEmail = contactInfo.receiveEmails;
      }
    } catch(e) {}

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Replace with your verified domain in production
      to: receivingEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message from Neon Sign Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
