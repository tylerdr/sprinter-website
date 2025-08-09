import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const title = searchParams.get('title') || 'Sprinter AI'
    const description = searchParams.get('description') || 'Build at the pace of AI'
    const type = searchParams.get('type') || 'default'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '20px',
              border: '2px solid rgba(59, 130, 246, 0.5)',
              maxWidth: '90%',
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                S
              </div>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'white',
                  letterSpacing: '-1px',
                }}
              >
                Sprinter AI
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: type === 'blog' ? '56px' : '72px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                marginBottom: '20px',
                maxWidth: '1000px',
                lineHeight: 1.2,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {title}
            </div>

            {/* Description */}
            {description && (
              <div
                style={{
                  fontSize: '28px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'center',
                  maxWidth: '900px',
                  lineHeight: 1.4,
                }}
              >
                {description}
              </div>
            )}

            {/* Tagline */}
            <div
              style={{
                marginTop: '40px',
                padding: '12px 24px',
                borderRadius: '100px',
                border: '2px solid rgba(59, 130, 246, 0.5)',
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '500',
              }}
            >
              Build at the pace of AI
            </div>
          </div>

          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute',
              top: '50px',
              right: '50px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(139, 92, 246, 0.2)',
              filter: 'blur(80px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '50px',
              left: '50px',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.2)',
              filter: 'blur(100px)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error('OG Image generation failed:', e)
    return new Response('Failed to generate image', { status: 500 })
  }
}