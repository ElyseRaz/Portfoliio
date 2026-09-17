import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0B1220 0%, #14243A 55%, #1D3654 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 18,
            background: 'linear-gradient(135deg, #2A8BC4 0%, #5BBCE8 100%)',
            marginBottom: 36,
          }}
        >
          <span style={{ fontSize: 42, fontWeight: 700, color: '#FFFFFF' }}>E</span>
        </div>
        <div style={{ display: 'flex', fontSize: 60, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.15 }}>
          RAZAFINDRAVONJY Solofonirina
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            background: 'linear-gradient(135deg, #3FA4D8 0%, #87D0F2 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 28,
          }}
        >
          Elysé
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: '#9FB4CC' }}>
          Développeur Web &amp; Mobile · Junior
        </div>
      </div>
    ),
    { ...size }
  );
}
