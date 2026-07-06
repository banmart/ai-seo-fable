import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimited, clientIp } from '../_lib/toolkit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function POST(request) {
  try {
    if (rateLimited(clientIp(request), 5, 'contact')) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const email = String(body.email ?? '').trim().slice(0, 254);
    const domain = String(body.domain ?? '').trim().slice(0, 200);
    const formType = String(body.formType ?? 'Contact').trim().slice(0, 100);

    if (!email || !domain) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 });
    }

    // Initialize inside the handler to prevent Vercel build errors if the env var isn't set yet
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Gobiya <onboarding@resend.dev>', // Using default onboarding email; change to a verified domain like hello@gobiya.com later
      to: ['banmart@gmail.com'],
      replyTo: email,
      subject: `New Lead: ${formType} from ${domain}`.slice(0, 200),
      html: `
        <h2>New Request Received</h2>
        <p><strong>Form:</strong> ${escapeHtml(formType)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Domain:</strong> ${escapeHtml(domain)}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Could not send your request. Try again shortly.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, id: data?.id ?? null }, { status: 200 });
  } catch (err) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
