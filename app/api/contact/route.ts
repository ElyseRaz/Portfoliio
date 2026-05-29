import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['erazafindravonjy@gmail.com'],
      replyTo: email,
      subject: `📩 Nouveau message de ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#1D6FA4;margin-bottom:24px">Nouveau message depuis le portfolio</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;font-weight:600;color:#444;width:100px">Nom&nbsp;:</td>
              <td style="padding:10px 0;color:#222">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-weight:600;color:#444">Email&nbsp;:</td>
              <td style="padding:10px 0"><a href="mailto:${email}" style="color:#2A8BC4">${email}</a></td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
          <p style="font-weight:600;color:#444;margin-bottom:8px">Message&nbsp;:</p>
          <p style="color:#222;line-height:1.7;white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur contact:', error);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}
