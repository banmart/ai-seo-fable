import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, domain, formType } = await request.json();

    if (!email || !domain) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Gobiya <onboarding@resend.dev>', // Using default onboarding email; change to a verified domain like deploy@gobiya.com later
      to: ['banmart@gmail.com'],
      subject: `New Lead: ${formType} from ${domain}`,
      html: `
        <h2>New Request Received</h2>
        <p><strong>Form:</strong> ${formType}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Domain:</strong> ${domain}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
