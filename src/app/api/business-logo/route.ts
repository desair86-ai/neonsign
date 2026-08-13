import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const signType = formData.get('signType') as string;
    const size = formData.get('size') as string;
    const details = formData.get('details') as string;
    const budget = formData.get('budget') as string;
    const file = formData.get('file') as File | null;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let attachments = [];
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Neon Sign Builder <onboarding@resend.dev>', // Replace with verified domain in production
      to: 'desai.r.86@gmail.com', // Replace with owner's email
      subject: `New Business Logo Quote Request from ${name}`,
      html: `
        <h2>New Business Logo / Custom Art Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Sign Type:</strong> ${signType || 'Not specified'}</p>
        <p><strong>Approximate Size:</strong> ${size || 'Not specified'}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <br/>
        <h3>Design Details & Requirements:</h3>
        <p>${(details || 'No details provided.').replace(/\n/g, '<br>')}</p>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
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
