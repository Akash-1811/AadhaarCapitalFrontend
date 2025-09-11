import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground));'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-hero': 'var(--gradient-hero)',
			},
			boxShadow: {
				'glow': 'var(--shadow-glow)',
				'elegant': 'var(--shadow-elegant)',
			},
			fontFamily: {
				sans: ['Open Sans', 'system-ui', 'sans-serif'],
				heading: ['Playfair Display', 'serif'],
				body: ['Open Sans', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				// Content/Body text sizes
				'body-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
				'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.025em' }],
				'body-base': ['1rem', { lineHeight: '1.7', letterSpacing: '0.025em' }],
				'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0.025em' }],

				// Heading text sizes
				'heading-xs': ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.05em', fontWeight: '600' }],
				'heading-sm': ['1rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600' }],
				'heading-base': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600' }],
				'heading-lg': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.05em', fontWeight: '700' }],
				'heading-xl': ['2rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '700' }],
				'heading-2xl': ['2.5rem', { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '800' }],
				'heading-3xl': ['3rem', { lineHeight: '1.1', letterSpacing: '0.05em', fontWeight: '800' }],
				'heading-4xl': ['4rem', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '900' }],
			},
			scrollbar: {
				thin: '6px',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
