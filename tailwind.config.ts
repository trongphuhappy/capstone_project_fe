import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Montserrat',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        serif: ['ui-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        // Teal colors
        'teal-1': '#6BB3B1',
        'teal-2': '#4EA09D',
        'teal-3': '#3B8D8A',
        'teal-4': '#286E6C',
        'teal-5': '#185C5A',
        'teal-6': '#124E4C',
        'teal-7': '#0F3C3A',

        // Neutral colors
        'neutral-1': '#FFFFFF',
        'neutral-2': '#F5F6FA',
        'neutral-3': '#EBECF0',
        'neutral-4': '#D4D5D9',
        'neutral-5': '#BBBCBF',
        'neutral-6': '#8A8B8C',
        'neutral-7': '#575859',
        'neutral-8': '#414142',
        'neutral-9': '#2A2A2B',
        'neutral-10': '#000D0B',

        // Success colors
        'success-1': '#E5F6E5',
        'success-2': '#C7EAC7',
        'success-3': '#8CD58C',
        'success-4': '#4CBD4C',
        'success-5': '#00A100',
        'success-6': '#008302',
        'success-7': '#006604',
        'success-8': '#005006',
        'success-9': '#003908',
        'success-10': '#002B09',

        // Error colors
        'error-1': '#FEE9EA',
        'error-2': '#FDCED1',
        'error-3': '#FB9CA0',
        'error-4': '#F8646C',
        'error-5': '#F5222D',
        'error-6': '#C91C25',
        'error-7': '#9A151C',
        'error-8': '#7B1117',
        'error-9': '#580C10',
        'error-10': '#42090C',
      },
      margin: {
        3.75: '15px',
      },
      width: {
        75: '300px',
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        error: ['12px', '20px'],
        // Display
        'heading-1': ['40px', { lineHeight: '48px', fontWeight: '600' }],
        'heading-2': ['34px', { lineHeight: '40px', fontWeight: '600' }],
        'heading-3': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'heading-4': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'heading-5': ['20px', { lineHeight: '28px', fontWeight: '600' }],

        'body-1-semibold': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'body-1-medium': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'body-1-regular': ['16px', { lineHeight: '24px', fontWeight: '400' }],

        'body-2-semibold': ['14px', { lineHeight: '22px', fontWeight: '600' }],
        'body-2-medium': ['14px', { lineHeight: '22px', fontWeight: '500' }],
        'body-2-regular': ['14px', { lineHeight: '22px', fontWeight: '400' }],

        'body-3-semibold': ['12px', { lineHeight: '20px', fontWeight: '600' }],
        'body-3-medium': ['12px', { lineHeight: '20px', fontWeight: '500' }],
        'body-3-regular': ['12px', { lineHeight: '20px', fontWeight: '400' }],

      },
      borderRadius: {
        default: '4px',
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        tooltip:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        "product-item":
          "rgba(9, 30, 66, 0.25) 0px 4px 8px -5px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
      },
      keyframes: {
        fade: {
          '0%': {
            transform: 'translate(-100%, -150%) skew(45deg)',
          },
          '50%': { transform: 'translate(-50%, -50%) skew(45deg)' },
          '100%': {
            transform: 'translate(0%, 50%) skew(45deg)',
          },
        },
        gradient: {
          '0%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
          '100%': {
            'background-position': '0% 50%',
          },
        },
        flicker: {
          '0%, 100%': {
            transform: 'rotate(-45deg) translate(0, 0)',
          },
          '50%': {
            transform: 'rotate(-45deg) translate(4px, 4px)',
          },
        },
        frameAnimation: {
          '0%': {
            'background-position': '0 0',
          },
          '100%': {
            'background-position': '0 -3000%',
          },
        },
      },
      animation: {
        fade: 'fade 1s infinite',
        flicker: 'flicker 1s ease-in-out infinite',
        spriteAnimation: 'frameAnimation 0.5s steps(30) infinite forwards',
        gradient: 'gradient 7.5s ease-in-out infinite',
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
export default config;
