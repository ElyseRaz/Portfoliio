import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2A8BC4 0%, #5BBCE8 100%)',
          borderRadius: 7,
        }}
      >
        <span
          style={{
            fontSize: 21,
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          E
        </span>
      </div>
    ),
    { ...size }
  );
}
